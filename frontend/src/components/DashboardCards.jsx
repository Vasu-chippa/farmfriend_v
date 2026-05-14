import React, { useEffect, useState } from "react";
import dashboardService from "../services/dashboardService";

const Skeleton = ({ className = "" }) => (
  <div className={`card ${className}`} style={{ minHeight: 80 }} />
);

const Card = ({ title, value, currency = false, loading, error, icon }) => {
  if (loading) return <Skeleton />;
  if (error) return (
    <div className="card">
      <div className="label small">{title}</div>
      <div className="text-red-500">Failed to load</div>
    </div>
  );

  return (
    <div className="summary-card">
      <div className="icon-circle">{icon || '🌱'}</div>
      <div className="summary-body">
        <div className="label">{title}</div>
        <div className="value">{currency ? `₹${value}` : value}</div>
      </div>
    </div>
  );
};

export default function DashboardCards() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const res = await dashboardService.fetchSummary();
        if (!mounted) return;
        setData(res.data);
      } catch (err) {
        console.error("Dashboard summary fetch error", err);
        setError(true);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false };
  }, []);

  return (
    <div className="summary-grid">
      <Card title="Total Crops" value={data?.totalCrops ?? 0} loading={loading} error={error} icon="🌱" />
      <Card title="Total Harvested Crops" value={data?.harvestedCrops ?? 0} loading={loading} error={error} icon="🌾" />
      <Card title="Total Expenses" value={data?.totalExpenses ?? 0} loading={loading} error={error} currency={true} icon="💸" />
      <Card title="Profit / Loss" value={data?.profitLoss ?? 0} loading={loading} error={error} currency={true} icon="💰" />
    </div>
  );
}
