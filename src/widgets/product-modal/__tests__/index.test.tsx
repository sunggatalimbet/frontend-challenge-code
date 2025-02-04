import { render, screen, fireEvent } from "@testing-library/react";
import { ProductModal } from "..";
import { Provider } from "react-redux";
import { store } from "@/shared/lib/store";
import { mockProduct } from "@/shared/lib/utils/constants";

const mockRouter = {
	back: jest.fn(),
};

jest.mock("next/navigation", () => ({
	useRouter: () => mockRouter,
}));

describe("ProductModal", () => {
	const renderComponent = () => {
		return render(
			<Provider store={store}>
				<ProductModal product={mockProduct} />
			</Provider>,
		);
	};

	it("renders product details correctly", () => {
		renderComponent();

		expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
		expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
		expect(
			screen.getByText(`$${mockProduct.price.toFixed(2)}`),
		).toBeInTheDocument();
	});

	it("handles add to cart", () => {
		renderComponent();

		const addButton = screen.getByText(/add to cart/i);
		fireEvent.click(addButton);

		const state = store.getState();
		expect(state.cart.items).toHaveLength(1);
		expect(state.cart.items[0].id).toBe(mockProduct.id);
	});

	it("closes on backdrop click", () => {
		renderComponent();

		const backdrop = screen.getByRole("dialog");
		fireEvent.click(backdrop);

		expect(mockRouter.back).toHaveBeenCalled();
	});
});
