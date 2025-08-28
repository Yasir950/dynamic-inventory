import axios from "axios";
import { toast } from "react-toastify";

export const login = async (userData) => {
  try {
    let res = await axios.post(
      `http://34.26.96.206:8000/api/auth/login`,
      userData
    );
    let json = res.data;
    return json;
  } catch (error) {
    toast.error("Invalid Credentials");
    throw error;
  }
};
export const changePassword = async (userData) => {
  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Cookie: "COOKIE_SUPPORT=true; GUEST_LANGUAGE_ID=en_US",
  };

  try {
    const response = await axios.post(
      "https://gshipping.khataljazeeraauction.com/api/auth/users/change_password/",
      userData, // Send userData directly as the body
      { headers } // Pass headers separately
    );

    return response.data;
  } catch (error) {
    console.error(
      "Change password error:",
      error.response?.data || error.message
    );
    throw error;
  }
};
export const getUsersData = async () => {
  const token = localStorage.getItem("token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  const raw = "";

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  let res = await axios.get(
    `http://34.26.96.206:8000/api/auth/users/`,
    requestOptions
  );
  let json = res.data;
  return json;
};
export const getRolesData = async () => {
  const token = localStorage.getItem("token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  const raw = "";
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  let res = await axios.get(
    `https://gshipping.khataljazeeraauction.com/api/auth/roles/`,
    requestOptions
  );
  let json = res.data;
  return json;
};
export const getPermissionsApi = async () => {
  const token = localStorage.getItem("token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  const raw = "";
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  let res = await axios.get(
    `https://gshipping.khataljazeeraauction.com/api/auth/permissions/`,
    requestOptions
  );
  let json = res.data;
  return json;
};
export const saveUserData = async (userData) => {
  const token = localStorage.getItem("token");

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://gshipping.khataljazeeraauction.com/api/auth/users/",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: userData,
  };

  try {
    const response = await axios.request(config); // Await the API call
    return response.data; // Return the API response data
  } catch (error) {
    toast.error(error.response.data.email[0]);
  }
};
export const updateUserData = async (userData, id) => {
  const token = localStorage.getItem("token");

  let config = {
    method: "patch",
    maxBodyLength: Infinity,
    url: `https://gshipping.khataljazeeraauction.com/api/auth/users/${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: userData,
  };

  try {
    const response = await axios.request(config); // Await the API call
    return response.data; // Return the API response data
  } catch (error) {
    toast.error(error.response.data.email[0]);
  }
};
export const deleteItem = async (url, id) => {
  const token = localStorage.getItem("token");

  let config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: `https://gshipping.khataljazeeraauction.com/api/${url}/${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  try {
    const response = await axios.request(config); // Await the API call
    return response.status; // Return the API response data
  } catch (error) {
    console.error("Error saving user data:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
export const saveRolesData = async (userData) => {
  const token = localStorage.getItem("token");

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://gshipping.khataljazeeraauction.com/api/auth/roles/",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: userData,
  };

  try {
    const response = await axios.request(config); // Await the API call
    return response.data; // Return the API response data
  } catch (error) {
    toast.error(error.response.data.name[0]);
  }
};
export const updateRoleData = async (userData, id) => {
  const token = localStorage.getItem("token");

  let config = {
    method: "patch",
    maxBodyLength: Infinity,
    url: `https://gshipping.khataljazeeraauction.com/api/auth/roles/${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: userData,
  };

  try {
    const response = await axios.request(config); // Await the API call
    return response.data; // Return the API response data
  } catch (error) {
    toast.error(error.response.data.name[0]);
  }
};
export const getCompanies = async () => {
  const token = localStorage.getItem("token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  const raw = "";

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  let res = await axios.get(
    `https://gshipping.khataljazeeraauction.com/api/companies/`,
    requestOptions
  );
  let json = res.data;
  return json;
};
export const saveCompanies = async (userData) => {
  const token = localStorage.getItem("token");

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://gshipping.khataljazeeraauction.com/api/companies/",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: userData,
  };

  try {
    const response = await axios.request(config); // Await the API call
    return response.data; // Return the API response data
  } catch (error) {
    toast.error(error.response.data.email[0]);
  }
};
export const getCompanyById = async (id) => {
  const token = localStorage.getItem("token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  const raw = "";

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  let res = await axios.get(
    `https://gshipping.khataljazeeraauction.com/api/companies/${id}`,
    requestOptions
  );
  let json = res.data;
  return json;
};
export const updateCompanies = async (userData, id) => {
  const token = localStorage.getItem("token");

  let config = {
    method: "patch",
    maxBodyLength: Infinity,
    url: `https://gshipping.khataljazeeraauction.com/api/companies/${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: userData,
  };

  try {
    const response = await axios.request(config); // Await the API call
    return response.data; // Return the API response data
  } catch (error) {
    toast.error(error.response.data.email[0]);
  }
};
export const getVehicles = async () => {
  const token = localStorage.getItem("token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  const raw = "";

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  let res = await axios.get(
    `https://gshipping.khataljazeeraauction.com/api/vehicles/`,
    requestOptions
  );
  let json = res.data;
  return json;
};
export const saveVehicles = async (userData) => {
  const token = localStorage.getItem("token");

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://gshipping.khataljazeeraauction.com/api/vehicles/",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: userData,
  };

  try {
    const response = await axios.request(config); // Await the API call
    return response.data; // Return the API response data
  } catch (error) {
    toast.error(error.response.data.vin[0]);
  }
};
export const updateVehicles = async (userData, id) => {
  const token = localStorage.getItem("token");

  let config = {
    method: "patch",
    maxBodyLength: Infinity,
    url: `https://gshipping.khataljazeeraauction.com/api/vehicles/${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: userData,
  };

  try {
    const response = await axios.request(config); // Await the API call
    return response.data; // Return the API response data
  } catch (error) {
    toast.error(error.response.data.vin[0]);
  }
};
export const getMakers = async () => {
  const token = localStorage.getItem("token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  const raw = "";

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  let res = await axios.get(
    `https://gshipping.khataljazeeraauction.com/api/makers/`,
    requestOptions
  );
  let json = res.data;
  return json;
};
export const getModels = async () => {
  const token = localStorage.getItem("token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  const raw = "";

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  let res = await axios.get(
    `https://gshipping.khataljazeeraauction.com/api/models/`,
    requestOptions
  );
  let json = res.data;
  return json;
};
export const saveContainers = async (userData) => {
  const token = localStorage.getItem("token");

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://gshipping.khataljazeeraauction.com/api/containers/",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: userData,
  };

  try {
    const response = await axios.request(config); // Await the API call
    return response.data; // Return the API response data
  } catch (error) {
    toast.error(error.response.data.container_number[0]);
  }
};
export const updateContainers = async (userData, id) => {
  const token = localStorage.getItem("token");

  let config = {
    method: "patch",
    maxBodyLength: Infinity,
    url: `https://gshipping.khataljazeeraauction.com/api/containers/${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: userData,
  };

  try {
    const response = await axios.request(config); // Await the API call
    return response.data; // Return the API response data
  } catch (error) {
    toast.error(error.response.data.container_number[0]);
  }
};
export const getContainerStatus = async () => {
  const token = localStorage.getItem("token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  const raw = "";

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  let res = await axios.get(
    `https://gshipping.khataljazeeraauction.com/api/containers/get_count/`,
    requestOptions
  );
  let json = res.data;
  return json;
};
export const getVehicleStatus = async () => {
  const token = localStorage.getItem("token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  const raw = "";

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  let res = await axios.get(
    `https://gshipping.khataljazeeraauction.com/api/vehicle-statuses/`,
    requestOptions
  );
  let json = res.data;
  return json;
};
export const getVehicleCount = async () => {
  const token = localStorage.getItem("token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  const raw = "";

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  let res = await axios.get(
    `https://gshipping.khataljazeeraauction.com/api/vehicles/stats/`,
    requestOptions
  );
  let json = res.data;
  return json;
};
export const changeStatus = async (userData, id) => {
  const token = localStorage.getItem("token");

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `https://gshipping.khataljazeeraauction.com/api/vehicles/${id}/change_status/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: userData,
  };

  try {
    const response = await axios.request(config); // Await the API call
    return response.data; // Return the API response data
  } catch (error) {
    console.error("Error saving user data:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
export const getImgsWithStatus = async (id, stats) => {
  const token = localStorage.getItem("token");
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://gshipping.khataljazeeraauction.com/api/vehicles/${id}/get_images/?status=${stats}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error("Error :", error);
    throw error; // Re-throw the error for the caller to handle
  }
};

export const addVehicle = async (userData, id) => {
  const token = localStorage.getItem("token");
  console.log(userData, id);
  let config = {
    method: "patch",
    maxBodyLength: Infinity,
    url: `https://gshipping.khataljazeeraauction.com/api/vehicles/${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: userData,
  };

  try {
    const response = await axios.request(config); // Await the API call
    return response.data; // Return the API response data
  } catch (error) {
    console.error("Error saving user data:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
export const Filter = async (status, reg, start, end, type) => {
  const token = localStorage.getItem("token");
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://gshipping.khataljazeeraauction.com/api/containers/?status=${status}&destination_port=${reg}&date_type=${type}&start_date=${start}&end_date=${end}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  try {
    const response = await axios.request(config); // Await the API call
    return response.data; // Return the API response data
  } catch (error) {
    console.error("Error saving user data:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
export const getInvoices = async () => {
  const token = localStorage.getItem("token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  const raw = "";

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  let res = await axios.get(
    `https://gshipping.khataljazeeraauction.com/api/pay/invoices/`,
    requestOptions
  );
  let json = res.data;
  return json;
};
export const saveInvoices = async (userData) => {
  const token = localStorage.getItem("token");

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://gshipping.khataljazeeraauction.com/api/pay/invoices/",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: userData,
  };

  try {
    const response = await axios.request(config); // Await the API call
    return response.data; // Return the API response data
  } catch (error) {
    toast.error("please fill out all fields");
  }
};
export const updatedInvoices = async (userData, id) => {
  const token = localStorage.getItem("token");

  let config = {
    method: "patch",
    maxBodyLength: Infinity,
    url: `https://gshipping.khataljazeeraauction.com/api/pay/invoices/${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: userData,
  };

  try {
    const response = await axios.request(config); // Await the API call
    return response.data; // Return the API response data
  } catch (error) {
    toast.error("please fill out all fields");
  }
};
export const getPayments = async (id) => {
  const token = localStorage.getItem("token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  const raw = "";

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  let res = await axios.get(
    `https://gshipping.khataljazeeraauction.com/api/pay/payout/?invoice=${id}`,
    requestOptions
  );
  let json = res.data;
  return json;
};
export const savePayments = async (userData) => {
  const token = localStorage.getItem("token");

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://gshipping.khataljazeeraauction.com/api/pay/payout/",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: userData,
  };

  try {
    const response = await axios.request(config); // Await the API call
    return response.data; // Return the API response data
  } catch (error) {
    console.error("Error saving user data:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
export const getDashboardData = async (id = "") => {
  const token = localStorage.getItem("token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  const raw = "";

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  try {
    let res = await axios.get(
      `https://gshipping.khataljazeeraauction.com/api/dashboard?company=${id}`,
      requestOptions
    );
    console.log(res);
    let json = res.data;
    return json;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized (401). Logging out...");
      localStorage.removeItem("token"); // Remove invalid token
      navigate("/login"); // Redirect to login page
    } else {
      console.error("API Error:", error);
    }
    return null;
  }
};
export const updateStatus = async (userData, id) => {
  const token = localStorage.getItem("token");

  let config = {
    method: "patch",
    maxBodyLength: Infinity,
    url: `https://gshipping.khataljazeeraauction.com/api/pay/payout/${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: userData,
  };

  try {
    const response = await axios.request(config); // Await the API call
    return response.data; // Return the API response data
  } catch (error) {
    console.error("Error saving user data:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};

export const getUnassVehicles = async () => {
  const token = localStorage.getItem("token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  const raw = "";

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  let res = await axios.get(
    `https://gshipping.khataljazeeraauction.com/api/vehicles/get_unassigned_vehicles/`,
    requestOptions
  );
  let json = res.data;
  return json;
};
export const getVehiclesByStatus = async (status) => {
  const token = localStorage.getItem("token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  const raw = "";

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  let res = await axios.get(
    `https://gshipping.khataljazeeraauction.com/api/vehicles/get_vehicle_by_status?status=${status}`,
    requestOptions
  );
  let json = res.data;
  return json;
};
export const getTransactionData = async () => {
  const token = localStorage.getItem("token");
  console.log(localStorage.getItem("token"));
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  const raw = "";

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  let res = await axios.get(
    `https://gshipping.khataljazeeraauction.com/api/pay/transactions/`,
    requestOptions
  );
  let json = res.data;
  return json;
};
export const saveTransData = async (userData) => {
  const token = localStorage.getItem("token");

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://gshipping.khataljazeeraauction.com/api/pay/transactions/",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: userData,
  };

  try {
    const response = await axios.request(config); // Await the API call
    return response.data; // Return the API response data
  } catch (error) {
    toast.error(error.response.data.email[0]);
  }
};
export const getCreditTransactions = async (id) => {
  const token = localStorage.getItem("token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  const raw = "";

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  let res = await axios.get(
    `https://gshipping.khataljazeeraauction.com/api/pay/transactions/credit_transactions?company=${id}
`,
    requestOptions
  );
  let json = res.data;
  return json;
};
export const getByTransactions = async (id) => {
  const token = localStorage.getItem("token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  const raw = "";

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  let res = await axios.get(
    `https://gshipping.khataljazeeraauction.com/api/pay/payout/get_by_transaction?transaction=${id}`,
    requestOptions
  );
  let json = res.data;
  return json;
};
export const getVehByVin = async (id) => {
  const token = localStorage.getItem("token");
  console.log(localStorage.getItem("token"));
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  const raw = "";

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  let res = await axios.get(
    `https://gshipping.khataljazeeraauction.com/api/vehicles/get_vehicle_by_vin?vin=${id}

`,
    requestOptions
  );
  let json = res.data;
  return json;
};
export const getRatesData = async () => {
  const token = localStorage.getItem("token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  const raw = "";
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  let res = await axios.get(
    `https://gshipping.khataljazeeraauction.com/api/rates/`,
    requestOptions
  );
  let json = res.data;
  return json;
};
export const saveRatesData = async (userData) => {
  const token = localStorage.getItem("token");
  console.log(userData);
  try {
    const response = await axios.post(
      "https://gshipping.khataljazeeraauction.com/api/rates/",
      userData,
      {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "*/*",
          "Content-Type": "multipart/form-data",
          // ✅ DO NOT set Content-Type here; axios sets it automatically for FormData
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log("Save Rates Error:", error.response);
    toast.error(error.response?.data?.email?.[0] || "Something went wrong");
  }
};
export const updateRatesData = async (userData, id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.patch(
      `https://gshipping.khataljazeeraauction.com/api/rates/${id}/`,
      userData,
      {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "*/*",
          "Content-Type": "multipart/form-data",
          // ✅ DO NOT set Content-Type here; axios sets it automatically for FormData
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log("Save Rates Error:", error.response);
    toast.error(error.response?.data?.email?.[0] || "Something went wrong");
  }
};
export const getData = async (url) => {
  const token = localStorage.getItem("token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  const raw = "";

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  let res = await axios.get(
    `http://34.26.96.206:8000/api/${url}/`,
    requestOptions
  );
  let json = res.data;
  return json;
};
export const updateData = async (userData, id, url) => {
  const token = localStorage.getItem("token");

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `http://34.26.96.206:8000/api/auth/${url}/${id}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: userData,
  };

  try {
    const response = await axios.request(config); // Await the API call
    return response.data; // Return the API response data
  } catch (error) {
    toast.error(error.response.data.email[0]);
  }
};
export const saveForecast = async (userData) => {
  const token = localStorage.getItem("token");

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://34.26.96.206:8000/api/forecasts/",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: userData,
  };

  try {
    const response = await axios.request(config); // Await the API call
    return response.data; // Return the API response data
  } catch (error) {
    toast.error(error.response.data.container_number[0]);
  }
};
export const savePromotionForecast = async (userData) => {
  const token = localStorage.getItem("token");

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://34.26.96.206:8000/api/promotion-forecasts/",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: userData,
  };

  try {
    const response = await axios.request(config); // Await the API call
    return response.data; // Return the API response data
  } catch (error) {
    toast.error(error.response.data.container_number[0]);
  }
};
