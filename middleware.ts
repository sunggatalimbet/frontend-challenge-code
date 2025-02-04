import createMiddleware from "next-intl/middleware";
import { routing } from "@/shared/lib/i18n/routing";

export default createMiddleware(routing);

export const config = {
	// Match only internationalized pathnames
	matcher: ["/", "/(ru|kk|en)/:path*"],
};
