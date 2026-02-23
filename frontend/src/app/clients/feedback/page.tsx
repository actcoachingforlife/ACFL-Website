'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getApiUrl } from '@/lib/api';
import {
  MessageSquareText, Bug, Lightbulb, Send, Paperclip,
  ThumbsUp, MessageCircle, ChevronDown, X, CheckCircle,
  Clock, XCircle, Eye, AlertCircle
} from 'lucide-react';

const API_URL = getApiUrl();

interface FeedbackReport {
  id: string;
  report_number: string;
  type: 'bug' | 'feature';
  title: string;
  description: string;
  steps_to_reproduce?: string;
  status: string;
  priority: string;
  submitted_by_name?: string;
  submitted_by_role: string;
  created_at: string;
  vote_count: number;
  comment_count: number;
  user_has_voted: boolean;
  comments?: any[];
  attachments?: any[];
}

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: any }> = {
  open: { label: 'Open', color: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300', icon: Clock },
  in_progress: { label: 'In Progress', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300', icon: Clock },
  qa: { label: 'QA', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300', icon: Eye },
  rejected: { label: 'Rejected', color: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300', icon: XCircle },
  completed: { label: 'Completed', color: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300', icon: CheckCircle },
};

export default function ClientFeedbackPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'submit' | 'submissions'>('submit');
  const [reports, setReports] = useState<FeedbackReport[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedReport, setExpandedReport] = useState<string | null>(null);
  const [reportDetail, setReportDetail] = useState<FeedbackReport | null>(null);

  // Submit form state
  const [submitType, setSubmitType] = useState<'bug' | 'feature'>('bug');
  const [submitTitle, setSubmitTitle] = useState('');
  const [submitDescription, setSubmitDescription] = useState('');
  const [submitSteps, setSubmitSteps] = useState('');
  const [submitFiles, setSubmitFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const fetchMyReports = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/feedback?my_reports=true&limit=100`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setReports(data.data);
      }
    } catch (err) {
      console.error('Error fetching reports:', err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (activeTab === 'submissions' && token) {
      fetchMyReports();
    }
  }, [activeTab, fetchMyReports, token]);

  const handleSubmitFeedback = async () => {
    if (!submitTitle.trim() || !submitDescription.trim()) return;
    try {
      setSubmitting(true);
      const res = await fetch(`${API_URL}/api/feedback`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: submitType,
          title: submitTitle,
          description: submitDescription,
          steps_to_reproduce: submitSteps,
        }),
      });
      const data = await res.json();
      if (data.success) {
        // Upload attachments if any
        if (submitFiles.length > 0) {
          const formData = new FormData();
          submitFiles.forEach(f => formData.append('files', f));
          await fetch(`${API_URL}/api/feedback/${data.data.id}/attachments`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData,
          });
        }

        setSubmitTitle('');
        setSubmitDescription('');
        setSubmitSteps('');
        setSubmitFiles([]);
        setSubmitSuccess(true);
        setTimeout(() => setSubmitSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Error submitting feedback:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleVote = async (reportId: string) => {
    try {
      const res = await fetch(`${API_URL}/api/feedback/${reportId}/vote`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setReports(prev => prev.map(r => {
          if (r.id === reportId) {
            return {
              ...r,
              user_has_voted: data.voted,
              vote_count: data.voted ? r.vote_count + 1 : r.vote_count - 1,
            };
          }
          return r;
        }));
      }
    } catch (err) {
      console.error('Error voting:', err);
    }
  };

  const toggleReportExpand = async (report: FeedbackReport) => {
    if (expandedReport === report.id) {
      setExpandedReport(null);
      setReportDetail(null);
      return;
    }
    setExpandedReport(report.id);
    try {
      const res = await fetch(`${API_URL}/api/feedback/${report.id}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setReportDetail(data.data);
      }
    } catch (err) {
      console.error('Error fetching detail:', err);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <MessageSquareText className="w-7 h-7" />
          Feedback
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Report bugs or request new features to help us improve
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab('submit')}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'submit'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Submit Feedback
          </button>
          <button
            onClick={() => setActiveTab('submissions')}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'submissions'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            My Submissions
          </button>
        </div>
      </div>

      {/* Submit Tab */}
      {activeTab === 'submit' && (
        <div className="space-y-5">
          {submitSuccess && (
            <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-300 text-sm">
              <CheckCircle className="w-4 h-4" />
              Feedback submitted successfully! Thank you.
            </div>
          )}

          {/* Type Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Type</label>
            <div className="flex gap-3">
              <button
                onClick={() => setSubmitType('bug')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 text-sm font-medium transition-colors ${
                  submitType === 'bug'
                    ? 'border-red-400 bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                    : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <Bug className="w-4 h-4" />
                Bug Report
              </button>
              <button
                onClick={() => setSubmitType('feature')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 text-sm font-medium transition-colors ${
                  submitType === 'feature'
                    ? 'border-blue-400 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                    : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <Lightbulb className="w-4 h-4" />
                Feature Request
              </button>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
            <input
              type="text"
              value={submitTitle}
              onChange={(e) => setSubmitTitle(e.target.value)}
              placeholder={submitType === 'bug' ? 'Brief description of the bug...' : 'Feature you would like to see...'}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <textarea
              value={submitDescription}
              onChange={(e) => setSubmitDescription(e.target.value)}
              placeholder={submitType === 'bug' ? 'What happened? What did you expect?' : 'Describe the feature and why it would be useful...'}
              rows={5}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
            />
          </div>

          {/* Steps to Reproduce (Bug only) */}
          {submitType === 'bug' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Steps to Reproduce</label>
              <textarea
                value={submitSteps}
                onChange={(e) => setSubmitSteps(e.target.value)}
                placeholder="1. Go to...&#10;2. Click on...&#10;3. See error..."
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
              />
            </div>
          )}

          {/* Attachments */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Attachments</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <Paperclip className="w-4 h-4" />
                Attach files
              </button>
              <span className="text-xs text-gray-400">Images & videos, max 50MB each (up to 5 files)</span>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*,.pdf"
              className="hidden"
              onChange={(e) => {
                if (e.target.files) {
                  setSubmitFiles(Array.from(e.target.files).slice(0, 5));
                }
              }}
            />
            {submitFiles.length > 0 && (
              <div className="mt-2 space-y-1">
                {submitFiles.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Paperclip className="w-3 h-3" />
                    <span>{f.name}</span>
                    <button
                      onClick={() => setSubmitFiles(prev => prev.filter((_, idx) => idx !== i))}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmitFeedback}
            disabled={!submitTitle.trim() || !submitDescription.trim() || submitting}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            <Send className="w-4 h-4" />
            {submitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </div>
      )}

      {/* My Submissions Tab */}
      {activeTab === 'submissions' && (
        <div className="space-y-3">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto" />
              <p className="mt-3 text-sm text-gray-500">Loading submissions...</p>
            </div>
          ) : reports.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <MessageSquareText className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No submissions yet</p>
              <p className="text-sm mt-1">Submit your first bug report or feature request!</p>
            </div>
          ) : (
            reports.map(report => {
              const statusConfig = STATUS_CONFIG[report.status] || STATUS_CONFIG.open;
              const StatusIcon = statusConfig.icon;
              const isExpanded = expandedReport === report.id;

              return (
                <div
                  key={report.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 overflow-hidden"
                >
                  {/* Report Row */}
                  <div
                    onClick={() => toggleReportExpand(report)}
                    className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                  >
                    {/* Type Badge */}
                    <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full shrink-0 ${
                      report.type === 'bug'
                        ? 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300'
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                    }`}>
                      {report.type === 'bug' ? <Bug className="w-3 h-3" /> : <Lightbulb className="w-3 h-3" />}
                      {report.report_number}
                    </span>

                    {/* Title */}
                    <span className="flex-1 text-sm font-medium text-gray-900 dark:text-white truncate">
                      {report.title}
                    </span>

                    {/* Status */}
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${statusConfig.color}`}>
                      <StatusIcon className="w-3 h-3" />
                      {statusConfig.label}
                    </span>

                    {/* Votes & Comments */}
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 shrink-0">
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3" /> {report.vote_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" /> {report.comment_count}
                      </span>
                    </div>

                    {/* Expand Icon */}
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform shrink-0 ${isExpanded ? 'rotate-180' : ''}`} />
                  </div>

                  {/* Expanded Detail */}
                  {isExpanded && reportDetail && (
                    <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-700 space-y-4 pt-4">
                      <div>
                        <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-1">Description</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{reportDetail.description}</p>
                      </div>

                      {reportDetail.type === 'bug' && reportDetail.steps_to_reproduce && (
                        <div>
                          <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-1">Steps to Reproduce</h4>
                          <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{reportDetail.steps_to_reproduce}</p>
                        </div>
                      )}

                      {reportDetail.attachments && reportDetail.attachments.length > 0 && (
                        <div>
                          <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-1">Attachments</h4>
                          <div className="flex flex-wrap gap-2">
                            {reportDetail.attachments.map((att: any) => (
                              <a
                                key={att.id}
                                href={att.file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded text-xs text-blue-600 dark:text-blue-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                              >
                                <Paperclip className="w-3 h-3" />
                                {att.file_name}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {reportDetail.comments && reportDetail.comments.length > 0 && (
                        <div>
                          <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-2">Comments</h4>
                          <div className="space-y-2">
                            {reportDetail.comments.map((comment: any) => (
                              <div key={comment.id} className="bg-gray-50 dark:bg-gray-750 rounded-lg p-3">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-xs font-medium text-gray-900 dark:text-white">
                                    {comment.user_name}
                                    <span className="ml-1 text-gray-400">({comment.user_role})</span>
                                  </span>
                                  <span className="text-xs text-gray-400">{formatDate(comment.created_at)}</span>
                                </div>
                                <p className="text-sm text-gray-700 dark:text-gray-300">{comment.body}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-2 pt-2">
                        <span className="text-xs text-gray-400">Submitted {formatDate(report.created_at)}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
