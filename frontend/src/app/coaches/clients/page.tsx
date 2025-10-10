'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, MessageCircle, User, Calendar, Clock, FileText } from 'lucide-react';
import CoachPageWrapper from '@/components/CoachPageWrapper';
import ClientCardSkeleton from '@/components/ClientCardSkeleton';
import { useAuth } from '@/contexts/AuthContext';
import { getApiUrl } from '@/lib/api';
import axios from 'axios';

interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  totalSessions: number;
  lastSession?: string;
  nextSession?: string;
  status: 'active' | 'inactive';
  startDate: string;
  concerns: string[];
  notes?: string;
  nextSessionFocus?: string | null;
}

export default function MyClientsPage() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const [clients, setClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [error, setError] = useState('');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageContent, setMessageContent] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);

  const API_URL = getApiUrl();

  useEffect(() => {
    loadClients();
  }, []);

  // Handle view_client parameter from URL
  useEffect(() => {
    const viewClientId = searchParams.get('view_client');
    if (viewClientId && clients.length > 0 && !loading) {
      const clientToView = clients.find(client => client.id === viewClientId);
      if (clientToView) {
        handleViewDetails(clientToView);
        // Remove the parameter from URL after opening the modal
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete('view_client');
        window.history.replaceState({}, '', newUrl.toString());
      }
    }
  }, [searchParams, clients, loading]);

  const loadClients = async (isRefresh: boolean = false) => {
    try {
      if (!isRefresh) {
        setLoading(true);
      }
      const response = await axios.get(`${API_URL}/api/coach/clients`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.success) {
        setClients(response.data.data);
      }
    } catch (error) {
      console.error('Error loading clients:', error);
      setError('Failed to load clients');
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || client.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    return status === 'active'
      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
  };

  const handleViewDetails = (client: Client) => {
    setSelectedClient(client);
    setShowDetailsModal(true);
  };

  const handleSendMessage = (client: Client) => {
    setSelectedClient(client);
    setMessageContent('');
    setShowMessageModal(true);
  };

  const handleSendMessageSubmit = async () => {
    if (!selectedClient || !messageContent.trim()) return;

    try {
      setSendingMessage(true);
      
      const response = await axios.post(`${API_URL}/api/coach/send-message`, {
        recipient_id: selectedClient.id, // Use client.id directly
        body: messageContent.trim()
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.success) {
        setShowMessageModal(false);
        setMessageContent('');
        setSelectedClient(null);
        // Show success message or redirect to messages
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message');
    } finally {
      setSendingMessage(false);
    }
  };

  // Remove full screen loading - we now use skeleton loading

  return (
    <CoachPageWrapper title="My Clients" description="Manage and view your client relationships">

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search clients by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'active', 'inactive'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Client Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-3 sm:ml-4 min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">Total Clients</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-foreground break-words leading-tight">{clients.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3 sm:ml-4 min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">Active Clients</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-foreground break-words leading-tight">
                  {clients.filter(c => c.status === 'active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3 sm:ml-4 min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">Total Sessions</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-foreground break-words leading-tight">
                  {clients.reduce((sum, client) => sum + client.totalSessions, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Clients List */}
      {initialLoad ? (
        <ClientCardSkeleton count={6} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredClients.length === 0 ? (
            <Card className="col-span-2 bg-card border-border">
              <CardContent className="text-center py-12">
                <p className="text-muted-foreground">No clients found</p>
              </CardContent>
            </Card>
          ) : (
            filteredClients.map((client) => (
            <Card key={client.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-4 sm:p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="min-w-0 flex-1 mr-2">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white break-words leading-tight">{client.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 break-words">{client.email}</p>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300">{client.phone}</p>
                  </div>
                  <span className={`flex-shrink-0 px-2 sm:px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(client.status)}`}>
                    {client.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-white truncate">Total Sessions</p>
                    <p className="text-xs sm:text-sm text-gray-900 dark:text-gray-300">{client.totalSessions}</p>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-white truncate">Client Since</p>
                    <p className="text-xs sm:text-sm text-gray-900 dark:text-gray-300 break-words">
                      {new Date(client.startDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-white truncate">Last Session</p>
                    <p className="text-xs sm:text-sm text-gray-900 dark:text-gray-300 break-words">
                      {client.lastSession ? new Date(client.lastSession).toLocaleDateString() : 'No sessions yet'}
                    </p>
                  </div>
                  {client.nextSession && (
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-white truncate">Next Session</p>
                      <p className="text-xs sm:text-sm text-gray-900 dark:text-gray-300 break-words">
                        {new Date(client.nextSession).toLocaleDateString()}
                      </p>

                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-500 mb-1 dark:text-white">Areas of Focus</p>
                  <div className="flex flex-wrap gap-1">
                    {client.nextSessionFocus && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">{client.nextSessionFocus}</span>
                    )}
                  </div>
                </div>

                {client.notes && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-white">Notes</p>
                    <p className="text-sm text-gray-900 dark:text-gray-300 mt-1">{client.notes}</p>
                  </div>
                )}

                <div className="flex space-x-2 mb-2">
                  <Button
                    onClick={() => handleViewDetails(client)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 dark:text-white"
                    size="sm"
                  >
                    <User className="w-4 h-4 mr-1" />
                    View Details
                  </Button>
                  <Button
                    onClick={() => handleSendMessage(client)}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
        </div>
      )}

      {/* Client Details Modal */}
      {showDetailsModal && selectedClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-xl font-semibold">
                Client Details - {selectedClient.name}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDetailsModal(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3 dark:text-white">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-white">Name</p>
                    <p className="text-sm text-gray-900 dark:text-gray-300">{selectedClient.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-white">Email</p>
                    <p className="text-sm text-gray-900 dark:text-gray-300">{selectedClient.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-white">Phone</p>
                    <p className="text-sm text-gray-900 dark:text-gray-300">{selectedClient.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-white">Status</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedClient.status)}`}>
                      {selectedClient.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Session Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3 dark:text-white">Session History</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-white">Total Sessions</p>
                    <p className="text-sm text-gray-900 dark:text-gray-300">{selectedClient.totalSessions}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-white">Client Since</p>
                    <p className="text-sm text-gray-900 dark:text-gray-300">
                      {new Date(selectedClient.startDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-white">Last Session</p>
                    <p className="text-sm text-gray-900 dark:text-gray-300">
                      {selectedClient.lastSession ? new Date(selectedClient.lastSession).toLocaleDateString() : 'No sessions yet'}
                    </p>
                  </div>
                  {selectedClient.nextSession && (
                    <div className="md:col-span-3">
                      <p className="text-sm font-medium text-gray-500 dark:text-white">Next Session</p>
                      <p className="text-sm text-gray-900 dark:text-gray-300 flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(selectedClient.nextSession).toLocaleDateString()} at{' '}
                        {new Date(selectedClient.nextSession).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Areas of Focus */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3 dark:text-white">Areas of Focus</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedClient.nextSessionFocus && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      {selectedClient.nextSessionFocus}
                    </span>
                  )}
                </div>
              </div>

              {/* Notes */}
              {selectedClient.notes && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3 dark:text-white">Notes</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-900 dark:text-gray-300">{selectedClient.notes}</p>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t">
                <Button
                  onClick={() => {
                    setShowDetailsModal(false);
                    handleSendMessage(selectedClient);
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 dark:text-white"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowDetailsModal(false)}
                  className="flex-1"
                >
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Send Message Modal */}
      {showMessageModal && selectedClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <Card className="w-full max-w-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-xl font-semibold">
                Send Message to {selectedClient.name}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMessageModal(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                  Message *
                </label>
                <textarea
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  placeholder="Type your message here..."
                  className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-black"
                  rows={4}
                  maxLength={1000}
                />
                <div className="text-xs text-gray-500 mt-1 dark:text-gray-300">
                  {messageContent.length}/1000 characters
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowMessageModal(false)}
                  className="flex-1"
                  disabled={sendingMessage}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSendMessageSubmit}
                  disabled={sendingMessage || !messageContent.trim()}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 dark:text-white"
                >
                  <MessageCircle className="w-4 h-4 mr-2 dark:text-white" />
                  {sendingMessage ? 'Sending...' : 'Send Message'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </CoachPageWrapper>
  );
}