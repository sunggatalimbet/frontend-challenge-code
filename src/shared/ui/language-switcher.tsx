"use client";

import { useLocale } from "next-intl";
import { useRouter } from "@/shared/lib/i18n/routing";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./select";
import { Globe } from "lucide-react";

const languages = {
	en: "English",
	ru: "Русский",
	kk: "Қазақша",
} as const;

export function LanguageSwitcher() {
	const locale = useLocale();
	const router = useRouter();

	const handleLanguageChange = (newLocale: string) => {
		router.replace("/", { locale: newLocale });
	};

	return (
		<Select value={locale} onValueChange={handleLanguageChange}>
			<SelectTrigger className="w-[140px] gap-2">
				<Globe className="h-4 w-4" />
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				{Object.entries(languages).map(([key, label]) => (
					<SelectItem
						key={key}
						value={key}
						className="cursor-pointer"
					>
						{label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
