import { useState } from 'react';
import { FileText, Download, Calendar, Loader2 } from 'lucide-react';
import SkeletonLoader from '../components/ui/SkeletonLoader';

export default function Reports() {
  const [generating, setGenerating] = useState(false);
  const [previewReady, setPreviewReady] = useState(false);
  const [selectedReport, setSelectedReport] = useState('Daily Shift Report');

  const handleGenerate = (name) => {
    setSelectedReport(name);
    setGenerating(true);
    setPreviewReady(false);
    setTimeout(() => {
      setGenerating(false);
      setPreviewReady(true);
    }, 1500);
  };

  return (
    <div className="space-y-6 page-enter">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Compliance & Reports</h1>
          <p className="text-slate-500 text-sm mt-1">Generate automated operational and compliance reports.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Types */}
        <div className="space-y-4">
          {[
            { name: 'Daily Shift Report', desc: 'Summary of 24h operations, collections, and incidents.' },
            { name: 'Weekly Compliance', desc: 'Hospital waste management regulatory compliance data.' },
            { name: 'Monthly Analytics', desc: 'Deep dive into trends, efficiencies, and hardware health.' }
          ].map(r => (
            <div key={r.name} className={`card cursor-pointer transition-all ${selectedReport === r.name ? 'border-2 border-blue-500 bg-blue-50/50' : 'border-2 border-transparent hover:border-slate-200'}`} onClick={() => handleGenerate(r.name)}>
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${selectedReport === r.name ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{r.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">{r.desc}</p>
                </div>
              </div>
            </div>
          ))}

          <div className="card bg-slate-800 text-white border-none mt-8">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Custom Range</h3>
            <div className="flex items-center gap-2 bg-slate-900 p-3 rounded-lg border border-slate-700 mb-4 cursor-text">
              <Calendar size={16} className="text-slate-400" />
              <span className="text-sm text-slate-300">Oct 01, 2026 - Oct 07, 2026</span>
            </div>
            <button className="w-full btn-primary justify-center" onClick={() => handleGenerate('Custom Range Report')}>
              Generate Custom
            </button>
          </div>
        </div>

        {/* Preview Pane */}
        <div className="lg:col-span-2 card flex flex-col min-h-[600px]">
          <div className="flex justify-between items-center mb-6 pb-6 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-800">Report Preview: {selectedReport}</h2>
            <div className="flex gap-2">
              <button className="btn-secondary" disabled={!previewReady}><Download size={16}/> PDF</button>
              <button className="btn-secondary" disabled={!previewReady}><Download size={16}/> Excel</button>
            </div>
          </div>

          <div className="flex-1 bg-slate-50 rounded-xl border border-slate-200 p-8 overflow-y-auto">
            {generating ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-4">
                <Loader2 size={32} className="animate-spin text-blue-500" />
                <div className="text-sm font-medium">Compiling data across all subsystems...</div>
                <div className="w-64 max-w-full"><SkeletonLoader rows={3} /></div>
              </div>
            ) : previewReady ? (
              <div className="bg-white border border-slate-200 shadow-sm rounded p-8 font-serif animate-[fadeIn_0.5s_ease]">
                <div className="flex justify-between items-start mb-8 pb-8 border-b-2 border-slate-800">
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900 uppercase">ABRS Operations Report</h1>
                    <div className="text-slate-500 mt-1">{selectedReport}</div>
                  </div>
                  <div className="text-right text-sm text-slate-500">
                    <div>Facility: City General Hospital</div>
                    <div>Generated: {new Date().toLocaleDateString()}</div>
                  </div>
                </div>

                <h3 className="font-bold text-slate-800 text-lg mb-4">1. Executive Summary</h3>
                <p className="text-slate-700 leading-relaxed mb-6">
                  During the reporting period, the Autonomous Biohazard Response System (ABRS-01) successfully completed 14 scheduled patrol missions. A total of 124 hazardous objects were identified and safely collected. System uptime remained at 99.8% with zero critical hardware failures.
                </p>

                <h3 className="font-bold text-slate-800 text-lg mb-4">2. Collection Metrics</h3>
                <table className="w-full text-left border-collapse mb-8">
                  <thead>
                    <tr className="border-b border-slate-300">
                      <th className="py-2 font-bold text-slate-700">Category</th>
                      <th className="py-2 font-bold text-slate-700">Count</th>
                      <th className="py-2 font-bold text-slate-700">Primary Location</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    <tr><td className="py-2">Sharps (Needles/Lancets)</td><td className="py-2">42</td><td className="py-2">ICU Ward</td></tr>
                    <tr><td className="py-2">Biological (Syringes/Gauze)</td><td className="py-2">45</td><td className="py-2">Emergency</td></tr>
                    <tr><td className="py-2">Glass</td><td className="py-2">9</td><td className="py-2">Corridor 3B</td></tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400 text-sm">
                Select a report type to generate a preview.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
