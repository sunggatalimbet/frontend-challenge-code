import { productService } from "@/entities/product/api/product.service";
import { ProductList } from "@/widgets/product-list";

const ITEMS_PER_PAGE = 10;

export async function ProductListWrapper() {
	// Fetch initial data on the server
	const initialProducts = await productService.getAll({
		offset: 0,
		limit: ITEMS_PER_PAGE,
		search: "",
		sort: "name",
	});

	return <ProductList initialData={initialProducts} />;
}
