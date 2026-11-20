import { Play, Pause, Square, Navigation, MapPin, Target, Activity } from 'lucide-react';
import { useSimStore } from '../store/simulationStore';
import { motion } from 'framer-motion';

export default function MissionControl() {
  const sim = useSimStore();

  const handleStart = () => sim.setMissionStatus('Patrolling');
  const handlePause = () => sim.setMissionStatus('Paused');
  const handleStop = () => sim.setMissionStatus('Idle');

  // Approximate progress based on distance (hack for demo)
  const progressPercent = Math.min(100, (sim.distanceTraveled / 1000) * 100);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 page-enter"
    >
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Mission Control</h1>
          <p className="text-slate-500 text-sm mt-1">Manage active autonomous protocols and routing.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className={`btn-primary shadow-lg shadow-blue-500/20 ${sim.missionStatus !== 'Paused' && sim.missionStatus !== 'Idle' ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={handleStart} disabled={sim.missionStatus !== 'Paused' && sim.missionStatus !== 'Idle'}>
            <Play size={16} fill="currentColor" /> Start Patrol
          </button>
          <button className={`btn-warning shadow-lg shadow-amber-500/20 ${sim.missionStatus === 'Paused' || sim.missionStatus === 'Idle' ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={handlePause} disabled={sim.missionStatus === 'Paused' || sim.missionStatus === 'Idle'}>
            <Pause size={16} fill="currentColor" /> Pause
          </button>
          <button className="btn-danger shadow-lg shadow-red-500/20" onClick={handleStop}>
            <Square size={16} fill="currentColor" /> Abort
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card shadow-sm border border-slate-200">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-6 pb-2 border-b border-slate-100 flex items-center gap-2">
            <Navigation size={18} className="text-blue-500"/> Active Mission Status
          </h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-bold text-slate-600">Mission Progress</span>
                <span className="text-2xl font-bold font-mono text-blue-600">{progressPercent.toFixed(1)}%</span>
              </div>
              <div className="h-4 bg-slate-100 rounded-full overflow-hidden p-0.5 shadow-inner">
                <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-1000 relative" style={{ width: `${Math.max(2, progressPercent)}%` }}>
                  <div className="absolute top-0 right-0 bottom-0 w-8 bg-white/20 blur-sm animate-[pulse_2s_infinite]" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Current State</div>
                <div className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Activity size={18} className="text-blue-500" />
                  {sim.missionStatus}
                </div>
              </div>
              
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Current Target</div>
                <div className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Target size={18} className="text-amber-500" />
                  {sim.currentTarget ? sim.currentTarget.object : 'None'}
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Current Position</div>
                <div className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <MapPin size={18} className="text-blue-500" />
                  {sim.currentRoom}
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Next Waypoint</div>
                <div className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Navigation size={18} className="text-indigo-500" />
                  {sim.nextRoom}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-slate-600">Rover Speed Control</span>
                <span className="text-sm font-mono font-bold text-blue-600">1.2 m/s</span>
              </div>
              <input type="range" min="0.5" max="2.0" step="0.1" defaultValue="1.2" className="w-full accent-blue-600" />
            </div>
          </div>
        </div>

        <div className="card shadow-sm border border-slate-200 bg-slate-900 p-0 overflow-hidden flex flex-col">
          <div className="p-3 border-b border-slate-800 bg-slate-900/80 backdrop-blur z-10 flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Target size={18} className="text-red-500"/> Live Vision Feed
            </h3>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-[10px] font-mono text-red-400">REC</span>
            </div>
          </div>
          <div className="flex-1 relative bg-slate-800 overflow-hidden">
            {/* Simulated Camera View SVG */}
            <svg viewBox="0 0 600 400" className="w-full h-full absolute inset-0">
              <defs>
                <pattern id="cam-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" strokeWidth="0.5"/>
                </pattern>
                <filter id="noise">
                  <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch"/>
                  <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.1 0" />
                </filter>
                <linearGradient id="scanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0"/>
                  <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.5"/>
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0"/>
                </linearGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#cam-grid)" />
              <rect width="100%" height="100%" style={{ filter: 'url(#noise)', opacity: 0.1 }} />
              
              {/* Floor Perspective lines */}
              <line x1="300" y1="200" x2="0" y2="400" stroke="#475569" strokeWidth="2" opacity="0.3" />
              <line x1="300" y1="200" x2="600" y2="400" stroke="#475569" strokeWidth="2" opacity="0.3" />

              {sim.missionStatus === 'Collecting' && sim.currentTarget ? (
                <g>
                  {/* Bounding Box */}
                  <rect x="250" y="250" width="100" height="80" fill="none" stroke="#EF4444" strokeWidth="3" strokeDasharray="10 5" className="animate-[pulse_1s_infinite]" />
                  
                  {/* Crosshairs */}
                  <line x1="300" y1="230" x2="300" y2="270" stroke="#EF4444" strokeWidth="2" />
                  <line x1="280" y1="290" x2="320" y2="290" stroke="#EF4444" strokeWidth="2" />
                  
                  {/* Info Tag */}
                  <rect x="250" y="225" width="100" height="20" fill="#EF4444" />
                  <text x="300" y="240" fill="white" fontSize="12" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                    {sim.currentTarget.object.toUpperCase()}
                  </text>
                  <text x="360" y="340" fill="#EF4444" fontSize="12" fontFamily="monospace">CONFIDENCE: 98%</text>
                  <text x="360" y="355" fill="#EF4444" fontSize="12" fontFamily="monospace">DIST: 0.2M</text>
                </g>
              ) : (
                <g>
                  {/* Scanning beam when idling/patrolling */}
                  <line x1="0" y1="200" x2="600" y2="200" stroke="#3B82F6" strokeWidth="2" opacity="0.3">
                    <animate attributeName="y1" values="0;400;0" dur="4s" repeatCount="indefinite" />
                    <animate attributeName="y2" values="0;400;0" dur="4s" repeatCount="indefinite" />
                  </line>
                  <rect x="0" y="0" width="600" height="400" fill="url(#scanGrad)" opacity="0.05">
                    <animate attributeName="y" values="-400;400" dur="4s" repeatCount="indefinite" />
                  </rect>
                  <text x="300" y="250" fill="#3B82F6" fontSize="14" fontFamily="monospace" textAnchor="middle" opacity="0.5">SCANNING ENVIRONMENT...</text>
                </g>
              )}

              {/* HUD Elements */}
              <text x="20" y="30" fill="#94A3B8" fontSize="12" fontFamily="monospace">CAM-FRONT-01</text>
              <text x="20" y="45" fill="#94A3B8" fontSize="12" fontFamily="monospace">FPS: 30</text>
              <text x="500" y="30" fill="#94A3B8" fontSize="12" fontFamily="monospace">MODEL: YOLOV8</text>
              
              {/* Center crosshair */}
              <path d="M 290 200 L 310 200 M 300 190 L 300 210" stroke="#64748B" strokeWidth="1" opacity="0.5" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
