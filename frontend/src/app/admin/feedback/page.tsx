'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getApiUrl } from '@/lib/api';
import {
  MessageSquareText, Plus, Search, User, RefreshCw,
  ThumbsUp, MessageCircle, Bug, Lightbulb, GripVertical,
  X, Send, Paperclip, ChevronDown, ChevronUp, AlertCircle,
  Clock, CheckCircle, XCircle, Eye
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
  submitted_by: string;
  submitted_by_role: string;
  submitted_by_name?: string;
  created_at: string;
  updated_at: string;
  vote_count: number;
  comment_count: number;
  user_has_voted: boolean;
  comments?: any[];
  attachments?: any[];
}

const STATUS_COLUMNS = [
  { key: 'open', label: 'Bug / Feature', color: 'border-blue-400', bgColor: 'bg-blue-50 dark:bg-blue-900/20' },
  { key: 'in_progress', label: 'In Progress', color: 'border-yellow-400', bgColor: 'bg-yellow-50 dark:bg-yellow-900/20' },
  { key: 'qa', label: 'QA', color: 'border-purple-400', bgColor: 'bg-purple-50 dark:bg-purple-900/20' },
  { key: 'rejected', label: 'Rejected', color: 'border-red-400', bgColor: 'bg-red-50 dark:bg-red-900/20' },
  { key: 'completed', label: 'Completed', color: 'border-green-400', bgColor: 'bg-green-50 dark:bg-green-900/20' },
];

const PRIORITY_COLORS: Record<string, string> = {
  low: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  medium: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
  high: 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300',
  critical: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300',
};

export default function AdminFeedbackPage() {
  const { user } = useAuth();
  const [reports, setReports] = useState<FeedbackReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMyReports, setShowMyReports] = useState(false);
  const [selectedReport, setSelectedReport] = useState<FeedbackReport | null>(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [draggedReport, setDraggedReport] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  // Submit form state
  const [submitType, setSubmitType] = useState<'bug' | 'feature'>('bug');
  const [submitTitle, setSubmitTitle] = useState('');
  const [submitDescription, setSubmitDescription] = useState('');
  const [submitSteps, setSubmitSteps] = useState('');
  const [submitPriority, setSubmitPriority] = useState('medium');
  const [submitFiles, setSubmitFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const fetchReports = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (showMyReports) params.append('my_reports', 'true');
      params.append('limit', '200');

      const res = await fetch(`${API_URL}/api/feedback?${params}`, {
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
  }, [token, searchQuery, showMyReports]);

  useEffect(() => {
    if (token) fetchReports();
  }, [fetchReports, token]);

  const handleStatusChange = async (reportId: string, newStatus: string) => {
    try {
      const res = await fetch(`${API_URL}/api/feedback/${reportId}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setReports(prev => prev.map(r => r.id === reportId ? { ...r, status: newStatus } : r));
        if (selectedReport?.id === reportId) {
          setSelectedReport(prev => prev ? { ...prev, status: newStatus } : null);
        }
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handlePriorityChange = async (reportId: string, newPriority: string) => {
    try {
      const res = await fetch(`${API_URL}/api/feedback/${reportId}/priority`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priority: newPriority }),
      });
      const data = await res.json();
      if (data.success) {
        setReports(prev => prev.map(r => r.id === reportId ? { ...r, priority: newPriority } : r));
        if (selectedReport?.id === reportId) {
          setSelectedReport(prev => prev ? { ...prev, priority: newPriority } : null);
        }
      }
    } catch (err) {
      console.error('Error updating priority:', err);
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

  const handleOpenDetail = async (report: FeedbackReport) => {
    try {
      const res = await fetch(`${API_URL}/api/feedback/${report.id}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setSelectedReport(data.data);
      }
    } catch (err) {
      console.error('Error fetching detail:', err);
      setSelectedReport(report);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim() || !selectedReport) return;
    try {
      setSubmittingComment(true);
      const res = await fetch(`${API_URL}/api/feedback/${selectedReport.id}/comments`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ body: newComment }),
      });
      const data = await res.json();
      if (data.success) {
        setSelectedReport(prev => prev ? {
          ...prev,
          comments: [...(prev.comments || []), data.data],
        } : null);
        setReports(prev => prev.map(r =>
          r.id === selectedReport.id ? { ...r, comment_count: r.comment_count + 1 } : r
        ));
        setNewComment('');
      }
    } catch (err) {
      console.error('Error adding comment:', err);
    } finally {
      setSubmittingComment(false);
    }
  };

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
          priority: submitPriority,
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

        setShowSubmitModal(false);
        setSubmitTitle('');
        setSubmitDescription('');
        setSubmitSteps('');
        setSubmitFiles([]);
        setSubmitPriority('medium');
        fetchReports();
      }
    } catch (err) {
      console.error('Error submitting feedback:', err);
    } finally {
      setSubmitting(false);
    }
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, reportId: string) => {
    setDraggedReport(reportId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, columnKey: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverColumn(columnKey);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e: React.DragEvent, columnKey: string) => {
    e.preventDefault();
    setDragOverColumn(null);
    if (draggedReport) {
      handleStatusChange(draggedReport, columnKey);
    }
    setDraggedReport(null);
  };

  const getColumnReports = (statusKey: string) => {
    return reports.filter(r => r.status === statusKey);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <MessageSquareText className="w-7 h-7" />
            Bug & Feature Report
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {reports.length} reports total
          </p>
        </div>
        <button
          onClick={() => setShowSubmitModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <Plus className="w-4 h-4" />
          Submit Feedback
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title, description, or report number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={() => setShowMyReports(!showMyReports)}
          className={`inline-flex items-center gap-2 px-4 py-2.5 border rounded-lg text-sm font-medium transition-colors ${
            showMyReports
              ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
              : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          <User className="w-4 h-4" />
          My Reports
        </button>
        <button
          onClick={fetchReports}
          className="p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-4 min-h-[500px]">
        {STATUS_COLUMNS.map(column => {
          const columnReports = getColumnReports(column.key);
          return (
            <div
              key={column.key}
              className={`flex-shrink-0 w-72 rounded-xl border-t-4 ${column.color} bg-white dark:bg-gray-800 shadow-sm ${
                dragOverColumn === column.key ? 'ring-2 ring-blue-400 ring-opacity-50' : ''
              }`}
              onDragOver={(e) => handleDragOver(e, column.key)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, column.key)}
            >
              {/* Column Header */}
              <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{column.label}</h3>
                  <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium px-2 py-0.5 rounded-full">
                    {columnReports.length}
                  </span>
                </div>
              </div>

              {/* Column Body */}
              <div className="p-3 space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
                {columnReports.length === 0 ? (
                  <p className="text-center text-gray-400 dark:text-gray-500 text-sm py-8">No reports</p>
                ) : (
                  columnReports.map(report => (
                    <div
                      key={report.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, report.id)}
                      onClick={() => handleOpenDetail(report)}
                      className={`p-3 bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:shadow-md transition-shadow ${
                        draggedReport === report.id ? 'opacity-50' : ''
                      }`}
                    >
                      {/* Card Header */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                          report.type === 'bug'
                            ? 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300'
                            : 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                        }`}>
                          {report.type === 'bug' ? <Bug className="w-3 h-3" /> : <Lightbulb className="w-3 h-3" />}
                          {report.type === 'bug' ? 'Bug' : 'Feature'}
                        </span>
                        <span className="text-xs text-gray-400 dark:text-gray-500">{report.report_number}</span>
                        <span className={`ml-auto text-xs font-medium px-2 py-0.5 rounded-full ${PRIORITY_COLORS[report.priority]}`}>
                          {report.priority}
                        </span>
                      </div>

                      {/* Title */}
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">
                        {report.title}
                      </h4>

                      {/* Footer */}
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="w-3 h-3" /> {report.vote_count}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="w-3 h-3" /> {report.comment_count}
                          </span>
                        </div>
                        <span>{formatDate(report.created_at)}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Report Detail Modal */}
      {selectedReport && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setSelectedReport(null)} />
          <div className="fixed inset-4 md:inset-y-8 md:left-[20%] md:right-[20%] bg-white dark:bg-gray-800 rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center gap-1 text-sm font-medium px-2.5 py-1 rounded-full ${
                  selectedReport.type === 'bug'
                    ? 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300'
                    : 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                }`}>
                  {selectedReport.type === 'bug' ? <Bug className="w-4 h-4" /> : <Lightbulb className="w-4 h-4" />}
                  {selectedReport.report_number}
                </span>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{selectedReport.title}</h2>
              </div>
              <button onClick={() => setSelectedReport(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Body - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Status & Priority Controls */}
              <div className="flex flex-wrap gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</label>
                  <select
                    value={selectedReport.status}
                    onChange={(e) => handleStatusChange(selectedReport.id, e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="qa">QA</option>
                    <option value="rejected">Rejected</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Priority</label>
                  <select
                    value={selectedReport.priority}
                    onChange={(e) => handlePriorityChange(selectedReport.id, e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Submitted By</label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white py-2">
                    {selectedReport.submitted_by_name || 'Unknown'} ({selectedReport.submitted_by_role})
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white py-2">
                    {formatDate(selectedReport.created_at)}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Description</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{selectedReport.description}</p>
              </div>

              {/* Steps to Reproduce */}
              {selectedReport.type === 'bug' && selectedReport.steps_to_reproduce && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Steps to Reproduce</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{selectedReport.steps_to_reproduce}</p>
                </div>
              )}

              {/* Attachments */}
              {selectedReport.attachments && selectedReport.attachments.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Attachments</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedReport.attachments.map((att: any) => (
                      <a
                        key={att.id}
                        href={att.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm text-blue-600 dark:text-blue-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                      >
                        <Paperclip className="w-4 h-4" />
                        {att.file_name}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Vote */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleVote(selectedReport.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedReport.user_has_voted
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  Upvote ({selectedReport.vote_count})
                </button>
              </div>

              {/* Comments */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Comments ({selectedReport.comments?.length || 0})
                </h3>
                <div className="space-y-3">
                  {selectedReport.comments?.map((comment: any) => (
                    <div key={comment.id} className="bg-gray-50 dark:bg-gray-750 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {comment.user_name || 'Unknown'}
                          <span className="ml-1 text-xs text-gray-400">({comment.user_role})</span>
                        </span>
                        <span className="text-xs text-gray-400">{formatDate(comment.created_at)}</span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{comment.body}</p>
                    </div>
                  ))}

                  {(!selectedReport.comments || selectedReport.comments.length === 0) && (
                    <p className="text-sm text-gray-400 dark:text-gray-500">No comments yet</p>
                  )}
                </div>
              </div>
            </div>

            {/* Comment Input */}
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 shrink-0">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                  placeholder="Add a comment..."
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleAddComment}
                  disabled={!newComment.trim() || submittingComment}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Submit Feedback Modal */}
      {showSubmitModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowSubmitModal(false)} />
          <div className="fixed inset-4 md:inset-y-12 md:left-[25%] md:right-[25%] bg-white dark:bg-gray-800 rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between shrink-0">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Submit Feedback</h2>
              <button onClick={() => setShowSubmitModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-5">
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
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea
                  value={submitDescription}
                  onChange={(e) => setSubmitDescription(e.target.value)}
                  placeholder={submitType === 'bug' ? 'What happened? What did you expect?' : 'Describe the feature and why it would be useful...'}
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 resize-y"
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
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 resize-y"
                  />
                </div>
              )}

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
                <select
                  value={submitPriority}
                  onChange={(e) => setSubmitPriority(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>

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
            </div>

            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 shrink-0">
              <button
                onClick={handleSubmitFeedback}
                disabled={!submitTitle.trim() || !submitDescription.trim() || submitting}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                <Send className="w-4 h-4" />
                {submitting ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
