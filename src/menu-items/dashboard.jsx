// assets
import {
  DashboardOutlined,
  UsergroupAddOutlined,
  AppstoreOutlined,
  TeamOutlined,
  TruckOutlined,
  CodeSandboxOutlined,
  ToolOutlined,
  LineChartOutlined,
  FieldTimeOutlined,
  AccountBookOutlined,
} from "@ant-design/icons";
import { DotIcon } from "assets/images/users/Svg";
// icons
const icons = {
  DashboardOutlined,
  UsergroupAddOutlined,
  AppstoreOutlined,
  TeamOutlined,
  CodeSandboxOutlined,
  ToolOutlined,
  LineChartOutlined,
  FieldTimeOutlined,
  AccountBookOutlined,
  TruckOutlined,
  DotIcon,
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //
let user = JSON?.parse(localStorage.getItem("user"));
console.log(user);
const AdminDashboard = {
  id: "group-dashboard",
  type: "group",
  children: [
    {
      id: "dashboard",
      title: "Dashboard",
      type: "item",
      url: "/dashboard",
      icon: icons.DashboardOutlined,
      breadcrumbs: true,
    },

    {
      id: "users",
      title: "Users",
      type: "collapse",
      url: "/users",
      icon: icons.UsergroupAddOutlined,
      breadcrumbs: true,
      children: [
        {
          id: "add-user",
          title: "Manage Users",
          type: "item",
          url: "/users",
          icon: icons.DotIcon,
          breadcrumbs: false,
        },
        // {
        //   id: "roles",
        //   title: "Manage Roles",
        //   type: "item",
        //   url: "/users/roles",
        //   icon: icons.DotIcon,
        //   breadcrumbs: false,
        // },
      ],
    },
    {
      id: "sku",
      title: "SKU",
      type: "item",
      url: "/sku",
      icon: icons.AppstoreOutlined,
      breadcrumbs: false,
    },
    {
      id: "supplier",
      title: "Supplier",
      type: "item",
      url: "/supplier",
      icon: icons.TeamOutlined,
      breadcrumbs: false,
    },
    {
      id: "replenishment",
      title: "Replenishment",
      type: "item",
      url: "/replenishment",
      icon: icons.TruckOutlined,
      breadcrumbs: false,
    },
    {
      id: "consumption",
      title: "Consumption",
      type: "collapse",
      url: "/consumption",
      icon: icons.LineChartOutlined,
      breadcrumbs: true,
      children: [
        {
          id: "daily_consumption",
          title: "Daily Consumption",
          type: "item",
          url: "/consumption/daily",
          icon: icons.DotIcon,
          breadcrumbs: false,
        },
        {
          id: "weekly_consumption",
          title: "Weekly Consumption",
          type: "item",
          url: "/consumption/weekly",
          icon: icons.DotIcon,
          breadcrumbs: false,
        },
      ],
    },
    {
      id: "adjustment",
      title: "Adjustment",
      type: "item",
      url: "/adjustment",
      icon: icons.ToolOutlined,
      breadcrumbs: false,
    },
    {
      id: "forecast",
      title: "Forecast",
      type: "item",
      url: "/forecast",
      icon: icons.FieldTimeOutlined,
      breadcrumbs: false,
    },
    // {
    //   id: "promotion_forecast",
    //   title: "Promotion Forecast",
    //   type: "item",
    //   url: "/promotion_forecast",
    //   icon: icons.CodeSandboxOutlined,
    //   breadcrumbs: false,
    // },
  ],
};

const dashboard = AdminDashboard;
export default dashboard;
