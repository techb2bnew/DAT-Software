import { createBrowserRouter } from "react-router";
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

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
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
  },
]);