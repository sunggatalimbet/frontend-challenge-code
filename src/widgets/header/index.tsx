"use client";

import { CartButton } from "@/features/cart/ui/cart-button";
import { ThemeToggle } from "@/features/theme/ui/theme-toggle";
import { LanguageSwitcher } from "@/shared/ui";
export function Header() {
	return (
		<header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm">
			<div className="container mx-auto h-14 flex items-center justify-end gap-4 px-4">
				<ThemeToggle />
				<LanguageSwitcher />
				<CartButton />
			</div>
		</header>
	);
}
