"use client";

import Image from "next/image";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/shared/ui/button/index";
import { addToCart } from "@/features/cart/model/slice";
import { useAppDispatch } from "@/shared/store/hooks";
import type { Product } from "../model/types";

export function ProductCard({ product }: { product: Product }) {
	const dispatch = useAppDispatch();

	const handleAddToCart = () => {
		dispatch(addToCart(product));
	};

	return (
		<div className="group relative bg-white rounded-xl overflow-hidden transition-all hover:shadow-lg">
			<div className="aspect-square overflow-hidden">
				<Image
					src={product.image || "/placeholder.svg"}
					alt={product.title}
					width={400}
					height={400}
					className="w-full h-full object-cover transition-transform group-hover:scale-105"
				/>
			</div>
			<div className="p-4">
				<div className="flex items-center gap-2 mb-2">
					<div className="flex text-yellow-400">
						{Array.from({ length: 5 }).map((_, index) => (
							<Star
								key={index}
								className={`h-4 w-4 ${
									index < Math.floor(product.rating)
										? "fill-current"
										: "text-gray-200"
								}`}
							/>
						))}
					</div>
					<span className="text-sm text-gray-500">
						{product.rating.toFixed(1)}
					</span>
				</div>
				<h2 className="font-medium text-gray-700 line-clamp-1">
					{product.title}
				</h2>
				<p className="mt-1 text-sm text-gray-500 line-clamp-2">
					{product.description}
				</p>
				<div className="mt-4 flex items-center justify-between">
					<span className="text-lg font-semibold">
						${product.price.toFixed(2)}
					</span>
					<Button
						size="sm"
						variant="ghost"
						onClick={handleAddToCart}
						className="hover:bg-gray-100"
					>
						<ShoppingCart className="mr-2 h-4 w-4" />
						Add to Cart
					</Button>
				</div>
			</div>
		</div>
	);
}
