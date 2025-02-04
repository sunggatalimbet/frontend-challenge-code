import { render, screen, fireEvent } from "@testing-library/react";
import { ProductCard } from "../product-card";
import { Provider } from "react-redux";
import { store } from "@/shared/lib/store";
import { NextIntlClientProvider } from "next-intl";
import { mockProduct } from "@/shared/lib/utils/constants";

const mockRouter = {
	push: jest.fn(),
};

jest.mock("next/navigation", () => ({
	useRouter: () => mockRouter,
}));

const messages = {
	"add-to-cart": "Add to Cart",
};

describe("ProductCard", () => {
	const renderComponent = () => {
		return render(
			<Provider store={store}>
				<NextIntlClientProvider messages={messages} locale="en">
					<ProductCard product={mockProduct} />
				</NextIntlClientProvider>
			</Provider>,
		);
	};

	it("renders product information correctly", () => {
		renderComponent();

		expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
		expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
		expect(
			screen.getByText(`$${mockProduct.price.toFixed(2)}`),
		).toBeInTheDocument();
		expect(screen.getByText("Add to Cart")).toBeInTheDocument();
	});

	it("handles add to cart click", () => {
		renderComponent();

		const addButton = screen.getByText("Add to Cart");
		fireEvent.click(addButton);

		const state = store.getState();
		expect(state.cart.items).toHaveLength(1);
		expect(state.cart.items[0].id).toBe(mockProduct.id);
	});

	it("navigates to product details on card click", () => {
		renderComponent();

		const card = screen.getByText(mockProduct.title).closest("div");
		fireEvent.click(card!);

		expect(mockRouter.push).toHaveBeenCalledWith(
			`/product/${mockProduct.id}`,
			{ scroll: false },
		);
	});
});
