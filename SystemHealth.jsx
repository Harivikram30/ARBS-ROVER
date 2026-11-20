import { Cpu, MemoryStick, Thermometer, Battery, Wifi, Activity } from 'lucide-react';
import GaugeChart from '../components/ui/GaugeChart';
import { useSimStore } from '../store/simulationStore';

export default function SystemHealth() {
  const sim = useSimStore();

  return (
    <div className="space-y-6 page-enter">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">System Health</h1>
          <p className="text-slate-500 text-sm mt-1">Real-time hardware diagnostics and telemetry.</p>
        </div>
      </div>

      {/* Main Gauges */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card flex flex-col items-center justify-center py-8">
          <GaugeChart value={sim.battery} label="Battery Level" color={sim.battery > 50 ? '#10B981' : '#F59E0B'} />
        </div>
        <div className="card flex flex-col items-center justify-center py-8">
          <GaugeChart value={sim.cpuUsage} label="CPU Usage" color="#2563EB" />
        </div>
        <div className="card flex flex-col items-center justify-center py-8">
          <GaugeChart value={sim.memoryUsage} label="Memory Usage" color="#8B5CF6" />
        </div>
        <div className="card flex flex-col items-center justify-center py-8">
          <GaugeChart value={sim.wifiSignal} label="Signal Strength" color="#10B981" />
        </div>
      </div>

      {/* Hardware Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-6">Subsystem Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
              <div className="flex items-center gap-3">
                <Thermometer size={18} className="text-slate-500" />
                <span className="font-semibold text-slate-700">Core Temperature</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm">{sim.temperature.toFixed(1)}°C</span>
                <span className="badge badge-green">Nominal</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
              <div className="flex items-center gap-3">
                <Activity size={18} className="text-slate-500" />
                <span className="font-semibold text-slate-700">Drive Motors</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm">3400 RPM</span>
                <span className="badge badge-green">Operational</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
              <div className="flex items-center gap-3">
                <Cpu size={18} className="text-slate-500" />
                <span className="font-semibold text-slate-700">Sensor Array (LiDAR / Vision)</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="badge badge-green">All Active</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
              <div className="flex items-center gap-3">
                <Battery size={18} className="text-slate-500" />
                <span className="font-semibold text-slate-700">Battery Voltage</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm">{sim.batteryVoltage.toFixed(1)}V</span>
                <span className="badge badge-green">Stable</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-slate-800 text-white border-none flex flex-col">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Diagnostic Logs</h3>
          <div className="flex-1 bg-slate-900 rounded-xl p-4 font-mono text-xs text-slate-400 space-y-2 overflow-y-auto max-h-64 border border-slate-700">
            <div><span className="text-emerald-400">[SYS]</span> Self-test passed. All systems green.</div>
            <div><span className="text-blue-400">[NET]</span> Encrypted connection established to Command Center.</div>
            <div><span className="text-slate-500">[MEM]</span> Garbage collection completed (42ms).</div>
            <div><span className="text-emerald-400">[CAM]</span> Vision system calibrated. Model weights loaded.</div>
            <div><span className="text-amber-400">[PWR]</span> Minor voltage drop detected during arm extension (ignored).</div>
            <div><span className="text-emerald-400">[NAV]</span> Mapping node synchronized with hospital floorplan v2.1.</div>
            <div><span className="text-slate-500">[SYS]</span> Heartbeat ACK received (12ms).</div>
          </div>
        </div>
      </div>
    </div>
  );
}
