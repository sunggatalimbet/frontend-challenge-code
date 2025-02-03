import { baseApi } from "@/shared/api/base";
import type { Product } from "../model/types";

export const productApi = {
	getAll: () => baseApi.get<Product[]>("/products"),
};
