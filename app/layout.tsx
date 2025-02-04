import { Layout } from "@/app/layout";
import "./globals.css";

export default function RootLayout({
	children,
	modal,
}: {
	children: React.ReactNode;
	modal: React.ReactNode;
}) {
	return (
		<Layout>
			{children}
			{modal}
		</Layout>
	);
}
