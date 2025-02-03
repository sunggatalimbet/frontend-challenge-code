"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "@/entities/product/ui/product-card";
import { Input } from "@/shared/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/shared/ui/select";
import { productApi } from "@/entities/product/api";

const ITEMS_PER_PAGE = 8;

export function ProductList() {
	const [searchTerm, setSearchTerm] = useState("");
	const [sortBy, setSortBy] = useState("name");
	const [currentPage, setCurrentPage] = useState(1);

	const {
		data: products = [],
		isLoading,
		error,
	} = useQuery({
		queryKey: ["products"],
		queryFn: productApi.getAll,
	});

	if (isLoading) {
		return (
			<div className="flex justify-center items-center min-h-[400px]">
				Loading products...
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex justify-center items-center min-h-[400px] text-red-500">
				Error loading products. Please try again later.
			</div>
		);
	}

	const filteredProducts = products.filter((product) =>
		product.title.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	const sortedProducts = [...filteredProducts].sort((a, b) => {
		if (sortBy === "price") return a.price - b.price;
		if (sortBy === "rating") return b.rating - a.rating;
		return a.title.localeCompare(b.title);
	});

	const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
	const displayedProducts = sortedProducts.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE,
	);

	return (
		<div>
			<div className="mb-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
				<Input
					type="text"
					placeholder="Search products..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="w-full sm:w-64"
				/>
				<Select value={sortBy} onValueChange={setSortBy}>
					<SelectTrigger className="w-full sm:w-40">
						<SelectValue placeholder="Sort by" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="name">Name</SelectItem>
						<SelectItem value="price">Price</SelectItem>
						<SelectItem value="rating">Rating</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{displayedProducts.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
			{totalPages > 1 && (
				<div className="mt-8 flex justify-center space-x-2">
					{Array.from({ length: totalPages }, (_, i) => i + 1).map(
						(page) => (
							<button
								key={page}
								onClick={() => setCurrentPage(page)}
								className={`px-3 py-1 rounded ${
									currentPage === page
										? "bg-blue-500 text-white"
										: "bg-gray-200"
								}`}
							>
								{page}
							</button>
						),
					)}
				</div>
			)}
		</div>
	);
}
