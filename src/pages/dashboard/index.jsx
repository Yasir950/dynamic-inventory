import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MainCard from "components/MainCard";
import DashboardCards from "components/cards/DashboardCards";
import { BoldTypo } from "styled/styled";
import {
  DashIcon1,
  DashIcon2,
  DashIcon3,
  DashIcon4,
} from "assets/images/users/Svg";
import { useEffect, useState } from "react";
import VehicleCards from "components/cards/VehicleCards";
import Header from "layout/Dashboard/Header";
import Drawer from "layout/Dashboard/Drawer";
import { FilterIcon } from "assets/images/users/Svg";
import Example from "pages/vehicles";

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function DashboardDefault() {
  const [state, setState] = useState({
    selected: "all",
    balanceOverview: [],
    shippingOverview: [],
    vehiclesData: [],
    locationData: [],
    vehicle_overview: [],
  });
  useEffect(() => {
    return () => {};
  }, []);

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
          <Example />
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
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
}
