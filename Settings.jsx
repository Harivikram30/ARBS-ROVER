import { useState } from 'react';
import { User, Building2, Bell, Shield, Sliders } from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('hospital');

  const tabs = [
    { id: 'hospital', label: 'Hospital Profile', icon: Building2 },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'system', label: 'System Config', icon: Sliders },
    { id: 'security', label: 'Security & Access', icon: Shield },
    { id: 'account', label: 'Operator Account', icon: User },
  ];

  return (
    <div className="space-y-6 page-enter">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">System Settings</h1>
          <p className="text-slate-500 text-sm mt-1">Configure ABRS platform and facility parameters.</p>
        </div>
        <button className="btn-primary">Save Changes</button>
      </div>

      <div className="flex gap-6 h-[calc(100vh-220px)]">
        {/* Settings Nav */}
        <div className="w-64 card p-2 flex flex-col gap-1">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === t.id ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <t.icon size={18} className={activeTab === t.id ? 'text-blue-500' : 'text-slate-400'} />
              {t.label}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="flex-1 card overflow-y-auto">
          {activeTab === 'hospital' && (
            <div className="space-y-6 animate-[fadeIn_0.3s_ease]">
              <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4">Hospital Profile</h2>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Facility Name</label>
                  <input type="text" defaultValue="City General Hospital" className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Facility ID</label>
                  <input type="text" defaultValue="CGH-4092-B" disabled className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 text-slate-500" />
                </div>
                <div className="space-y-2 col-span-2">
                  <label className="text-sm font-bold text-slate-700">Operating Zones (Comma separated)</label>
                  <textarea rows={3} defaultValue="ICU Ward, Emergency Room, Surgery Suite A, Surgery Suite B, Corridor 3B, Lab 2, Pharmacy, Pediatrics, Oncology Ward, Storage Room" className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="space-y-6 animate-[fadeIn_0.3s_ease]">
              <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4">System Configuration</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl">
                  <div>
                    <div className="font-bold text-slate-800">Autonomous Patrols</div>
                    <div className="text-sm text-slate-500">Allow rover to initiate scheduled patrols without manual approval.</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl">
                  <div>
                    <div className="font-bold text-slate-800">AI Confidence Threshold</div>
                    <div className="text-sm text-slate-500">Minimum confidence required for autonomous collection (%).</div>
                  </div>
                  <input type="number" defaultValue={75} className="w-20 px-3 py-1.5 border border-slate-200 rounded-lg text-sm font-mono text-center" />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl">
                  <div>
                    <div className="font-bold text-slate-800">Telemetry Sync Interval</div>
                    <div className="text-sm text-slate-500">Frequency of cloud data synchronization (seconds).</div>
                  </div>
                  <select className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm">
                    <option>Real-time (1s)</option>
                    <option>Balanced (5s)</option>
                    <option>Battery Saver (30s)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6 animate-[fadeIn_0.3s_ease]">
              <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4">Notification Preferences</h2>
              <div className="space-y-4">
                {['Critical Hardware Alerts', 'Mission Complete', 'Battery Warning (<20%)', 'Biohazard Pathogen Detected', 'Daily Summary Report'].map((label, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl">
                    <span className="font-bold text-slate-800">{label}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={i !== 4} />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6 animate-[fadeIn_0.3s_ease]">
              <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4">Security & Access</h2>
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm">
                <strong>Attention:</strong> Security changes require Supervisor elevation.
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Supervisor PIN</label>
                <input type="password" placeholder="••••" disabled className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 cursor-not-allowed" />
              </div>
            </div>
          )}

          {activeTab === 'account' && (
            <div className="space-y-6 animate-[fadeIn_0.3s_ease]">
              <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4">Operator Account</h2>
              <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-xl border border-slate-100">
                <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold shadow-md">OP</div>
                <div>
                  <div className="text-lg font-bold text-slate-800">Operator_01</div>
                  <div className="text-sm text-slate-500 mb-3">System Admin • Level 4 Clearance</div>
                  <button className="btn-secondary py-1.5 px-3 text-xs">Sign Out Session</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
