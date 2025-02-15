import { ProductModal } from "@/widgets/product-modal";
import { productService } from "@/entities/product/api/product.service";
import { Suspense } from "react";

interface PageProps {
	params: Promise<{ id: string }>;
}

async function ProductPageContent({ id }: { id: string }) {
	try {
		const product = await productService.getById(id);
		return (
			<div className="container mx-auto px-4 py-8 rounded-3xl p-8">
				<div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
					<h1 className="text-4xl font-bold mb-4">Product Details</h1>
					<p className="text-muted-foreground mb-8">
						Product ID: {id}
					</p>
					<ProductModal product={product} />
				</div>
			</div>
		);
	} catch (error) {
		console.error("Failed to fetch product:", error);
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
					<h1 className="text-2xl font-semibold text-destructive">
						Error
					</h1>
					<p className="text-muted-foreground">
						Failed to load product details
					</p>
				</div>
			</div>
		);
	}
}

export default async function ProductPage({ params }: PageProps) {
	const { id } = await params;

	return (
		<Suspense
			fallback={
				<div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[50vh]">
					<div className="animate-pulse text-xl text-muted-foreground">
						Loading product details...
					</div>
				</div>
			}
		>
			<ProductPageContent id={id} />
		</Suspense>
	);
}

export const dynamic = "force-dynamic";
