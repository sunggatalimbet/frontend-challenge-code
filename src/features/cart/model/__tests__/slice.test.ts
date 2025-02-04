import cartReducer, { addToCart, removeFromCart } from "../slice";
import { mockProduct } from "@/shared/lib/utils/constants";

describe("Cart Slice", () => {
	it("should handle initial state", () => {
		expect(cartReducer(undefined, { type: "unknown" })).toEqual({
			items: [],
		});
	});

	it("should handle addToCart", () => {
		const initialState = { items: [] };
		const nextState = cartReducer(initialState, addToCart(mockProduct));

		expect(nextState.items).toHaveLength(1);
		expect(nextState.items[0]).toEqual({ ...mockProduct, quantity: 1 });
	});

	it("should increment quantity when adding existing item", () => {
		const initialState = { items: [{ ...mockProduct, quantity: 1 }] };
		const nextState = cartReducer(initialState, addToCart(mockProduct));

		expect(nextState.items).toHaveLength(1);
		expect(nextState.items[0].quantity).toBe(2);
	});

	it("should handle removeFromCart", () => {
		const initialState = { items: [{ ...mockProduct, quantity: 1 }] };
		const nextState = cartReducer(
			initialState,
			removeFromCart(mockProduct.id),
		);

		expect(nextState.items).toHaveLength(0);
	});
});
