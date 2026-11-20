import HospitalBlueprint from '../components/simulation/HospitalBlueprint';
import { Activity } from 'lucide-react';
import { useSimStore } from '../store/simulationStore';

export default function DigitalTwinFullscreen() {
  const { missionStatus } = useSimStore();

  return (
    <div className="h-full flex flex-col gap-4 page-enter">
      <div className="flex justify-between items-end flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight uppercase">Hospital Digital Twin</h1>
          <p className="text-slate-500 text-sm mt-1">Live 2D Spatial Simulation Environment</p>
        </div>
        <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 px-4 py-2 rounded-lg text-sm font-bold text-blue-700">
          <Activity size={18} /> {missionStatus}
        </div>
      </div>

      <div className="flex-1 card p-2 bg-slate-900 border-none shadow-xl relative overflow-hidden flex flex-col">
        <HospitalBlueprint />
      </div>
    </div>
  );
}
