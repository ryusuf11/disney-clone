"use client";

import { useState, useEffect, useCallback } from "react";
import styles from "./SearchInput.module.scss";
import useDebounce from "@/hooks/useDebounce";
import { LuSearch as Search, LuX as X } from "react-icons/lu";
import { useRouter } from "next/navigation";

interface SearchProps {
	placeholder?: string;
	initialValue?: string;
	className?: string;
	showIcon?: boolean;
}

const SearchInput = ({
	placeholder = "Search...",
	initialValue = "",
	className = "",
	showIcon = true,
}: SearchProps) => {
	const router = useRouter();
	const [query, setQuery] = useState(initialValue);

	const debouncedSearch = useDebounce(query, 300);

	const onSearch = useCallback(
		(query: string) => {
			if (!query) return;

			router.push(`/search?keyword=${query}`);
		},
		[router],
	);

	useEffect(() => {
		onSearch(debouncedSearch);
	}, [onSearch, debouncedSearch]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSearch(query);
	};

	const clearSearch = () => {
		setQuery("");
		router.push("/search");
	};

	return (
		<form
			className={`${styles.searchContainer} ${className}`}
			onSubmit={handleSubmit}
		>
			<div className={styles.searchWrapper}>
				{showIcon && (
					<span className={styles.searchIcon} aria-hidden="true">
						<Search size={24} />
					</span>
				)}
				<input
					type="text"
					value={query}
					onChange={handleChange}
					placeholder={placeholder}
					className={styles.searchInput}
					aria-label="Search input"
					enterKeyHint="search"
				/>
				{initialValue ? (
					<button
						type="button"
						className={styles.searchButton}
						aria-label="Clear search"
						onClick={clearSearch}
					>
						<X size={24} />
					</button>
				) : (
					<button
						type="submit"
						className={styles.searchButton}
						aria-label="Perform search"
					>
						Search
					</button>
				)}
			</div>
		</form>
	);
};

export default SearchInput;
