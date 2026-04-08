import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const baseURL = process.env.API_BASE_URL || process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const api: AxiosInstance = axios.create({ baseURL, timeout: 15000 });

api.interceptors.request.use((config) => {
  // basic request logging
  // eslint-disable-next-line no-console
  console.debug(`[api] ${config.method?.toUpperCase()} ${config.url}`, { params: config.params, data: config.data });
  return config;
});

api.interceptors.response.use(
  (response) => {
    // eslint-disable-next-line no-console
    console.debug(`[api] response ${response.status} ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    // eslint-disable-next-line no-console
    console.error('[api] response error', error);
    return Promise.reject(error);
  }
);

export async function request<T = unknown>(config: AxiosRequestConfig & { signal?: AbortSignal }): Promise<T> {
  const cfg = { ...config } as AxiosRequestConfig;
  // axios supports AbortSignal in recent versions
  if (cfg.signal) {
    (cfg as any).signal = cfg.signal;
  }
  const res = await api.request<T>(cfg);
  return res.data;
}

export default api;
