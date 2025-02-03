import { Skeleton } from "@/shared/ui/skeleton";

export const LoadingSkeleton = () => {
	return (
		<div className="space-y-6">
			<div className="mb-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
				<Skeleton className="h-9 w-full sm:w-64" />
				<Skeleton className="h-9 w-full sm:w-40" />
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{Array.from({ length: 8 }).map((_, index) => (
					<div
						key={index}
						className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col"
					>
						<Skeleton className="w-full h-48" /> {/* Image */}
						<div className="p-4 space-y-4">
							<Skeleton className="h-6 w-3/4" /> {/* Title */}
							<div className="space-y-2">
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-5/6" />
							</div>{" "}
							{/* Description */}
							<div className="flex items-center space-x-1">
								{Array.from({ length: 5 }).map((_, i) => (
									<Skeleton
										key={i}
										className="h-5 w-5 rounded-full"
									/>
								))}
								<Skeleton className="h-5 w-12 ml-2" />
							</div>{" "}
							{/* Rating */}
							<div className="flex justify-between items-center">
								<Skeleton className="h-6 w-20" />
								<Skeleton className="h-9 w-28" />
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
