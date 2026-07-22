import { createBrowserRouter,Navigate, Outlet } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { LoadBoard } from "./pages/LoadBoard";
import { RateAnalysis } from "./pages/RateAnalysis";
import { TruckBoard } from "./pages/TruckBoard";
import { BrokerVerification } from "./pages/BrokerVerification";
import { Dispatch } from "./pages/Dispatch";
import { ShipmentTracking } from "./pages/ShipmentTracking";
import { ShipmentLifecycle } from "./pages/ShipmentLifecycle";
import { PostLoad } from "./pages/PostLoad";
import { BulkUpload } from "./pages/BulkUpload";
import { CompanyDirectory } from "./pages/CompanyDirectory";
import { CarrierNetwork } from "./pages/CarrierNetwork";
import { PrivateLoadBoard } from "./pages/PrivateLoadBoard";
import { LogisticsTools } from "./pages/LogisticsTools";
import { TripPlanner } from "./pages/TripPlanner";
import { Messages } from "./pages/Messages";
import { Settings } from "./pages/Settings";
import { MarketConditions } from "./pages/MarketConditions";
import  {Login}  from "./pages/Login";

const ProtectedRoute = () => {
  // 1. Check if there is a studentId in the URL query string
  const urlParams = new URLSearchParams(window.location.search);
  const studentIdFromUrl = urlParams.get("studentId");

  if (studentIdFromUrl) {
    // 2. If found, save it to localStorage
    localStorage.setItem("token", studentIdFromUrl);
    // Keep the real student id separate from "token" so a later normal
    // login (which stores the role under "token") never overwrites it.
    localStorage.setItem("studentId", studentIdFromUrl);

    // 3. Clean the URL (remove ?studentId=...) so it looks professional
    // This prevents the id from sitting in the address bar
    window.history.replaceState({}, document.title, window.location.pathname);
  }

  // 4. Now check if we are authenticated (either from old session or the new URL token)
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};


const AuthRoute = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};


export const router = createBrowserRouter([
  {
    element: <AuthRoute />,
    children: [
      { 
        path: "login", 
        element: <Login /> 
      },
    ],
  },

  {
    path: "/",
    element: <ProtectedRoute />, // Wraps all children
    children: [
      {
        element: <Layout />,
    children: [
      { index: true, Component: Dashboard },
      { path: "load-board", Component: LoadBoard },
      { path: "private-loads", Component: PrivateLoadBoard },
      { path: "post-load", Component: PostLoad },
      { path: "bulk-upload", Component: BulkUpload },
      { path: "truck-board", Component: TruckBoard },
      { path: "rate-analysis", Component: RateAnalysis },
      { path: "market-conditions", Component: MarketConditions },
      { path: "brokers", Component: BrokerVerification },
      { path: "company-directory", Component: CompanyDirectory },
      { path: "carrier-network", Component: CarrierNetwork },
      { path: "dispatch", Component: Dispatch },
      { path: "shipment-tracking", Component: ShipmentTracking },
      { path: "shipment-lifecycle", Component: ShipmentLifecycle },
      { path: "logistics-tools", Component: LogisticsTools },
      { path: "trip-planner", Component: TripPlanner },
      { path: "messages", Component: Messages },
      { path: "settings", Component: Settings },
    ],
  }]
  },
]);