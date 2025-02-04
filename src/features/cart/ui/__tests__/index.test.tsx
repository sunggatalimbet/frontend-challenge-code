import { render, screen } from "@testing-library/react";
import { CartButton } from "../cart-button";
import { Provider } from "react-redux";
import { store } from "@/shared/lib/store";
import { addToCart } from "@/features/cart/model/slice";
import { mockProduct } from "@/shared/lib/utils/constants";

describe("CartButton", () => {
	const renderComponent = () => {
		return render(
			<Provider store={store}>
				<CartButton />
			</Provider>,
		);
	};

	it("displays correct cart count", () => {
		renderComponent();

		store.dispatch(addToCart(mockProduct));

		const badge = screen.getByText("1");
		expect(badge).toBeInTheDocument();
	});

	it("shows no badge when cart is empty", () => {
		renderComponent();

		const badge = screen.queryByRole("status");
		expect(badge).not.toBeInTheDocument();
	});
});
