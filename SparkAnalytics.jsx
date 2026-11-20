import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Database, Code, BarChart, AlertTriangle, TrendingUp, Cpu, List, Info, Server, CheckCircle2, ChevronRight } from 'lucide-react';
import PipelineDiagram from '../components/ui/PipelineDiagram';

// 1. DATA INGESTION COMPONENT
function DataIngestion() {
  const [logs, setLogs] = useState([]);
  
  useEffect(() => {
    let id = 1000;
    const interval = setInterval(() => {
      const depts = ['ICU', 'Ward A', 'Ward B', 'Emergency', 'Pharmacy'];
      const types = ['Needle', 'Gauze', 'Glass', 'Medicine Waste', 'Bandage'];
      const log = {
        id: `M${id++}`,
        timestamp: new Date().toLocaleTimeString(),
        dept: depts[Math.floor(Math.random() * depts.length)],
        type: types[Math.floor(Math.random() * types.length)],
        status: Math.random() > 0.1 ? 'Collected' : 'Failed'
      };
      setLogs(prev => [log, ...prev].slice(0, 5));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card h-full">
      <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2"><Database size={16} className="text-blue-500"/> 1. Data Ingestion Stream</h3>
      <div className="bg-slate-900 rounded-lg p-3 font-mono text-[10px] h-48 overflow-hidden relative border border-slate-800">
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-slate-900 to-transparent h-4 z-10"></div>
        {logs.map((log, i) => (
          <motion.div 
            key={log.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1 - (i * 0.2), x: 0, y: i * 28 }}
            className="absolute left-3 right-3 flex justify-between items-center text-slate-300 border-b border-slate-800/50 pb-1"
          >
            <span className="text-slate-500 w-16">[{log.timestamp}]</span>
            <span className="w-16">{log.dept}</span>
            <span className="w-24 text-amber-400">{log.type}</span>
            <span className="w-12 text-slate-500">{log.id}</span>
            <span className={log.status === 'Collected' ? 'text-emerald-400' : 'text-red-400'}>{log.status}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// 3. SCALA CODE VIEWER
function ScalaCodeViewer() {
  const code = `import org.apache.spark.sql.SparkSession

object WasteAnalytics {
  def main(args: Array[String]): Unit = {
    val spark = SparkSession.builder()
      .appName("ABRS Analytics")
      .master("local[*]")
      .getOrCreate()

    val data = spark.read
      .option("header","true")
      .csv("waste_logs.csv")

    data.groupBy("department")
      .count()
      .show()

    spark.stop()
  }
}`;

  return (
    <div className="card h-full bg-slate-900 text-slate-300 border-none">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2"><Code size={16} className="text-orange-400"/> 3. Scala Analytics Engine</h3>
        <span className="text-[10px] bg-slate-800 px-2 py-1 rounded text-slate-400 font-mono border border-slate-700">WasteAnalytics.scala</span>
      </div>
      <pre className="font-mono text-[11px] leading-relaxed overflow-x-auto p-4 bg-[#0F172A] rounded-lg border border-slate-800 shadow-inner">
        <code>
          <span className="text-purple-400">import</span> <span className="text-slate-300">org.apache.spark.sql.SparkSession</span><br/><br/>
          <span className="text-purple-400">object</span> <span className="text-amber-300">WasteAnalytics</span> {'{'}<br/>
          {'  '}<span className="text-purple-400">def</span> <span className="text-blue-400">main</span>(args: <span className="text-emerald-300">Array</span>[<span className="text-emerald-300">String</span>]): <span className="text-emerald-300">Unit</span> = {'{'}<br/>
          {'    '}<span className="text-purple-400">val</span> spark = <span className="text-amber-300">SparkSession</span>.builder()<br/>
          {'      '}.appName(<span className="text-green-400">"ABRS Analytics"</span>)<br/>
          {'      '}.master(<span className="text-green-400">"local[*]"</span>)<br/>
          {'      '}.getOrCreate()<br/><br/>
          {'    '}<span className="text-purple-400">val</span> data = spark.read<br/>
          {'      '}.option(<span className="text-green-400">"header"</span>,<span className="text-green-400">"true"</span>)<br/>
          {'      '}.csv(<span className="text-green-400">"waste_logs.csv"</span>)<br/><br/>
          {'    '}data.groupBy(<span className="text-green-400">"department"</span>)<br/>
          {'      '}.count()<br/>
          {'      '}.show()<br/><br/>
          {'    '}spark.stop()<br/>
          {'  }'}<br/>
          {'}'}
        </code>
      </pre>
    </div>
  );
}

// 4. WASTE DISTRIBUTION ANALYSIS
function WasteDistribution() {
  const data = [
    { label: 'Needles', val: 85, color: '#EF4444' },
    { label: 'Gauze', val: 65, color: '#F59E0B' },
    { label: 'Medicine', val: 45, color: '#3B82F6' },
    { label: 'Glass', val: 30, color: '#8B5CF6' },
    { label: 'Bandage', val: 55, color: '#10B981' }
  ];

  return (
    <div className="card h-full">
      <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-6 flex items-center gap-2"><BarChart size={16} className="text-indigo-500"/> 4. Waste Distribution Analysis</h3>
      <div className="space-y-4">
        {data.map(d => (
          <div key={d.label}>
            <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
              <span>{d.label} Count</span>
              <span>{d.val}</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${d.val}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{ backgroundColor: d.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 5. DEPARTMENT HOTSPOT ANALYSIS
function HotspotAnalysis() {
  return (
    <div className="card h-full bg-gradient-to-br from-red-50 to-white border-red-100">
      <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-6 flex items-center gap-2"><AlertTriangle size={16} className="text-red-500"/> 5. Department Hotspot Analysis</h3>
      
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-sm border border-red-100 relative overflow-hidden mb-4">
        <motion.div 
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute inset-0 bg-red-500"
        />
        <AlertTriangle size={32} className="text-red-500 mb-2 relative z-10 animate-pulse" />
        <div className="text-sm font-bold text-red-600 tracking-widest relative z-10 mb-1">HOTSPOT DETECTED</div>
        <div className="text-2xl font-black text-slate-900 relative z-10 mb-2">ICU CORRIDOR</div>
        <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold relative z-10">Risk Score: 92%</div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-2 bg-slate-50 rounded border border-slate-100 flex justify-between"><span className="text-slate-500">ICU</span><span className="font-bold">142</span></div>
        <div className="p-2 bg-slate-50 rounded border border-slate-100 flex justify-between"><span className="text-slate-500">Ward A</span><span className="font-bold">86</span></div>
        <div className="p-2 bg-slate-50 rounded border border-slate-100 flex justify-between"><span className="text-slate-500">Ward B</span><span className="font-bold">54</span></div>
        <div className="p-2 bg-slate-50 rounded border border-slate-100 flex justify-between"><span className="text-slate-500">Emergency</span><span className="font-bold">98</span></div>
      </div>
    </div>
  );
}

// 6. DAILY COLLECTION ANALYSIS
function DailyAnalysis() {
  return (
    <div className="card h-full">
      <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-6 flex items-center gap-2"><TrendingUp size={16} className="text-emerald-500"/> 6. Daily Collection Analysis</h3>
      <div className="h-40 flex items-end gap-2 border-b border-l border-slate-200 pb-2 pl-2">
        {[30, 45, 25, 60, 80, 50, 90, 70, 40, 65, 85, 55].map((h, i) => (
          <div key={i} className="flex-1 flex flex-col justify-end group relative">
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 1, delay: i * 0.05 }}
              className="bg-emerald-400 hover:bg-emerald-500 rounded-t-sm w-full"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between text-[10px] text-slate-400 mt-2 font-mono">
        <span>00:00</span>
        <span>06:00</span>
        <span>12:00</span>
        <span>18:00</span>
        <span>24:00</span>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div>
          <div className="text-[10px] font-bold text-slate-500 uppercase">Mission Efficiency</div>
          <div className="text-lg font-bold text-slate-800">94.2%</div>
        </div>
        <div>
          <div className="text-[10px] font-bold text-slate-500 uppercase">Collections/Hr</div>
          <div className="text-lg font-bold text-slate-800">42.5</div>
        </div>
      </div>
    </div>
  );
}

// 7. PREDICTIVE INSIGHTS
function PredictiveInsights() {
  const insights = [
    { text: "ICU generates 35% of total waste.", type: "danger" },
    { text: "Needle incidents increased 12%.", type: "warning" },
    { text: "Ward A requires additional patrols.", type: "action" },
    { text: "Emergency corridor has recurring waste patterns.", type: "info" }
  ];

  const colors = {
    danger: "bg-red-50 border-red-200 text-red-700",
    warning: "bg-amber-50 border-amber-200 text-amber-700",
    action: "bg-indigo-50 border-indigo-200 text-indigo-700",
    info: "bg-blue-50 border-blue-200 text-blue-700"
  };

  return (
    <div className="card h-full">
      <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-6 flex items-center gap-2"><Cpu size={16} className="text-purple-500"/> 7. Predictive Insights</h3>
      <div className="space-y-3">
        {insights.map((ins, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-3 border rounded-lg text-sm font-medium flex items-start gap-3 ${colors[ins.type]}`}
          >
            <ChevronRight size={16} className="mt-0.5 shrink-0" />
            {ins.text}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// 8. SPARK CLUSTER STATUS
function ClusterStatus() {
  return (
    <div className="card h-full bg-slate-900 border-none text-white">
      <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-6 flex items-center gap-2"><Server size={16} className="text-emerald-400"/> 8. Spark Cluster Status</h3>
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: 'Spark Session', val: 'Active' },
          { label: 'Workers Online', val: '4/4' },
          { label: 'DataFrames', val: 'Loaded' },
          { label: 'Analytics', val: 'Running' }
        ].map((s, i) => (
          <div key={i} className="bg-slate-800 p-3 rounded-lg border border-slate-700 flex items-center gap-3">
            <CheckCircle2 size={16} className="text-emerald-400" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase">{s.label}</div>
              <div className="font-bold text-sm text-slate-200">{s.val}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 bg-slate-800 rounded-lg border border-slate-700">
        <div className="text-[10px] text-slate-400 uppercase mb-1">Records Processed</div>
        <div className="font-mono text-2xl font-bold text-emerald-400">1,248,592</div>
      </div>
    </div>
  );
}

// 9. DATASET VIEWER
function DatasetViewer() {
  return (
    <div className="card h-full overflow-hidden flex flex-col">
      <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2"><List size={16} className="text-blue-500"/> 9. Dataset Viewer (sample_waste_logs.csv)</h3>
      <div className="flex-1 overflow-auto border border-slate-200 rounded-lg">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 sticky top-0">
            <tr>
              <th className="p-2 font-mono text-slate-500 border-b">timestamp</th>
              <th className="p-2 font-mono text-slate-500 border-b">department</th>
              <th className="p-2 font-mono text-slate-500 border-b">waste_type</th>
              <th className="p-2 font-mono text-slate-500 border-b">mission_id</th>
              <th className="p-2 font-mono text-slate-500 border-b">collection_status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-mono text-[10px]">
            <tr><td className="p-2">10:00</td><td className="p-2 text-blue-600">ICU</td><td className="p-2 text-red-600">Needle</td><td className="p-2 text-slate-400">M001</td><td className="p-2 text-emerald-600">Collected</td></tr>
            <tr><td className="p-2">10:05</td><td className="p-2 text-blue-600">WardA</td><td className="p-2 text-red-600">Gauze</td><td className="p-2 text-slate-400">M002</td><td className="p-2 text-emerald-600">Collected</td></tr>
            <tr><td className="p-2">10:10</td><td className="p-2 text-blue-600">Emergency</td><td className="p-2 text-red-600">Glass</td><td className="p-2 text-slate-400">M003</td><td className="p-2 text-emerald-600">Collected</td></tr>
            <tr><td className="p-2">10:15</td><td className="p-2 text-blue-600">Pharmacy</td><td className="p-2 text-red-600">Bandage</td><td className="p-2 text-slate-400">M004</td><td className="p-2 text-emerald-600">Collected</td></tr>
            <tr><td className="p-2">10:20</td><td className="p-2 text-blue-600">ICU</td><td className="p-2 text-red-600">Needle</td><td className="p-2 text-slate-400">M005</td><td className="p-2 text-red-600">Failed</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// 10. REALISTIC PROJECT EXPLANATION
function ProjectExplanation() {
  return (
    <div className="card h-full bg-blue-50 border-blue-100">
      <h3 className="text-sm font-bold text-blue-900 uppercase tracking-wider mb-4 flex items-center gap-2"><Info size={16} className="text-blue-500"/> 10. How Spark Is Used In ABRS</h3>
      <div className="space-y-3 text-sm text-blue-800 leading-relaxed">
        <p>• The rover generates waste collection logs during patrols.</p>
        <p>• Logs are stored in CSV or JSON format in the data lake.</p>
        <p>• <strong>Apache Spark</strong> processes large amounts of rover data across distributed nodes.</p>
        <p>• <strong>Scala</strong> performs aggregation and analytics (using <code className="bg-blue-100 px-1 rounded">groupBy</code>, <code className="bg-blue-100 px-1 rounded">count</code>).</p>
        <p>• Results identify waste hotspots and distribution patterns.</p>
        <p>• Results help optimize rover patrol routes and frequency.</p>
        <p>• Results ultimately improve hospital waste management efficiency and safety.</p>
      </div>
    </div>
  );
}

export default function SparkAnalytics() {
  return (
    <div className="space-y-6 page-enter pb-12">
      <div className="flex justify-between items-end border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Spark Analytics</h1>
          <p className="text-slate-500 text-sm mt-2 max-w-3xl">
            Visualize how Apache Spark processes rover-generated waste collection data. This dashboard demonstrates the complete Big Data pipeline from ingestion to predictive insights using Scala.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* ROW 1 */}
        <div className="lg:col-span-1 h-[300px]"><DataIngestion /></div>
        <div className="lg:col-span-2 h-[300px]">
          <div className="card h-full">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Zap size={16} className="text-orange-500"/> 2. Spark Processing Pipeline
            </h3>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 h-48 flex items-center justify-center">
              <PipelineDiagram />
            </div>
          </div>
        </div>

        {/* ROW 2 */}
        <div className="lg:col-span-2 h-[400px]"><ScalaCodeViewer /></div>
        <div className="lg:col-span-1 h-[400px]"><ClusterStatus /></div>

        {/* ROW 3 */}
        <div className="lg:col-span-1 h-[350px]"><WasteDistribution /></div>
        <div className="lg:col-span-1 h-[350px]"><HotspotAnalysis /></div>
        <div className="lg:col-span-1 h-[350px]"><DailyAnalysis /></div>

        {/* ROW 4 */}
        <div className="lg:col-span-1 h-[350px]"><PredictiveInsights /></div>
        <div className="lg:col-span-1 h-[350px]"><DatasetViewer /></div>
        <div className="lg:col-span-1 h-[350px]"><ProjectExplanation /></div>
      </div>
    </div>
  );
}
