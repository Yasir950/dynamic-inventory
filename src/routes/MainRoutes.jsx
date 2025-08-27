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
      path: "daily_consumption",
      element: <ConsumptionComp />,
    },
    {
      path: "replenishment",
      element: <ReplenishmentComp />,
    },
    {
      path: "adjustment",
      element: <AdjustmentComp />,
    },
    { path: "*", element: <Navigate to="/dashboard" /> },
  ],
};

export default MainRoutes;
