"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { BarChart3, TrendingUp, ShieldAlert, Clock, Download, CheckCircle2 } from 'lucide-react';

export default function ReportsAnalyticsPage() {
  const [isExporting, setIsExporting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // TODO: BACKEND_INTEGRATION
  // Target Route: GET /api/v1/reports/dashboard-summary
  // Fetch dynamic telemetry metrics from FastAPI to overwrite these initial mock data stores.
  useEffect(() => {
    // Sync hooks here when analytics endpoints are running
  }, []);

  const handleExport = () => {
    setIsExporting(true);
    setStatusMessage('');

    // TODO: BACKEND_INTEGRATION
    // Target Route: GET /api/v1/reports/export?format=csv
    // Triggers generation and file stream delivery of the asset directory ledger.
    setTimeout(() => {
      setIsExporting(false);
      setStatusMessage("Export complete. Master consolidated spreadsheet downloaded successfully.");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 p-6 md:p-10 text-zinc-900 dark:text-zinc-100">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Block Sync */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">Reports & System Analytics</h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">
            Screen 9: Visual operational insights and resource utilization metrics[cite: 1].
          </p>
        </div>

        <hr className="border-zinc-200 dark:border-zinc-800" />

        {/* 1. TOP CHARTS PANEL: Visualization Matrices */}
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Utilization by Department Mock Bar Chart */}
          <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-zinc-400" /> Utilization by department[cite: 1]
            </h3>
            {/* Native CSS Visual Bar Simulation */}
            <div className="h-40 flex items-end justify-between gap-2 pt-4 px-2 border-b border-zinc-200 dark:border-zinc-700">
              <div className="w-8 bg-amber-600 dark:bg-amber-700 rounded-t h-[40%] transition-all" title="Dept 1" />
              <div className="w-8 bg-amber-600 dark:bg-amber-700 rounded-t h-[75%] transition-all" title="Dept 2" />
              <div className="w-8 bg-amber-600 dark:bg-amber-700 rounded-t h-[95%] transition-all" title="Dept 3" />
              <div className="w-8 bg-amber-600 dark:bg-amber-700 rounded-t h-[65%] transition-all" title="Dept 4" />
              <div className="w-8 bg-amber-600 dark:bg-amber-700 rounded-t h-[45%] transition-all" title="Dept 5" />
              <div className="w-8 bg-amber-600 dark:bg-amber-700 rounded-t h-[85%] transition-all" title="Dept 6" />
            </div>
            <p className="text-[10px] text-zinc-400 text-center">Continuous relative tracking across organizational boundaries[cite: 1].</p>
          </div>

          {/* Maintenance Frequency Mock Line Chart */}
          <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-zinc-400" /> Maintenance Frequency[cite: 1]
            </h3>
            {/* SVG Trendline Representation exactly simulating the mockup curve */}
            <div className="h-40 w-full pt-4 relative border-b border-zinc-200 dark:border-zinc-700">
              <svg className="w-full h-full stroke-rose-500 dark:stroke-rose-400 fill-none" viewBox="0 0 100 40" preserveAspectRatio="none">
                <path d="M 0 35 L 20 20 L 40 25 L 60 10 L 70 18 L 90 5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-[10px] text-zinc-400 text-center">Repair request trajectory over current observation quarters[cite: 1].</p>
          </div>

        </div>

        {/* 2. MIDDLE LOGS PANEL: Utilization Metrics */}
        <div className="grid md:grid-cols-2 gap-8 pt-2">
          
          {/* Most Used Assets Section */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">Most used assets[cite: 1]</h3>
            <div className="space-y-2 font-sans text-sm text-zinc-600 dark:text-zinc-400">
              <div className="flex justify-between border-b border-zinc-100 dark:border-zinc-800 pb-1.5">
                <span>Room B2[cite: 1]</span>
                <span className="font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">34 booking this month[cite: 1]</span>
              </div>
              <div className="flex justify-between border-b border-zinc-100 dark:border-zinc-800 pb-1.5">
                <span>Van AF-343[cite: 1]</span>
                <span className="font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">21 trips this month[cite: 1]</span>
              </div>
              <div className="flex justify-between border-b border-zinc-100 dark:border-zinc-800 pb-1.5">
                <span>Projector AF-335[cite: 1]</span>
                <span className="font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">18 uses[cite: 1]</span>
              </div>
            </div>
          </div>

          {/* Idle Assets Section */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">Idle assets[cite: 1]</h3>
            <div className="space-y-2 font-sans text-sm text-zinc-600 dark:text-zinc-400">
              <div className="flex justify-between border-b border-zinc-100 dark:border-zinc-800 pb-1.5">
                <span className="font-mono text-xs bg-zinc-100 dark:bg-zinc-800 px-1 rounded text-zinc-700 dark:text-zinc-300">Camera AF-0301[cite: 1]</span>
                <span className="text-amber-600 dark:text-amber-400 font-medium">unused 60+ days[cite: 1]</span>
              </div>
              <div className="flex justify-between border-b border-zinc-100 dark:border-zinc-800 pb-1.5">
                <span className="font-mono text-xs bg-zinc-100 dark:bg-zinc-800 px-1 rounded text-zinc-700 dark:text-zinc-300">chair AF-0410[cite: 1]</span>
                <span className="text-zinc-500 dark:text-zinc-400">unused 45 days[cite: 1]</span>
              </div>
            </div>
          </div>

        </div>

        <hr className="border-zinc-200 dark:border-zinc-800" />

        {/* 3. BOTTOM PANEL: Lifecycle & Alerts */}
        <div className="space-y-3">
          <h3 className="text-base font-bold text-zinc-900 dark:text-white">Assets due for maintenance / nearing retirement[cite: 1]</h3>
          <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-4 shadow-sm space-y-3">
            
            <div className="flex items-start gap-3 text-sm">
              <Clock className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-zinc-900 dark:text-zinc-100">
                  Forklift AF-0087 : <span className="text-amber-600 dark:text-amber-400 font-mono font-bold">service due in 5 days[cite: 1]</span>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-sm border-t border-zinc-100 dark:border-zinc-700 pt-3">
              <ShieldAlert className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-zinc-900 dark:text-zinc-100">
                  Laptop AF-0020 : <span className="text-zinc-500 dark:text-zinc-400">4 years old : nearing retirement[cite: 1]</span>
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Status Messaging Banner */}
        {statusMessage && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 text-xs rounded-md border border-emerald-100 dark:border-emerald-900/30 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* 4. EXPORT REPORT TRIGGER ACTIONS FOOTER */}
        <div className="flex justify-start pt-2">
          <Button 
            onClick={handleExport}
            disabled={isExporting}
            className="bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-semibold text-xs flex items-center gap-2 shadow px-5 py-2.5"
          >
            <Download className="h-4 w-4" /> {isExporting ? 'Compiling Report...' : 'Export report[cite: 1]'}
          </Button>
        </div>

      </div>
    </div>
  );
}