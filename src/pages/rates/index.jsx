// material-ui
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MainCard from "components/MainCard";
import { AddBtn } from "styled/styled";
import { useEffect, useState } from "react";
import { deleteItem, getRatesData, getUsersData } from "apiservices";
import {
  PlusOutlined,
  RightOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Breadcrumbs } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { changeForm, clearData, updatedData } from "redux/slices/userSlice";
import { ReactTable } from "misc/ReactTable";
import { DeleteIcon, EditIcon } from "assets/images/users/Svg";
import { toast } from "react-toastify";
import AddRate from "./viewdetails";
import { Download } from "@mui/icons-material";
import moment from "moment";

// ===============================|| COMPONENT - COLOR ||=============================== //

function createData(id, month, shipping, towing, created) {
  return {
    id,
    month,
    shipping,
    towing,
    created,
  };
}
export default function UsersComp() {
  const updatedObj = useSelector((state) => state.user.updatedObj);

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
      name: "Created At",
      selector: (row) => moment(row.created).format("DD/MM/YYYY"),
      sortable: true,
      style: {
        fontSize: "14px",
        fontWeight: 500,
        color: "#101828",
        // override the row height
      },
    },
    {
      name: "Month",
      selector: (row) => moment(row.month, "YYYY-MM").format("MMMM YYYY"),
      sortable: true,
      style: {
        fontSize: "14px",
        fontWeight: 400,
        color: "#667085",
        // override the row height
      },
    },
    {
      name: "Shipping Charges File",
      cell: (row) =>
        row.shipping ? (
          <a
            href={row.shipping}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "#344054" }}
          >
            <Download style={{ cursor: "pointer" }} />
          </a>
        ) : (
          <span style={{ color: "#ccc" }}>No File</span>
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
      name: "Towing Charges File",
      cell: (row) =>
        row.towing ? (
          <a
            href={row.towing}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "#344054" }}
          >
            <Download style={{ cursor: "pointer" }} />
          </a>
        ) : (
          <span style={{ color: "#ccc" }}>No File</span>
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
      name: "Actions",
      style: {
        fontSize: "14px",
        fontWeight: 400,
        color: "#667085",
        // override the row height
      },
      cell: (row) => (
        <>
          <button
            className="cursor-pointer"
            onClick={() => handleDelete(row.id || row.cid)}
            style={{ background: "none", border: "0px" }}
          >
            <DeleteIcon />
          </button>
          <button
            className="cursor-pointer"
            onClick={() => handleEdit(row)}
            style={{ background: "none", border: "0px" }}
          >
            <EditIcon />
          </button>
        </>
      ), // Use `cell` instead of `selector` for rendering JSX
    },
  ];
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();

  const handleEdit = (row) => {
    dispatch(updatedData(row));
  };

  const handleDelete = async (id) => {
    let res = await deleteItem("rates", id);
    if (res === 204) {
      getUsers();
      toast.error("user deleted successfully");
    }
  };
  const isAddForm = useSelector((state) => state.user.isAddForm);
  const [state, setState] = useState({
    userData: [],
  });
  useEffect(() => {
    getRates();
    if (updatedObj) {
      reset({
        first_name: updatedObj.first_name || "",
        email: updatedObj.email || "",
        password: "",
        user_type: updatedObj.user_type || "Management",
        role: updatedObj.role,
      });
    }
    return () => {};
  }, []);
  const getRates = async () => {
    let res = await getRatesData();
    const rowsData = res.map((item) =>
      createData(
        item.id,
        item.month,
        item.shipping_charges_file,
        item.towing_charges_file,
        item.created_at
      )
    );
    setState((prev) => ({ ...prev, userData: rowsData.reverse() }));
    setPending(false);
  };
  const handleAddOpen = () => {
    dispatch(changeForm());
    dispatch(clearData());
  };
  return (
    <>
      {isAddForm ? (
        <AddRate closeForm={handleAddOpen} Rate={getRates} />
      ) : (
        <>
          <Stack
            justifyContent={"space-between"}
            flexDirection={{ xs: "column", sm: "row" }}
            alignItems={"center"}
          >
            <Typography
              sx={{ fontWeight: 600, fontSize: "30px", color: "#09090B" }}
            >
              Price Lists
              <Breadcrumbs aria-label="breadcrumb">
                <Typography sx={{ fontSize: "14px", fontWeight: 300 }}>
                  <span
                    style={{
                      color: "#000000",
                      fontSize: "14px",
                      fontWeight: 400,
                    }}
                  >
                    Dashboard
                  </span>{" "}
                  <RightOutlined /> Rates
                </Typography>
              </Breadcrumbs>
            </Typography>
            <AddBtn onClick={handleAddOpen}>
              <PlusOutlined style={{ margin: 5 }} /> Add Rate
            </AddBtn>
          </Stack>
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
              <ReactTable
                column={headCells}
                rows={state.userData}
                name={"Rates"}
                pending={pending}
              />
              {/* <MuiTable name={'Users'} column={headCells} rows={state.userData} url={'auth/users'} getUsers={getUsers}/> */}
            </MainCard>
          </Grid>
        </>
      )}
    </>
  );
}
