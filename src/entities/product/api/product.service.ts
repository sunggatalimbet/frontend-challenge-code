import { type Product } from "../model/types";

const API_BASE_URL =
	"https://my-json-server.typicode.com/sunggatalimbet/frontend-challange-code-fake-backend";

const CACHE_TIME = 60; // Cache for 60 seconds

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

		const response = await fetch(
			`${API_BASE_URL}/products?${params.toString()}`,
			{
				next: {
					revalidate: CACHE_TIME,
					tags: ["products"],
				},
			},
		);

		if (!response.ok) {
			throw new Error("Failed to fetch products");
		}

		return response.json();
	}

	async getById(id: string): Promise<Product> {
		const response = await fetch(`${API_BASE_URL}/products/${id}`, {
			next: {
				revalidate: CACHE_TIME,
				tags: ["products", `product-${id}`],
			},
		});

		if (!response.ok) {
			throw new Error("Failed to fetch product");
		}

		return response.json();
	}
}

export const productService = new ProductService();
