import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
import UsersComp from 'pages/users';
import CompanyComp from 'pages/company';
import AddUser from 'pages/users/AddUser';
import AddRoleComp from 'pages/users/role/addRole';
import VehicleComp from 'pages/vehicles';
import TowingCarComp from 'pages/vehicles/TowingCar';
import WarehouseCarComp from 'pages/vehicles/Warehouse';
import DamageCarComp from 'pages/vehicles/DamageCar';
import RatesComp from 'pages/rates';
import AccountsComp from 'pages/accounts';
import ContactInfoComp from 'pages/accounts/contact';
import AdminContainersComp from 'pages/admin-containers';
import PdfViewer from 'misc/PdfViewer';
import PaymentComp from 'pages/payments';
import TrackingScreen from 'pages/track';
import { Navigate } from 'react-router';
import TransactionComp from 'pages/payments/transaction';

const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));

// ==============================|| MAIN ROUTING ||============================== //


const MainRoutes = {
  path: '/',
  element: <Dashboard /> ,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: '/dashboard',
      element: <DashboardDefault />
    },
    {
      path: '/view-pdf',
      element: <PdfViewer />
    },
    {
      path: 'users',
      element: <UsersComp />
    },
    {
      path: 'users/add',
      element: <AddUser />
    },
    {
      path: 'users/roles',
      element: <AddRoleComp />
    },
    {
      path: 'company',
      element: <CompanyComp />
    },
    
    {
      path: 'vehicle',
      element: <VehicleComp />
    },
    {
      path: 'vehicle/towing',
      element: <TowingCarComp />
    },
    {
      path: 'vehicle/warehouse',
      element: <WarehouseCarComp />
    },
    {
      path: 'vehicle/request',
      element: <DamageCarComp />
    },
    {
      path: 'containers',
      element: <AdminContainersComp />
    },
    {
      path: 'payment',
      element: <PaymentComp />
    },
    {
      path: 'payment/transactions',
      element: <TransactionComp />
    },
    {
      path: 'rates',
      element: <RatesComp />
    },
    {
      path: 'account',
      element: <AccountsComp />
    },
    {
      path: 'account/contact-info',
      element: <ContactInfoComp />
    },
    {
      path: 'track',
      element: <TrackingScreen />
    },
    { path: '*',  element:<Navigate to="/dashboard" />}
  ]
};

export default MainRoutes;
