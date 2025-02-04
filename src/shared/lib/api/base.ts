const API_BASE_URL =
	"https://my-json-server.typicode.com/sunggatalimbet/frontend-challange-code-fake-backend";

export const baseApi = {
	get: async <T>(endpoint: string): Promise<T> => {
		const response = await fetch(`${API_BASE_URL}${endpoint}`);
		if (!response.ok) {
			throw new Error(`API Error: ${response.statusText}`);
		}
		return response.json();
	},
};
