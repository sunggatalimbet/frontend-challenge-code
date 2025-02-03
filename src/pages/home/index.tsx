import { ProductList } from "@/widgets/product-list";
import { Header } from "@/widgets/header";

export function HomePage() {
	return (
		<div className="min-h-screen bg-gray-100">
			<Header />
			<main className="container mx-auto px-4 py-8">
				<h1 className="text-3xl font-bold mb-8">Our Products</h1>
				<ProductList />
			</main>
		</div>
	);
}
