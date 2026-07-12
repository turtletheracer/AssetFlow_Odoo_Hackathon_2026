"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle2 } from 'lucide-react';

interface NotificationItem {
  id: string;
  category: 'Alerts' | 'Approvals' | 'Bookings' | 'Info';
  message: string;
  timeLabel: string;
}

export default function NotificationsLogsPage() {
  // Pill filter tab state
  const [activeFilter, setActiveFilter] = useState<'All' | 'Alerts' | 'Approvals' | 'Bookings'>('All');
  const [statusMessage, setStatusMessage] = useState('');

  // Notifications dataset exactly as shown in your Excalidraw mockup
  const [notifications] = useState<NotificationItem[]>([
    { id: "NT-01", category: "Info", message: "Laptop AF-0014 assigned to Priya shah", timeLabel: "2m ago" },
    { id: "NT-02", category: "Approvals", message: "Maintenance request AF-0055 approved", timeLabel: "18m ago" },
    { id: "NT-03", category: "Bookings", message: "Booking confirmed : Room B2 : 2:00 to 3:00 PM", timeLabel: "1h ago" },
    { id: "NT-04", category: "Approvals", message: "Transfer approved : AF-0033 to facilities dept", timeLabel: "3h ago" },
    { id: "NT-05", category: "Alerts", message: "Overdue return : AF-0021 was due 3 days ago", timeLabel: "1d ago" },
    { id: "NT-06", category: "Alerts", message: "audit discrepancy flagged : AF-0088 damaged", timeLabel: "2d ago" }
  ]);

  // TODO: BACKEND_INTEGRATION
  // Replace this filtering logic with your FastAPI parameters: GET /api/v1/notifications?category={activeFilter}
  const filteredNotifications = notifications.filter(item => {
    if (activeFilter === 'All') return true;
    return item.category === activeFilter;
  });

  const handleClearAll = () => {
    // TODO: BACKEND_INTEGRATION
    // Target Endpoint: DELETE /api/v1/notifications/clear
    setStatusMessage("Notifications cleared successfully.");
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 p-6 md:p-10 text-zinc-900 dark:text-zinc-100">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header Title Block */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">System Feed & Notifications</h1>
            <p className="text-xs text-zinc-500 mt-0.5">Screen 10: Real-time logs and system alerts stream view.</p>
          </div>
          <Button variant="ghost" className="text-xs text-zinc-500 hover:text-zinc-950 dark:hover:text-white" onClick={handleClearAll}>
            Clear Feed
          </Button>
        </div>

        <hr className="border-zinc-200 dark:border-zinc-800" />

        {/* 1. Category Filter Pills Block */}
        <div className="flex flex-wrap gap-2">
          {(['All', 'Alerts', 'Approvals', 'Bookings'] as const).map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`text-xs px-4 py-1.5 rounded-full border transition-all font-medium ${
                activeFilter === filter
                  ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:border-zinc-100 shadow-sm'
                  : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700 dark:hover:bg-zinc-700'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Action Status Confirmation Messages */}
        {statusMessage && (
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-400 text-xs flex items-center gap-2 shadow-sm">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* 2. Structured Notification List Container */}
        <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-sm overflow-hidden">
          <div className="divide-y divide-zinc-200 dark:divide-zinc-700">
            {filteredNotifications.length === 0 ? (
              <p className="text-sm text-zinc-400 py-8 text-center">No feed alerts found matching this category filter.</p>
            ) : (
              filteredNotifications.map((item) => {
                // Assign subtle accent indicators based on structural log context
                const dotColor = {
                  Alerts: 'bg-rose-500',
                  Approvals: 'bg-amber-500',
                  Bookings: 'bg-blue-500',
                  Info: 'bg-zinc-400'
                }[item.category];

                return (
                  <div 
                    key={item.id} 
                    className="p-4 flex items-center justify-between gap-4 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/40 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {/* Status indicator dot */}
                      <span className={`h-2 w-2 rounded-full shrink-0 ${dotColor}`} />
                      <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 leading-none">
                        {item.message}
                      </p>
                    </div>

                    {/* Relative Timestamp */}
                    <span className="text-xs text-zinc-400 dark:text-zinc-500 font-mono shrink-0 whitespace-nowrap flex items-center gap-1">
                      <Clock className="h-3 w-3 opacity-60" />
                      {item.timeLabel}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>
    </div>
  );
}