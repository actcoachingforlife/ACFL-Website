'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { getApiUrl } from '@/lib/api';
import {
  TrendingUp,
  Clock,
  Download,
  Filter,
  RefreshCw,
  AlertCircle,
  History,
  Search,
  FileText,
  Calendar as CalendarIcon,
  DollarSign
} from 'lucide-react';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface BillingTransaction {
  id: string;
  transaction_type: string;
  amount_cents: number;
  currency: string;
  status: string;
  description: string;
  created_at: string;
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
}

interface BillingReport {
  period_start: Date;
  period_end: Date;
  total_revenue_cents: number;
  total_refunds_cents: number;
  total_fees_cents: number;
  net_revenue_cents: number;
  transaction_count: number;
  refund_count: number;
  average_transaction_cents: number;
  refund_rate_percentage: number;
}

interface BillingDashboardData {
  recent_transactions: BillingTransaction[];
  monthly_summary: BillingReport;
  pending_refunds: RefundRequest[];

}

interface ClientBillingDashboardProps {
  clientId: string;
  onNavigateToRefunds?: () => void;
  onNavigateToHistory?: () => void;
}

export default function ClientBillingDashboard({ clientId, onNavigateToRefunds, onNavigateToHistory }: ClientBillingDashboardProps) {
  const [dashboardData, setDashboardData] = useState<BillingDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states for Recent Transactions
  const [transactionSearchTerm, setTransactionSearchTerm] = useState('');
  const [transactionItemsPerPage, setTransactionItemsPerPage] = useState(20);
  const [transactionStatusFilter, setTransactionStatusFilter] = useState('all');
  const [transactionDateFilter, setTransactionDateFilter] = useState('all');

  // Filter states for Pending Refunds
  const [refundSearchTerm, setRefundSearchTerm] = useState('');
  const [refundItemsPerPage, setRefundItemsPerPage] = useState(20);
  const [refundStatusFilter, setRefundStatusFilter] = useState('all');
  const [refundDateFilter, setRefundDateFilter] = useState('all');

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const API_URL = getApiUrl();
      const response = await fetch(`${API_URL}/api/billing/dashboard/${clientId}/client`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Server error: ${response.status}`);
      }

      const data = await response.json();

      // Ensure data has the expected structure
      const normalizedData = {
        recent_transactions: data.recent_transactions || [],
        monthly_summary: data.monthly_summary || {
          total_revenue_cents: 0,
          total_refunds_cents: 0,
          total_fees_cents: 0,
          net_revenue_cents: 0,
          transaction_count: 0,
          refund_count: 0,
          average_transaction_cents: 0,
          refund_rate_percentage: 0
        },
        pending_refunds: data.pending_refunds || []
      };

      setDashboardData(normalizedData);
    } catch (err) {
      console.error('Error fetching billing data:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (clientId) {
      fetchDashboardData();
    }
  }, [clientId]);

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

  const getTransactionTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'payment':
        return 'text-red-600'; // Outgoing payment
      case 'refund':
        return 'text-green-600'; // Incoming refund
      default:
        return 'text-gray-600';
    }
  };

  const handleExportMonthlySummary = () => {
    if (!dashboardData) return;

    const summary = dashboardData.monthly_summary;
    const now = new Date();
    const monthYear = `${now.toLocaleString('default', { month: 'long' })} ${now.getFullYear()}`;

    // Create CSV content
    const csvContent = [
      ['Monthly Billing Summary', monthYear],
      [''],
      ['Metric', 'Value'],
      ['Total Payments', formatCurrency(summary.total_revenue_cents)],
      ['Refunds Received', formatCurrency(summary.total_refunds_cents)],
      ['Net Spending', formatCurrency(summary.total_revenue_cents - summary.total_refunds_cents)],
      ['Average Payment', formatCurrency(summary.average_transaction_cents)],
      ['Transaction Count', summary.transaction_count.toString()],
      ['Refund Count', summary.refund_count.toString()],
      [''],
      ['Recent Transactions'],
      ['Date', 'Type', 'Description', 'Amount', 'Status'],
      ...dashboardData.recent_transactions.map(t => [
        new Date(t.created_at).toLocaleDateString(),
        t.transaction_type,
        t.description,
        formatCurrency(t.amount_cents),
        t.status
      ])
    ].map(row => row.join(',')).join('\n');

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `billing-summary-${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin dark:text-white" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <Button onClick={fetchDashboardData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      </Card>
    );
  }

  if (!dashboardData) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Refunds</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardData.pending_refunds.length}
            </div>
            <div className="text-xs text-muted-foreground">
              {dashboardData.pending_refunds.length > 0 && (
                <span>
                  {formatCurrency(
                    dashboardData.pending_refunds.reduce((sum, refund) => sum + refund.amount_cents, 0)
                  )} total
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Spending</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(Math.abs(dashboardData.monthly_summary.total_revenue_cents))}
            </div>
            <p className="text-xs text-muted-foreground">
              {dashboardData.monthly_summary.transaction_count} transactions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Monthly Summary
            <Button variant="outline" size="sm" onClick={handleExportMonthlySummary}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Payments</p>
              <p className="text-lg font-semibold text-red-600">
                {formatCurrency(dashboardData.monthly_summary.total_revenue_cents)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Refunds Received</p>
              <p className="text-lg font-semibold text-green-600">
                {formatCurrency(dashboardData.monthly_summary.total_refunds_cents)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Average Payment</p>
              <p className="text-lg font-semibold">
                {formatCurrency(dashboardData.monthly_summary.average_transaction_cents)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Net Spending</p>
              <p className="text-lg font-semibold">
                {formatCurrency(
                  dashboardData.monthly_summary.total_revenue_cents -
                  dashboardData.monthly_summary.total_refunds_cents
                )}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pending Refunds */}
      {dashboardData.pending_refunds.length > 0 && (
        <>
          {/* Filter Section for Pending Refunds */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-750 border-b border-gray-200 dark:border-gray-600 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Filter className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">Filter Pending Refunds</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Search and filter refund requests</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Search */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Search refunds..."
                      value={refundSearchTerm}
                      onChange={(e) => setRefundSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Items Per Page */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Show</label>
                  <Select value={refundItemsPerPage.toString()} onValueChange={(value) => setRefundItemsPerPage(Number(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10 per page</SelectItem>
                      <SelectItem value="20">20 per page</SelectItem>
                      <SelectItem value="50">50 per page</SelectItem>
                      <SelectItem value="100">100 per page</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Status Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                  <Select value={refundStatusFilter} onValueChange={setRefundStatusFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Date Range */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Date Range</label>
                  <Select value={refundDateFilter} onValueChange={setRefundDateFilter}>
                    <SelectTrigger>
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
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Showing <span className="font-semibold text-gray-900 dark:text-white">{dashboardData.pending_refunds.length}</span> refund{dashboardData.pending_refunds.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>

          {/* Pending Refunds Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                Pending Refunds
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Desktop Table View */}
              <div className="hidden xl:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-900/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Refund ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Reason
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Method
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Date Requested
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {dashboardData.pending_refunds.map((refund) => (
                      <tr key={refund.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {refund.id.substring(0, 8)}...
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">
                          {formatCurrency(refund.amount_cents)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                          <div>
                            <div className="font-medium capitalize">{refund.reason.replace(/_/g, ' ')}</div>
                            {refund.description && (
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{refund.description}</div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white capitalize">
                          {refund.refund_method.replace(/_/g, ' ')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant={getStatusBadgeVariant(refund.status)}>
                            {refund.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {new Date(refund.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="xl:hidden divide-y divide-gray-200 dark:divide-gray-700">
                {dashboardData.pending_refunds.map((refund) => (
                  <div key={refund.id} className="py-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400">REFUND ID</div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{refund.id.substring(0, 8)}...</div>
                      </div>
                      <Badge variant={getStatusBadgeVariant(refund.status)}>
                        {refund.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400">AMOUNT</div>
                        <div className="text-sm font-bold text-green-600">{formatCurrency(refund.amount_cents)}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400">METHOD</div>
                        <div className="text-sm text-gray-900 dark:text-white capitalize">{refund.refund_method.replace(/_/g, ' ')}</div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-xs font-medium text-gray-500 dark:text-gray-400">REASON</div>
                      <div className="text-sm text-gray-900 dark:text-white capitalize">{refund.reason.replace(/_/g, ' ')}</div>
                      {refund.description && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{refund.description}</div>
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="text-xs font-medium text-gray-500 dark:text-gray-400">DATE REQUESTED</div>
                      <div className="text-sm text-gray-900 dark:text-white">{new Date(refund.created_at).toLocaleDateString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Recent Transactions */}
      {/* Filter Section for Recent Transactions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-750 border-b border-gray-200 dark:border-gray-600 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Filter className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Filter Transactions</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Search and filter financial records</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search transactions..."
                  value={transactionSearchTerm}
                  onChange={(e) => setTransactionSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Items Per Page */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Show</label>
              <Select value={transactionItemsPerPage.toString()} onValueChange={(value) => setTransactionItemsPerPage(Number(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 per page</SelectItem>
                  <SelectItem value="20">20 per page</SelectItem>
                  <SelectItem value="50">50 per page</SelectItem>
                  <SelectItem value="100">100 per page</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
              <Select value={transactionStatusFilter} onValueChange={setTransactionStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Date Range</label>
              <Select value={transactionDateFilter} onValueChange={setTransactionDateFilter}>
                <SelectTrigger>
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
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing <span className="font-semibold text-gray-900 dark:text-white">{dashboardData.recent_transactions.length}</span> transaction{dashboardData.recent_transactions.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Recent Transactions
            {onNavigateToHistory && (
              <Button variant="outline" size="sm" onClick={onNavigateToHistory}>
                <History className="h-4 w-4 mr-2" />
                View All
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Desktop Table View */}
          <div className="hidden xl:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Amount
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
                {dashboardData.recent_transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {transaction.id.substring(0, 8)}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium capitalize ${getTransactionTypeColor(transaction.transaction_type)}`}>
                        {transaction.transaction_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {transaction.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-bold ${getTransactionTypeColor(transaction.transaction_type)}`}>
                        {transaction.transaction_type === 'payment' ? '-' : '+'}
                        {formatCurrency(transaction.amount_cents)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getStatusBadgeVariant(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(transaction.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="xl:hidden divide-y divide-gray-200 dark:divide-gray-700">
            {dashboardData.recent_transactions.map((transaction) => (
              <div key={transaction.id} className="py-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="text-xs font-medium text-gray-500 dark:text-gray-400">TRANSACTION ID</div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{transaction.id.substring(0, 8)}...</div>
                  </div>
                  <Badge variant={getStatusBadgeVariant(transaction.status)}>
                    {transaction.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <div className="text-xs font-medium text-gray-500 dark:text-gray-400">TYPE</div>
                    <div className={`text-sm font-medium capitalize ${getTransactionTypeColor(transaction.transaction_type)}`}>
                      {transaction.transaction_type}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-medium text-gray-500 dark:text-gray-400">AMOUNT</div>
                    <div className={`text-sm font-bold ${getTransactionTypeColor(transaction.transaction_type)}`}>
                      {transaction.transaction_type === 'payment' ? '-' : '+'}
                      {formatCurrency(transaction.amount_cents)}
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-medium text-gray-500 dark:text-gray-400">DESCRIPTION</div>
                  <div className="text-sm text-gray-900 dark:text-white">{transaction.description}</div>
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-medium text-gray-500 dark:text-gray-400">DATE</div>
                  <div className="text-sm text-gray-900 dark:text-white">{new Date(transaction.created_at).toLocaleDateString()}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              className="h-16 flex flex-col items-center justify-center gap-2"
              variant="outline"
              onClick={onNavigateToHistory}
            >
              <History className="h-5 w-5" />
              <span>View All Transactions</span>
            </Button>
            <Button
              className="h-16 flex flex-col items-center justify-center gap-2"
              variant="outline"
              onClick={onNavigateToRefunds}
            >
              <AlertCircle className="h-5 w-5" />
              <span>Request Refund</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}