"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { useAppSelector } from "@/shared/lib/store/hooks";
import { useTranslations } from "next-intl";

export const CartButton = () => {
	const t = useTranslations();
	const cartItems = useAppSelector((state) => state.cart.items);

	const totalItems = cartItems.reduce(
		(total, item) => total + item.quantity,
		0,
	);
	const totalPrice = cartItems.reduce(
		(total, item) => total + item.price * item.quantity,
		0,
	);

	return (
		<Button variant="outline" className="flex items-center space-x-1">
			<ShoppingCart className="h-5 w-5" />
			<span>
				{totalItems}{" "}
				<span className="hidden sm:inline-block">{t("items")}</span>
			</span>
			<span className="min-w-[6ch]">${totalPrice.toFixed(2)}</span>
		</Button>
	);
};
