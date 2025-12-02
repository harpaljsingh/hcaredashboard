import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';

interface Admission { date: string; count: number; }
interface Denial { reason: string; rate: number; }
interface Occupancy { ward: string; occupied: number; total: number; }

function App() {
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [denials, setDenials] = useState<Denial[]>([]);
  const [occupancy, setOccupancy] = useState<Occupancy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  
  const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const fetchData = async () => {
    try {
      setLoading(true);
      const [admRes, denRes, occRes] = await Promise.all([
        axios.get(`${baseURL}/metrics/admissions`),
        axios.get(`${baseURL}/metrics/denials`),
        axios.get(`${baseURL}/metrics/bed-occupancy`)
      ]);
      setAdmissions(admRes.data);
      setDenials(denRes.data);
      setOccupancy(occRes.data);
    } catch (err) {
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);
    
  const pieData = occupancy.map(o => ({
    name: o.ward,
    value: Math.round((o.occupied / o.total) * 100)
  }));

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  if (loading) return <div className="p-8 text-2xl">Loading dashboard...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Healthcare Analytics Dashboard</h1>
        <p className="text-gray-600 mt-2">Real-time KPIs • Built with React + TypeScript + NestJS</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {/* Admissions Trend */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Daily Admissions (Last 30 Days)</h2>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={admissions}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={3} name="Admissions" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Claim Denials */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-red-700">Top Claim Denial Reasons (%)</h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={denials}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="reason" angle={-15} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="rate" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Bed Occupancy */}
        <div className="bg-white rounded-xl shadow-lg p-6 lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-4 text-emerald-700">Current Bed Occupancy by Ward</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%" cy="50%" labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100} fill="#8884d8" dataKey="value"
                >
                 {pieData.map((_entry, i) => (
  <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div className="space-y-3">
              {occupancy.map((o, i) => (
                <div key={o.ward} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <span className="font-medium">{o.ward}</span>
                  <span className="text-lg font-bold" style={{ color: COLORS[i] }}>
                    {o.occupied} / {o.total} beds ({Math.round((o.occupied/o.total)*100)}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-12 text-center text-gray-500">
        Built from scratch in one weekend by a Data Engineer learning TypeScript
      </footer>
    </div>
  );
}

export default App;