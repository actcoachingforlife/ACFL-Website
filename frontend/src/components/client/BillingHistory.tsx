'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { getApiUrl } from '@/lib/api';
import {
  CalendarIcon,
  Download,
  Filter,
  Search,
  RefreshCw,
  ArrowUpDown,
  FileText,
  DollarSign
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../../lib/utils';

interface BillingTransaction {
  id: string;
  transaction_type: string;
  amount_cents: number;
  currency: string;
  status: string;
  description: string;
  reference_id?: string;
  reference_type?: string;
  created_at: string;
  updated_at: string;
}

interface TransactionFilters {
  start_date?: Date;
  end_date?: Date;
  transaction_types?: string[];
  status?: string[];
  min_amount_cents?: number;
  max_amount_cents?: number;
  search_term?: string;
}

interface ClientBillingHistoryProps {
  clientId: string;
}

export default function ClientBillingHistory({ clientId }: ClientBillingHistoryProps) {
  const [transactions, setTransactions] = useState<BillingTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Filter states
  const [filters, setFilters] = useState<TransactionFilters>({});
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const transactionTypes = ['payment', 'refund', 'fee'];
  const statusOptions = ['pending', 'completed', 'failed', 'cancelled'];

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();

      if (filters.start_date) queryParams.append('start_date', filters.start_date.toISOString());
      if (filters.end_date) queryParams.append('end_date', filters.end_date.toISOString());
      if (filters.transaction_types?.length) queryParams.append('transaction_types', filters.transaction_types.join(','));
      if (filters.status?.length) queryParams.append('status', filters.status.join(','));
      if (filters.min_amount_cents) queryParams.append('min_amount_cents', filters.min_amount_cents.toString());
      if (filters.max_amount_cents) queryParams.append('max_amount_cents', filters.max_amount_cents.toString());
      if (filters.search_term) queryParams.append('search_term', filters.search_term);

      const API_URL = getApiUrl();
      const response = await fetch(`${API_URL}/api/billing/transactions/${clientId}/client?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch transaction history');
      }

      const data = await response.json();
      setTransactions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [clientId, filters]);

  const applyFilters = () => {
    const newFilters: TransactionFilters = {
      start_date: startDate,
      end_date: endDate,
      search_term: searchTerm || undefined,
      transaction_types: selectedTypes.length > 0 ? selectedTypes : undefined,
      status: selectedStatuses.length > 0 ? selectedStatuses : undefined,
      min_amount_cents: minAmount ? parseFloat(minAmount) * 100 : undefined,
      max_amount_cents: maxAmount ? parseFloat(maxAmount) * 100 : undefined,
    };
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setSearchTerm('');
    setSelectedTypes([]);
    setSelectedStatuses([]);
    setMinAmount('');
    setMaxAmount('');
    setFilters({});
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
        return 'secondary';
      case 'failed':
      case 'cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'payment':
        return '💳';
      case 'refund':
        return '↩️';
      case 'fee':
        return '🏦';
      default:
        return '📄';
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'payment':
        return 'text-red-600'; // Outgoing
      case 'refund':
        return 'text-green-600'; // Incoming
      default:
        return 'text-gray-600';
    }
  };

  const exportTransactions = () => {
    const csvContent = [
      ['Date', 'Type', 'Description', 'Amount', 'Status'].join(','),
      ...transactions.map(t => [
        format(new Date(t.created_at), 'yyyy-MM-dd'),
        t.transaction_type,
        `"${t.description}"`,
        (t.amount_cents / 100).toString(),
        t.status
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `billing-history-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Apply filters and sorting
  const filteredAndSortedTransactions = [...transactions]
    .filter(transaction => {
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
          transaction.id.toLowerCase().includes(searchLower) ||
          transaction.description.toLowerCase().includes(searchLower) ||
          transaction.transaction_type.toLowerCase().includes(searchLower);
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
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    })
    .slice(0, itemsPerPage);

  const sortedTransactions = filteredAndSortedTransactions;

  if (loading && !transactions.length) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin dark:text-white" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-750 border-b border-gray-200 dark:border-gray-600 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Filter className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Filter Payment History</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Search and filter transaction records</p>
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Items Per Page */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Show</label>
              <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
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
              <Select value={statusFilter} onValueChange={setStatusFilter}>
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
              <Select value={dateFilter} onValueChange={setDateFilter}>
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

          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing <span className="font-semibold text-gray-900 dark:text-white">{sortedTransactions.length}</span> transaction{sortedTransactions.length !== 1 ? 's' : ''}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={exportTransactions}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={fetchTransactions}
                disabled={loading}
                className="flex items-center gap-2"
              >
                <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Payment History ({sortedTransactions.length})
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
            className="flex items-center gap-1"
          >
            <ArrowUpDown className="h-4 w-4" />
            Date {sortOrder === 'desc' ? '↓' : '↑'}
          </Button>
        </div>

        {error && (
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">Error: {error}</p>
            <Button onClick={fetchTransactions}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        )}

        {!error && (
          <>
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
                  {sortedTransactions.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center">
                        <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No transactions found</h3>
                        <p className="text-gray-500 dark:text-gray-400">
                          Your transaction history will appear here
                        </p>
                      </td>
                    </tr>
                  ) : (
                    sortedTransactions.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {transaction.id.substring(0, 8)}...
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={cn("text-sm font-medium capitalize", getTransactionColor(transaction.transaction_type))}>
                            {transaction.transaction_type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                          {transaction.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={cn("text-sm font-bold", getTransactionColor(transaction.transaction_type))}>
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
                          {format(new Date(transaction.created_at), 'PPP')}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="xl:hidden divide-y divide-gray-200 dark:divide-gray-700">
              {sortedTransactions.length === 0 ? (
                <div className="p-8 text-center">
                  <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No transactions found</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Your transaction history will appear here
                  </p>
                </div>
              ) : (
                sortedTransactions.map((transaction) => (
                  <div key={transaction.id} className="py-4 px-6 space-y-3">
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
                        <div className={cn("text-sm font-medium capitalize", getTransactionColor(transaction.transaction_type))}>
                          {transaction.transaction_type}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400">AMOUNT</div>
                        <div className={cn("text-sm font-bold", getTransactionColor(transaction.transaction_type))}>
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
                      <div className="text-sm text-gray-900 dark:text-white">{format(new Date(transaction.created_at), 'PPP')}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}