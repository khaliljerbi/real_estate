import httpClient from "../services/httpClient";

export const handleEstimation = async formValues => {
  try {
    const result = await httpClient.post("/estimation", formValues);
    return result.data;
  } catch (error) {
    return error;
  }
};
