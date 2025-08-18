// assets
import {
  DashboardOutlined,
  UsergroupAddOutlined,
  PieChartOutlined,
  CarOutlined,
  SettingOutlined,
  CodeSandboxOutlined,
  DollarOutlined,
  LineChartOutlined,
  WalletOutlined,
  AccountBookOutlined,
} from "@ant-design/icons";
import { DotIcon } from "assets/images/users/Svg";
// icons
const icons = {
  DashboardOutlined,
  UsergroupAddOutlined,
  PieChartOutlined,
  CarOutlined,
  CodeSandboxOutlined,
  DollarOutlined,
  LineChartOutlined,
  WalletOutlined,
  AccountBookOutlined,
  SettingOutlined,
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
    // {
    //   id: 'company',
    //   title: 'Company',
    //   type: 'collapse',
    //   url: '/company',
    //   icon: icons.PieChartOutlined,
    //   children: [

    //     {
    //       id: 'company',
    //       title: 'Manage Companies',
    //       type: 'item',
    //       url: '/company',
    //       icon: icons.DotIcon
    //     }
    //   ]
    // },
    // {
    //   id: 'vehicle',
    //   title: 'Vehicle',
    //   type: 'collapse',
    //   url: '/vehicle',
    //   icon: icons.CarOutlined,
    //   children: [
    //     {
    //       id: 'manage-car',
    //       title: 'Manage Vehicles',
    //       type: 'item',
    //       url: '/vehicle',
    //       icon: icons.DotIcon
    //     },
    //     // {
    //     //   id: 'towing-car',
    //     //   title: 'Towing Cars',
    //     //   type: 'item',
    //     //   url: '/vehicle/towing',
    //     //   icon: icons.DotIcon
    //     // },
    //     // {
    //     //   id: 'warehouse-car',
    //     //   title: 'Warehouse Cars',
    //     //   type: 'item',
    //     //   url: '/vehicle/warehouse',
    //     //   icon: icons.DotIcon
    //     // },
    //     // {
    //     //   id: 'damage-car',
    //     //   title: 'Damage Cars Request',
    //     //   type: 'item',
    //     //   url: '/vehicle/request',
    //     //   icon: icons.DotIcon
    //     // }
    //   ]
    // },
    // {
    //   id: 'containers',
    //   title: 'Containers',
    //   type: 'item',
    //   url: '/containers',
    //   icon: icons.CodeSandboxOutlined,
    //   breadcrumbs: false
    // },
    // {
    //   id: 'payments',
    //   title: 'Payments',
    //   type: 'collapse',
    //   url: '/payment',
    //   icon: icons.WalletOutlined,
    //   children: [
    //     {
    //       id: 'manage-payment',
    //       title: 'Manage Payments',
    //       type: 'item',
    //       url: '/payment',
    //       icon: icons.DotIcon
    //     },
    //     {
    //       id: 'manage-transactions',
    //       title: 'Manage Transactions',
    //       type: 'item',
    //       url: '/payment/transactions',
    //       icon: icons.DotIcon
    //     },

    //   ]
    // },
    // {
    //   id: 'track',
    //   title: 'Track',
    //   type: 'item',
    //   url: '/track',
    //   icon: icons.LineChartOutlined,

    // },
    // {
    //   id: 'rates',
    //   title: 'Rates',
    //   type: 'item',
    //   url: '/rates',
    //   icon: icons.DollarOutlined,
    //   breadcrumbs: false
    // },
    // {
    //   id: 'account',
    //   title: 'Account',
    //   type: 'collapse',
    //   url: '/account',
    //   icon: icons.SettingOutlined,
    //   children: [
    //     {
    //       id: 'account-setting',
    //       title: 'Account Setting',
    //       type: 'item',
    //       url: '/account',
    //       icon: icons.DotIcon
    //     },
    //     // {
    //     //   id: 'contact-info',
    //     //   title: 'Contact Information',
    //     //   type: 'item',
    //     //   url: '/account/contact-info',
    //     //   icon: icons.DotIcon
    //     // }
    //   ]
    // },
  ],
};
const UserDashboard = {
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
      id: "vehicle",
      title: "Vehicle",
      type: "collapse",
      url: "/vehicle",
      icon: icons.CarOutlined,
      children: [
        {
          id: "manage-car",
          title: "Manage Vehicles",
          type: "item",
          url: "/vehicle",
          icon: icons.DotIcon,
        },
        // {
        //   id: 'towing-car',
        //   title: 'Towing Cars',
        //   type: 'item',
        //   url: '/vehicle/towing',
        //   icon: icons.DotIcon
        // },
        // {
        //   id: 'warehouse-car',
        //   title: 'Warehouse Cars',
        //   type: 'item',
        //   url: '/vehicle/warehouse',
        //   icon: icons.DotIcon
        // },
        // {
        //   id: 'damage-car',
        //   title: 'Damage Cars Request',
        //   type: 'item',
        //   url: '/vehicle/request',
        //   icon: icons.DotIcon
        // }
      ],
    },
    {
      id: "containers",
      title: "Containers",
      type: "item",
      url: "/containers",
      icon: icons.CodeSandboxOutlined,
      breadcrumbs: false,
    },
    {
      id: "payments",
      title: "Payments",
      type: "collapse",
      url: "/payment",
      icon: icons.WalletOutlined,
      children: [
        {
          id: "manage-payment",
          title: "Manage Payments",
          type: "item",
          url: "/payment",
          icon: icons.DotIcon,
        },
        {
          id: "manage-transactions",
          title: "Manage Transactions",
          type: "item",
          url: "/payment/transactions",
          icon: icons.DotIcon,
        },
      ],
    },
    {
      id: "rates",
      title: "Rates",
      type: "item",
      url: "/rates",
      icon: icons.DollarOutlined,
      breadcrumbs: false,
    },
    {
      id: "account",
      title: "Account",
      type: "collapse",
      url: "/account",
      icon: icons.AccountBookOutlined,
      children: [
        {
          id: "account-setting",
          title: "Account Setting",
          type: "item",
          url: "/account",
          icon: icons.DotIcon,
        },
        // {
        //   id: 'contact-info',
        //   title: 'Contact Information',
        //   type: 'item',
        //   url: '/account/contact-info',
        //   icon: icons.DotIcon
        // }
      ],
    },
    {
      id: "track",
      title: "Track",
      type: "item",
      url: "/track",
      icon: icons.LineChartOutlined,
    },
  ],
};
const dashboard =
  !user?.is_superuser && user?.company ? UserDashboard : AdminDashboard;
console.log(!user?.is_superuser && user?.company);
export default dashboard;
