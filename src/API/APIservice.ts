"use server";

import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const GET = async (url: string, returnRaw = false) => {
  const response = await apiClient.get(url);
  return returnRaw ? response : response.data;
};

export const POST = async (url: string, data: unknown, returnRaw = false) => {
  const response = await apiClient.post(url, data);
  return returnRaw ? response : response.data;
};

export const PUT = async (url: string, data: unknown, returnRaw = false) => {
  const response = await apiClient.put(url, data);
  return returnRaw ? response : response.data;
};

export const DELETE = async (url: string, returnRaw = false) => {
  const response = await apiClient.delete(url);
  return returnRaw ? response : response.data;
};
