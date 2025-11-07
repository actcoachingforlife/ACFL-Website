'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Alert, AlertDescription } from '../ui/alert';
import { Badge } from '../ui/badge';
import { getApiUrl } from '@/lib/api';
import {
  AlertCircle,
  CheckCircle,
  Clock,
  RefreshCw,
  Plus,
  Search,
  Filter,
  Calendar,
  DollarSign
} from 'lucide-react';

interface Payment {
  id: string;
  amount_cents: number;
  currency: string;
  status: string;
  description?: string;
  created_at: string;
  paid_at?: string;
}

interface RefundRequest {
  id: string;
  payment_id: string;
  amount_cents: number;
  reason: string;
  description?: string;
  status: string;
  refund_method: string;
  created_at: string;
  reviewed_at?: string;
  rejection_reason?: string;
}

interface ClientRefundRequestProps {
  clientId: string;
}

export default function ClientRefundRequest({ clientId }: ClientRefundRequestProps) {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [refundRequests, setRefundRequests] = useState<RefundRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Form states
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [refundAmount, setRefundAmount] = useState('');
  const [refundReason, setRefundReason] = useState('');
  const [refundMethod, setRefundMethod] = useState('original_payment');
  const [description, setDescription] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter states for refund history
  const [refundSearchTerm, setRefundSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const refundReasons = [
    { value: 'requested_by_customer', label: 'Customer Request' },
    { value: 'session_cancelled', label: 'Session Cancelled' },
    { value: 'unsatisfactory_service', label: 'Unsatisfactory Service' },
    { value: 'duplicate', label: 'Duplicate Payment' },
    { value: 'auto_cancellation', label: 'Auto Cancellation' }
  ];

  const refundMethods = [
    { value: 'original_payment', label: 'Original Payment Method' },
    { value: 'manual', label: 'Manual Processing' }
  ];

  const fetchData = async () => {
    try {
      setLoading(true);
      const API_URL = getApiUrl();

      // Fetch client's payments
      const paymentsResponse = await fetch(`${API_URL}/api/billing/transactions/${clientId}/client?transaction_types=payment&status=completed`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (paymentsResponse.ok) {
        const paymentsData = await paymentsResponse.json();
        // Convert billing transactions to payment format for refund purposes
        const formattedPayments = paymentsData.map((transaction: any) => ({
          id: transaction.reference_id || transaction.id,
          amount_cents: transaction.amount_cents,
          currency: transaction.currency,
          status: transaction.status,
          description: transaction.description,
          created_at: transaction.created_at,
          paid_at: transaction.created_at
        }));
        setPayments(formattedPayments);
      }

      // Fetch client's refund requests
      const refundsResponse = await fetch(`${API_URL}/api/billing/refunds`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (refundsResponse.ok) {
        const refundsData = await refundsResponse.json();
        // Filter for current client's refunds
        const clientRefunds = refundsData.filter((r: RefundRequest) =>
          payments.some(p => p.id === r.payment_id)
        );
        setRefundRequests(clientRefunds);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [clientId]);

  const handleSubmitRefund = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedPayment || !refundReason) {
      setError('Please select a payment and reason for refund');
      return;
    }

    const payment = payments.find(p => p.id === selectedPayment);
    if (!payment) {
      setError('Selected payment not found');
      return;
    }

    const amountCents = refundAmount ? Math.round(parseFloat(refundAmount) * 100) : payment.amount_cents;

    if (amountCents > payment.amount_cents) {
      setError('Refund amount cannot exceed payment amount');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      setSuccess(null);

      const API_URL = getApiUrl();
      const response = await fetch(`${API_URL}/api/billing/refunds`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          payment_id: selectedPayment,
          amount_cents: amountCents,
          reason: refundReason,
          description: description || undefined,
          refund_method: refundMethod,
          requestedBy: clientId,
          requestedByType: 'client'
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit refund request');
      }

      const refund = await response.json();
      setSuccess('Refund request submitted successfully! We will review your request and get back to you.');

      // Reset form
      setSelectedPayment('');
      setRefundAmount('');
      setRefundReason('');
      setRefundMethod('original_payment');
      setDescription('');
      setShowForm(false);

      // Refresh data
      await fetchData();

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit refund request');
    } finally {
      setSubmitting(false);
    }
  };

  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(cents / 100);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'approved':
        return 'default';
      case 'pending':
      case 'processing':
        return 'secondary';
      case 'failed':
      case 'cancelled':
      case 'rejected':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
      case 'processing':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'failed':
      case 'cancelled':
      case 'rejected':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const filteredPayments = payments.filter(payment =>
    payment.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter refund requests based on search term, status, and date range
  const filteredAndSortedRefunds = [...refundRequests]
    .filter(refund => {
      // Search filter
      if (refundSearchTerm) {
        const searchLower = refundSearchTerm.toLowerCase();
        const matchesSearch =
          refund.id.toLowerCase().includes(searchLower) ||
          refund.reason.toLowerCase().includes(searchLower) ||
          (refund.description && refund.description.toLowerCase().includes(searchLower)) ||
          refund.refund_method.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Status filter
      if (statusFilter !== 'all' && refund.status.toLowerCase() !== statusFilter.toLowerCase()) {
        return false;
      }

      // Date range filter
      if (dateFilter !== 'all') {
        const refundDate = new Date(refund.created_at);
        const now = new Date();
        const daysDiff = Math.floor((now.getTime() - refundDate.getTime()) / (1000 * 60 * 60 * 24));

        switch (dateFilter) {
          case 'today':
            if (daysDiff > 0) return false;
            break;
          case 'week':
            if (daysDiff > 7) return false;
            break;
          case 'month':
            if (daysDiff > 30) return false;
            break;
          case 'quarter':
            if (daysDiff > 90) return false;
            break;
        }
      }

      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return dateB - dateA; // Most recent first
    })
    .slice(0, itemsPerPage);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin dark:text-white" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold dark:text-white">Refund Requests</h2>
          <p className="text-muted-foreground">Request refunds for your payments</p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Request Refund
        </Button>
      </div>

      {/* Success/Error Messages */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {/* Refund Request Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Submit Refund Request</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitRefund} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="payment-search">Search Payments</Label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="payment-search"
                    placeholder="Search by payment description or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="payment">Select Payment</Label>
                <Select value={selectedPayment} onValueChange={setSelectedPayment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a payment to refund" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredPayments.map((payment) => (
                      <SelectItem key={payment.id} value={payment.id}>
                        <div className="flex justify-between items-center w-full">
                          <span>{payment.description || `Payment ${payment.id.slice(-8)}`}</span>
                          <span className="ml-2 font-medium">{formatCurrency(payment.amount_cents)}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Refund Amount (USD)</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="Leave blank for full amount"
                    value={refundAmount}
                    onChange={(e) => setRefundAmount(e.target.value)}
                  />
                  {selectedPayment && (
                    <p className="text-xs text-muted-foreground">
                      Maximum: {formatCurrency(payments.find(p => p.id === selectedPayment)?.amount_cents || 0)}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason">Reason for Refund</Label>
                  <Select value={refundReason} onValueChange={setRefundReason}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select refund reason" />
                    </SelectTrigger>
                    <SelectContent>
                      {refundReasons.map((reason) => (
                        <SelectItem key={reason.value} value={reason.value}>
                          {reason.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="method">Refund Method</Label>
                <Select value={refundMethod} onValueChange={setRefundMethod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {refundMethods.map((method) => (
                      <SelectItem key={method.value} value={method.value}>
                        {method.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Additional Details (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Provide additional details about your refund request..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={submitting || !selectedPayment || !refundReason}
                >
                  {submitting ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Refund Request'
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Filter Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-750 border-b border-gray-200 dark:border-gray-600 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Filter className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Filter Refunds</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Search and filter refund requests</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="refund-search" className="text-sm font-medium">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="refund-search"
                  placeholder="Search refunds..."
                  value={refundSearchTerm}
                  onChange={(e) => setRefundSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status-filter" className="text-sm font-medium">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger id="status-filter">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date-filter" className="text-sm font-medium">Date Range</Label>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger id="date-filter">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">Last 7 Days</SelectItem>
                  <SelectItem value="month">Last 30 Days</SelectItem>
                  <SelectItem value="quarter">Last 90 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="items-per-page" className="text-sm font-medium">Items Per Page</Label>
              <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                <SelectTrigger id="items-per-page">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 items</SelectItem>
                  <SelectItem value="20">20 items</SelectItem>
                  <SelectItem value="50">50 items</SelectItem>
                  <SelectItem value="100">100 items</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredAndSortedRefunds.length}</span> of{' '}
              <span className="font-semibold text-gray-900 dark:text-white">{refundRequests.length}</span> refund requests
            </p>
          </div>
        </div>
      </div>

      {/* Refund Requests History - Desktop Table View */}
      <div className="hidden xl:block bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-750 border-b border-gray-200 dark:border-gray-600 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Refund History</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Track your refund requests</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          {filteredAndSortedRefunds.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No refund requests found
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Refund ID
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Reason
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Method
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date Requested
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredAndSortedRefunds.map((refund) => (
                  <tr
                    key={refund.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(refund.status)}
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {refund.id.slice(-8).toUpperCase()}
                          </div>
                          {refund.description && (
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                              {refund.description.length > 30
                                ? refund.description.substring(0, 30) + '...'
                                : refund.description}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-green-600 dark:text-green-400">
                        {formatCurrency(refund.amount_cents)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {refund.reason.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700 dark:text-gray-300">
                        {refund.refund_method.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getStatusBadgeVariant(refund.status)}>
                        {refund.status.toUpperCase()}
                      </Badge>
                      {refund.rejection_reason && (
                        <div className="text-xs text-red-600 dark:text-red-400 mt-1">
                          {refund.rejection_reason}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700 dark:text-gray-300">
                        {new Date(refund.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                      {refund.reviewed_at && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          Reviewed: {new Date(refund.reviewed_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Refund Requests History - Mobile Card View */}
      <div className="xl:hidden space-y-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-750 border-b border-gray-200 dark:border-gray-600 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">Refund History</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Track your refund requests</p>
              </div>
            </div>
          </div>

          <div className="p-4">
            {filteredAndSortedRefunds.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No refund requests found
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAndSortedRefunds.map((refund) => (
                  <Card key={refund.id} className="border-gray-200 dark:border-gray-700">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        {/* Header with status and amount */}
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(refund.status)}
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                Refund #{refund.id.slice(-8).toUpperCase()}
                              </div>
                              <Badge variant={getStatusBadgeVariant(refund.status)} className="mt-1">
                                {refund.status.toUpperCase()}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-600 dark:text-green-400">
                              {formatCurrency(refund.amount_cents)}
                            </div>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Reason:</span>
                            <span className="text-gray-900 dark:text-white font-medium">
                              {refund.reason.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Method:</span>
                            <span className="text-gray-900 dark:text-white">
                              {refund.refund_method.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Requested:</span>
                            <span className="text-gray-900 dark:text-white">
                              {new Date(refund.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                          {refund.reviewed_at && (
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500 dark:text-gray-400">Reviewed:</span>
                              <span className="text-gray-900 dark:text-white">
                                {new Date(refund.reviewed_at).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Description */}
                        {refund.description && (
                          <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {refund.description}
                            </p>
                          </div>
                        )}

                        {/* Rejection reason */}
                        {refund.rejection_reason && (
                          <div className="pt-2 border-t border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10 -mx-4 -mb-4 px-4 py-3">
                            <p className="text-sm font-medium text-red-600 dark:text-red-400">
                              Rejection Reason: {refund.rejection_reason}
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}