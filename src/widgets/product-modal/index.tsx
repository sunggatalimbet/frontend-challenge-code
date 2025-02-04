"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui";
import { Button } from "@/shared/ui/button";
import { Star, ShoppingCart, Trash2 } from "lucide-react";
import { type Product } from "@/entities/product/model/types";
import { useAppDispatch, useAppSelector } from "@/shared/lib/store/hooks";
import { addToCart, removeFromCart } from "@/features/cart/model/slice";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";

interface ProductModalProps {
	product: Product;
}

export function ProductModal({ product }: ProductModalProps) {
	const t = useTranslations();
	const router = useRouter();
	const dispatch = useAppDispatch();
	const locale = useLocale();
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

	const handleClose = () => {
		router.back();
	};

	const handleCartAction = () => {
		if (isInCart) {
			dispatch(removeFromCart(product.id));
		} else {
			dispatch(addToCart(product));
		}
	};

	return (
		<Dialog open onOpenChange={handleClose}>
			<DialogContent className="max-w-3xl p-0 overflow-hidden pb-4 pl-4">
				<DialogHeader>
					<DialogTitle className="sr-only">
						Product Details
					</DialogTitle>
				</DialogHeader>
				<div className="grid md:grid-cols-2 gap-0">
					<div className="relative aspect-square">
						<Image
							src={product.image || "/placeholder.svg"}
							alt={title}
							fill
							className="object-cover rounded-md"
						/>
					</div>
					<div className="p-6 space-y-4">
						<div className="flex items-center gap-2">
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
						<h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
							{title}
						</h2>
						<p className="text-gray-600 dark:text-gray-300">
							{description}
						</p>
						<div className="flex items-center justify-between pt-4">
							<span className="text-2xl font-bold text-gray-900 dark:text-gray-50">
								${product.price.toFixed(2)}
							</span>
							<Button
								onClick={handleCartAction}
								variant={isInCart ? "destructive" : "default"}
							>
								{isInCart ? (
									<>
										<Trash2 className="h-4 w-4" />
										{t("remove")}
									</>
								) : (
									<>
										<ShoppingCart className="mr-2 h-4 w-4" />
										{t("add-to-cart")}
									</>
								)}
							</Button>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
