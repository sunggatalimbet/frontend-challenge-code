"use client";

import { CartButton } from "@/features/cart/ui/cart-button";

export function Header() {
	return (
		<header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm">
			<div className="container mx-auto h-14 flex items-center justify-end px-4">
				<CartButton />
			</div>
		</header>
	);
}
