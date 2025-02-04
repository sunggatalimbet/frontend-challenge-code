import HomePage from "@/screens/home";
import { Metadata } from "next";

export default function Home() {
	return <HomePage />;
}

export const metadata: Metadata = {
	title: "Home",
	description:
		"Welcome to our e-commerce store. Browse our amazing collection of products.",
};
