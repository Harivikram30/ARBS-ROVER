import { useSimStore } from '../store/simulationStore';
import { Activity, Clock, Battery, Wifi, ShieldAlert, Zap, Box, Crosshair, ArrowRight, MapPin, CheckCircle2, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import HospitalBlueprint from '../components/simulation/HospitalBlueprint';
import { useEffect, useRef } from 'react';

export default function OperationsCenter() {
  const sim = useSimStore();
  const feedRef = useRef(null);

  // Auto-scroll the live feed
  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [sim.activityFeed]);

  const stages = [
    { name: 'Patrol', status: 'Patrolling', icon: RotateCcw },
    { name: 'Detect', status: 'Stopped', icon: Crosshair },
    { name: 'Route', status: 'Routing', icon: MapPin },
    { name: 'Travel', status: 'Traveling', icon: ArrowRight },
    { name: 'Collect', status: 'Collecting', icon: Box },
    { name: 'Sanitize', status: 'Sanitizing', icon: Zap },
  ];

  return (
    <div className="h-full flex flex-col gap-4 page-enter">
      {/* Top Title Bar */}
      <div className="flex justify-between items-end flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight uppercase">Operations Center</h1>
          <p className="text-slate-500 text-sm mt-1">Primary Autonomous Command & Control Interface</p>
        </div>
        <div className="flex gap-2">
           {stages.map((stage, i) => (
             <div key={stage.name} className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider transition-all duration-300 ${sim.missionStatus === stage.status ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/30 scale-105' : 'bg-white text-slate-400 border-slate-200'}`}>
               <stage.icon size={14} /> {stage.name}
             </div>
           ))}
        </div>
      </div>

      {/* Main 3-Column Layout */}
      <div className="flex-1 flex gap-4 min-h-0">
        
        {/* LEFT PANEL: Mission Timeline (20%) */}
        <div className="w-1/5 card p-0 flex flex-col overflow-hidden shadow-sm border border-slate-200 bg-white">
          <div className="p-3 border-b border-slate-100 bg-slate-50 font-bold text-xs text-slate-700 flex items-center gap-2 uppercase tracking-wider">
            <Clock size={16} className="text-blue-600"/> Mission Timeline
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
              {sim.activityFeed.slice(0, 15).map((log, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={log.id} 
                  className="flex gap-3 relative"
                >
                  <div className="flex flex-col items-center">
                    <div className={`w-2.5 h-2.5 rounded-full ${i === 0 ? 'bg-blue-600 ring-4 ring-blue-100' : 'bg-slate-300'} z-10`}></div>
                    {i !== 14 && <div className="w-px h-full bg-slate-200 mt-1 absolute top-2.5"></div>}
                  </div>
                  <div className="pb-3 w-full">
                    <div className="flex justify-between items-center w-full mb-0.5">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{new Date(log.timestamp).toLocaleTimeString()}</div>
                    </div>
                    <div className="text-xs font-bold text-slate-800">{log.action}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">{log.text}</div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* CENTER PANEL: Hospital Digital Twin (60%) */}
        <div className="w-3/5 card p-0 overflow-hidden bg-slate-900 border-none shadow-lg flex flex-col relative min-h-[500px]">
           <div className="p-3 border-b border-slate-800 bg-slate-900/80 backdrop-blur z-10 flex justify-between items-center absolute top-0 w-full">
            <div className="font-bold text-xs text-slate-300 flex items-center gap-2 uppercase tracking-wider">
              <Activity size={14} className="text-blue-400"/> Live Hospital Simulation
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] font-mono text-emerald-400">TELEMETRY LINKED</span>
              </div>
            </div>
          </div>
          
          <div className="flex-1 w-full h-full pt-10">
            <HospitalBlueprint />
          </div>
        </div>

        {/* RIGHT PANEL: Live Rover Data (20%) */}
        <div className="w-1/5 flex flex-col gap-4">
          
          {/* Miniature Rover Visual */}
          <div className="card p-0 overflow-hidden shadow-sm border border-slate-200 bg-slate-900 flex flex-col h-48 flex-shrink-0 relative">
             <div className="p-3 border-b border-slate-800 bg-slate-900/80 backdrop-blur font-bold text-[10px] text-slate-300 flex justify-between items-center z-10 uppercase tracking-widest">
              <span>Rover Status</span>
              <span className="text-emerald-400 animate-pulse">● LIVE</span>
            </div>
            <div className="flex-1 relative flex items-center justify-center overflow-hidden">
               {/* Ambient glowing effect */}
               <div className="absolute inset-0 bg-blue-500/10 blur-xl rounded-full scale-150" />
               
               <svg viewBox="-40 -40 80 80" className="w-24 h-24 relative z-10">
                  <motion.g 
                    animate={{ y: sim.missionStatus === 'Patrolling' || sim.missionStatus === 'Traveling' || sim.missionStatus === 'Returning' ? [-2, 2, -2] : 0 }}
                    transition={{ repeat: Infinity, duration: 0.5 }}
                  >
                    {/* Chassis */}
                    <rect x="-20" y="-28" width="40" height="56" rx="6" fill="#1E293B" stroke="#475569" strokeWidth="2" />
                    <rect x="-16" y="-24" width="32" height="48" rx="4" fill="#334155" />
                    {/* Waste Compartments */}
                    <rect x="-14" y="6" width="12" height="14" rx="2" fill="#EF4444" opacity="0.8" />
                    <rect x="2" y="6" width="12" height="14" rx="2" fill="#F59E0B" opacity="0.8" />
                    {/* Brain / Sensors */}
                    <circle cx="0" cy="-4" r="8" fill="#0F172A" />
                    <circle cx="0" cy="-4" r="4" fill="#3B82F6">
                       <animate attributeName="opacity" values="0.5;1;0.5" dur="1s" repeatCount="indefinite" />
                    </circle>
                    {/* Camera */}
                    <rect x="-8" y="-28" width="16" height="6" rx="2" fill="#0284C7" />
                    {/* Sweeper */}
                    <rect x="-22" y="-32" width="44" height="4" rx="1" fill="#FCD34D" />
                    <path d="M -18 -32 L -14 -36 L 14 -36 L 18 -32 Z" fill="#94A3B8" />
                    
                    {/* Wheels */}
                    <rect x="-24" y="-18" width="4" height="14" rx="2" fill="#020617" />
                    <rect x="20" y="-18" width="4" height="14" rx="2" fill="#020617" />
                    <rect x="-24" y="10" width="4" height="14" rx="2" fill="#020617" />
                    <rect x="20" y="10" width="4" height="14" rx="2" fill="#020617" />
                  </motion.g>
               </svg>
            </div>
            <div className="absolute bottom-0 w-full p-2 bg-slate-800/80 border-t border-slate-700 flex justify-between items-center text-[10px] uppercase font-bold text-slate-400">
              <span>State</span>
              <span className="text-blue-400">{sim.missionStatus}</span>
            </div>
          </div>

          <div className="card shadow-sm border border-slate-200 bg-white flex-1 p-4 flex flex-col min-h-0 overflow-y-auto">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100 flex-shrink-0">Live Telemetry</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  <span>Battery</span>
                  <span className={sim.battery < 20 ? 'text-red-500' : 'text-slate-700'}>{sim.battery.toFixed(1)}%</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${sim.battery > 50 ? 'bg-emerald-500' : sim.battery > 20 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${sim.battery}%` }}></div>
                </div>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
                <span className="text-xs font-semibold text-slate-600">Location</span>
                <span className="text-xs font-bold text-blue-600 truncate max-w-[90px] text-right">{sim.currentRoom}</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
                <span className="text-xs font-semibold text-slate-600">Target</span>
                <span className="text-[10px] font-bold text-amber-500 truncate max-w-[90px] text-right uppercase bg-amber-50 px-1 rounded">{sim.currentTarget ? sim.currentTarget.object : 'NONE'}</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
                <span className="text-xs font-semibold text-slate-600">Collected</span>
                <span className="text-xs font-bold text-emerald-600">{sim.wasteCollected}</span>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span className="text-xs font-semibold text-slate-600">Sanitized</span>
                <span className="text-xs font-bold text-purple-600">{sim.areasSanitized}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM PANEL: Live Event Feed */}
      <div className="h-32 bg-slate-900 rounded-xl shadow-inner border border-slate-800 flex flex-col flex-shrink-0 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-blue-600 flex items-center justify-center flex-col gap-1 z-10">
          <Activity size={14} className="text-white animate-pulse" />
        </div>
        <div 
          ref={feedRef}
          className="flex-1 overflow-y-auto pl-12 pr-4 py-2 font-mono text-[11px] leading-relaxed scroll-smooth"
        >
          {/* We reverse it so it appends at the bottom naturally */}
          {[...sim.activityFeed].reverse().map((log) => (
            <div key={log.id} className="flex gap-4 text-slate-400 py-0.5 hover:bg-slate-800/50 px-2 rounded">
              <span className="text-slate-500 shrink-0">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
              <span className={`shrink-0 w-32 uppercase ${
                log.action.includes('Detected') ? 'text-red-400' :
                log.action.includes('Sanitized') ? 'text-purple-400' :
                log.action.includes('Collected') ? 'text-emerald-400' :
                'text-blue-400'
              }`}>{log.action}</span>
              <span className="text-slate-300 truncate">{log.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
