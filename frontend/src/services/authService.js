import axios from 'axios';

const API_URL = 'http://localhost:0000';

const authService = axios.create({
  baseURL: API_URL,
});

const getRefreshTokenFromStorage = () => {
  return localStorage.getItem('refreshToken');
};

const updateAccessTokenInStorage = (accessToken) => {
  localStorage.setItem('accessToken', accessToken);
};

const refreshAccessToken = async () => {
  const refreshToken = getRefreshTokenFromStorage();

  try {
    const response = await authService.post('/refresh-token', { refreshToken });
    const newAccessToken = response.data.accessToken;
    updateAccessTokenInStorage(newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error('Failed to refresh access token', error);
    logout(); 
    throw error;
  }
};

authService.interceptors.request.use(
  async (config) => {
    const accessToken = getAccessTokenFromStorage();

    if (!accessToken || isTokenExpired(accessToken)) {
      const newAccessToken = await refreshAccessToken();
      config.headers.Authorization = `Bearer ${newAccessToken}`;
    } else {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default authService;
