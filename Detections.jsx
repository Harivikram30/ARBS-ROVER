import { useState } from 'react';
import { Filter, Search, Download, ArrowUpDown } from 'lucide-react';
import { initialDetections } from '../data/mockDetections';
import StatusBadge from '../components/ui/StatusBadge';
import { useSimStore } from '../store/simulationStore';

export default function Detections() {
  const sim = useSimStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortField, setSortField] = useState('timestamp');
  const [sortOrder, setSortOrder] = useState('desc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const combinedData = [...sim.resolvedDetections.map(d => ({...d, confidence: 99, location: d.location || 'Hospital Corridor'})), ...initialDetections];

  const filteredData = combinedData
    .filter(d => 
      (filterCategory === 'All' || d.category === filterCategory) &&
      (d.object.toLowerCase().includes(searchTerm.toLowerCase()) || d.location.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      let comparison = 0;
      if (a[sortField] > b[sortField]) comparison = 1;
      else if (a[sortField] < b[sortField]) comparison = -1;
      return sortOrder === 'desc' ? comparison * -1 : comparison;
    });

  return (
    <div className="space-y-6 page-enter">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Hazard Detections Database</h1>
          <p className="text-slate-500 text-sm mt-1">Historical log of all AI-classified medical waste anomalies.</p>
        </div>
        <button className="btn-secondary"><Download size={16}/> Export CSV</button>
      </div>

      <div className="card shadow-sm border border-slate-200 bg-white">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search objects or locations..." 
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-slate-400" />
            <select 
              className="border border-slate-200 bg-slate-50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Sharps">Sharps</option>
              <option value="Biohazard">Biohazard</option>
              <option value="General">General</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-3 font-semibold cursor-pointer hover:text-slate-800 transition-colors" onClick={() => handleSort('object')}>
                  <div className="flex items-center gap-1">Object <ArrowUpDown size={12}/></div>
                </th>
                <th className="p-3 font-semibold cursor-pointer hover:text-slate-800 transition-colors" onClick={() => handleSort('category')}>
                  <div className="flex items-center gap-1">Category <ArrowUpDown size={12}/></div>
                </th>
                <th className="p-3 font-semibold cursor-pointer hover:text-slate-800 transition-colors" onClick={() => handleSort('confidence')}>
                  <div className="flex items-center gap-1">Confidence <ArrowUpDown size={12}/></div>
                </th>
                <th className="p-3 font-semibold cursor-pointer hover:text-slate-800 transition-colors" onClick={() => handleSort('location')}>
                  <div className="flex items-center gap-1">Location <ArrowUpDown size={12}/></div>
                </th>
                <th className="p-3 font-semibold">Collection Method</th>
                <th className="p-3 font-semibold cursor-pointer hover:text-slate-800 transition-colors" onClick={() => handleSort('timestamp')}>
                  <div className="flex items-center gap-1">Timestamp <ArrowUpDown size={12}/></div>
                </th>
                <th className="p-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredData.map(d => (
                <tr key={d.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-semibold text-slate-800">{d.object}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      d.category === 'Sharps' ? 'bg-red-100 text-red-700' :
                      d.category === 'Biohazard' ? 'bg-amber-100 text-amber-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {d.category}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: `${d.confidence}%` }}></div>
                      </div>
                      <span className="font-mono text-slate-600 text-xs">{d.confidence}%</span>
                    </div>
                  </td>
                  <td className="p-3 text-slate-600">{d.location}</td>
                  <td className="p-3 text-slate-600">{d.object.includes('Needle') || d.object.includes('Syringe') ? 'Robotic Arm' : 'Sweeper'}</td>
                  <td className="p-3 text-slate-500 font-mono text-xs">{new Date(d.timestamp).toLocaleString()}</td>
                  <td className="p-3"><StatusBadge status={d.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredData.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              No detections found matching your filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
