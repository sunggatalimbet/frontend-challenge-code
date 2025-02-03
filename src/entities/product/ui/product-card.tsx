"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "@/shared/ui/button/index";
import type { Product } from "../model/types";
import { useAppDispatch } from "@/shared/store/hooks";
import { addToCart } from "@/features/cart/model/slice";

export function ProductCard({ product }: { product: Product }) {
	const dispatch = useAppDispatch();

	const handleAddToCart = () => {
		dispatch(addToCart(product));
	};

	return (
		<div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
			<Image
				src={product.image || "/placeholder.svg"}
				alt={product.title}
				width={200}
				height={200}
				className="w-full h-48 object-cover"
			/>
			<div className="p-4 flex-grow flex flex-col">
				<h2 className="text-lg font-semibold mb-2">{product.title}</h2>
				<p className="text-gray-600 mb-2 flex-grow">
					{product.description.length > 100
						? `${product.description.substring(0, 100)}...`
						: product.description}
				</p>
				<div className="flex items-center mb-2">
					{Array.from({ length: 5 }).map((_, index) => (
						<Star
							key={index}
							className={`h-5 w-5 ${
								index < Math.floor(product.rating)
									? "text-yellow-400 fill-current"
									: "text-gray-300"
							}`}
						/>
					))}
					<span className="ml-2 text-gray-600">
						{product.rating.toFixed(1)}
					</span>
				</div>
				<div className="flex justify-between items-center">
					<span className="text-lg font-bold">
						${product.price.toFixed(2)}
					</span>
					<Button onClick={handleAddToCart}>Add to Cart</Button>
				</div>
			</div>
		</div>
	);
}
