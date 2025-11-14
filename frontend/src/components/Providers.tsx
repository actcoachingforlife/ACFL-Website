'use client';

import { useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '@/contexts/AuthContext';
import { NotificationProvider } from '@/contexts/NotificationContext';
import { AdminNotificationProvider } from '@/contexts/AdminNotificationContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { MeetingProvider } from '@/contexts/MeetingContext';

const theme = createTheme({
  components: {
    MuiSelect: {
      styleOverrides: {
        select: {
          padding: '12px 16px',
          borderRadius: '8px',
          '&:focus': {
            borderRadius: '8px',
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 0, 0, 0.23)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#3b82f6',
            borderWidth: '2px',
          }
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          padding: '8px 16px',
          borderRadius: '8px',
          margin: '2px',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
          '&.Mui-selected': {
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            }
          }
        }
      }
    }
  }
});

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <AdminNotificationProvider>
            <MeetingProvider>
              <MuiThemeProvider theme={theme}>
                {/* Wrap in div with suppressHydrationWarning to handle MUI emotion styles */}
                <div suppressHydrationWarning>
                  <CssBaseline />
                  {children}
                  {/* Only render ToastContainer on client to avoid hydration mismatch */}
                  {mounted && (
                    <ToastContainer
                      position="top-right"
                      autoClose={5000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      theme="colored"
                      toastClassName="custom-toast"
                    />
                  )}
                </div>
              </MuiThemeProvider>
            </MeetingProvider>
          </AdminNotificationProvider>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
} 