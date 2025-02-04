import type { Metadata } from "next";
import { Providers } from "@/app/providers";

export const metadata: Metadata = {
	title: {
		template: "%s | E-commerce Store",
		default: "E-commerce Store",
	},
	description: "Browse our amazing collection of products",
	keywords: ["e-commerce", "shop", "store", "products"],
	authors: [{ name: "Your Name" }],
	openGraph: {
		title: "E-commerce Store",
		description: "Browse our amazing collection of products",
		type: "website",
	},
};

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html suppressHydrationWarning>
			<body className={`antialiased bg-white`} suppressHydrationWarning>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
