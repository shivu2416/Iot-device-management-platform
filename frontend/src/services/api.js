import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

const userToken = localStorage.getItem("authToken")
const cleanToken = userToken?.replace(/^"(.*)"$/, '$1');


export const getAllDevicesService = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/device/device/`, {
      headers: { Authorization: `Bearer ${cleanToken}` },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching devices");
  }
};

export const getDeviceByIdService = async (Id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/device/device/${Id}/`, {
      headers: { Authorization: `Bearer ${cleanToken}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching device with ID ${Id}`);
  }
};

export const getAllDeviceDataService = async (Id) => {

  try {
    const response = await axios.get(`${API_BASE_URL}/device/device-data/${Id}`, {
      headers: { Authorization: `Bearer ${cleanToken}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching all device data with ID`);
  }
};

export const getDeviceDataByIdService = async (Id) => {

  try {
    const response = await axios.get(`${API_BASE_URL}/device/device-data/${Id}/`, {
      headers: { Authorization: `Bearer ${cleanToken}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching device data with ID ${Id}`);
  }
};


export const addDeviceDataService = async (deviceData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/device/device-data/`, deviceData, {
      headers: { Authorization: `Bearer ${cleanToken}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error adding device data with ID`);
  }
};

export const editDeviceDataService = async (deviceData, Id) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/device/device-data/${Id}/`, deviceData, {
      headers: { Authorization: `Bearer ${cleanToken}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error editing device data with ID`);
  }
};

export const addUserService = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/users/`, userData, {
      headers: { Authorization: `Bearer ${cleanToken}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error adding user`);
  }
};

export const deleteUserService = async (Id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/user/users/${Id}/`, {
      headers: { Authorization: `Bearer ${cleanToken}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error deleting user with ID`);
  }
};

export const editUserService = async (user, Id) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/user/users/${Id}/`, user, {
      headers: { Authorization: `Bearer ${cleanToken}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error editing user with ID`);
  }
};

export const updateDeviceByIdService = async (Id, deviceData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/device/device/${Id}/`, deviceData, {
      headers: { Authorization: `Bearer ${cleanToken}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error updating device with ID ${Id}`);
  }
};

export const deleteDeviceByIdService = async (Id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/device/device/${Id}`, {
      headers: { Authorization: `Bearer ${cleanToken}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error deleting device with ID ${Id}`);
  }
};

export const deleteDeviceDataByIdService = async (Id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/device/device-data/${Id}`, {
      headers: { Authorization: `Bearer ${cleanToken}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error deleting device data with ID ${Id}`);
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/users/`, {
      headers: { Authorization: `Bearer ${cleanToken}` },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching users");
  }
};

export const getUserByIdService = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/users/${userId}`, {
      headers: { Authorization: `Bearer ${cleanToken}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching user with ID ${userId}`);
  }
};

export const loginApiService = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/login/`, userData);
    return response.data;
  } catch (error) {
    throw new Error("Error logging in");
  }
};

export const updateProfileService = async (id, userData) => {
  try {
    const response = axios.put(`${API_BASE_URL}/user/users/${id}/`, userData, {
      headers: { Authorization: `Bearer ${cleanToken}` },
    })
    return response.data;
  } catch (error) {
    throw new Error("Error in updating profile");
  }
}

export const signupApiService = async (userData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/user/sign-up/`, userData
    );

    return response.data;
  } catch (error) {
    throw new Error("Error signing up");
  }
};

export const refreshTokenApi = async (token) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/token/refresh/`, token)
    return res.data
  } catch (error) {
    throw new Error("Error refresh token");
  }
}

export const createDeviceApiService = async (device) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/device/device/`, device, {
      headers: { Authorization: `Bearer ${cleanToken}` },
    })
    return response.data;
  } catch (error) {
    throw new Error("Error creating device");
  }
};