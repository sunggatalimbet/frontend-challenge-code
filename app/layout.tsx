import { Layout } from "@/app/layout";
import "./globals.css";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <Layout>{children}</Layout>;
}
