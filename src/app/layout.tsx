import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/app/providers";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

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
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
				suppressHydrationWarning
			>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
