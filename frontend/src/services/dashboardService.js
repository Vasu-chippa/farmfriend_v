import API from "../api";

export const fetchSummary = () => API.get("/dashboard/summary");
export const fetchChart = () => API.get("/dashboard/chart");
export const fetchStats = () => API.get("/dashboard/stats");

const dashboardService = { fetchSummary, fetchChart, fetchStats };

export default dashboardService;
