import { RootLayoutSource } from "@/app/layout";
import "./globals.css";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <RootLayoutSource>{children}</RootLayoutSource>;
}
