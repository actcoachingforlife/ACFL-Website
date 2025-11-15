"use client"

import { useState, useEffect } from 'react'
import CoachPageWrapper from '@/components/CoachPageWrapper'
import { getApiUrl } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  Clock,
  RefreshCw,
  Star,
  Target,
  BarChart3,
  Filter,
  Search,
  FileText,
  Calendar as CalendarIcon
} from 'lucide-react'
import axios from 'axios'

export default function CoachRevenuePage() {
  const [revenueData, setRevenueData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedPeriod, setSelectedPeriod] = useState('month')

  // Filter states
  const [searchTerm, setSearchTerm] = useState('')
  const [itemsPerPage, setItemsPerPage] = useState(20)
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')

  const API_URL = getApiUrl()

  useEffect(() => {
    loadRevenueData()
  }, [selectedPeriod])

  const loadRevenueData = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(`${API_URL}/api/coach/revenue?period=${selectedPeriod}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (response.data.success) {
        setRevenueData(response.data.data)
      }
    } catch (error) {
      console.error('Error loading revenue data:', error)
      setError('Failed to load revenue data')
    } finally {
      setIsLoading(false)
    }
  }

  if (error) {
    return (
      <CoachPageWrapper title="Revenue & Performance" description="Track your earnings and performance metrics">
        <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-md">
          {error}
        </div>
      </CoachPageWrapper>
    )
  }

  const stats = revenueData?.stats || {}
  const trends = revenueData?.trends || {}

  // Apply filters to revenue activity
  const filteredActivities = (revenueData?.recentActivity || [])
    .filter((activity: any) => {
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = activity.clientName?.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Status filter
      if (statusFilter !== 'all' && activity.status.toLowerCase() !== statusFilter.toLowerCase()) {
        return false;
      }

      // Date range filter
      if (dateFilter !== 'all') {
        const activityDate = new Date(activity.date);
        const now = new Date();
        const daysDiff = Math.floor((now.getTime() - activityDate.getTime()) / (1000 * 60 * 60 * 24));

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
    .slice(0, itemsPerPage);

  return (
    <CoachPageWrapper title="Revenue & Performance" description="Track your earnings and performance metrics">
      {/* Period Selector */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-2 dark:text-white">
          {[
            { key: 'week', label: 'This Week' },
            { key: 'month', label: 'This Month' },
            { key: 'quarter', label: 'This Quarter' },
            { key: 'year', label: 'This Year' }
          ].map((period) => (
            <Button
              key={period.key}
              variant={selectedPeriod === period.key ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedPeriod(period.key)}
            >
              {period.label}
            </Button>
          ))}
        </div>
        
      </div>

      {/* Revenue Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6" data-tour="earnings-summary">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRevenue || '0.00'}</div>
            <div className={`text-xs flex items-center ${
              (trends.revenueChange || 0) >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {(trends.revenueChange || 0) >= 0 ? (
                <TrendingUp className="w-3 h-3 mr-1" />
              ) : (
                <TrendingDown className="w-3 h-3 mr-1" />
              )}
              {Math.abs(trends.revenueChange || 0)}% from last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sessions Completed</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.sessionsCompleted || 0}</div>
            <div className={`text-xs flex items-center ${
              (trends.sessionsChange || 0) >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {(trends.sessionsChange || 0) >= 0 ? (
                <TrendingUp className="w-3 h-3 mr-1" />
              ) : (
                <TrendingDown className="w-3 h-3 mr-1" />
              )}
              {Math.abs(trends.sessionsChange || 0)}% from last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageRating || '0.0'}</div>
            <div className="text-xs text-muted-foreground">
              Based on {stats.totalReviews || 0} reviews
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeClients || 0}</div>
            <div className={`text-xs flex items-center ${
              (trends.clientsChange || 0) >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {(trends.clientsChange || 0) >= 0 ? (
                <TrendingUp className="w-3 h-3 mr-1" />
              ) : (
                <TrendingDown className="w-3 h-3 mr-1" />
              )}
              {Math.abs(trends.clientsChange || 0)}% from last period
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>Performance Metrics</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Session Completion Rate</span>
              <span className="text-sm font-bold">{stats.completionRate || 0}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: `${stats.completionRate || 0}%` }}
              ></div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Client Retention Rate</span>
              <span className="text-sm font-bold">{stats.retentionRate || 0}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${stats.retentionRate || 0}%` }}
              ></div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">On-Time Performance</span>
              <span className="text-sm font-bold">{stats.onTimeRate || 0}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full"
                style={{ width: `${stats.onTimeRate || 0}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span>Key Performance Indicators</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4">
              <div className="text-sm font-medium text-green-700">Revenue Goal Progress</div>
              <div className="text-lg font-bold">${stats.totalRevenue || 0} / ${stats.revenueGoal || 5000}</div>
              <div className="text-xs text-muted-foreground">
                {Math.round(((stats.totalRevenue || 0) / (stats.revenueGoal || 5000)) * 100)}% of goal achieved
              </div>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <div className="text-sm font-medium text-blue-700">Average Session Revenue</div>
              <div className="text-lg font-bold">${stats.avgSessionRevenue || '0.00'}</div>
              <div className="text-xs text-muted-foreground">
                Per completed session
              </div>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <div className="text-sm font-medium text-purple-700">Total Hours Coached</div>
              <div className="text-lg font-bold">{stats.totalHours || 0}h</div>
              <div className="text-xs text-muted-foreground">
                This {selectedPeriod}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-750 border-b border-gray-200 dark:border-gray-600 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Filter className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Filter Revenue Activity</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Search and filter revenue records</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Activity */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Search className="h-4 w-4" />
                Search Activity
              </label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search by client name..."
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
                  <SelectItem value="refunded">Refunded</SelectItem>
                  <SelectItem value="partially_refunded">Partially Refunded</SelectItem>
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
              Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredActivities.length}</span> of{' '}
              <span className="font-semibold text-gray-900 dark:text-white">{revenueData?.recentActivity?.length || 0}</span> activities
            </p>
          </div>
        </div>
      </div>

      {/* Recent Revenue Activity Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden" data-tour="transaction-history">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Revenue Activity</h2>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-400 dark:text-white" />
            <p className="text-gray-500 dark:text-gray-400">Loading recent activity...</p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden xl:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredActivities.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center">
                        <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No revenue activity found</h3>
                        <p className="text-gray-500 dark:text-gray-400">
                          Complete sessions to see revenue activity
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filteredActivities.map((activity: any, index: number) => {
                      const isRefunded = activity.status === 'refunded' || activity.status === 'partially_refunded';
                      const refundAmount = activity.refundAmount || 0;

                      return (
                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {activity.clientName}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              Session
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {new Date(activity.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">
                              {activity.duration} min
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {isRefunded ? (
                              <div>
                                <div className="text-sm font-medium text-red-600 dark:text-red-400 line-through">
                                  +${activity.amount}
                                </div>
                                {refundAmount > 0 && (
                                  <div className="text-xs text-red-600 dark:text-red-400">
                                    -${refundAmount} refunded
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="text-sm font-medium text-green-600 dark:text-green-400">
                                +${activity.amount}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              isRefunded
                                ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                                : 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                            }`}>
                              {activity.status === 'partially_refunded' ? 'Partially Refunded' : isRefunded ? 'Refunded' : 'Completed'}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="xl:hidden divide-y divide-gray-200 dark:divide-gray-700">
              {filteredActivities.length === 0 ? (
                <div className="p-8 text-center">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No revenue activity found</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Complete sessions to see revenue activity
                  </p>
                </div>
              ) : (
                filteredActivities.map((activity: any, index: number) => {
                  const isRefunded = activity.status === 'refunded' || activity.status === 'partially_refunded';
                  const refundAmount = activity.refundAmount || 0;

                  return (
                    <div key={`mobile-${index}`} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <div className="space-y-3">
                        {/* Header with Status and Amount */}
                        <div className="flex items-center justify-between">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            isRefunded
                              ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                              : 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                          }`}>
                            {activity.status === 'partially_refunded' ? 'Partially Refunded' : isRefunded ? 'Refunded' : 'Completed'}
                          </span>
                          <div className="text-right">
                            {isRefunded ? (
                              <>
                                <div className="text-lg font-semibold text-red-600 dark:text-red-400 line-through">
                                  +${activity.amount}
                                </div>
                                {refundAmount > 0 && (
                                  <div className="text-xs text-red-600 dark:text-red-400">
                                    -${refundAmount} refunded
                                  </div>
                                )}
                              </>
                            ) : (
                              <div className="text-lg font-semibold text-green-600 dark:text-green-400">
                                +${activity.amount}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Client Name */}
                        <div>
                          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Client</div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {activity.clientName}
                          </div>
                        </div>

                        {/* Session Details */}
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Duration</div>
                            <div className="text-sm text-gray-900 dark:text-white">
                              {activity.duration} min
                            </div>
                          </div>
                          <div>
                            <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Date</div>
                            <div className="text-sm text-gray-900 dark:text-white">
                              {new Date(activity.date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </>
        )}
      </div>
    </CoachPageWrapper>
  )
}