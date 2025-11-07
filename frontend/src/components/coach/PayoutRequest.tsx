'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Alert, AlertDescription } from '../ui/alert';
import { Badge } from '../ui/badge';
import {
  DollarSign,
  AlertCircle,
  CheckCircle,
  Clock,
  RefreshCw,
  Filter,
  Search,
  FileText,
  CalendarIcon
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { getApiUrl } from '@/lib/api';

interface PayoutRequest {
  id: string;
  coach_id: string;
  amount_cents: number;
  currency: string;
  status: string;
  payout_method: string;
  payout_date?: string;
  fees_cents: number;
  net_amount_cents: number;
  failure_reason?: string;
  created_at: string;
  metadata?: {
    payment_count?: number;
    rejection_reason?: string;
  };
}

interface PendingEarnings {
  totalEarnings: number;
  paymentCount: number;
}

interface CoachPayoutRequestProps {
  coachId: string;
}

export default function CoachPayoutRequest({ coachId }: CoachPayoutRequestProps) {
  const [pendingEarnings, setPendingEarnings] = useState<PendingEarnings>({ totalEarnings: 0, paymentCount: 0 });
  const [payoutRequests, setPayoutRequests] = useState<PayoutRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [useCustomAmount, setUseCustomAmount] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const fetchData = async () => {
    try {
      setLoading(true);
      const API_URL = getApiUrl();
      const token = localStorage.getItem('token');

      // Fetch pending earnings
      const earningsResponse = await fetch(`${API_URL}/api/billing/payouts/pending-earnings`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (earningsResponse.ok) {
        const earningsData = await earningsResponse.json();
        setPendingEarnings(earningsData);
      }

      // Fetch payout requests
      const payoutsResponse = await fetch(`${API_URL}/api/billing/payouts/my-requests`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (payoutsResponse.ok) {
        const payoutsData = await payoutsResponse.json();
        setPayoutRequests(payoutsData);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [coachId]);

  const handleSubmitPayout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (pendingEarnings.totalEarnings <= 0) {
      setError('No earnings available for payout');
      return;
    }

    // Validate custom amount if enabled
    let amountCents: number | undefined = undefined;
    if (useCustomAmount) {
      const amount = parseFloat(customAmount);
      if (isNaN(amount) || amount <= 0) {
        setError('Please enter a valid amount greater than zero');
        return;
      }
      amountCents = Math.round(amount * 100);

      if (amountCents > pendingEarnings.totalEarnings) {
        setError(`Amount cannot exceed available earnings: ${formatCurrency(pendingEarnings.totalEarnings)}`);
        return;
      }
    }

    try {
      setSubmitting(true);
      setError(null);
      setSuccess(null);

      const API_URL = getApiUrl();
      const token = localStorage.getItem('token');

      const response = await fetch(`${API_URL}/api/billing/payouts/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          notes: notes || undefined,
          amount_cents: amountCents
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit payout request');
      }

      const payoutData = await response.json();
      setSuccess(`Payout request submitted successfully! Amount: ${formatCurrency(payoutData.amount_cents)}`);

      // Reset form
      setNotes('');
      setCustomAmount('');
      setUseCustomAmount(false);

      // Refresh data
      await fetchData();

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit payout request');
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
        return 'default';
      case 'pending':
      case 'processing':
        return 'secondary';
      case 'failed':
      case 'rejected':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
      case 'processing':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'failed':
      case 'rejected':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  // Apply filters to payout requests
  const filteredAndSortedPayouts = [...payoutRequests]
    .filter(payout => {
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
          payout.id.toLowerCase().includes(searchLower) ||
          payout.payout_method.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Status filter
      if (statusFilter !== 'all' && payout.status.toLowerCase() !== statusFilter.toLowerCase()) {
        return false;
      }

      // Date range filter
      if (dateFilter !== 'all') {
        const payoutDate = new Date(payout.created_at);
        const now = new Date();
        const daysDiff = Math.floor((now.getTime() - payoutDate.getTime()) / (1000 * 60 * 60 * 24));

        switch (dateFilter) {
          case '7days':
            if (daysDiff > 7) return false;
            break;
          case '30days':
            if (daysDiff > 30) return false;
            break;
          case '90days':
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
      {/* Available Balance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Pending Earnings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-600">
            {formatCurrency(pendingEarnings.totalEarnings)}
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            From {pendingEarnings.paymentCount} completed payment{pendingEarnings.paymentCount !== 1 ? 's' : ''}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Available for withdrawal
          </p>
        </CardContent>
      </Card>

      {/* Payout Request Form */}
      <Card>
        <CardHeader>
          <CardTitle>Request Payout</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className="mb-4" variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-4">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmitPayout} className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-medium text-blue-900">
                {useCustomAmount ? 'You will request a custom payout amount:' : 'You will request a payout for your full pending balance:'}
              </p>
              <p className="text-2xl font-bold text-blue-900 mt-2">
                {useCustomAmount && customAmount ? formatCurrency(Math.round(parseFloat(customAmount) * 100)) : formatCurrency(pendingEarnings.totalEarnings)}
              </p>
              <p className="text-xs text-blue-700 mt-1">
                {useCustomAmount ? `From available balance: ${formatCurrency(pendingEarnings.totalEarnings)}` : `${pendingEarnings.paymentCount} payment${pendingEarnings.paymentCount !== 1 ? 's' : ''} will be included`}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="useCustomAmount"
                  checked={useCustomAmount}
                  onChange={(e) => {
                    setUseCustomAmount(e.target.checked);
                    if (!e.target.checked) {
                      setCustomAmount('');
                    }
                  }}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor="useCustomAmount" className="font-normal cursor-pointer">
                  Request a custom amount (partial payout)
                </Label>
              </div>

              {useCustomAmount && (
                <div className="space-y-2 pl-6">
                  <Label htmlFor="customAmount">Amount (USD)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      id="customAmount"
                      step="0.01"
                      min="0.01"
                      max={(pendingEarnings.totalEarnings / 100).toFixed(2)}
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required={useCustomAmount}
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    Maximum: {formatCurrency(pendingEarnings.totalEarnings)}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any notes about this payout request..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>

            <Button
              type="submit"
              disabled={submitting || pendingEarnings.totalEarnings <= 0}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-5 text-base"
            >
              {submitting ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Payout Request'
              )}
            </Button>

            {pendingEarnings.totalEarnings <= 0 && (
              <p className="text-sm text-muted-foreground text-center">
                No earnings available. Complete sessions to earn money.
              </p>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Filter Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-750 border-b border-gray-200 dark:border-gray-600 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Filter className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Filter Payouts</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Search and filter payout records</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Payouts */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Search className="h-4 w-4" />
                Search Payouts
              </label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search by ID or method..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-3 pr-3 py-2"
                />
              </div>
            </div>

            {/* Per Page */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Per Page
              </label>
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(value) => setItemsPerPage(parseInt(value))}
              >
                <SelectTrigger className="w-full">
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

            {/* Status Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Status
              </label>
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                Date Range
              </label>
              <Select
                value={dateFilter}
                onValueChange={setDateFilter}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="7days">Last 7 Days</SelectItem>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="90days">Last 90 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Showing results */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredAndSortedPayouts.length}</span> of{' '}
              <span className="font-semibold text-gray-900 dark:text-white">{payoutRequests.length}</span> payout requests
            </p>
          </div>
        </div>
      </div>

      {/* Recent Payout Requests */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Payout History</h2>
        </div>

        {/* Desktop Table View */}
        <div className="hidden xl:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Payout ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Net Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredAndSortedPayouts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No payout requests found</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Your payout history will appear here
                    </p>
                  </td>
                </tr>
              ) : (
                filteredAndSortedPayouts.map((payout) => (
                  <tr key={payout.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white font-medium">
                        {payout.id.slice(0, 8)}...
                      </div>
                      {payout.metadata?.payment_count && (
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {payout.metadata.payment_count} payment{payout.metadata.payment_count !== 1 ? 's' : ''}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white">
                        Bank Transfer
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatCurrency(payout.amount_cents)}
                      </div>
                      {payout.fees_cents > 0 && (
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Fee: {formatCurrency(payout.fees_cents)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-green-600 dark:text-green-400">
                        {formatCurrency(payout.net_amount_cents)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        payout.status.toLowerCase() === 'completed' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                        payout.status.toLowerCase() === 'pending' || payout.status.toLowerCase() === 'processing' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' :
                        payout.status.toLowerCase() === 'failed' || payout.status.toLowerCase() === 'rejected' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' :
                        'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300'
                      }`}>
                        {payout.status}
                      </span>
                      {payout.status === 'rejected' && payout.metadata?.rejection_reason && (
                        <div className="text-xs text-red-600 dark:text-red-400 mt-1">
                          {payout.metadata.rejection_reason}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(payout.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="xl:hidden divide-y divide-gray-200 dark:divide-gray-700">
          {filteredAndSortedPayouts.length === 0 ? (
            <div className="p-8 text-center">
              <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No payout requests found</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Your payout history will appear here
              </p>
            </div>
          ) : (
            filteredAndSortedPayouts.map((payout) => (
              <div key={`mobile-${payout.id}`} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="space-y-3">
                  {/* Header with Status and Amount */}
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      payout.status.toLowerCase() === 'completed' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                      payout.status.toLowerCase() === 'pending' || payout.status.toLowerCase() === 'processing' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' :
                      payout.status.toLowerCase() === 'failed' || payout.status.toLowerCase() === 'rejected' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' :
                      'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300'
                    }`}>
                      {payout.status}
                    </span>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">
                        {formatCurrency(payout.amount_cents)}
                      </div>
                      <div className="text-xs text-green-600 dark:text-green-400">
                        Net: {formatCurrency(payout.net_amount_cents)}
                      </div>
                    </div>
                  </div>

                  {/* Payout ID */}
                  <div>
                    <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Payout ID</div>
                    <div className="text-sm font-mono text-gray-900 dark:text-white">
                      {payout.id.slice(0, 8)}...
                    </div>
                  </div>

                  {/* Method and Details */}
                  <div>
                    <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Method</div>
                    <div className="text-sm text-gray-900 dark:text-white">Bank Transfer</div>
                    {payout.metadata?.payment_count && (
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {payout.metadata.payment_count} payment{payout.metadata.payment_count !== 1 ? 's' : ''}
                      </div>
                    )}
                  </div>

                  {/* Rejection Reason */}
                  {payout.status === 'rejected' && payout.metadata?.rejection_reason && (
                    <div className="text-sm text-red-600 dark:text-red-400 p-2 bg-red-50 dark:bg-red-900/20 rounded">
                      Reason: {payout.metadata.rejection_reason}
                    </div>
                  )}

                  {/* Footer with Date */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(payout.created_at).toLocaleDateString()}
                    </div>
                    {payout.fees_cents > 0 && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Fee: {formatCurrency(payout.fees_cents)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
