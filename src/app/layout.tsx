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
	title: "E-Commerce Store",
	description: "Shop our amazing products",
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
