import { Router, Request, Response } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { supabase } from '../lib/supabase';
import multer = require('multer');

const router = Router();

// Discord webhook config
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1475433006838583319/xcNdtHRSeN73LI9rRfx0ZUNdF-X6K623LJl63DnQhPoM8uQ-YJ8XAEcqbYDZyT1CzdVR';
const DISCORD_PING_USER_ID = '1460585326975385659';

const STATUS_LABELS: Record<string, string> = {
  open: 'Open',
  in_progress: 'In Progress',
  qa: 'QA',
  rejected: 'Rejected',
  completed: 'Completed',
};

const PRIORITY_LABELS: Record<string, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  critical: 'Critical',
};

const STATUS_COLORS: Record<string, number> = {
  open: 0x3B82F6,       // blue
  in_progress: 0xF59E0B, // yellow
  qa: 0x8B5CF6,         // purple
  rejected: 0xEF4444,   // red
  completed: 0x22C55E,  // green
};

const TYPE_COLORS: Record<string, number> = {
  bug: 0xEF4444,     // red
  feature: 0x3B82F6, // blue
};

async function sendDiscordNotification(content: string, embed: any) {
  try {
    await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content,
        embeds: [embed],
      }),
    });
  } catch (err) {
    console.error('Failed to send Discord notification:', err);
  }
}

// Multer config for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
  fileFilter: (req: any, file: any, cb: any) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|mp4|mov|avi|pdf/;
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype) return cb(null, true);
    cb(new Error('Only images, videos, and PDFs are allowed'));
  }
});

// Helper: get next feedback number atomically
async function getNextFeedbackNumber(type: 'bug' | 'feature'): Promise<string> {
  const { data, error } = await supabase.rpc('get_next_feedback_number', {
    report_type: type
  });
  if (error) throw error;
  return data;
}

// POST /api/feedback - Submit a new feedback report
router.post('/', authenticate, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { type, title, description, steps_to_reproduce, priority } = req.body;

    if (!type || !title || !description) {
      return res.status(400).json({ error: 'Type, title, and description are required' });
    }

    if (!['bug', 'feature'].includes(type)) {
      return res.status(400).json({ error: 'Type must be "bug" or "feature"' });
    }

    // Get report number
    const report_number = await getNextFeedbackNumber(type);

    // Get user name
    let userName = 'Unknown User';
    const tables = ['clients', 'coaches', 'staff', 'admins'];
    for (const table of tables) {
      const { data } = await supabase
        .from(table)
        .select('first_name, last_name')
        .eq('id', user.userId)
        .single();
      if (data) {
        userName = `${data.first_name || ''} ${data.last_name || ''}`.trim();
        break;
      }
    }

    const { data: report, error } = await supabase
      .from('feedback_reports')
      .insert({
        report_number,
        type,
        title,
        description,
        steps_to_reproduce: type === 'bug' ? steps_to_reproduce : null,
        priority: priority || 'medium',
        status: 'open',
        submitted_by: user.userId,
        submitted_by_role: user.role === 'staff' ? 'staff' : user.role,
        submitted_by_name: userName,
      })
      .select()
      .single();

    if (error) throw error;

    // Send Discord notification
    const typeLabel = type === 'bug' ? 'Bug Report' : 'Feature Request';
    const priorityVal = priority || 'medium';
    sendDiscordNotification(
      `<@${DISCORD_PING_USER_ID}> New ${type === 'bug' ? 'bug report' : 'feature request'} submitted!`,
      {
        title: `New ${typeLabel}: ${title}`,
        description: description.length > 200 ? description.substring(0, 200) + '...' : description,
        color: TYPE_COLORS[type] || 0x3B82F6,
        fields: [
          { name: 'Type', value: typeLabel, inline: true },
          { name: 'Priority', value: PRIORITY_LABELS[priorityVal] || priorityVal, inline: true },
          { name: 'Status', value: 'Open', inline: true },
          { name: 'Author', value: userName, inline: true },
          { name: 'Task Number', value: report_number, inline: true },
        ],
        timestamp: new Date().toISOString(),
      }
    );

    res.status(201).json({ success: true, data: report });
  } catch (error: any) {
    console.error('Error creating feedback:', error);
    res.status(500).json({ error: 'Failed to create feedback report' });
  }
});

// GET /api/feedback - Get all feedback reports (admin) or user's reports
router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { status, type, search, my_reports, page = '1', limit = '50' } = req.query;

    let query = supabase
      .from('feedback_reports')
      .select('*')
      .order('created_at', { ascending: false });

    // Non-admin users can only see their own reports
    if (!['admin', 'staff'].includes(user.role) || my_reports === 'true') {
      query = query.eq('submitted_by', user.userId);
    }

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    if (type && type !== 'all') {
      query = query.eq('type', type);
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%,report_number.ilike.%${search}%`);
    }

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const from = (pageNum - 1) * limitNum;
    const to = from + limitNum - 1;

    query = query.range(from, to);

    const { data: reports, error, count } = await query;

    if (error) throw error;

    // Get vote counts and comment counts for each report
    const reportIds = (reports || []).map((r: any) => r.id);

    let voteCounts: Record<string, number> = {};
    let commentCounts: Record<string, number> = {};
    let userVotes: Record<string, boolean> = {};

    if (reportIds.length > 0) {
      // Get vote counts
      const { data: votes } = await supabase
        .from('feedback_votes')
        .select('feedback_id')
        .in('feedback_id', reportIds);

      if (votes) {
        votes.forEach((v: any) => {
          voteCounts[v.feedback_id] = (voteCounts[v.feedback_id] || 0) + 1;
        });
      }

      // Get user's votes
      const { data: myVotes } = await supabase
        .from('feedback_votes')
        .select('feedback_id')
        .eq('user_id', user.userId)
        .in('feedback_id', reportIds);

      if (myVotes) {
        myVotes.forEach((v: any) => {
          userVotes[v.feedback_id] = true;
        });
      }

      // Get comment counts
      const { data: comments } = await supabase
        .from('feedback_comments')
        .select('feedback_id')
        .in('feedback_id', reportIds);

      if (comments) {
        comments.forEach((c: any) => {
          commentCounts[c.feedback_id] = (commentCounts[c.feedback_id] || 0) + 1;
        });
      }
    }

    const enrichedReports = (reports || []).map((r: any) => ({
      ...r,
      vote_count: voteCounts[r.id] || 0,
      comment_count: commentCounts[r.id] || 0,
      user_has_voted: userVotes[r.id] || false,
    }));

    res.json({ success: true, data: enrichedReports, total: count });
  } catch (error: any) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ error: 'Failed to fetch feedback reports' });
  }
});

// GET /api/feedback/stats - Get feedback statistics (admin)
router.get('/stats', authenticate, authorize('admin', 'staff'), async (req: Request, res: Response) => {
  try {
    const { data: reports, error } = await supabase
      .from('feedback_reports')
      .select('status, type');

    if (error) throw error;

    const stats = {
      total: reports?.length || 0,
      by_status: {
        open: 0,
        in_progress: 0,
        qa: 0,
        rejected: 0,
        completed: 0,
      },
      by_type: {
        bug: 0,
        feature: 0,
      }
    };

    reports?.forEach((r: any) => {
      if (stats.by_status[r.status as keyof typeof stats.by_status] !== undefined) {
        stats.by_status[r.status as keyof typeof stats.by_status]++;
      }
      if (stats.by_type[r.type as keyof typeof stats.by_type] !== undefined) {
        stats.by_type[r.type as keyof typeof stats.by_type]++;
      }
    });

    res.json({ success: true, data: stats });
  } catch (error: any) {
    console.error('Error fetching feedback stats:', error);
    res.status(500).json({ error: 'Failed to fetch feedback stats' });
  }
});

// GET /api/feedback/:id - Get a single report with comments and attachments
router.get('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;

    const { data: report, error } = await supabase
      .from('feedback_reports')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !report) {
      return res.status(404).json({ error: 'Report not found' });
    }

    // Non-admin can only see their own reports
    if (!['admin', 'staff'].includes(user.role) && report.submitted_by !== user.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Get comments
    const { data: comments } = await supabase
      .from('feedback_comments')
      .select('*')
      .eq('feedback_id', id)
      .order('created_at', { ascending: true });

    // Get attachments
    const { data: attachments } = await supabase
      .from('feedback_attachments')
      .select('*')
      .eq('feedback_id', id)
      .order('created_at', { ascending: true });

    // Get vote count
    const { count: voteCount } = await supabase
      .from('feedback_votes')
      .select('*', { count: 'exact', head: true })
      .eq('feedback_id', id);

    // Check if user voted
    const { data: userVote } = await supabase
      .from('feedback_votes')
      .select('id')
      .eq('feedback_id', id)
      .eq('user_id', user.userId)
      .single();

    res.json({
      success: true,
      data: {
        ...report,
        comments: comments || [],
        attachments: attachments || [],
        vote_count: voteCount || 0,
        user_has_voted: !!userVote,
      }
    });
  } catch (error: any) {
    console.error('Error fetching feedback detail:', error);
    res.status(500).json({ error: 'Failed to fetch feedback report' });
  }
});

// PATCH /api/feedback/:id/status - Update report status (admin only)
router.patch('/:id/status', authenticate, authorize('admin', 'staff'), async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    const { status } = req.body;

    if (!['open', 'in_progress', 'qa', 'rejected', 'completed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    // Fetch current report for old status
    const { data: existing } = await supabase
      .from('feedback_reports')
      .select('status, title, description, type, report_number')
      .eq('id', id)
      .single();

    const oldStatus = existing?.status || 'unknown';

    const { data, error } = await supabase
      .from('feedback_reports')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // Send Discord notification
    if (existing) {
      const typeLabel = existing.type === 'bug' ? 'bug report' : 'feature request';

      // Get admin/staff name
      let changedBy = 'Staff';
      const tables = ['staff', 'admins', 'coaches', 'clients'];
      for (const table of tables) {
        const { data: userData } = await supabase
          .from(table)
          .select('first_name, last_name')
          .eq('id', user.userId)
          .single();
        if (userData) {
          changedBy = `${userData.first_name || ''} ${userData.last_name || ''}`.trim();
          break;
        }
      }

      sendDiscordNotification(
        `<@${DISCORD_PING_USER_ID}> Status updated on ${typeLabel}: ${existing.title}`,
        {
          title: `Status Updated: ${existing.title}`,
          description: existing.description?.length > 200
            ? existing.description.substring(0, 200) + '...'
            : existing.description || '',
          color: STATUS_COLORS[status] || 0x3B82F6,
          fields: [
            { name: 'From', value: STATUS_LABELS[oldStatus] || oldStatus, inline: true },
            { name: 'To', value: STATUS_LABELS[status] || status, inline: true },
            { name: 'Type', value: existing.type === 'bug' ? 'Bug Report' : 'Feature Request', inline: true },
            { name: 'Changed By', value: changedBy, inline: true },
            { name: 'Task Number', value: existing.report_number || 'N/A', inline: true },
          ],
          timestamp: new Date().toISOString(),
        }
      );
    }

    res.json({ success: true, data });
  } catch (error: any) {
    console.error('Error updating feedback status:', error);
    res.status(500).json({ error: 'Failed to update status' });
  }
});

// PATCH /api/feedback/:id/priority - Update report priority (admin only)
router.patch('/:id/priority', authenticate, authorize('admin', 'staff'), async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    const { priority } = req.body;

    if (!['low', 'medium', 'high', 'critical'].includes(priority)) {
      return res.status(400).json({ error: 'Invalid priority' });
    }

    // Fetch current report for old priority
    const { data: existing } = await supabase
      .from('feedback_reports')
      .select('priority, title, description, type, report_number')
      .eq('id', id)
      .single();

    const oldPriority = existing?.priority || 'unknown';

    const { data, error } = await supabase
      .from('feedback_reports')
      .update({ priority, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // Send Discord notification
    if (existing) {
      const typeLabel = existing.type === 'bug' ? 'bug report' : 'feature request';

      // Get admin/staff name
      let changedBy = 'Staff';
      const tables = ['staff', 'admins', 'coaches', 'clients'];
      for (const table of tables) {
        const { data: userData } = await supabase
          .from(table)
          .select('first_name, last_name')
          .eq('id', user.userId)
          .single();
        if (userData) {
          changedBy = `${userData.first_name || ''} ${userData.last_name || ''}`.trim();
          break;
        }
      }

      sendDiscordNotification(
        `<@${DISCORD_PING_USER_ID}> Priority updated on ${typeLabel}: ${existing.title}`,
        {
          title: `Priority Updated: ${existing.title}`,
          description: existing.description?.length > 200
            ? existing.description.substring(0, 200) + '...'
            : existing.description || '',
          color: TYPE_COLORS[existing.type] || 0x3B82F6,
          fields: [
            { name: 'From', value: PRIORITY_LABELS[oldPriority] || oldPriority, inline: true },
            { name: 'To', value: PRIORITY_LABELS[priority] || priority, inline: true },
            { name: 'Type', value: existing.type === 'bug' ? 'Bug Report' : 'Feature Request', inline: true },
            { name: 'Changed By', value: changedBy, inline: true },
            { name: 'Task Number', value: existing.report_number || 'N/A', inline: true },
          ],
          timestamp: new Date().toISOString(),
        }
      );
    }

    res.json({ success: true, data });
  } catch (error: any) {
    console.error('Error updating feedback priority:', error);
    res.status(500).json({ error: 'Failed to update priority' });
  }
});

// POST /api/feedback/:id/comments - Add a comment
router.post('/:id/comments', authenticate, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    const { body } = req.body;

    if (!body || !body.trim()) {
      return res.status(400).json({ error: 'Comment body is required' });
    }

    // Get user name
    let userName = 'Unknown User';
    const tables = ['clients', 'coaches', 'staff', 'admins'];
    for (const table of tables) {
      const { data } = await supabase
        .from(table)
        .select('first_name, last_name')
        .eq('id', user.userId)
        .single();
      if (data) {
        userName = `${data.first_name || ''} ${data.last_name || ''}`.trim();
        break;
      }
    }

    const { data: comment, error } = await supabase
      .from('feedback_comments')
      .insert({
        feedback_id: id,
        user_id: user.userId,
        user_role: user.role,
        user_name: userName,
        body: body.trim(),
      })
      .select()
      .single();

    if (error) throw error;

    // Send Discord notification for new comment
    const { data: feedbackReport } = await supabase
      .from('feedback_reports')
      .select('title, type, report_number, status')
      .eq('id', id)
      .single();

    if (feedbackReport) {
      const typeLabel = feedbackReport.type === 'bug' ? 'bug report' : 'feature request';
      sendDiscordNotification(
        `<@${DISCORD_PING_USER_ID}> New comment on ${typeLabel}: ${feedbackReport.title}`,
        {
          title: `New Comment on: ${feedbackReport.title}`,
          description: body.trim().length > 300 ? body.trim().substring(0, 300) + '...' : body.trim(),
          color: TYPE_COLORS[feedbackReport.type] || 0x3B82F6,
          fields: [
            { name: 'Type', value: feedbackReport.type === 'bug' ? 'Bug Report' : 'Feature Request', inline: true },
            { name: 'Status', value: STATUS_LABELS[feedbackReport.status] || feedbackReport.status, inline: true },
            { name: 'Comment By', value: userName, inline: true },
            { name: 'Task Number', value: feedbackReport.report_number || 'N/A', inline: true },
          ],
          timestamp: new Date().toISOString(),
        }
      );
    }

    res.status(201).json({ success: true, data: comment });
  } catch (error: any) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

// POST /api/feedback/:id/vote - Toggle vote
router.post('/:id/vote', authenticate, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;

    // Check if already voted
    const { data: existing } = await supabase
      .from('feedback_votes')
      .select('id')
      .eq('feedback_id', id)
      .eq('user_id', user.userId)
      .single();

    if (existing) {
      // Remove vote
      await supabase
        .from('feedback_votes')
        .delete()
        .eq('feedback_id', id)
        .eq('user_id', user.userId);

      res.json({ success: true, voted: false });
    } else {
      // Add vote
      await supabase
        .from('feedback_votes')
        .insert({
          feedback_id: id,
          user_id: user.userId,
        });

      res.json({ success: true, voted: true });
    }
  } catch (error: any) {
    console.error('Error toggling vote:', error);
    res.status(500).json({ error: 'Failed to toggle vote' });
  }
});

// POST /api/feedback/:id/attachments - Upload attachments
router.post('/:id/attachments', authenticate, upload.array('files', 5), async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No files provided' });
    }

    const uploadedAttachments = [];

    for (const file of files) {
      const ext = file.originalname.split('.').pop();
      const fileName = `feedback/${id}/${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${ext}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('public-assets')
        .upload(fileName, file.buffer, {
          contentType: file.mimetype,
          cacheControl: '3600',
        });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('public-assets')
        .getPublicUrl(fileName);

      const { data: attachment, error: dbError } = await supabase
        .from('feedback_attachments')
        .insert({
          feedback_id: id,
          file_url: urlData.publicUrl,
          file_name: file.originalname,
          file_size: file.size,
          file_type: file.mimetype,
          uploaded_by: user.userId,
        })
        .select()
        .single();

      if (dbError) throw dbError;

      uploadedAttachments.push(attachment);
    }

    res.status(201).json({ success: true, data: uploadedAttachments });
  } catch (error: any) {
    console.error('Error uploading attachments:', error);
    res.status(500).json({ error: 'Failed to upload attachments' });
  }
});

export default router;
