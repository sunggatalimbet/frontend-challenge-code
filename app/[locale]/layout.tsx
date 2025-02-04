import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/shared/lib/i18n/routing";
import { Metadata } from "next";

export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	if (!routing.locales.includes(locale as any)) {
		notFound();
	}

	const messages = await getMessages();

	return (
		<NextIntlClientProvider messages={messages}>
			{children}
		</NextIntlClientProvider>
	);
}

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
