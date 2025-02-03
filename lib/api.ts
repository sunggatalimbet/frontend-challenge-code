import type { Product } from "./types";

const API_BASE_URL =
	"https://my-json-server.typicode.com/sunggatalimbet/frontend-challange-code-fake-backend";

export const fetchProducts = async (): Promise<Product[]> => {
	const response = await fetch(`${API_BASE_URL}/products`);
	if (!response.ok) {
		throw new Error("Failed to fetch products");
	}
	return response.json();
};
