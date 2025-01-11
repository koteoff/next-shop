import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";
import { Firm } from "@prisma/client";

export const getAll = async (): Promise<Firm[]> => {
  return (await axiosInstance.get<Firm[]>(ApiRoutes.FIRM)).data;
};
