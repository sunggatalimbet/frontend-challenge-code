"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { ProductCard } from "@/entities/product/ui/product-card";
import {
	Input,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/shared/ui";
import { productService } from "@/entities/product/api/product.service";
import { LoadingSkeleton } from "@/entities/skeleton/ui/product-list-skeleton";
import { Search } from "lucide-react";
import { type Product } from "@/entities/product/model/types";
const ITEMS_PER_PAGE = 10;

interface ProductListProps {
	initialData: Product[];
}

export function ProductList({ initialData }: ProductListProps) {
	const t = useTranslations();
	const [searchTerm, setSearchTerm] = useState("");
	const [sortBy, setSortBy] = useState("name");
	const { ref, inView } = useInView();

	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading,
		error,
	} = useInfiniteQuery({
		queryKey: ["products", searchTerm, sortBy],
		initialPageParam: 0,
		queryFn: ({ pageParam }) =>
			productService.getAll({
				offset: pageParam * ITEMS_PER_PAGE,
				limit: ITEMS_PER_PAGE,
				search: searchTerm,
				sort: sortBy,
			}),
		getNextPageParam: (lastPage, allPages) => {
			return lastPage.length === ITEMS_PER_PAGE
				? allPages.length
				: undefined;
		},
		initialData:
			searchTerm === "" && sortBy === "name"
				? {
						pages: [initialData],
						pageParams: [0],
				  }
				: undefined,
	});

	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, fetchNextPage]);

	if (isLoading) {
		return <LoadingSkeleton />;
	}

	if (error) {
		return (
			<div className="flex justify-center items-center min-h-[400px] text-red-500 dark:text-red-400">
				{t("loading")}
			</div>
		);
	}

	const products = data?.pages.flat() ?? [];

	return (
		<div className="min-h-screen bg-gray-100 dark:bg-gray-900">
			<div className="mb-8 flex flex-col sm:flex-row gap-4">
				<div className="relative flex-1 max-w-sm">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
					<Input
						type="text"
						placeholder={t("input-placeholder")}
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="pl-9 bg-gray-50/50 dark:bg-gray-800 border-0 ring-1 ring-gray-200 dark:ring-gray-700 focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 dark:text-gray-50 dark:placeholder:text-gray-400"
					/>
				</div>
				<Select value={sortBy} onValueChange={setSortBy}>
					<SelectTrigger className="w-[180px] bg-gray-50/50 dark:bg-gray-800 border-0 ring-1 ring-gray-200 dark:ring-gray-700 focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 dark:text-gray-50">
						<SelectValue placeholder={t("sort-by")} />
					</SelectTrigger>
					<SelectContent className="dark:bg-gray-800 dark:border-gray-700">
						<SelectItem
							value="name"
							className="dark:text-gray-50 dark:focus:bg-gray-700 dark:hover:bg-gray-700"
						>
							{t("sort-by-name")}
						</SelectItem>
						<SelectItem
							value="price"
							className="dark:text-gray-50 dark:focus:bg-gray-700 dark:hover:bg-gray-700"
						>
							{t("sort-by-price")}
						</SelectItem>
						<SelectItem
							value="rating"
							className="dark:text-gray-50 dark:focus:bg-gray-700 dark:hover:bg-gray-700"
						>
							{t("sort-by-rating")}
						</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>

			<div
				ref={ref}
				className="h-10 flex items-center justify-center mt-8"
			>
				{isFetchingNextPage && (
					<div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 dark:border-gray-300" />
				)}
			</div>
		</div>
	);
}
