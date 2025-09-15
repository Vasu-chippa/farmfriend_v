/* apps/frontend/src/App.js */
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// Guards
import RequireAuth from "./components/guards/RequireAuth";

// Layouts
import AdminLayout from "./layouts/AdminLayout";
import BuyerLayout from "./layouts/BuyerLayout"; // ✅ added

// Home
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";

// Auth Pages
import FarmerLogin from "./pages/Auth/FarmerLogin/FarmerLogin";
import FarmerRegister from "./pages/Auth/FarmerRegister/FarmerRegister";
import BuyerLogin from "./pages/Auth/BuyerLogin/BuyerLogin";
import BuyerRegister from "./pages/Auth/BuyerRegister/BuyerRegister";
import AgentLogin from "./pages/Auth/AgentLogin/AgentLogin";
import AdminLogin from "./pages/Auth/AdminLogin/AdminLogin";

// Farmer Section
import FarmerDashboard from "./pages/Farmer/Dashboard/FarmerDashboard";
import FarmerCrops from "./pages/Farmer/Crops/FarmerCrops";
import HarvestList from "./pages/Farmer/Harvest/HarvestList";
import CropDetailsView from "./pages/Farmer/Crops/CropDetailsView"; // ✅ crops page details
import CropDetails from "./pages/Farmer/Marketplace/CropDetails"; // marketplace details
import ExpenseTracker from "./pages/Farmer/ExpenseTracker/ExpenseTracker";
import FarmerMarketplace from "./pages/Farmer/Marketplace/FarmerMarketplace";
import FarmerProfile from "./pages/Farmer/Profile/FarmerProfile";
import CropRecords from "./pages/Farmer/Harvest/CropRecords"; // crop records page

// Buyer Section
import BuyerDashboard from "./pages/Buyer/Dashboard/BuyerDashboard";
import Marketplace from "./pages/Buyer/Marketplace/Marketplace";
import CropPurchase from "./pages/Buyer/CropPurchase/CropPurchase";
import MyOrders from "./pages/Buyer/Orders/MyOrders";
import Profile from "./pages/Buyer/Profile/Profile";

// Agent Section
import AgentDashboard from "./pages/Agent/Dashboard/AgentDashboard";

// Admin Section Pages
import AdminDashboard from "./pages/Admin/Dashboard/AdminDashboard";
import FarmersList from "./pages/Admin/FarmersList";
import BuyersList from "./pages/Admin/BuyersList";
import AgentsList from "./pages/Admin/AgentsList";

function App() {
  return (
    <>
      {/* Public + Auth use Navbar */}
      <Navbar />
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Auth */}
        <Route path="/farmer/login" element={<FarmerLogin />} />
        <Route path="/farmer/register" element={<FarmerRegister />} />
        <Route path="/buyer/login" element={<BuyerLogin />} />
        <Route path="/buyer/register" element={<BuyerRegister />} />
        <Route path="/agent/login" element={<AgentLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Farmer protected routes */}
        <Route
          path="/farmer/dashboard"
          element={
            <RequireAuth allowedRoles={["farmer"]} redirectTo="/farmer/login">
              <FarmerDashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/farmer/crops"
          element={
            <RequireAuth allowedRoles={["farmer"]} redirectTo="/farmer/login">
              <FarmerCrops />
            </RequireAuth>
          }
        />
        <Route
          path="/farmer/harvest"
          element={
            <RequireAuth allowedRoles={["farmer"]} redirectTo="/farmer/login">
              <HarvestList />
            </RequireAuth>
          }
        />
        <Route
          path="/farmer/harvest/:cropId"
          element={
            <RequireAuth allowedRoles={["farmer"]} redirectTo="/farmer/login">
              <HarvestList />
            </RequireAuth>
          }
        />
        <Route
          path="/farmer/crop-details/:id"
          element={
            <RequireAuth allowedRoles={["farmer"]} redirectTo="/farmer/login">
              <CropDetailsView />
            </RequireAuth>
          }
        />
        <Route
          path="/farmer/expenses"
          element={
            <RequireAuth allowedRoles={["farmer"]} redirectTo="/farmer/login">
              <ExpenseTracker />
            </RequireAuth>
          }
        />
        <Route
          path="/farmer/marketplace"
          element={
            <RequireAuth allowedRoles={["farmer"]} redirectTo="/farmer/login">
              <FarmerMarketplace />
            </RequireAuth>
          }
        />
        <Route
          path="/farmer/marketplace/:id"
          element={
            <RequireAuth allowedRoles={["farmer"]} redirectTo="/farmer/login">
              <CropDetails />
            </RequireAuth>
          }
        />
        <Route
          path="/farmer/profile"
          element={
            <RequireAuth allowedRoles={["farmer"]} redirectTo="/farmer/login">
              <FarmerProfile />
            </RequireAuth>
          }
        />
        <Route
          path="/farmer/cropdetailsview/:id"
          element={<CropDetailsView />}
        />
        <Route
          path="/farmer/crop-records/:cropId"
          element={
            <RequireAuth allowedRoles={["farmer"]} redirectTo="/farmer/login">
              <CropRecords />
            </RequireAuth>
          }
        />

        {/* Buyer protected routes with BuyerLayout ✅ */}
        <Route
          path="/buyer/dashboard"
          element={
            <RequireAuth allowedRoles={["buyer"]} redirectTo="/buyer/login">
              <BuyerLayout>
                <BuyerDashboard />
              </BuyerLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/buyer/marketplace"
          element={
            <RequireAuth allowedRoles={["buyer"]} redirectTo="/buyer/login">
              <BuyerLayout>
                <Marketplace />
              </BuyerLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/buyer/marketplace/:id"
          element={
            <RequireAuth allowedRoles={["buyer"]} redirectTo="/buyer/login">
              <BuyerLayout>
                <CropPurchase />
              </BuyerLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/buyer/orders"
          element={
            <RequireAuth allowedRoles={["buyer"]} redirectTo="/buyer/login">
              <BuyerLayout>
                <MyOrders />
              </BuyerLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/buyer/profile"
          element={
            <RequireAuth allowedRoles={["buyer"]} redirectTo="/buyer/login">
              <BuyerLayout>
                <Profile />
              </BuyerLayout>
            </RequireAuth>
          }
        />

        {/* Agent protected route */}
        <Route
          path="/agent/dashboard"
          element={
            <RequireAuth allowedRoles={["agent"]} redirectTo="/agent/login">
              <AgentDashboard />
            </RequireAuth>
          }
        />

        {/* Admin section protected + layout with nested routes */}
        <Route
          element={
            <RequireAuth allowedRoles={["admin"]} redirectTo="/admin/login" />
          }
        >
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="farmers" element={<FarmersList />} />
            <Route path="buyers" element={<BuyersList />} />
            <Route path="agents" element={<AgentsList />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
