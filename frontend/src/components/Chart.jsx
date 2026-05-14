import React, { useEffect, useState } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import dashboardService from "../services/dashboardService";

export default function Chart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const res = await dashboardService.fetchChart();
        if (!mounted) return;
        setData(res.data || []);
      } catch (err) {
        console.error("Chart fetch error", err);
        setError(true);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false };
  }, []);

  if (loading) return <div className="panel" style={{ height: 260 }} />;
  if (error) return <div className="text-red-500">Failed to load chart data</div>;

  return (
    <div className="panel">
      <h4 className="panel-head">Income vs Expenses</h4>
      <div style={{ width: "100%", height: 260 }}>
        <ResponsiveContainer>
          <AreaChart data={data} margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="inc" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="exp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.24} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="income" stroke="#16a34a" fill="url(#inc)" />
            <Area type="monotone" dataKey="expenses" stroke="#ef4444" fill="url(#exp)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
