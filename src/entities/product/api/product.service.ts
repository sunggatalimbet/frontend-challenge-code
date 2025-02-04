import axios from "axios";
import { type Product } from "../model/types";

const API_BASE_URL =
	"https://my-json-server.typicode.com/sunggatalimbet/frontend-challange-code-fake-backend";

const CACHE_TIME = 60; // Cache for 60 seconds

const api = axios.create({
	baseURL: API_BASE_URL,
});

interface GetAllParams {
	offset: number;
	limit: number;
	search: string;
	sort: string;
}

class ProductService {
	async getAll({
		offset,
		limit,
		search,
		sort,
	}: GetAllParams): Promise<Product[]> {
		const sortMapping: Record<string, { field: string; order: string }> = {
			name: { field: "title", order: "asc" },
			price: { field: "price", order: "asc" },
			rating: { field: "rating", order: "desc" },
		};

		const { field, order } = sortMapping[sort] || sortMapping.name;

		const params = new URLSearchParams({
			_start: offset.toString(),
			_limit: limit.toString(),
			...(search && { q: search }),
			_sort: field,
			_order: order,
		});

		try {
			const { data } = await api.get<Product[]>(
				`/products?${params.toString()}`,
				{
					headers: {
						"Cache-Control": `s-maxage=${CACHE_TIME}`,
					},
				},
			);
			return data;
		} catch (error) {
			console.error("Failed to fetch products:", error);
			throw new Error("Failed to fetch products");
		}
	}

	async getById(id: string): Promise<Product> {
		try {
			const { data } = await api.get<Product>(`/products/${id}`, {
				headers: {
					"Cache-Control": `s-maxage=${CACHE_TIME}`,
				},
			});
			return data;
		} catch (error) {
			console.error("Failed to fetch product:", error);
			throw new Error("Failed to fetch product");
		}
	}
}

export const productService = new ProductService();
