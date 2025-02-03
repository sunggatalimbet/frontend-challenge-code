"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { useAppSelector } from "@/shared/store/hooks";

export const CartButton = () => {
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
		<Button variant="outline" className="flex items-center space-x-2">
			<ShoppingCart className="h-5 w-5" />
			<span className="min-w-[3ch]">{totalItems} items</span>
			<span className="min-w-[6ch]">${totalPrice.toFixed(2)}</span>
		</Button>
	);
};
