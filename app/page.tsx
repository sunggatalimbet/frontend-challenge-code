import { Metadata } from "next";
import HomePage from "@/screens/home";

export const metadata: Metadata = {
	title: "E-commerce Store | Home",
	description:
		"Discover our amazing products with great deals and fast shipping",
	keywords: ["e-commerce", "online shopping", "products", "deals"],
	openGraph: {
		title: "E-commerce Store | Home",
		description:
			"Discover our amazing products with great deals and fast shipping",
		type: "website",
		locale: "en_US",
		siteName: "E-commerce Store",
	},
};

export default function Home() {
	return <HomePage />;
}
