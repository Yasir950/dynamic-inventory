import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MainCard from "components/MainCard";
import DashboardCards from "components/cards/DashboardCards";
import { BoldTypo } from "styled/styled";
import {
  ArrowIcon,
  DashIcon1,
  DashIcon2,
  DashIcon3,
  DashIcon4,
} from "assets/images/users/Svg";
import { useEffect, useState } from "react";
import SalesChart from "./SalesChart";
import VehicleCards from "components/cards/VehicleCards";
import {
  getCompanies,
  getDashboardData,
  getVehiclesByStatus,
} from "apiservices";
import { Switch, Tooltip } from "@mui/material";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import pdf from "asset/pdf.png";
import { ReactTable } from "misc/ReactTable";
import Header from "layout/Dashboard/Header";
import Drawer from "layout/Dashboard/Drawer";
import Select from "react-select";
import { FilterIcon } from "assets/images/users/Svg";

// ==============================|| DASHBOARD - DEFAULT ||============================== //
function createData(
  id,
  vin,
  lot,
  auction_image,
  maker,
  model,
  color,
  company,
  year,
  vehicle_type,
  car_condition,
  car_title,
  car_key,
  purchase_date,
  region,
  state,
  city,
  auction_location,
  auction_price,
  delivered_date,
  gate_pass_pin,
  address,
  focal_person_phone,
  destination_status,
  current_status,
  approval_status,
  invoice,
  images,
  payment_status,
  history
) {
  return {
    id,
    vin,
    lot,
    auction_image,
    maker,
    model,
    color,
    company,
    year,
    vehicle_type,
    car_condition,
    car_title,
    car_key,
    purchase_date,
    region,
    state,
    city,
    auction_location,
    auction_price,
    delivered_date,
    gate_pass_pin,
    address,
    focal_person_phone,
    destination_status,
    current_status,
    approval_status,
    invoice,
    images,
    payment_status,
    history,
  };
}
export default function DashboardDefault() {
  const headCells = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      style: {
        fontSize: "14px",
        fontWeight: 500,
        color: "#101828",
        // override the row height
      },
    },
    {
      name: "Lot No",
      selector: (row) => row.lot,
      sortable: true,
      style: {
        fontSize: "14px",
        fontWeight: 400,
        color: "#667085",
        // override the row height
      },
    },
    {
      name: "Photo",
      minWidth: "150px",

      cell: (row) => (
        <Stack
          direction={"row"}
          spacing={1}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {row.auction_image && (
            <img
              src={`data:image/jpeg;base64,${row?.auction_image}`}
              alt=""
              width={"50"}
              height={"50"}
              style={{ borderRadius: "6px" }}
            />
          )}
          <Stack>
            <Typography
              sx={{ fontSize: "14px", fontWeight: 400, color: "#667085" }}
            >
              {row.maker}
            </Typography>
            <Typography
              sx={{ fontSize: "14px", fontWeight: 400, color: "#667085" }}
            >
              {row.model}
            </Typography>
          </Stack>
        </Stack>
      ),
      sortable: true,

      style: {
        minWidth: "150px",
        minHeight: "80px",
        fontSize: "14px",
        fontWeight: 400,
        color: "#667085",
        // override the row height
      },
    },
    {
      name: "Company",

      selector: (row) => row.company,
      sortable: true,
      style: {
        fontSize: "14px",
        fontWeight: 400,
        color: "#667085",
        // override the row height
      },
    },
    {
      name: "Year",

      selector: (row) => row.year,
      sortable: true,
      style: {
        fontSize: "14px",
        fontWeight: 400,
        color: "#667085",
        // override the row height
      },
    },
    {
      name: "Maker",

      selector: (row) => row.maker,
      sortable: true,
      style: {
        fontSize: "14px",
        fontWeight: 400,
        color: "#667085",
        // override the row height
      },
    },
    {
      name: "Model",

      selector: (row) => row.model,
      sortable: true,
      style: {
        fontSize: "14px",
        fontWeight: 400,
        color: "#667085",
        // override the row height
      },
    },
    {
      name: "Region",

      selector: (row) => row.region,
      sortable: true,
      style: {
        fontSize: "14px",
        fontWeight: 400,
        color: "#667085",
        // override the row height
      },
    },
    {
      name: "VIN",

      selector: (row) => row.vin,
      sortable: true,
      style: {
        fontSize: "14px",
        fontWeight: 400,
        color: "#667085",
        // override the row height
      },
    },
    {
      name: "Destination Status",

      right: true,
      selector: (row) => row.destination_status,
      sortable: true,
      style: {
        fontSize: "14px",
        fontWeight: 400,
        color: "#667085",
        // override the row height
      },
    },
    {
      name: "Color",
      cell: (row) => (
        <div
          style={{
            fontSize: "14px",
            fontWeight: 400,
            color: row.color.toLowerCase(),
          }}
        >
          {row.color}
        </div>
      ),
      sortable: true,
      style: {
        fontSize: "14px",
        fontWeight: 400,
        // override the row height
      },
    },
    {
      name: "Invoice",

      cell: (row) => (
        <img
          src={pdf}
          alt=""
          width={"18"}
          height={"24"}
          style={{ borderRadius: "6px" }}
          className="cursor-pointer"
        />
      ),
      sortable: true,
      style: {
        fontSize: "14px",
        fontWeight: 400,
        color: "#667085",
        // override the row height
      },
    },

    {
      name: "Buyer",

      selector: (row) => row.focal_person_phone,
      sortable: true,
      style: {
        fontSize: "14px",
        fontWeight: 400,
        color: "#667085",
        // override the row height
      },
    },
    {
      name: "Price",

      selector: (row) => row.auction_price,
      sortable: true,
      style: {
        fontSize: "14px",
        fontWeight: 400,
        color: "#667085",
        // override the row height
      },
    },
    {
      name: "Payment Status",

      selector: (row) => row.payment_status,
      sortable: true,
      style: {
        fontSize: "14px",
        fontWeight: 400,
        color: "#667085",
        // override the row height
      },
    },
    {
      name: "Purchase Date",

      selector: (row) => row.purchase_date,
      sortable: true,
      style: {
        fontSize: "14px",
        fontWeight: 400,
        color: "#667085",
        // override the row height
      },
    },
    {
      name: "Delivered Date",

      selector: (row) => row.delivered_date,
      sortable: true,
      style: {
        fontSize: "14px",
        fontWeight: 400,
        color: "#667085",
        // override the row height
      },
    },
    {
      name: "Location",

      selector: (row) => row.auction_location,
      sortable: true,
      style: {
        fontSize: "14px",
        fontWeight: 400,
        color: "#667085",
        // override the row height
      },
    },
    {
      name: "Title",

      selector: (row) =>
        row.car_title ? (
          <CheckCircleOutlined style={{ color: "#14BA6D" }} />
        ) : (
          <CloseCircleOutlined style={{ color: "#FA4D4D" }} />
        ),
      sortable: true,
      style: {
        fontSize: "14px",
        fontWeight: 400,
        color: "#667085",
        // override the row height
      },
    },
    {
      name: "Vehicle Type",

      selector: (row) => row.vehicle_type,
      sortable: true,
      style: {
        fontSize: "14px",
        fontWeight: 400,
        color: "#667085",
        // override the row height
      },
    },
    {
      name: "Car Condition",

      selector: (row) => row.car_condition,
      sortable: true,
      style: {
        fontSize: "14px",
        fontWeight: 400,
        color: "#667085",
        // override the row height
      },
    },
    {
      name: "Car Key",

      selector: (row) =>
        row.car_key ? (
          <CheckCircleOutlined style={{ color: "#14BA6D" }} />
        ) : (
          <CloseCircleOutlined style={{ color: "#FA4D4D" }} />
        ),
      sortable: true,
      style: {
        fontSize: "14px",
        fontWeight: 400,
        color: "#667085",
        // override the row height
      },
    },
    {
      name: "City",

      selector: (row) => row.city,
      sortable: true,
      style: {
        fontSize: "14px",
        fontWeight: 400,
        color: "#667085",
        // override the row height
      },
    },

    {
      name: "Gate Pass Pin",

      selector: (row) => row.gate_pass_pin,
      sortable: true,
      style: {
        fontSize: "14px",
        fontWeight: 400,
        color: "#667085",
        // override the row height
      },
    },

    {
      name: "Address",

      selector: (row) => row.address,
      sortable: true,
      style: {
        fontSize: "14px",
        fontWeight: 400,
        color: "#667085",
        // override the row height
      },
    },
    {
      name: "Current Status",

      cell: (row) => (
        <div
          style={{
            fontSize: "13px",
            fontWeight: 400,
            background: "#ECFDF3",
            width: "90px",
            borderRadius: "10px",
            height: "22px",
            padding: "2px 8px 2px 6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {row.current_status?.name}
        </div>
      ),
      sortable: true,
      style: {
        fontSize: "14px",
        fontWeight: 400,
        color: "#667085",
        // override the row height
      },
    },

    {
      name: "Approval Status",
      cell: (row) =>
        row.approval_status == true ? (
          <Switch defaultChecked disabled size="small" />
        ) : (
          <Tooltip title="Approve Status">
            <Switch disabled className="cursor-pointer" size="small" />
          </Tooltip>
        ), // Simplified conditional
      sortable: true,
    },
  ];

  const [state, setState] = useState({
    selected: "all",
    balanceOverview: [],
    shippingOverview: [],
    vehiclesData: [],
    locationData: [],
    vehicle_overview: [],
  });
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const changeSelection = async (select, status) => {
    setState((prevState) => ({ ...prevState, selected: select }));
    if (status !== 0) {
      let res = await getVehiclesByStatus(status);
      const rowsData = res.map((item) =>
        createData(
          item.id,
          item.vin,
          item.lot,
          item.auction_image,
          item.maker,
          item.model,
          item.color,
          item.company?.company_name,
          item.year,
          item.vehicle_type,
          item.car_condition,
          item.car_title,
          item.car_key,
          item.purchase_date,
          item.region,
          item.state,
          item.city,
          item.auction_location,
          item.auction_price,
          item.delivered_date,
          item.gate_pass_pin,
          item.address,
          item.focal_person_phone,
          item.destination_status,
          item.current_status,
          item.approval_status,
          item.invoice,
          item.images,
          item.payment_status,
          item.history
        )
      );
      setState((prev) => ({ ...prev, vehiclesData: rowsData }));
    } else {
      getDashboard();
    }
  };
  useEffect(() => {
    getDashboard();
    fetchCompanies();
    return () => {};
  }, []);

  const getDashboard = async (id = "") => {
    let res = await getDashboardData(id);
    if (res?.balance_overview) {
      setState((prevState) => ({
        ...prevState,
        balanceOverview: res?.balance_overview,
        shippingOverview: res.shipping_overview,
        vehicle_overview: res.vehicle_overview,
      }));
      const rowsData = res.vehicle_overview.top_5_vehicles.map((item) =>
        createData(
          item.id,
          item.vin,
          item.lot,
          item.auction_image,
          item.maker,
          item.model,
          item.color,
          item.company?.company_name,
          item.year,
          item.vehicle_type,
          item.car_condition,
          item.car_title,
          item.car_key,
          item.purchase_date,
          item.region,
          item.state,
          item.city,
          item.auction_location,
          item.auction_price,
          item.delivered_date,
          item.gate_pass_pin,
          item.address,
          item.focal_person_phone,
          item.destination_status,
          item.current_status,
          item.approval_status,
          item.invoice,
          item.images,
          item.payment_status,
          item.history
        )
      );
      setState((prev) => ({
        ...prev,
        vehiclesData: rowsData,
        locationData: res.locationwise_statuses_count,
      }));
    }
  };
  const fetchCompanies = async () => {
    try {
      let res = await getCompanies();
      if (res) {
        res?.map(
          (item) => (
            (item.label = item.company_name), (item.value = item.company_name)
          )
        );
        setCompanies(res);
        // Ensure `updatedObj.company` exists before filtering
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };
  const selectCompany = (e) => {
    setSelectedCompany(e);
    if (e) {
      getDashboard(e.id);
    } else {
      getDashboard();
    }
  };
  return (
    <>
      <Header />
      <Drawer />
      <Stack justifyContent={"space-between"} flexDirection={"row"}>
        <Typography
          sx={{ fontWeight: 300, fontSize: "30px", color: "#09090B" }}
        >
          Welcome <span style={{ fontWeight: 600 }}>Super!</span>
        </Typography>
        <div
          style={{
            width: "328px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <FilterIcon />
          <Select
            styles={{
              container: (base) => ({
                ...base,
                width: "300px", // Set desired width here
              }),
            }}
            options={companies}
            value={selectedCompany}
            onChange={selectCompany}
            placeholder="Search By Company"
            isClearable={true}
            isSearchable={true} // this is default true, can be omitted
          />
        </div>
        {/* <DateRangedComp/> */}
      </Stack>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        <Grid item xs={12} md={12} lg={12}>
          <MainCard
            sx={{
              mt: 2,
              padding: "32px",
              minHeight: "358px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
            content={false}
          >
            <Stack>
              <BoldTypo sx={{ fontSize: "20px", color: "#05004E" }}>
                Balance OverView
              </BoldTypo>
              <Typography
                variant="h5"
                sx={{ fontSize: "16px", color: "#737791", fontWeight: "400px" }}
              >
                Sales Summary
              </Typography>
            </Stack>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4} lg={2}>
                <DashboardCards
                  title={
                    state.balanceOverview &&
                    state.balanceOverview[0]?.balance_limit
                  }
                  icon={<DashIcon1 />}
                  content={"balance Limit"}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={2}>
                <DashboardCards
                  title={
                    state.balanceOverview &&
                    state.balanceOverview[0]?.total_overdue
                  }
                  icon={<DashIcon2 />}
                  content={"Total Overdue"}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={2}>
                <DashboardCards
                  title={
                    state.balanceOverview &&
                    state.balanceOverview[0]?.paid_amount
                  }
                  icon={<DashIcon3 />}
                  content={"Paid Amount"}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={2}>
                <DashboardCards
                  title={
                    state.balanceOverview && state.balanceOverview[0]?.pending
                  }
                  icon={<DashIcon2 />}
                  content={"Pending"}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={2}>
                <DashboardCards
                  title={
                    state.balanceOverview &&
                    state.balanceOverview[0]?.total_expense
                  }
                  icon={<DashIcon3 />}
                  content={"Total Expense"}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={2}>
                <DashboardCards
                  title={
                    state.vehicle_overview &&
                    state.vehicle_overview?.total_vehicle_count
                  }
                  icon={<DashIcon1 />}
                  content={"No of cars"}
                />
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
        {/* <Grid item xs={12} md={7} lg={4} >
          <MainCard sx={{ mt: 2, padding: '32px', height: "358px", display: "flex", flexDirection: "column", justifyContent: "space-between" }} content={false} >
            <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
              <BoldTypo sx={{ fontSize: "20px", color: "#05004E" }}>Balance OverView</BoldTypo>
              <ArrowIcon />
            </Stack>
            <Box sx={{ pt: 1, pr: 2 }}>
              <IncomeAreaChart slot={slot} />
            </Box>
          </MainCard>
        </Grid> */}
        <Grid item xs={12} md={12} lg={12}>
          <MainCard
            sx={{
              mt: 2,
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
            content={false}
          >
            <Stack
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <BoldTypo sx={{ fontSize: "20px", color: "#05004E" }}>
                Shipping OverView
              </BoldTypo>
              <ArrowIcon />
            </Stack>
            <SalesChart data={state.shippingOverview} />
          </MainCard>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <MainCard
            sx={{
              mt: 2,
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
            content={false}
          >
            <BoldTypo sx={{ fontSize: "20px", color: "#05004E", mb: 3 }}>
              Vehicles OverView
            </BoldTypo>
            <Grid
              container
              xs={12}
              md={12}
              lg={12}
              spacing={3}
              justifyContent={"center"}
              alignItems={"center"}
              sx={{ mb: 3 }}
            >
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={2.4}
                onClick={() => changeSelection("all", 0)}
                className="cursor-pointer"
              >
                <VehicleCards
                  title={state.vehicle_overview?.total_vehicle_count}
                  icon={<DashIcon1 />}
                  content={"All Vehicles"}
                  bg="#FA5A7D1A"
                  selected={state.selected === "all" ? true : false}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={2.4}
                onClick={() => changeSelection("New", 1)}
                className="cursor-pointer"
              >
                <VehicleCards
                  title={state.shippingOverview[0]?.vehicle_count}
                  icon={<DashIcon2 />}
                  content={"New"}
                  bg="#FFF49066"
                  selected={state.selected === "New" ? true : false}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={2.4}
                onClick={() => changeSelection("Picked", 2)}
                className="cursor-pointer"
              >
                <VehicleCards
                  title={state.shippingOverview[1]?.vehicle_count}
                  icon={<DashIcon3 />}
                  content={"Picked"}
                  bg="#91EC6647"
                  selected={state.selected === "Picked" ? true : false}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={2.4}
                onClick={() => changeSelection("Loaded", 3)}
                className="cursor-pointer"
              >
                <VehicleCards
                  title={state.shippingOverview[2]?.vehicle_count}
                  icon={<DashIcon4 />}
                  content={"Loaded"}
                  bg="#F2AF9F33"
                  selected={state.selected === "Loaded" ? true : false}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={2.4}
                onClick={() => changeSelection("At Warehouse", 4)}
                className="cursor-pointer"
              >
                <VehicleCards
                  title={state.shippingOverview[3]?.vehicle_count}
                  icon={<DashIcon1 />}
                  content={"At Warehouse"}
                  bg="#FFCD8833"
                  selected={state.selected === "At Warehouse" ? true : false}
                />
              </Grid>
            </Grid>
            <Grid
              container
              xs={12}
              md={12}
              lg={12}
              spacing={3}
              justifyContent={"center"}
              alignItems={"center"}
              sx={{ mb: 3 }}
            >
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={2.4}
                onClick={() => changeSelection("Arrived", 5)}
                className="cursor-pointer"
              >
                <VehicleCards
                  title={state.shippingOverview[4]?.vehicle_count}
                  icon={<DashIcon1 />}
                  content={"Arrived"}
                  bg="#F980894D"
                  selected={state.selected === "Arrived" ? true : false}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={2.4}
                onClick={() => changeSelection("Shipped", 6)}
                className="cursor-pointer"
              >
                <VehicleCards
                  title={state.shippingOverview[5]?.vehicle_count}
                  icon={<DashIcon2 />}
                  content={"Shipped"}
                  bg="#C193B933"
                  selected={state.selected === "Shipped" ? true : false}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={2.4}
                onClick={() => changeSelection("Handed Over", 7)}
                className="cursor-pointer"
              >
                <VehicleCards
                  title={state.shippingOverview[6]?.vehicle_count}
                  icon={<DashIcon3 />}
                  content={"Handed Over"}
                  bg="#88D2F733"
                  selected={state.selected === "Handed Over" ? true : false}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={2.4}
                onClick={() => changeSelection("At Port", 8)}
                className="cursor-pointer"
              >
                <VehicleCards
                  title={state.shippingOverview[7]?.vehicle_count}
                  icon={<DashIcon4 />}
                  content={"At Port"}
                  bg="#B7E5A533"
                  selected={state.selected === "At Port" ? true : false}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={2.4}
                onClick={() => changeSelection("Delivered", 9)}
                className="cursor-pointer"
              >
                <VehicleCards
                  title={state.shippingOverview[8]?.vehicle_count}
                  icon={<DashIcon1 />}
                  content={"Delivered"}
                  bg="#0095FF1A"
                  selected={state.selected === "Delivered" ? true : false}
                />
              </Grid>
            </Grid>
            <ReactTable
              name={"All Vehicles"}
              column={headCells}
              rows={state.vehiclesData}
            />
          </MainCard>
        </Grid>
        {/* <Grid item xs={12} md={12} lg={12}>
          <MainCard
            sx={{
              mt: 2,
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
            content={false}
          >
            <BasicTable data={state.locationData} />
          </MainCard>
        </Grid> */}
      </Grid>
    </>
  );
}
