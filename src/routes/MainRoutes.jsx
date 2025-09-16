import { lazy } from "react";

// project import
import Loadable from "components/Loadable";
import Dashboard from "layout/Dashboard";
import UsersComp from "pages/users";
import AddUser from "pages/users/AddUser";
import SupplierComp from "pages/supplier";
import SKUComp from "pages/sku";
import PdfViewer from "misc/PdfViewer";
import { Navigate } from "react-router";
import ConsumptionComp from "pages/consumption";
import ReplenishmentComp from "pages/replenishments";
import AdjustmentComp from "pages/adjustments";
import ForecastComp from "pages/forecast";
import PromotionForecastComp from "pages/promotion";
import WeeklyComp from "pages/weekly";
import ShortfallComp from "pages/shortfall";

const DashboardDefault = Loadable(lazy(() => import("pages/dashboard/index")));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: <Dashboard />,
  children: [
    {
      path: "/",
      element: <DashboardDefault />,
    },
    {
      path: "/dashboard",
      element: <DashboardDefault />,
    },
    {
      path: "/view-pdf",
      element: <PdfViewer />,
    },
    {
      path: "users",
      element: <UsersComp />,
    },
    {
      path: "users/add",
      element: <AddUser />,
    },

    {
      path: "sku",
      element: <SKUComp />,
    },
    {
      path: "supplier",
      element: <SupplierComp />,
    },
    {
      path: "consumption/daily",
      element: <ConsumptionComp />,
    },
    {
      path: "consumption/weekly",
      element: <WeeklyComp />,
    },
    {
      path: "replenishment",
      element: <ReplenishmentComp />,
    },
    {
      path: "adjustment",
      element: <AdjustmentComp />,
    },
    {
      path: "forecast",
      element: <ForecastComp />,
    },
    {
      path: "target_forecast",
      element: <PromotionForecastComp />,
    },
    {
      path: "shortfall_report",
      element: <ShortfallComp />,
    },
    { path: "*", element: <Navigate to="/dashboard" /> },
  ],
};

export default MainRoutes;
