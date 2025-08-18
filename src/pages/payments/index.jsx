import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MainCard from "components/MainCard";
import Breadcrumbs from "components/@extended/Breadcrumbs";
import { AddBtn } from "styled/styled";
import React, { useEffect, useState } from "react";
import { DashIcon3, DeleteIcon, EditIcon } from "assets/images/users/Svg";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Switch,
  TextField,
  Tooltip,
} from "@mui/material";
import "style.css";
import { useDispatch, useSelector } from "react-redux";
import { changeForm, clearData, updatedData } from "redux/slices/userSlice";
import {
  deleteItem,
  Filter,
  getCreditTransactions,
  getInvoices,
  getPayments,
  updateStatus,
} from "apiservices";
import { toast } from "react-toastify";
import { ReactTable } from "misc/ReactTable";
import CreateInvoice from "./create-invoice";
import {
  ArrowDownOutlined,
  CreditCardOutlined,
  DollarCircleOutlined,
  DollarOutlined,
  DollarTwoTone,
} from "@ant-design/icons";
import Alert from "misc/dialogue";
import VehicleCards from "components/cards/VehicleCards";

// ===============================|| COMPONENT - COLOR ||=============================== //

function createData(
  id,
  company,
  issue_date,
  due_date,
  total,
  discount,
  paid_amount,
  remaining,
  description,
  status,
  subtotal,
  is_published,
  items,
  action
) {
  return {
    id,
    company,
    issue_date,
    due_date,
    total,
    discount,
    paid_amount,
    remaining,
    description,
    status,
    subtotal,
    is_published,
    items,
    action,
  };
}
function createPayoutData(
  id,
  payment_amount,
  payment_proof,
  transaction,
  status,
  action
) {
  return {
    id,
    payment_amount,
    payment_proof,
    transaction,
    status,
    action,
  };
}
export default function PaymentComp() {
  let user = JSON.parse(localStorage.getItem("user"));
  let normalUser = !user?.is_superuser && user?.company;
  const payoutHeadCells = [
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
      name: "payment_amount",
      selector: (row) => row.payment_amount,
      sortable: true,
      style: {
        fontSize: "14px",
        fontWeight: 400,
        color: "#667085",
        // override the row height
      },
    },
    {
      name: "payment_proof",
      selector: (row) => row.transaction,
      sortable: true,
      style: {
        fontSize: "14px",
        fontWeight: 400,
        color: "#667085",
        // override the row height
      },
    },
    {
      name: "Status",
      cell: (row) => (
        <div
          style={{
            fontSize: "12px",
            fontWeight: 400,
            background:
              row.status == "Pending"
                ? "#6F7B91"
                : row.status == "Approved"
                  ? "#F2C43A"
                  : "",
            height: "22px",
            padding: "2px 8px 2px 6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#FFFFFF",
            borderRadius: "10px",
          }}
        >
          {row.status}
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
      name: "Actions",
      style: {
        fontSize: "14px",
        fontWeight: 400,
        color: "#667085",
        // override the row height
      },
      cell: (row) => (
        <>
          {/* <button
          className='cursor-pointer'
          onClick={() => handleDelete(row.id || row.cid)}
          style={{ background: "none", border: '0px' }}
        >
          <DeleteIcon />
        </button>
        <button
          className='cursor-pointer'
          onClick={() => handleEdit(row)}
          style={{ background: "none", border: '0px' }}
        >
          <EditIcon />
        </button> */}
          {!normalUser && (
            <>
              {row.status == "Approved" ? (
                <Switch defaultChecked disabled size="small" />
              ) : (
                <Tooltip title="Approve Status">
                  <Switch
                    className="cursor-pointer"
                    onChange={() => updatepayements(row.id)}
                    size="small"
                  />
                </Tooltip>
              )}
            </>
          )}
        </>
      ), // Use `cell` instead of `selector` for rendering JSX
    },
  ];
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
      name: "Company",
      selector: (row) => row.company?.company_name,
      sortable: true,
      style: {
        fontSize: "14px",
        fontWeight: 400,
        color: "#667085",
        // override the row height
      },
    },
    {
      name: "Issue Date",
      selector: (row) => row.issue_date,
      sortable: true,
      style: {
        fontSize: "14px",
        fontWeight: 400,
        color: "#667085",
        // override the row height
      },
    },
    {
      name: "Due Date",
      selector: (row) => row.due_date,
      sortable: true,
      style: {
        fontSize: "14px",
        fontWeight: 400,
        color: "#667085",
        // override the row height
      },
    },

    {
      name: "Invoice Amount",
      selector: (row) => +row.total + +row.discount,
      sortable: true,
      style: {
        fontSize: "14px",
        fontWeight: 400,
        color: "#667085",
        // override the row height
      },
    },

    {
      name: "Total Payable",
      selector: (row) => row.total,
      sortable: true,
      style: {
        fontSize: "14px",
        fontWeight: 400,
        color: "#667085",
        // override the row height
      },
    },
    {
      name: "Discount",
      selector: (row) => row.discount,
      sortable: true,
      style: {
        fontSize: "14px",
        fontWeight: 400,
        color: "#667085",
        // override the row height
      },
    },
    {
      name: "Payment Amount",
      selector: (row) => row.paid_amount,
      sortable: true,
      style: {
        fontSize: "14px",
        fontWeight: 400,
        color: "#667085",
        // override the row height
      },
    },
    {
      name: "Remaining",
      selector: (row) => row.remaining,
      sortable: true,
      style: {
        fontSize: "14px",
        fontWeight: 400,
        color: "#667085",
        // override the row height
      },
    },
    {
      name: "Payment",
      cell: (row) => (
        <div
          style={{
            fontSize: "12px",
            fontWeight: 400,
            background:
              row.status == "Pending"
                ? "#6F7B91"
                : row.status == "Partial Paid"
                  ? "#8DC9CC"
                  : row.status == "Paid"
                    ? "#F2C43A"
                    : "",
            height: "22px",
            padding: "2px 8px 2px 6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#FFFFFF",
            borderRadius: "10px",
            width: "200px",
          }}
        >
          {row.status}
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
      name: "Description",
      cell: (row) => (
        <Tooltip title={row.description}>
          {row.description?.length > 20
            ? `${row.description?.slice(0, 20)}...`
            : row.description}
        </Tooltip>
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
      name: "Status",
      cell: (row) => (
        <>
          {row.id !== "Total" && (
            <div
              style={{
                fontSize: "13px",
                fontWeight: 400,
                background:
                  row.is_published === "Draft" ? "#1976D2" : "#2E7D32",
                width: "90px",
                borderRadius: "10px",
                height: "22px",
                padding: "2px 8px 2px 6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
              }}
            >
              {row.is_published}
            </div>
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
      name: "Actions",
      style: {
        fontSize: "14px",
        fontWeight: 400,
        color: "#667085",
        // override the row height
      },
      cell: (row) => (
        <>
          {
            row.id !== "Total" && (
              <>
                {!normalUser && (
                  <>
                    {row.is_published !== "Published" && (
                      <Tooltip title="Delete">
                        <button
                          className="cursor-pointer"
                          onClick={() => handleDelete(row.id || row.cid)}
                          style={{ background: "none", border: "0px" }}
                        >
                          <DeleteIcon />
                        </button>
                      </Tooltip>
                    )}
                    <Tooltip title="Edit">
                      <button
                        className="cursor-pointer"
                        onClick={() => handleEdit(row)}
                        style={{ background: "none", border: "0px" }}
                      >
                        <EditIcon />
                      </button>
                    </Tooltip>
                    {row.is_published === "Published" && (
                      <Tooltip title="Payouts">
                        <button
                          className="cursor-pointer"
                          onClick={() => handleModal(row)}
                          style={{ background: "none", border: "0px" }}
                        >
                          <DollarCircleOutlined
                            style={{ color: "#667085B2" }}
                          />
                        </button>
                      </Tooltip>
                    )}
                  </>
                )}
                {row.is_published === "Published" && (
                  <Tooltip title="Download invoice">
                    <button
                      className="cursor-pointer"
                      onClick={() => handleFile(row?.id)}
                      style={{ background: "none", border: "0px" }}
                    >
                      <ArrowDownOutlined style={{ color: "#667085B2" }} />
                    </button>
                  </Tooltip>
                )}
              </>
            )
            // Use `cell` instead of `selector` for rendering JSX
          }
        </>
      ),
    },
  ];
  const [state, setState] = useState({
    selected: "all",
    userData: [],
    payouts: [],
    invoiceId: null,
    changeForm: false,
    payment_proof: null,
    payment_amount: null,
    transactionData: [],
  });
  const [pending, setPending] = useState(true);
  const [region, setRegion] = React.useState("");
  const [fromDate, setFromDate] = React.useState(null);
  const [toDate, setToDate] = React.useState(null);
  const [dateType, setDateType] = React.useState("");
  const [status, setStatus] = React.useState("All");
  const [modal, setModal] = React.useState(false);
  const [total, setTotal] = useState({
    total: 0,
    discount: 0,
    paid_amount: 0,
    remaining: 0,
  });
  const updatedObj = useSelector((state) => state.user.updatedObj);
  const isAddForm = useSelector((state) => state.user.isAddForm);
  const dispatch = useDispatch();

  const handleFile = (id) => {
    window.open(
      `https://gshipping.khataljazeeraauction.com/media/invoices/${id}.pdf`,
      "_blank"
    );
  };
  useEffect(() => {
    getInvoicesData();
    return () => {};
  }, [updatedObj]);

  const getInvoicesData = async () => {
    let res = await getInvoices();

    const rowsData = res.map((item) =>
      createData(
        item.id,
        item.company,
        item.issue_date,
        item.due_date,
        item.total,
        item.discount,
        item.paid_amount,
        item.remaining,
        item.description,
        item.status,
        item.subtotal,
        item.is_published,
        item.items
      )
    );
    calculateTotal(rowsData);
    // Append total row to table data
    setState((prev) => ({ ...prev, userData: rowsData }));
    setPending(false);
  };
  const calculateTotal = (rowsData) => {
    const totalPrice = rowsData.reduce(
      (sum, row) => sum + parseInt(row.total),
      0
    );
    const totalDisPrice = rowsData.reduce(
      (sum, row) => sum + parseInt(row.discount),
      0
    );
    const totalPaidAmount = rowsData.reduce(
      (sum, row) => sum + parseInt(row.paid_amount),
      0
    );
    const totalRem = rowsData.reduce(
      (sum, row) => sum + parseInt(row.remaining),
      0
    );

    setTotal({
      total: totalPrice,
      discount: totalDisPrice,
      paid_amount: totalPaidAmount,
      remaining: totalRem,
    });
  };
  const getTransData = async (id) => {
    let res = await getCreditTransactions(id);
    setState((prev) => ({ ...prev, transactionData: res }));
    setPending(false);
  };
  const handleEdit = (row) => {
    dispatch(updatedData(row));
  };
  const getPaymentData = async (id) => {
    let res = await getPayments(id);
    const rowsData = res.map((item) =>
      createPayoutData(
        item.id,
        item.payment_amount,
        item.payment_proof,
        item.transaction,
        item.status
      )
    );
    setState((prev) => ({ ...prev, payouts: rowsData }));
  };
  const handleModal = (row = "") => {
    if (row?.id) {
      getTransData(row.company.id);
      getPaymentData(row?.id);
    }

    setModal(!modal);
    setState((prev) => ({ ...prev, invoiceId: row?.id }));
  };
  const changeData = () => {
    setState((prev) => ({ ...prev, changeForm: !state.changeForm }));
  };
  const handleDelete = async (id) => {
    let res = await deleteItem("pay/invoices", id);
    if (res === 204) {
      getInvoicesData();
      toast.error("invoice deleted successfully");
    }
  };
  const handleAddOpen = () => {
    dispatch(changeForm());
    dispatch(clearData());
  };
  const handleFilter = async (stat) => {
    if (stat == "All") {
      getInvoicesData();
    } else {
      let data = {
        status: status,
        region: region,
        start_date: fromDate,
        end_date: toDate,
        date_type: dateType,
      };
      setStatus(stat);
      let res = await Filter(
        data.status,
        data.region,
        data.start_date,
        data.end_date,
        data.date_type
      );
      if (res) {
        const rowsData = res.map((item) =>
          createData(
            item.id,
            item.container_number,
            item.booking,
            item.departure_port,
            item.destination_port,
            item.vehicles,
            item.status,
            item.loaded_date,
            item.etd,
            item.shipping_date,
            item.eta,
            item.arrived_port_date,
            item.arrived_store_date,
            item.cars_shipping_amount,
            item.containers_rent,
            item.containers_size
          )
        );
        setState((prev) => ({ ...prev, userData: rowsData }));
      }
    }
  };
  const savePaymentsData = async () => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: "Bearer " + token,
    };
    const formdata = new FormData();
    formdata.append("invoice", state.invoiceId);
    formdata.append("transaction", state.payment_proof);
    formdata.append("payment_amount", state.payment_amount);
    formdata.append("status", "Approved");

    const requestOptions = {
      method: "POST",
      headers: headers,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://gshipping.khataljazeeraauction.com/api/pay/payout/",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        const parsedData = JSON.parse(result);
        console.log(parsedData);

        if (parsedData?.id) {
          toast.success("Payment added successfully");
          getPaymentData(state.invoiceId);
          changeData();
          setState((prev) => ({
            ...prev,
            invoiceId: null,
            payment_proof: null,
            payment_amount: null,
            transactionData: [],
          }));
        } else {
          toast.error(parsedData?.detail);
        }
      })
      .catch((error) => toast.error(error));
  };
  const updatepayements = async (id) => {
    let data = new FormData();
    data.append("status", "Approved");
    let res = await updateStatus(data, id);
    console.log(res);
  };
  const handleChange = async (e) => {
    let value = e.target.value;
    let name = e.target.name;
    if (name === "payment_proof") {
      setState((prev) => ({ ...prev, payment_proof: e.target.value }));
    } else {
      setState((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <>
      {isAddForm ? (
        <CreateInvoice
          handleAddOpen={handleAddOpen}
          getInvoices={getInvoices}
        />
      ) : (
        <>
          <Grid item xs={12} md={12} lg={12}>
            <Stack justifyContent={"space-between"} flexDirection={"row"}>
              <Typography
                sx={{ fontWeight: 300, fontSize: "30px", color: "#09090B" }}
              >
                Payments
                <Breadcrumbs navigation={navigation} title="Users" />
              </Typography>
              {!normalUser && (
                <AddBtn onClick={handleAddOpen}>Create Invoice</AddBtn>
              )}
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
                spacing={3}
                justifyContent={"center"}
                alignItems={"center"}
                sx={{ mb: 3 }}
              >
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <VehicleCards
                    title={total.total + " AED"}
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
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <VehicleCards
                    title={total.discount}
                    content={"DISCOUNT"}
                    icon={<DashIcon3 />}
                    bg="#FFF49066"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <VehicleCards
                    title={total.remaining}
                    content={"REMAINING"}
                    icon={
                      <div
                        style={{
                          height: "40px",
                          width: "40px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 20,
                          background: "#FF8900",
                        }}
                      >
                        <CreditCardOutlined
                          style={{ color: "#fff", fontSize: "24px" }}
                        />
                      </div>
                    }
                    bg="#91EC6647"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <VehicleCards
                    title={total.paid_amount + " AED"}
                    content={"TOTAL PAID AMOUNT"}
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
                        <DollarTwoTone style={{ fontSize: "24px" }} />
                      </div>
                    }
                    bg="#F2AF9F33"
                  />
                </Grid>
              </Grid>
              <ReactTable
                column={headCells}
                rows={state.userData}
                name={"Payments"}
                pending={pending}
                totalPrice={1}
                calculateTotal={(data) => calculateTotal(data)}
              />
            </MainCard>
          </Grid>
        </>
      )}
      <Alert
        open={modal}
        close={() => handleModal("")}
        content={
          <Box sx={{ width: "90%", margin: "auto", marginTop: 4 }}>
            {state.changeForm ? (
              <Grid container spacing={2} columnSpacing={10}>
                <Grid item xs={12}>
                  <InputLabel sx={{ mb: 1 }}>Select Transaction</InputLabel>
                  <FormControl fullWidth>
                    <select
                      className="style-class"
                      name="payment_proof"
                      style={{ width: "100%" }}
                      onChange={handleChange}
                    >
                      <option>Select</option>
                      {state.transactionData &&
                        state.transactionData.map((item) => (
                          <option key={item.id} value={item.id}>
                            {" "}
                            {item.amount} - {item.remaining_balance}{" "}
                          </option>
                        ))}
                    </select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel>Payment Amount</InputLabel>
                  <TextField
                    fullWidth
                    type="text"
                    name="payment_amount"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button onClick={savePaymentsData}>Save Payment</Button>
                </Grid>
              </Grid>
            ) : (
              <Grid item xs={12} md={12} lg={12}>
                <Stack
                  justifyContent={"space-between"}
                  flexDirection={"row-reverse"}
                >
                  <Button size="small" onClick={() => changeData()}>
                    Create payouts
                  </Button>
                </Stack>

                <ReactTable
                  column={payoutHeadCells}
                  rows={state.payouts}
                  name={"Payments"}
                />
              </Grid>
            )}
          </Box>
        }
      />
    </>
  );
}
