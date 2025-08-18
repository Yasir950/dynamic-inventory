import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MainCard from "components/MainCard";
import Breadcrumbs from "components/@extended/Breadcrumbs";
import { AddBtn, ExportBtn } from "styled/styled";
import React, { useEffect, useState } from "react";
import { MyBtn } from "styled/styled";
import {
  Box,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  Step,
  StepLabel,
  Stepper,
  Switch,
  TextareaAutosize,
  TextField,
  Tooltip,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Alert from "misc/dialogue";
import "style.css";
import {
  changeStatus,
  deleteItem,
  getCompanies,
  getImgsWithStatus,
  getMakers,
  getVehicleCount,
  getVehicles,
  getVehiclesByStatus,
  getVehicleStatus,
  saveVehicles,
  updateVehicles,
} from "apiservices";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { changeForm, clearData, updatedData } from "redux/slices/userSlice";
import {
  DashIcon1,
  DashIcon2,
  DashIcon3,
  DashIcon4,
  DeleteIcon,
  EditIcon,
} from "assets/images/users/Svg";
import { ReactTable } from "misc/ReactTable";
import Img1 from "asset/1.png";
import Img2 from "asset/2.png";
import Img3 from "asset/3.png";
import pdf from "asset/pdf.png";
import { useNavigate } from "react-router";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ReloadOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import dayjs from "dayjs";
import VehicleCards from "components/cards/VehicleCards";
// ===============================|| COMPONENT - COLOR ||=============================== //
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
  title_type,
  car_key,
  purchase_date,
  region,
  state,
  city,
  auction_location,
  auction_price,
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
    title_type,
    car_key,
    purchase_date,
    region,
    state,
    city,
    auction_location,
    auction_price,
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
export default function VehicleComp() {
  const BASE_URL = "https://gshipping.khataljazeeraauction.com";
  let user = JSON.parse(localStorage.getItem("user"));
  let normalUser = !user?.is_superuser && user?.company;
  const navigate = useNavigate();
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

      cell: (row) => (
        <>
          {row.id !== "Total" && (
            <>
              <Stack
                direction={"row"}
                spacing={1}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <img
                  src={`data:image/jpeg;base64,${row?.auction_image}`}
                  alt="loading"
                  width={"50"}
                  height={"50"}
                  style={{ borderRadius: "6px" }}
                />
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
                  <Stack direction={"row"} spacing={1}>
                    <Tooltip
                      title="Warehouse"
                      onClick={() => handleModal(row, 3, "Warehouse")}
                      className="cursor-pointer"
                    >
                      <img src={Img1} alt="" width={"16"} height={"16"} />
                    </Tooltip>
                    <Tooltip
                      title="Loading"
                      onClick={() => handleModal(row, 4, "Loading")}
                      className="cursor-pointer"
                    >
                      <img src={Img2} alt="" width={"16"} height={"16"} />
                    </Tooltip>
                    <Tooltip
                      title="Store"
                      onClick={() => handleModal(row, 1, "Store")}
                      className="cursor-pointer"
                    >
                      <img src={Img3} alt="" width={"16"} height={"16"} />
                    </Tooltip>
                  </Stack>
                </Stack>
              </Stack>
            </>
          )}
        </>
      ),
      sortable: true,
      style: {
        minHeight: "80px",
        fontSize: "14px",
        fontWeight: 400,
        color: "#667085",
        width: "500px",
        // override the row height
      },
    },
    {
      name: "Company",

      // right: true,
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
      hide: "lg",
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
      hide: "lg",
    },
    {
      name: "Color",
      cell: (row) => (
        <div
          style={{
            fontSize: "14px",
            fontWeight: 400,
            color: row.color?.toLowerCase(),
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
        <>
          {row.id !== "Total" && (
            <img
              src={pdf}
              alt=""
              width={"18"}
              height={"24"}
              style={{ borderRadius: "6px" }}
              onClick={() => handleThumbnailClick(row.invoice)}
              className="cursor-pointer"
            />
          )}
        </>
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
      name: "Purchase Price",

      selector: (row) => `$ ${row.auction_price}`,
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
      hide: "lg",
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
      hide: "lg",
    },
    {
      name: "Title",
      cell: (row) => (
        <>
          {row.id !== "Total" && row.car_title ? (
            <CheckCircleOutlined style={{ color: "#14BA6D" }} />
          ) : (
            <CloseCircleOutlined style={{ color: "#FA4D4D" }} />
          )}
        </>
      ),
      sortable: true,
      style: {
        fontSize: "14px",
        fontWeight: 400,
        color: "#667085",
        // override the row height
      },
      hide: "lg",
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
      hide: "lg",
    },
    {
      name: "Car Key",

      cell: (row) => (
        <>
          {row.id !== "Total" && row.car_key ? (
            <CheckCircleOutlined style={{ color: "#14BA6D" }} />
          ) : (
            <CloseCircleOutlined style={{ color: "#FA4D4D" }} />
          )}
        </>
      ),
      sortable: true,
      style: {
        fontSize: "14px",
        fontWeight: 400,
        color: "#667085",
        // override the row height
      },
      hide: "lg",
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
      hide: "lg",
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
      hide: "lg",
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
      hide: "lg",
    },
    {
      name: "Current Status",
      selector: (row) => row.current_status?.name || "",
      cell: (row) => (
        <div
          style={{
            fontSize: "11px",
            fontWeight: 400,
            background:
              row.current_status?.name == "New"
                ? "#6F7B91"
                : row.current_status?.name == "Picked"
                  ? "#8DC9CC"
                  : row.current_status?.name == "At Warehouse"
                    ? "#F2C43A"
                    : row.current_status?.name == "Loaded"
                      ? "#EB6B5C"
                      : row.current_status?.name == "Shipped"
                        ? "#A0C6A2"
                        : row.current_status?.name == "Handed Over"
                          ? "#FF9F30"
                          : row.current_status?.name == "At Port"
                            ? "#0095FF"
                            : row.current_status?.name == "Delivered"
                              ? "#14BA6D"
                              : "",
            width: "300px",
            borderRadius: "10px",
            height: "22px",
            // padding: '2px 8px 2px 6px',
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#FFFFFF",
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
      cell: (row) => (
        <>
          {row.id !== "Total" && (
            <>
              {row.approval_status == true ? (
                <Switch defaultChecked disabled size="small" />
              ) : (
                <Tooltip title="Approve Status">
                  <Switch
                    disabled={normalUser}
                    className="cursor-pointer"
                    onChange={() => approvedStatus(row.id)}
                    size="small"
                  />
                </Tooltip>
              )}
            </>
          )}
        </>
      ), // Simplified conditional
      sortable: true,
    },
    !normalUser && {
      name: "Actions",

      style: {
        fontSize: "14px",
        fontWeight: 400,
        color: "#667085",
        // override the row height
      },
      cell: (row) => (
        <>
          {row.id !== "Total" && (
            <>
              <Tooltip title="Delete">
                <button
                  className="cursor-pointer"
                  onClick={() => handleDelete(row.id || row.cid)}
                  style={{ background: "none", border: "0px" }}
                >
                  <DeleteIcon />
                </button>
              </Tooltip>
              <Tooltip title="Edit">
                <button
                  className="cursor-pointer"
                  onClick={() => handleEdit(row)}
                  style={{ background: "none", border: "0px" }}
                >
                  <EditIcon />
                </button>
              </Tooltip>
              {!normalUser && (
                <Tooltip title="change status">
                  <button
                    className="cursor-pointer"
                    onClick={() => handleImageModal(row)}
                    style={{
                      background: "none",
                      border: "0px",
                      color: "#667085B2",
                    }}
                  >
                    <ReloadOutlined />
                  </button>
                </Tooltip>
              )}
            </>
          )}
        </>
      ), // Use `cell` instead of `selector` for rendering JSX
    },
  ];
  const [activeStep, setActiveStep] = useState(0);
  const [companies, setCompanies] = useState(0);
  const [statusList, setStatusList] = useState(0);
  const updatedObj = useSelector((state) => state.user.updatedObj);
  const isAddForm = useSelector((state) => state.user.isAddForm);
  const [pending, setPending] = React.useState(true);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();
  const [state, setState] = useState({
    selected: "all",
    userData: [],
    makersData: [],
    modelsData: [],
    auction_image: "",
    invoice: "",
    status: "",
    alertModal: false,
    imageModal: false,
    images: [],
    note: "",
    currentStatus: "",
    updatedId: "",
    statusCount: [],
    listImages: [],
    company: "",
    loading: false,
  });
  const [files, setFiles] = useState([]);
  const fileSelectedHandler = (e) => {
    setFiles([...files, ...Array.from(e.target.files)]);
  };
  const handleThumbnailClick = (invoice) => {
    navigate("/view-pdf", {
      state: {
        pdf: invoice,
      },
    });
  };
  useEffect(() => {
    getVehiclesData();
    getCompaniesData();
    getVehiclesStatusData();
    getVehiclesStatusCountData();
    if (normalUser) {
      reset({
        company: user?.company,
      });
    }
    if (updatedObj) {
      let company = companies.filter(
        (item) => item.company_name == updatedObj.company
      );
      reset({
        vin: updatedObj.vin || "",
        lot: updatedObj.lot || "",
        email: updatedObj.email || "",
        year: updatedObj.year,
        company: company && company[0]?.id,
        maker: updatedObj.maker,
        model: updatedObj.model || "",
        color: updatedObj.color || "",
        vehicle_type: updatedObj.vehicle_type,
        car_condition: updatedObj.car_condition,
        car_title: updatedObj.car_title,
        title_type: updatedObj.title_type,
        car_key: updatedObj.car_key,
        purchase_date: updatedObj.purchase_date,
        region: updatedObj.region,
        state: updatedObj.state,
        city: updatedObj.city,
        auction_location: updatedObj.auction_location,
        auction_price: updatedObj.auction_price,
        gate_pass_pin: updatedObj.gate_pass_pin,
        address: updatedObj.gate_pass_pin,
        focal_person_phone: updatedObj.focal_person_phone,
        destination_status: updatedObj.destination_status,
        current_status: updatedObj.current_status,
        approval_status: updatedObj.approval_status,
        payment_status: updatedObj.payment_status,
      });
      setState((prev) => ({
        ...prev,
        auction_image: updatedObj.auction_image,
        invoice: updatedObj.invoice,
      }));
    }
    return () => {};
  }, [updatedObj]);
  const getVehiclesData = async () => {
    let res = await getVehicles();
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
        item.title_type,
        item.car_key,
        item.purchase_date,
        item.region,
        item.state,
        item.city,
        item.auction_location,
        item.auction_price,
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
    calculateTotal(rowsData);

    // Append total row to table data
    setState((prev) => ({ ...prev, userData: rowsData }));
    setPending(false);
  };
  const calculateTotal = (rowsData) => {
    const totalPrice = rowsData.reduce(
      (sum, row) => sum + Number(row.auction_price),
      0
    );
    setState((prev) => ({ ...prev, totalPrice: totalPrice }));
  };
  const getCompaniesData = async () => {
    let res = await getCompanies();
    if (res) {
      setCompanies(res);
    }
  };
  const getVehiclesStatusData = async () => {
    let res = await getVehicleStatus();

    if (res) {
      setStatusList(res);
    }
  };
  const getVehiclesStatusCountData = async () => {
    let res = await getVehicleCount();

    if (res) {
      setState((prev) => ({ ...prev, statusCount: res.vehicle_overview }));
    }
  };
  const handleEdit = (row) => {
    dispatch(updatedData(row));
  };
  const handleDelete = async (id) => {
    let res = await deleteItem("vehicles", id);
    if (res === 204) {
      getVehiclesData();
      toast.error("Vehicle deleted successfully");
    }
  };
  const handleStepOneNext = handleSubmit((data) => {
    // If validation passes, move to next step

    setActiveStep((prevStep) => prevStep + 1);
  });
  const handleFileChange = (event) => {
    const name = event.target.name;
    const file = event.target.files[0]; // Get the first file
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target.result.split(",")[1]; // Extract Base64 content
        setState((prev) => ({
          ...prev,
          [name]: base64,
        }));
      };
      reader.onerror = (err) => {
        console.error("Error reading file:", err);
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    } else {
      console.error("No file selected");
    }
  };
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };
  const onSubmit = async (data) => {
    setState((prev) => ({ ...prev, loading: true }));
    if (updatedObj) {
      let userData = {
        ...data,
        current_status: updatedObj.current_status.id,
        auction_image: state.auction_image,
        invoice: state.invoice,
        id: updatedObj.id,
      };
      let res = await updateVehicles(userData, updatedObj?.id);
      if (res) {
        toast.success("Vehicle updated successfully");
        getVehiclesData();
        handleAddOpen();
        setState((prev) => ({ ...prev, loading: false }));
      }
    } else {
      let userData = {
        ...data,
        current_status: 1,
        approval_status: !normalUser ? 1 : 0,
        auction_image: state.auction_image,
        invoice: state.invoice,
      };
      let res = await saveVehicles(userData);
      if (res) {
        toast.success("Vehicle saved successfully");
        getVehiclesData();
        handleAddOpen();
        setState((prev) => ({ ...prev, loading: false }));
      }
    }
  };
  const handleAddOpen = () => {
    dispatch(changeForm());
    dispatch(clearData());
  };
  const handleModal = async (row, id = "", name = "") => {
    setState((prev) => ({
      ...prev,
      alertModal: !state.alertModal,
      status: name,
    }));
    if (id) {
      let list = await getImgsWithStatus(row?.id, id);
      console.log(list);
      setState((prev) => ({ ...prev, listImages: list?.images }));
    }
  };
  const handleImageModal = async (row = "") => {
    if (row?.id) {
      setState((prev) => ({ ...prev, loading: true }));
      let list = await getImgsWithStatus(row?.id, row.current_status?.id);
      if (list) {
        setState((prev) => ({
          ...prev,
          imageModal: !state.imageModal,
          currentStatus: row.current_status?.id,
          note: list.notes,
          updatedId: row.id,
          loading: false,
        }));
      }
    } else {
      setState((prev) => ({
        ...prev,
        imageModal: !state.imageModal,
        current_status: "",
        note: row.note,
        updatedId: "",
      }));
      setFiles([]);
    }
  };
  const approvedStatus = async (aId) => {
    let res = await updateVehicles({ id: aId, approval_status: true }, aId);
    if (res?.approval_status) {
      toast.success("Status updated successfully");
      getVehiclesData();
    }
  };
  const saveChanges = async () => {
    setState((prev) => ({ ...prev, loading: true }));
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("status", state.currentStatus); // Replace with actual status
    formData.append("notes", state.note); // Replace with actual note
    files.forEach((file) => {
      formData.append("images", file); // 👈 backend should support multiple "images"
    });
    try {
      const res = await fetch(
        `https://gshipping.khataljazeeraauction.com/api/vehicles/${state.updatedId}/change_status/`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token, // 👈 Replace with your actual token
          },
          body: formData,
        }
      );

      const result = await res.json(); // or .text() depending on response
      console.log(result);

      if (res.ok) {
        setState((prev) => ({ ...prev, loading: false }));
        toast.success("Vehicle updated successfully");
        getVehiclesData();
        handleImageModal();
      } else {
        toast.error("Failed to update vehicle");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong");
    }
    // let res = await changeStatus(formData, state.updatedId);
    // if (res) {
    //   toast.success("Vehicle updated successfully");
    //   getVehiclesData();
    //   handleImageModal();
    // }
  };
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setState((prev) => ({ ...prev, [name]: value }));
  };
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
          item.title_type,
          item.car_key,
          item.purchase_date,
          item.region,
          item.state,
          item.city,
          item.auction_location,
          item.auction_price,
          item.gate_pass_pin,
          item.address,
          item.focal_person_phone,
          item.destination_status,
          item.current_status,
          item.approval_status,
          item.invoice,
          item.images,
          item.payment_status
        )
      );
      setState((prev) => ({ ...prev, userData: rowsData }));
      calculateTotal(rowsData);
    } else {
      getVehiclesData();
    }
  };
  return (
    <>
      <Grid item xs={12} md={12} lg={12}>
        <Stack justifyContent={"space-between"} flexDirection={"row"}>
          <Typography
            sx={{ fontWeight: 300, fontSize: "30px", color: "#09090B" }}
          >
            Vehicles
            <Breadcrumbs navigation={navigation} title="Users" />
          </Typography>
          <Stack direction={"row"} spacing={2}>
            {/* <ExportBtn sx={{ height: "42px" }}>Bulk Excel Upload</ExportBtn> */}
            <AddBtn onClick={handleAddOpen}>Add Vehicle</AddBtn>
          </Stack>
        </Stack>
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
          <Grid
            container
            xs={12}
            md={12}
            lg={12}
            spacing={1}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{ mb: 3 }}
          >
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={2}
              onClick={() => changeSelection("all", 0)}
              className="cursor-pointer"
            >
              <VehicleCards
                title={state.statusCount[9]?.total_vehicle_count}
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
              lg={2}
              onClick={() => changeSelection("New", 1)}
              className="cursor-pointer"
            >
              <VehicleCards
                title={state.statusCount[0]?.vehicle_count}
                content={state.statusCount[0]?.vehicle_status}
                icon={<DashIcon2 />}
                bg="#FFF49066"
                selected={state.selected === "New" ? true : false}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={2}
              onClick={() => changeSelection("Picked", 2)}
              className="cursor-pointer"
            >
              <VehicleCards
                title={state.statusCount[1]?.vehicle_count}
                content={state.statusCount[1]?.vehicle_status}
                icon={<DashIcon3 />}
                bg="#91EC6647"
                selected={state.selected === "Picked" ? true : false}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={2}
              onClick={() => changeSelection("Loaded", 3)}
              className="cursor-pointer"
            >
              <VehicleCards
                title={state.statusCount[2]?.vehicle_count}
                content={state.statusCount[2]?.vehicle_status}
                icon={<DashIcon4 />}
                bg="#F2AF9F33"
                selected={state.selected === "Loaded" ? true : false}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={2}
              onClick={() => changeSelection("At Warehouse", 4)}
              className="cursor-pointer"
            >
              <VehicleCards
                title={state.statusCount[3]?.vehicle_count}
                content={state.statusCount[3]?.vehicle_status}
                icon={<DashIcon1 />}
                bg="#FFCD8833"
                selected={state.selected === "At Warehouse" ? true : false}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={2}
              onClick={() => changeSelection("Arrived", 5)}
              className="cursor-pointer"
            >
              <VehicleCards
                title={state.statusCount[4]?.vehicle_count}
                content={state.statusCount[4]?.vehicle_status}
                icon={<DashIcon1 />}
                bg="#F980894D"
                selected={state.selected === "Arrived" ? true : false}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={2}
              onClick={() => changeSelection("Shipped", 6)}
              className="cursor-pointer"
            >
              <VehicleCards
                title={state.statusCount[5]?.vehicle_count}
                content={state.statusCount[5]?.vehicle_status}
                icon={<DashIcon2 />}
                bg="#C193B933"
                selected={state.selected === "Shipped" ? true : false}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={2}
              onClick={() => changeSelection("Handed Over", 7)}
              className="cursor-pointer"
            >
              <VehicleCards
                title={state.statusCount[6]?.vehicle_count}
                content={state.statusCount[6]?.vehicle_status}
                icon={<DashIcon3 />}
                bg="#88D2F733"
                selected={state.selected === "Handed Over" ? true : false}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={2}
              onClick={() => changeSelection("At Port", 8)}
              className="cursor-pointer"
            >
              <VehicleCards
                title={state.statusCount[7]?.vehicle_count}
                content={state.statusCount[7]?.vehicle_status}
                icon={<DashIcon4 />}
                bg="#B7E5A533"
                selected={state.selected === "At Port" ? true : false}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={2}
              onClick={() => changeSelection("Delivered", 9)}
              className="cursor-pointer"
            >
              <VehicleCards
                title={state.statusCount[8]?.vehicle_count}
                content={state.statusCount[8]?.vehicle_status}
                icon={<DashIcon1 />}
                bg="#0095FF1A"
                selected={state.selected === "Delivered" ? true : false}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <VehicleCards
                title={
                  state.totalPrice === undefined ? "0" : `$ ${state.totalPrice}`
                }
                icon={
                  <div
                    style={{
                      height: "40px",
                      width: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 20,
                      background: "#fff",
                    }}
                  >
                    <DollarOutlined
                      style={{ color: "red", fontSize: "24px" }}
                    />
                  </div>
                }
                content={"TOTAL"}
                bg="#FA5A7D1A"
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
          ></Grid>
          <ReactTable
            name={"All Vehicles"}
            column={headCells}
            rows={state.userData}
            pending={pending}
            totalPrice={2}
            calculateTotal={(data) => calculateTotal(data)}
          />
        </MainCard>
      </Grid>
      <Alert
        open={isAddForm}
        close={handleAddOpen}
        title={
          <Stack alignItems={"center"}>
            <Typography sx={{ fontWeight: 600, fontSize: "28px" }} variant="h5">
              {" "}
              Add Vehicle
            </Typography>
          </Stack>
        }
        content={
          <Box sx={{ width: "90%", margin: "auto", marginTop: 4 }}>
            <Stepper activeStep={activeStep} sx={{ marginBottom: 4 }}>
              <Step>
                <StepLabel>Vehicle Details</StepLabel>
              </Step>
              <Step>
                <StepLabel>Other Details</StepLabel>
              </Step>
            </Stepper>

            {activeStep === 0 && (
              <form>
                <Grid container spacing={2}>
                  {/* Left Side */}
                  <Grid item xs={12} sm={6}>
                    <InputLabel>VIN No</InputLabel>
                    <TextField
                      fullWidth
                      error={!!errors.vin}
                      helperText={errors.vin?.message}
                      {...register("vin", { required: true })}
                    />
                    {errors.vin && (
                      <FormHelperText
                        style={{ color: "red", marginLeft: "0px" }}
                      >
                        {"please fill this field"}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel>Lot No</InputLabel>
                    <TextField
                      fullWidth
                      error={!!errors.lot}
                      helperText={errors.lot?.message}
                      {...register("lot", { required: true })}
                    />
                    {errors.lot && (
                      <FormHelperText
                        style={{ color: "red", marginLeft: "0px" }}
                      >
                        {"please fill this field"}
                      </FormHelperText>
                    )}
                  </Grid>
                  {!normalUser && (
                    <Grid item xs={12} sm={6}>
                      <InputLabel>Company</InputLabel>
                      <FormControl fullWidth>
                        <select
                          className="style-class"
                          {...register("company", { required: true })}
                        >
                          {companies &&
                            companies.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.company_name}
                              </option>
                            ))}
                        </select>
                      </FormControl>
                    </Grid>
                  )}
                  <Grid item xs={12} sm={6}>
                    <InputLabel>Color</InputLabel>
                    <FormControl fullWidth>
                      <select
                        className="style-class"
                        {...register("color", { required: true })}
                      >
                        <option value="Black">Black</option>
                        <option value="White">White</option>
                        <option value="Blue">Blue</option>
                        <option value="Gray">Gray</option>
                        <option value="Silver">Silver</option>
                        <option value="Maroon">Maroon</option>
                        <option value="Burgandy">Burgandy</option>
                        <option value="Yellow">Yellow</option>
                        <option value="Golden">Golden</option>
                        <option value="Purple">Purple</option>
                        <option value="Red">Red</option>
                        <option value="Pink">Pink</option>
                        <option value="Green">Green</option>
                      </select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel>Vehicle Type</InputLabel>
                    <FormControl fullWidth>
                      <select
                        className="style-class"
                        {...register("vehicle_type", { required: true })}
                      >
                        <option value="SEDAN">SEDAN</option>
                        <option value="SUV">SUV</option>
                        <option value="BIKE">BIKE</option>
                        <option value="TRUCK">TRUCK</option>
                        <option value="HATCHBACK">HATCHBACK</option>
                        <option value="HATCHBACK SUV">HATCHBACK SUV</option>
                      </select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel>Maker</InputLabel>
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        error={!!errors.maker}
                        helperText={errors.maker?.message}
                        {...register("maker", { required: true })}
                      />
                      {errors.maker && (
                        <FormHelperText
                          style={{ color: "red", marginLeft: "0px" }}
                        >
                          {"please fill this field"}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel>Model</InputLabel>
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        error={!!errors.model}
                        helperText={errors.model?.message}
                        {...register("model", { required: true })}
                      />
                      {errors.model && (
                        <FormHelperText
                          style={{ color: "red", marginLeft: "0px" }}
                        >
                          {"please fill this field"}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <InputLabel>Make Year</InputLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Controller
                        name="year"
                        control={control}
                        defaultValue={null} // Set the default value to null or a valid date
                        rules={{ required: "Year is required" }}
                        render={({ field, fieldState }) => (
                          <DatePicker
                            views={["year"]} // Restrict views to only "year"
                            {...field}
                            value={
                              field.value ? dayjs().year(field.value) : null
                            } // Convert saved year to a Day.js object for display
                            onChange={(newValue) =>
                              field.onChange(newValue?.year() || "")
                            } // Update value manually
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message || ""}
                              />
                            )}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel>Title</InputLabel>
                    <FormControl fullWidth>
                      <select
                        className="style-class"
                        {...register("car_title", { required: true })}
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} sm={6} direction={"row"}>
                    <InputLabel>Title Type</InputLabel>
                    <TextField
                      fullWidth
                      error={!!errors.title_type}
                      helperText={errors.title_type?.message}
                      {...register("title_type", { required: true })}
                      type="text"
                      InputLabelProps={{ shrink: true }}
                    />
                    {errors.title_type && (
                      <FormHelperText
                        style={{ color: "red", marginLeft: "0px" }}
                      >
                        {"please fill this field"}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={6} sm={6} direction={"row"}>
                    <InputLabel>Purchased Date</InputLabel>
                    <TextField
                      fullWidth
                      error={!!errors.purchase_date}
                      helperText={errors.purchase_date?.message}
                      {...register("purchase_date", { required: true })}
                      type="date"
                      InputLabelProps={{ shrink: true }}
                    />
                    {errors.purchase_date && (
                      <FormHelperText
                        style={{ color: "red", marginLeft: "0px" }}
                      >
                        {"please fill this field"}
                      </FormHelperText>
                    )}
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <InputLabel>Car Condition</InputLabel>
                    <FormControl fullWidth>
                      <select
                        className="style-class"
                        {...register("car_condition", { required: true })}
                      >
                        <option value="New">New</option>
                        <option value="Used">Used</option>
                      </select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel>Car Key</InputLabel>
                    <FormControl fullWidth>
                      <select
                        className="style-class"
                        {...register("car_key", { required: true })}
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </FormControl>
                  </Grid>
                </Grid>
              </form>
            )}

            {activeStep === 1 && (
              <Box>
                <Grid container spacing={2}>
                  {/* Left Side */}
                  <Grid item xs={12} sm={3}>
                    <InputLabel>Sale Price</InputLabel>
                    <TextField
                      fullWidth
                      error={!!errors.auction_price}
                      helperText={errors.auction_price?.message}
                      {...register("auction_price", { required: true })}
                    />
                    {errors.auction_price && (
                      <FormHelperText
                        style={{ color: "red", marginLeft: "0px" }}
                      >
                        {"please fill this field"}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <InputLabel>Payment Status</InputLabel>
                    <select
                      className="style-class"
                      {...register("payment_status", { required: true })}
                    >
                      <option value={"paid"}>{"Paid"}</option>
                      <option value={"unpaid"}>{"Un Paid"}</option>
                      <option value={"patialpaid"}>{"Partial Paid"}</option>
                    </select>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel>Destination</InputLabel>
                    <TextField
                      fullWidth
                      error={!!errors.destination_status}
                      helperText={errors.destination_status?.message}
                      {...register("destination_status", { required: true })}
                    />
                    {errors.destination_status && (
                      <FormHelperText
                        style={{ color: "red", marginLeft: "0px" }}
                      >
                        {"please fill this field"}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel>Region</InputLabel>
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        error={!!errors.region}
                        helperText={errors.region?.message}
                        {...register("region", { required: true })}
                      />
                      {errors.region && (
                        <FormHelperText
                          style={{ color: "red", marginLeft: "0px" }}
                        >
                          {"please fill this field"}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <InputLabel>State</InputLabel>
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        error={!!errors.state}
                        helperText={errors.state?.message}
                        {...register("state", { required: true })}
                      />
                      {errors.state && (
                        <FormHelperText
                          style={{ color: "red", marginLeft: "0px" }}
                        >
                          {"please fill this field"}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <InputLabel>City</InputLabel>
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        error={!!errors.city}
                        helperText={errors.city?.message}
                        {...register("city", { required: true })}
                      />
                      {errors.city && (
                        <FormHelperText
                          style={{ color: "red", marginLeft: "0px" }}
                        >
                          {"please fill this field"}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel>Auction Location</InputLabel>
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        error={!!errors.auction_location}
                        helperText={errors.auction_location?.message}
                        {...register("auction_location", { required: true })}
                      />
                      {errors.auction_location && (
                        <FormHelperText
                          style={{ color: "red", marginLeft: "0px" }}
                        >
                          {"please fill this field"}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel>Address</InputLabel>
                    <TextField
                      fullWidth
                      error={!!errors.address}
                      helperText={errors.address?.message}
                      {...register("address", { required: true })}
                    />
                    {errors.address && (
                      <FormHelperText
                        style={{ color: "red", marginLeft: "0px" }}
                      >
                        {"please fill this field"}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel>Focal Person Phone</InputLabel>
                    <TextField
                      fullWidth
                      error={!!errors.focal_person_phone}
                      helperText={errors.focal_person_phone?.message}
                      {...register("focal_person_phone", { required: true })}
                    />
                    {errors.focal_person_phone && (
                      <FormHelperText
                        style={{ color: "red", marginLeft: "0px" }}
                      >
                        {"please fill this field"}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel>Gate Pass Pin</InputLabel>
                    <TextField
                      fullWidth
                      error={!!errors.gate_pass_pin}
                      helperText={errors.gate_pass_pin?.message}
                      {...register("gate_pass_pin", { required: true })}
                    />
                    {errors.gate_pass_pin && (
                      <FormHelperText
                        style={{ color: "red", marginLeft: "0px" }}
                      >
                        {"please fill this field"}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel>Add Image</InputLabel>
                    <TextField
                      type="file"
                      fullWidth
                      name="auction_image"
                      onChange={handleFileChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel>Add Invoice</InputLabel>
                    <TextField
                      type="file"
                      fullWidth
                      name="invoice"
                      onChange={handleFileChange}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}
          </Box>
        }
        action={
          <>
            {activeStep === 0 && (
              <>
                <ExportBtn onClick={handleAddOpen} sx={{ width: "120px" }}>
                  cancel
                </ExportBtn>
                <MyBtn
                  sx={{ width: "120px" }}
                  onClick={handleStepOneNext}
                  disabled={activeStep === 1}
                >
                  Next
                </MyBtn>
              </>
            )}
            {activeStep === 1 && (
              <>
                <ExportBtn onClick={handleBack} sx={{ width: "120px" }}>
                  Back
                </ExportBtn>
                <MyBtn
                  sx={{ width: "120px" }}
                  onClick={handleSubmit(onSubmit)}
                  disabled={activeStep === 0}
                >
                  {state.loading ? (
                    <>
                      <CircularProgress size={20} color="success" /> loading
                    </>
                  ) : (
                    "Submit"
                  )}
                </MyBtn>
              </>
            )}
          </>
        }
      />
      <Alert
        open={state.alertModal}
        close={() => handleModal("")}
        title={
          <Stack alignItems={"center"}>
            <Typography sx={{ fontWeight: 600, fontSize: "28px" }} variant="h5">
              {" "}
              {state.status}
            </Typography>
          </Stack>
        }
        content={
          <Box sx={{ width: "90%", margin: "auto", marginTop: 4 }}>
            {state.loading ? (
              <>
                <CircularProgress size={20} color="success" /> loading
              </>
            ) : (
              <Slide>
                {state.listImages.length !== 0 ? (
                  state.listImages?.map((item, index) => (
                    <div key={index} className="each-slide-effect">
                      <div
                      // style={{
                      //   backgroundImage: `url(https://gshipping.khataljazeeraauction.com${item.image_url})`,
                      // }}
                      >
                        <img
                          src={`https://gshipping.khataljazeeraauction.com${item.image_url}`}
                          alt=""
                          style={{
                            width: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <Typography sx={{ textAlign: "center" }}>
                    No Images with this status found
                  </Typography>
                )}
              </Slide>
            )}
          </Box>
        }
      />
      <Alert
        open={state.imageModal}
        close={handleImageModal}
        title={
          <Stack alignItems={"center"}>
            <Typography sx={{ fontWeight: 600, fontSize: "28px" }} variant="h5">
              {" "}
              Update Vehicles
            </Typography>
          </Stack>
        }
        content={
          <Box sx={{ width: "90%", margin: "auto", marginTop: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputLabel>Status</InputLabel>
                <select
                  className="style-class"
                  value={state.currentStatus}
                  onChange={handleChange}
                  name="currentStatus"
                >
                  {statusList &&
                    statusList.map((status) => (
                      <option key={status.id} value={status.id}>
                        {status.name}
                      </option>
                    ))}
                </select>
              </Grid>
              <Grid item xs={12}>
                <InputLabel>Add Images</InputLabel>
                <input
                  className="style-class"
                  type="file"
                  multiple
                  onChange={fileSelectedHandler}
                />
              </Grid>
              {files &&
                files.map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt=""
                    width={"100px"}
                    height={"100px"}
                    style={{ margin: "20px", borderRadius: "6px" }}
                  />
                ))}
              <Grid item xs={12}>
                <InputLabel>Note</InputLabel>
                <TextareaAutosize
                  style={{
                    width: "100%",
                    borderRadius: "4px",
                    border: "1px solid #C3D3E2",
                  }}
                  minRows={3}
                  value={state.note}
                  name="note"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Box>
        }
        action={
          <>
            <ExportBtn onClick={handleImageModal} sx={{ width: "120px" }}>
              Cancel
            </ExportBtn>
            <MyBtn sx={{ width: "120px" }} onClick={saveChanges}>
              {state.loading ? (
                <>
                  <CircularProgress size={20} color="success" /> loading
                </>
              ) : (
                "Submit"
              )}
            </MyBtn>
          </>
        }
      />
    </>
  );
}
