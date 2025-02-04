import { type Product } from "../model/types";

const API_BASE_URL =
	"https://my-json-server.typicode.com/sunggatalimbet/frontend-challange-code-fake-backend";

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
				cache:
					process.env.NODE_ENV === "production"
						? "force-cache"
						: "no-store",
				next: { tags: ["products"] },
			},
		);

		if (!response.ok) {
			throw new Error("Failed to fetch products");
		}

		return response.json();
	}

	async getById(id: string): Promise<Product> {
		const response = await fetch(`${API_BASE_URL}/products/${id}`, {
			cache:
				process.env.NODE_ENV === "production"
					? "force-cache"
					: "no-store",
			next: { tags: ["products"] },
		});

		if (!response.ok) {
			throw new Error("Failed to fetch product");
		}

		return response.json();
	}
}

export const productService = new ProductService();
