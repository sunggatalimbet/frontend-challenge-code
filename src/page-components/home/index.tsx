import { Header } from "@/widgets/header";
import { ProductListWrapper } from "@/widgets/product-list/product-list-wrapper";

export default function HomePage() {
	return (
		<div className="min-h-screen bg-gray-100">
			<Header />
			<main className="container mx-auto px-4 md:px-10 py-8">
				<h1 className="text-3xl font-bold mb-8">Our Products</h1>
				<ProductListWrapper />
			</main>
		</div>
	);
}
