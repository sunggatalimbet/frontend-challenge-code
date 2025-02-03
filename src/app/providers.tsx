"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import { store } from "@/shared/store";
import { useState, useEffect } from "react";
import { ThemeProvider } from "@/shared/providers/theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
	const [mounted, setMounted] = useState(false);
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 60 * 1000,
						refetchOnWindowFocus: false,
					},
				},
			}),
	);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					{children}
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
			</Provider>
		</ThemeProvider>
	);
}
