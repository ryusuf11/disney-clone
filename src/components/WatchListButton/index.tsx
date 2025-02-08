"use client";

import { LuMinus as MinusIcon, LuPlus as PlusIcon } from "react-icons/lu";
import type { CardItem, WithType } from "@/modules/shared/shared.type";
import { useWatchListStore } from "@/store/watchlist.store";
import { type MouseEvent, useEffect, useState } from "react";

type WatchListButtonProps = {
	size?: "sm" | "lg";
	item: WithType<CardItem>;
};

export const WatchlistButton = ({
	size = "sm",
	item,
}: WatchListButtonProps) => {
	const [mounted, setMounted] = useState(false);
	const store = useWatchListStore();
	const inList = store.isInList(item);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	const toggleWatchlist = (e: MouseEvent) => {
		e.preventDefault();

		if (inList) {
			store.removeList([
				{
					id: item.id,
					type: item.type,
				},
			]);
		} else {
			store.addList(item);
		}
	};

	const ButtonIcon = inList ? MinusIcon : PlusIcon;

	return (
		<button
			type="button"
			className={`button button--${size} ${inList ? "button--active" : ""}`}
			onClick={toggleWatchlist}
		>
			<ButtonIcon size={size === "lg" ? 24 : 16} />
			<span>{inList ? "Remove" : "Add to"} Watchlist</span>
		</button>
	);
};
