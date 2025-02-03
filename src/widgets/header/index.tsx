"use client";

import { CartButton } from "@/features/cart/ui/cart-button";

export function Header() {
	return (
		<header className="sticky top-0 z-50 w-full bg-white shadow-md">
			<div className="container mx-auto px-4 py-4 flex justify-between items-center">
				<h1 className="text-2xl font-bold">E-Commerce Store</h1>
				<div className="flex items-center space-x-4">
					<CartButton />
				</div>
			</div>
		</header>
	);
}
