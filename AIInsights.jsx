import { Lightbulb, TrendingUp, AlertTriangle, ShieldCheck, Zap, Battery, Crosshair, ArrowRight } from 'lucide-react';

export default function AIInsights() {
  return (
    <div className="space-y-6 page-enter">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Executive Intelligence</h1>
          <p className="text-slate-500 text-sm mt-1">AI-generated operational insights and tactical recommendations.</p>
        </div>
        <div className="flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-lg text-sm font-bold border border-purple-100 shadow-sm">
          <Zap size={16} className="fill-purple-500" /> AI Insights Active
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Trend Cards */}
        <div className="card shadow-sm border-l-4 border-l-red-500">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-red-100 rounded-xl text-red-600 mt-1">
              <TrendingUp size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-slate-800 text-lg">Sharps Waste Trend</h3>
                <span className="badge badge-red">Alert</span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                The <strong>ICU generates 35% of total waste</strong>. Overall <strong>needle incidents increased 14%</strong> across all zones.
              </p>
            </div>
          </div>
        </div>

        <div className="card shadow-sm border-l-4 border-l-emerald-500">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-emerald-100 rounded-xl text-emerald-600 mt-1">
              <ShieldCheck size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-slate-800 text-lg">System Health</h3>
                <span className="badge badge-green">Optimal</span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                <strong>Collection efficiency is 96%</strong>. Hardware diagnostics confirm that battery health remains optimal under current load profiles.
              </p>
            </div>
          </div>
        </div>
        
        {/* Prediction Cards */}
        <div className="card shadow-sm border-l-4 border-l-orange-500">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-orange-100 rounded-xl text-orange-600 mt-1">
              <Crosshair size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-slate-800 text-lg">Risk Prediction</h3>
                <span className="badge" style={{ backgroundColor: '#ffedd5', color: '#c2410c' }}>Prediction</span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Based on historic waste clustering, the <strong>predicted hotspot is Ward A</strong>.
              </p>
            </div>
          </div>
        </div>

        <div className="card shadow-sm border-l-4 border-l-blue-500">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 rounded-xl text-blue-600 mt-1">
              <Lightbulb size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-slate-800 text-lg">Tactical Recommendation</h3>
                <span className="badge badge-blue">Actionable</span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                To mitigate risk in the identified hotspot, it is <strong>recommended patrol frequency increased</strong> for Ward A.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-white border border-slate-200 shadow-sm mt-6">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-6 flex items-center gap-2">
          <Zap size={16} className="text-blue-500" /> Apply Recommendations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 hover:border-blue-500 transition-colors cursor-pointer group shadow-sm">
            <h4 className="font-bold text-lg mb-2 text-slate-800 group-hover:text-blue-600 transition-colors">Shift Peak Patrol</h4>
            <p className="text-slate-500 text-sm mb-4">Set the primary autonomous sweep to 09:00 AM for the ICU Corridor.</p>
            <div className="flex items-center gap-1 text-blue-600 font-bold text-sm">Apply Schedule <ArrowRight size={14}/></div>
          </div>
          
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 hover:border-blue-500 transition-colors cursor-pointer group shadow-sm">
            <h4 className="font-bold text-lg mb-2 text-slate-800 group-hover:text-blue-600 transition-colors">Alert ICU Staff</h4>
            <p className="text-slate-500 text-sm mb-4">Push an automated notification to ICU nursing staff regarding sharps disposal.</p>
            <div className="flex items-center gap-1 text-blue-600 font-bold text-sm">Send Notice <ArrowRight size={14}/></div>
          </div>

          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 hover:border-blue-500 transition-colors cursor-pointer group shadow-sm">
            <h4 className="font-bold text-lg mb-2 text-slate-800 group-hover:text-blue-600 transition-colors">Run Diagnostics</h4>
            <p className="text-slate-500 text-sm mb-4">Validate collection mechanism efficiency against the 96% baseline.</p>
            <div className="flex items-center gap-1 text-blue-600 font-bold text-sm">Start Diagnostic <ArrowRight size={14}/></div>
          </div>
        </div>
      </div>
    </div>
  );
}
