import axios, { AxiosResponse } from 'axios';

export const fetcher = (url: string) =>
  axios
    .get(url, { baseURL: process.env.NEXT_PUBLIC_DICT_API_URL })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response as AxiosResponse;
    });
