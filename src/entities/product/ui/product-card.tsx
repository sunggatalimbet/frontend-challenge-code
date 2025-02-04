"use client";

import { type Product } from "../model/types";
import Image from "next/image";
import { Star, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { addToCart, removeFromCart } from "@/features/cart/model/slice";
import { useAppDispatch, useAppSelector } from "@/shared/lib/store/hooks";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Card, CardHeader, CardContent } from "@/shared/ui";

export const ProductCard = ({ product }: { product: Product }) => {
	const t = useTranslations();
	const locale = useLocale();
	const router = useRouter();
	const dispatch = useAppDispatch();
	const isInCart = useAppSelector((state) =>
		state.cart.items.some((item) => item.id === product.id),
	);

	const title =
		locale === "ru"
			? product.titleRu
			: locale === "kk"
			? product.titleKz
			: product.titleEn;
	const description =
		locale === "ru"
			? product.descriptionRu
			: locale === "kk"
			? product.descriptionKz
			: product.descriptionEn;

	const handleCartAction = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (isInCart) {
			dispatch(removeFromCart(product.id));
		} else {
			dispatch(addToCart(product));
		}
	};

	const handleClick = () => {
		router.push(`/product/${product.id}`, { scroll: false });
	};

	return (
		<Card className="overflow-hidden">
			<CardHeader className="p-0">
				<div
					onClick={handleClick}
					className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden transition-all hover:shadow-lg dark:hover:shadow-gray-700/25 cursor-pointer"
				>
					<div className="aspect-square overflow-hidden">
						<Image
							src={product.image || "/placeholder.svg"}
							alt={title}
							width={400}
							height={400}
							className="w-full h-full object-cover transition-transform group-hover:scale-105"
						/>
					</div>
				</div>
			</CardHeader>
			<CardContent className="space-y-1.5 p-4">
				<div className="flex items-center gap-2 mb-2">
					<div className="flex text-yellow-400">
						{Array.from({ length: 5 }).map((_, index) => (
							<Star
								key={index}
								className={`h-4 w-4 ${
									index < Math.floor(product.rating)
										? "fill-current"
										: "text-gray-200 dark:text-gray-700"
								}`}
							/>
						))}
					</div>
					<span className="text-sm text-gray-500 dark:text-gray-400">
						{product.rating.toFixed(1)}
					</span>
				</div>
				<h2 className="line-clamp-1 text-lg font-semibold">{title}</h2>
				<p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
					{description}
				</p>
				<div className="mt-4 flex items-center justify-between">
					<span className="text-md font-semibold text-gray-900 dark:text-gray-50 ">
						${product.price.toFixed(2)}
					</span>
					<Button
						size="sm"
						variant={isInCart ? "destructive" : "ghost"}
						onClick={handleCartAction}
						className="hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-100"
					>
						{isInCart ? (
							<Trash2 className="h-4 w-4" />
						) : (
							<div className="flex items-center gap-2">
								<ShoppingCart className="mr-1 h-4 w-4" />
								<span>{t("add-to-cart")}</span>
							</div>
						)}
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};
