"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ClipboardCheck, ShieldAlert, Lock, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';

// Functional structure following the exact properties from the Excalidraw mockup[cite: 1]
interface AuditAsset {
  tag: string;
  name: string;
  expectedLocation: string; // From Mockup[cite: 1]
  verification: 'Pending' | 'Verified' | 'Missing' | 'Damaged'; // State mapping[cite: 1]
}

export default function AssetAuditPage() {
  // Mocking the active cycle details exactly from the image[cite: 1]
  const [cycleInfo] = useState({
    title: "Q3 audit: Engineering dept - 1-15 jul",
    auditors: "A. Rao, S. Iqbal"
  });

  // Assets list with locations and statuses exactly as shown[cite: 1]
  const [assets, setAssets] = useState<AuditAsset[]>([
    { tag: "AF-003", name: "Dell laptop", expectedLocation: "Desk E12", verification: "Verified" },
    { tag: "AF-9921", name: "Office chair", expectedLocation: "Desk E14", verification: "Missing" },
    { tag: "AF-9838", name: "Monitor", expectedLocation: "Desk E15", verification: "Damaged" }
  ]);

  const [statusMessage, setStatusMessage] = useState('');

  // Calculate discrepancies automatically based on 'Missing' or 'Damaged' state[cite: 1]
  const flaggedCount = assets.filter(a => a.verification === 'Missing' || a.verification === 'Damaged').length;

  const handleUpdateVerification = (tag: string, status: 'Verified' | 'Missing' | 'Damaged') => {
    // TODO: BACKEND_INTEGRATION
    // Target Route: PATCH /api/v1/audits/active/assets/{tag}
    // Body Payload: { verification_status: status }
    setAssets(prev => prev.map(a => a.tag === tag ? { ...a, verification: status } : a));
  };

  const handleCloseAuditCycle = () => {
    // TODO: BACKEND_INTEGRATION
    // Target Route: POST /api/v1/audits/active/close
    // Server-side reminder: Backend should transition confirmed missing items to 'Lost' globally[cite: 1].
    setStatusMessage("Audit cycle locked successfully. All discrepancies compiled into master directory logs[cite: 1].");
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 p-6 md:p-10 text-zinc-900 dark:text-zinc-100">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header Block Sync */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">Active Asset Audit</h1>
          <p className="text-xs text-zinc-500 mt-0.5">Screen 8: Single-cycle structured audit checklist verification workspace[cite: 1].</p>
        </div>

        <hr className="border-zinc-200 dark:border-zinc-800" />

        {/* 1. Audit Cycle Header Banner Panel[cite: 1] */}
        <div className="bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl p-5 shadow-sm space-y-1">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 font-sans">
            {cycleInfo.title}[cite: 1]
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Auditors: <span className="font-medium text-zinc-700 dark:text-zinc-300">{cycleInfo.auditors}</span>[cite: 1]
          </p>
        </div>

        {/* 2. Structured Asset Verification Table Container[cite: 1] */}
        <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400 font-semibold text-xs uppercase tracking-wider">
                  <th className="py-3.5 px-6">Asset[cite: 1]</th>
                  <th className="py-3.5 px-6">Expected Location[cite: 1]</th>
                  <th className="py-3.5 px-6 text-right">Verification[cite: 1]</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700 text-zinc-700 dark:text-zinc-300">
                {assets.map((item) => (
                  <tr key={item.tag} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/40 transition-colors">
                    
                    {/* Asset Profile[cite: 1] */}
                    <td className="py-4 px-6 font-medium">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 rounded">
                          {item.tag}
                        </span>
                        <span>{item.name}</span>
                      </div>
                    </td>

                    {/* Expected Location Target[cite: 1] */}
                    <td className="py-4 px-6 text-zinc-500 dark:text-zinc-400 font-mono text-xs">
                      {item.expectedLocation}[cite: 1]
                    </td>

                    {/* Inline State Triggers[cite: 1] */}
                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleUpdateVerification(item.tag, 'Verified')}
                          className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                            item.verification === 'Verified'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/50 font-semibold shadow-sm'
                              : 'border-zinc-200 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-700 text-zinc-400'
                          }`}
                        >
                          Verified[cite: 1]
                        </button>

                        <button
                          type="button"
                          onClick={() => handleUpdateVerification(item.tag, 'Missing')}
                          className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                            item.verification === 'Missing'
                              ? 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-900/50 font-semibold shadow-sm'
                              : 'border-zinc-200 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-700 text-zinc-400'
                          }`}
                        >
                          Missing[cite: 1]
                        </button>

                        <button
                          type="button"
                          onClick={() => handleUpdateVerification(item.tag, 'Damaged')}
                          className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                            item.verification === 'Damaged'
                              ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/50 font-semibold shadow-sm'
                              : 'border-zinc-200 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-700 text-zinc-400'
                          }`}
                        >
                          Damaged[cite: 1]
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. Dynamic Discrepancy Counter Alert Block[cite: 1] */}
        {flaggedCount > 0 && (
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-300 text-sm flex items-center gap-2 shadow-sm font-medium">
            <ShieldAlert className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-500" />
            <span>{flaggedCount} assets flagged - discrepancy report generated automatically[cite: 1]</span>
          </div>
        )}

        {/* Action Completion Messages */}
        {statusMessage && (
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-400 text-sm flex items-center gap-2 shadow-sm">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* 4. Global Cycle Lock Action[cite: 1] */}
        <div className="flex justify-start pt-2">
          <Button 
            onClick={handleCloseAuditCycle}
            className="bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 font-medium text-xs flex items-center gap-2 shadow"
          >
            <Lock className="h-3.5 w-3.5" /> Close audit cycle[cite: 1]
          </Button>
        </div>

      </div>
    </div>
  );
}