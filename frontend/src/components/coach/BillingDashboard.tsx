'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import {
  DollarSign,
  TrendingUp,
  Clock,
  Download,
  Filter,
  RefreshCw,
  Eye,
  X,
  Search,
  FileText,
  Calendar as CalendarIcon
} from 'lucide-react';
import { getApiUrl } from '@/lib/api';

interface BillingTransaction {
  id: string;
  transaction_type: string;
  amount_cents: number;
  currency: string;
  status: string;
  description: string;
  created_at: string;
  client?: {
    first_name: string;
    last_name: string;
    email: string;
  };
  coach?: {
    first_name: string;
    last_name: string;
    email: string;
  };
  payment_method?: string;
  client_id?: string;
  coach_id?: string;
  client_name?: string;
  coach_name?: string;
  client_email?: string;
  coach_email?: string;
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
  current_balance_cents: number;
  pending_payouts_cents?: number;
  recent_transactions: BillingTransaction[];
  monthly_summary: BillingReport;
  pending_refunds: any[];
}

interface CoachBillingDashboardProps {
  coachId: string;
}

export default function CoachBillingDashboard({ coachId }: CoachBillingDashboardProps) {
  const [dashboardData, setDashboardData] = useState<BillingDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<BillingTransaction | null>(null);
  const [showTransactionModal, setShowTransactionModal] = useState(false);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const API_URL = getApiUrl();
      const response = await fetch(`${API_URL}/api/billing/dashboard/${coachId}/coach`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch billing data');
      }

      const data = await response.json();
      setDashboardData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [coachId]);

  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(cents / 100);
  };

  const getClientName = (transaction: BillingTransaction): string => {
    if (transaction.client) {
      return `${transaction.client.first_name} ${transaction.client.last_name}`;
    }
    if (transaction.client_name) {
      return transaction.client_name;
    }
    return 'N/A';
  };

  const getClientEmail = (transaction: BillingTransaction): string => {
    if (transaction.client?.email) {
      return transaction.client.email;
    }
    if (transaction.client_email) {
      return transaction.client_email;
    }
    return 'N/A';
  };

  const getCoachName = (transaction: BillingTransaction): string => {
    if (transaction.coach) {
      return `${transaction.coach.first_name} ${transaction.coach.last_name}`;
    }
    if (transaction.coach_name) {
      return transaction.coach_name;
    }
    return 'N/A';
  };

  const getCoachEmail = (transaction: BillingTransaction): string => {
    if (transaction.coach?.email) {
      return transaction.coach.email;
    }
    if (transaction.coach_email) {
      return transaction.coach_email;
    }
    return 'N/A';
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'failed':
      case 'cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getTransactionTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'payment':
        return 'text-green-600 dark:text-green-400';
      case 'payout':
        return 'text-blue-600 dark:text-blue-400';
      case 'refund':
        return 'text-red-600 dark:text-red-400';
      case 'fee':
        return 'text-orange-600 dark:text-orange-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  // Apply filters to transactions
  const filteredTransactions = dashboardData?.recent_transactions
    ? [...dashboardData.recent_transactions]
        .filter(transaction => {
          // Search filter
          if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            const clientName = getClientName(transaction).toLowerCase();
            const coachName = getCoachName(transaction).toLowerCase();
            const matchesSearch =
              transaction.id.toLowerCase().includes(searchLower) ||
              transaction.description.toLowerCase().includes(searchLower) ||
              clientName.includes(searchLower) ||
              coachName.includes(searchLower);
            if (!matchesSearch) return false;
          }

          // Status filter
          if (statusFilter !== 'all' && transaction.status.toLowerCase() !== statusFilter.toLowerCase()) {
            return false;
          }

          // Date range filter
          if (dateFilter !== 'all') {
            const transactionDate = new Date(transaction.created_at);
            const now = new Date();
            const daysDiff = Math.floor((now.getTime() - transactionDate.getTime()) / (1000 * 60 * 60 * 24));

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
        .slice(0, itemsPerPage)
    : [];

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
          <p className="text-red-600 dark:text-red-400 mb-4">Error: {error}</p>
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
            <CardTitle className="text-sm font-medium">Monthly Earnings</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(dashboardData.monthly_summary.net_revenue_cents)}
            </div>
            <p className="text-xs text-muted-foreground">
              {dashboardData.monthly_summary.transaction_count} transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(dashboardData.current_balance_cents)}
            </div>
            <p className="text-xs text-muted-foreground">
              Lifetime earnings
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Monthly Summary
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Gross Revenue</p>
              <p className="text-lg font-semibold">
                {formatCurrency(dashboardData.monthly_summary.total_revenue_cents)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Refunds</p>
              <p className="text-lg font-semibold text-red-600 dark:text-red-400">
                {formatCurrency(dashboardData.monthly_summary.total_refunds_cents)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Platform Fees</p>
              <p className="text-lg font-semibold text-orange-600 dark:text-orange-400">
                {formatCurrency(dashboardData.monthly_summary.total_fees_cents)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Net Earnings</p>
              <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                {formatCurrency(dashboardData.monthly_summary.net_revenue_cents)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 mb-6 overflow-hidden">
        {/* Filter Header */}
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

        {/* Filter Controls */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="lg:col-span-1">
              <label htmlFor="transaction-search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span>Search Transactions</span>
                </div>
              </label>
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 transition-transform duration-200 group-hover:scale-110" />
                <input
                  id="transaction-search"
                  type="text"
                  placeholder="Search by client, coach, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-sm hover:border-blue-400 dark:hover:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 transform hover:scale-[1.01] focus:scale-[1.01]"
                />
              </div>
            </div>

            {/* Items Per Page */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span>Per Page</span>
                </div>
              </label>
              <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                <SelectTrigger className="w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                  <SelectValue placeholder="Select items per page" />
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
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span>Status</span>
                </div>
              </label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="succeeded">Succeeded</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span>Date Range</span>
                </div>
              </label>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                  <SelectValue placeholder="Select date range" />
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

          {/* Showing Results */}
          <div className="flex items-center gap-2 pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
            <FileText className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredTransactions.length}</span> of <span className="font-semibold text-gray-900 dark:text-white">{dashboardData?.recent_transactions.length || 0}</span>
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Total transactions
            </span>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Transactions</h2>
        </div>

        {/* Desktop Table View */}
        <div className="hidden xl:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Transaction
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No transactions found</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Your recent transactions will appear here
                    </p>
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white font-medium">
                        {transaction.id.slice(0, 8)}...
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {transaction.payment_method || 'card'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                        transaction.transaction_type.toLowerCase() === 'payment' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                        transaction.transaction_type.toLowerCase() === 'payout' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' :
                        transaction.transaction_type.toLowerCase() === 'refund' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' :
                        transaction.transaction_type.toLowerCase() === 'fee' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300' :
                        'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300'
                      }`}>
                        {transaction.transaction_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatCurrency(transaction.amount_cents)}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {transaction.currency}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        transaction.status.toLowerCase() === 'completed' || transaction.status.toLowerCase() === 'succeeded' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                        transaction.status.toLowerCase() === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' :
                        transaction.status.toLowerCase() === 'failed' || transaction.status.toLowerCase() === 'cancelled' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' :
                        'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(transaction.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => {
                          setSelectedTransaction(transaction);
                          setShowTransactionModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400 p-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="xl:hidden divide-y divide-gray-200 dark:divide-gray-700">
          {filteredTransactions.length === 0 ? (
            <div className="p-8 text-center">
              <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No transactions found</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Your recent transactions will appear here
              </p>
            </div>
          ) : (
            filteredTransactions.map((transaction) => (
              <div key={`mobile-${transaction.id}`} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="space-y-3">
                  {/* Header with Status and Amount */}
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      transaction.status.toLowerCase() === 'completed' || transaction.status.toLowerCase() === 'succeeded' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                      transaction.status.toLowerCase() === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' :
                      transaction.status.toLowerCase() === 'failed' || transaction.status.toLowerCase() === 'cancelled' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' :
                      'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300'
                    }`}>
                      {transaction.status}
                    </span>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">
                        {formatCurrency(transaction.amount_cents)}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {transaction.currency}
                      </div>
                    </div>
                  </div>

                  {/* Transaction ID */}
                  <div>
                    <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Transaction ID</div>
                    <div className="text-sm font-mono text-gray-900 dark:text-white break-all">
                      {transaction.id}
                    </div>
                  </div>

                  {/* Type Information */}
                  <div>
                    <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Type</div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                      transaction.transaction_type.toLowerCase() === 'payment' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                      transaction.transaction_type.toLowerCase() === 'payout' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' :
                      transaction.transaction_type.toLowerCase() === 'refund' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' :
                      transaction.transaction_type.toLowerCase() === 'fee' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300' :
                      'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300'
                    }`}>
                      {transaction.transaction_type}
                    </span>
                  </div>

                  {/* Footer with Date and Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(transaction.created_at).toLocaleDateString()}
                    </div>
                    <button
                      onClick={() => {
                        setSelectedTransaction(transaction);
                        setShowTransactionModal(true);
                      }}
                      className="inline-flex items-center px-3 py-1 text-xs font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 dark:text-blue-400 dark:hover:text-blue-300 rounded-full transition-colors"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Transaction Details Modal */}
      {showTransactionModal && selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6 overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl my-8 mx-auto relative">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Transaction Details
              </h3>
              <button
                onClick={() => {
                  setShowTransactionModal(false);
                  setSelectedTransaction(null);
                }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4">
              <div className="space-y-4">
                {/* Transaction Overview */}
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Transaction Overview</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Transaction ID</p>
                      <p className="font-mono text-sm text-gray-900 dark:text-white break-all">{selectedTransaction.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        selectedTransaction.status.toLowerCase() === 'completed' || selectedTransaction.status.toLowerCase() === 'succeeded' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                        selectedTransaction.status.toLowerCase() === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' :
                        selectedTransaction.status.toLowerCase() === 'failed' || selectedTransaction.status.toLowerCase() === 'cancelled' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' :
                        'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300'
                      }`}>
                        {selectedTransaction.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Type</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                        selectedTransaction.transaction_type.toLowerCase() === 'payment' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                        selectedTransaction.transaction_type.toLowerCase() === 'payout' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' :
                        selectedTransaction.transaction_type.toLowerCase() === 'refund' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' :
                        selectedTransaction.transaction_type.toLowerCase() === 'fee' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300' :
                        'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300'
                      }`}>
                        {selectedTransaction.transaction_type}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                      <p className="text-sm text-gray-900 dark:text-white">
                        {new Date(selectedTransaction.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Amount Information */}
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Amount Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Amount</p>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">
                        {formatCurrency(selectedTransaction.amount_cents)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Currency</p>
                      <p className="text-sm text-gray-900 dark:text-white uppercase">{selectedTransaction.currency}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Payment Method</p>
                      <p className="text-sm text-gray-900 dark:text-white capitalize">{selectedTransaction.payment_method || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Client Information */}
                {(selectedTransaction.client || selectedTransaction.client_name) && (
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Client Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                        <p className="text-sm text-gray-900 dark:text-white">
                          {getClientName(selectedTransaction)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                        <p className="text-sm text-gray-900 dark:text-white break-words">
                          {getClientEmail(selectedTransaction)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Coach Information */}
                {(selectedTransaction.coach || selectedTransaction.coach_name) && (
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Coach Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                        <p className="text-sm text-gray-900 dark:text-white">
                          {getCoachName(selectedTransaction)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                        <p className="text-sm text-gray-900 dark:text-white break-words">
                          {getCoachEmail(selectedTransaction)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Description */}
                {selectedTransaction.description && (
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Description</h4>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {selectedTransaction.description}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 p-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => {
                  setShowTransactionModal(false);
                  setSelectedTransaction(null);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}