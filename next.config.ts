import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/shared/lib/i18n/request.ts");

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "m.media-amazon.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "images-na.ssl-images-amazon.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "images-eu.ssl-images-amazon.com",
				pathname: "/**",
			},
		],
	},
};

export default withNextIntl(nextConfig);
