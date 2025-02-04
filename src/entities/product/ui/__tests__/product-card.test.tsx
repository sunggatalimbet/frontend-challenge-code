import { render, screen, fireEvent } from "@testing-library/react";
import { ProductCard } from "../product-card";
import { Provider } from "react-redux";
import { store } from "@/shared/lib/store";
import { NextIntlClientProvider } from "next-intl";
import { mockProduct } from "@/shared/lib/utils/constants";
import { useLocale } from "next-intl";

const mockRouter = {
	push: jest.fn(),
};

jest.mock("next/navigation", () => ({
	useRouter: () => mockRouter,
}));

const messages = {
	"add-to-cart": "Add to Cart",
	product: {
		rating: "Rating",
		price: "Price",
		currency: "$",
	},
};

// Mock next-intl hooks
jest.mock("next-intl", () => ({
	useTranslations: () => (key: string) => key,
	useLocale: () => "en",
}));

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

	it("renders product title in English", () => {
		renderComponent();
		expect(screen.getByText(mockProduct.titleEn)).toBeInTheDocument();
	});

	it("renders product description in English", () => {
		renderComponent();
		expect(screen.getByText(mockProduct.descriptionEn)).toBeInTheDocument();
	});

	// Test other locales
	it("renders product title in Russian", () => {
		(useLocale as jest.Mock).mockImplementation(() => "ru");
		renderComponent();
		expect(screen.getByText(mockProduct.titleRu)).toBeInTheDocument();
	});

	it("renders product title in Kazakh", () => {
		(useLocale as jest.Mock).mockImplementation(() => "kz");
		renderComponent();
		expect(screen.getByText(mockProduct.titleKz)).toBeInTheDocument();
	});

	it("renders product information correctly", () => {
		renderComponent();

		expect(screen.getByText(mockProduct.titleEn)).toBeInTheDocument();
		expect(screen.getByText(mockProduct.descriptionEn)).toBeInTheDocument();
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

		const card = screen.getByText(mockProduct.titleEn).closest("div");
		fireEvent.click(card!);

		expect(mockRouter.push).toHaveBeenCalledWith(
			`/product/${mockProduct.id}`,
			{ scroll: false },
		);
	});
});
