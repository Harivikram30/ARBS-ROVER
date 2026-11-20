import WasteDistributionPie from '../components/charts/WasteDistributionPie';
import WasteByDepartmentBar from '../components/charts/WasteByDepartmentBar';
import CollectionTrendsLine from '../components/charts/CollectionTrendsLine';
import CollectionMethodDoughnut from '../components/charts/CollectionMethodDoughnut';

export default function Analytics() {
  return (
    <div className="space-y-6 page-enter">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Analytics Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Operational metrics and historical waste data.</p>
        </div>
        <select className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>This Quarter</option>
          <option>Year to Date</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card h-96 flex flex-col">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-6">Waste Type Distribution</h3>
          <div className="flex-1 min-h-0 relative">
            <WasteDistributionPie />
          </div>
        </div>

        <div className="card h-96 flex flex-col">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-6">Waste By Department</h3>
          <div className="flex-1 min-h-0 relative">
            <WasteByDepartmentBar />
          </div>
        </div>

        <div className="card h-[400px] flex flex-col lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Collection Activity Trends (24h)</h3>
          </div>
          <div className="flex-1 min-h-0 relative">
            <CollectionTrendsLine />
          </div>
        </div>

        <div className="card h-[350px] flex flex-col">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-6">Collection Method Analysis</h3>
          <div className="flex-1 min-h-0 relative">
            <CollectionMethodDoughnut />
          </div>
        </div>
        
        <div className="card h-[350px] bg-[#1E293B] text-white flex flex-col items-center justify-center text-center p-8 border-none relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
          
          <h3 className="text-xl font-bold mb-4 relative z-10">Advanced Insights Ready</h3>
          <p className="text-slate-400 text-sm mb-8 max-w-sm relative z-10">
            For deeper, predictive analytics and cross-referenced pattern discovery powered by big data infrastructure, switch to the Spark Analytics engine.
          </p>
          <a href="/spark-analytics" className="btn-primary relative z-10">
            Launch Spark Engine
          </a>
        </div>
      </div>
    </div>
  );
}
