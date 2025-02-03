import { type Product } from "../model/types";

const API_BASE_URL =
	"https://my-json-server.typicode.com/sunggatalimbet/frontend-challange-code-fake-backend";

interface GetAllParams {
	offset: number;
	limit: number;
	search: string;
	sort: string;
}

export const productApi = {
	getAll: async ({
		offset,
		limit,
		search,
		sort,
	}: GetAllParams): Promise<Product[]> => {
		// Handle different sort cases
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
				// Add cache options for server-side requests
				cache:
					process.env.NODE_ENV === "production"
						? "force-cache"
						: "no-store",
				// Add next.js cache tags for revalidation if needed
				next: { tags: ["products"] },
			},
		);

		if (!response.ok) {
			throw new Error("Failed to fetch products");
		}

		return response.json();
	},
};
