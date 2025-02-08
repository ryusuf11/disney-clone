"use client";

import useDebounce from "@/hooks/useDebounce";
import { useWatchListStore } from "@/store/watchlist.store";
import { type ChangeEvent, useMemo, useState } from "react";
import { type CardItem, isMovie, type WithType } from "../shared/shared.type";

type SelectedItem = {
	id: number;
	type: string;
};

export const actionWatchList = () => {
	const { watchlist, removeList } = useWatchListStore();

	const [inputValue, setInputValue] = useState("");
	const [selected, setSelected] = useState<SelectedItem[]>([]);
	const debouncedInputValue = useDebounce(inputValue, 300);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const computedList = useMemo(() => {
		if (!debouncedInputValue) return watchlist;

		const getTitle = (item: WithType<CardItem>) =>
			isMovie(item) ? item.title : item.name;

		return watchlist.filter((item) =>
			getTitle(item).toLowerCase().includes(debouncedInputValue.toLowerCase()),
		);
	}, [debouncedInputValue, watchlist]);

	const isSelected = (i: SelectedItem, item: WithType<CardItem>) =>
		i.id === item.id && i.type === item.type;

	const toggleSelect = (item: WithType<CardItem>) => {
		const isExist = selected.find((i) => isSelected(i, item));
		if (isExist) setSelected(selected.filter((i) => !isSelected(i, item)));
		else
			setSelected([
				...selected,
				{
					id: item.id,
					type: item.type,
				},
			]);
	};

	const removeItem = () => {
		if (selected.length > 0) {
			removeList(selected);
			setSelected([]);
		}
	};

	return {
		watchlist: computedList,
		inputValue,
		handleInputChange,
		toggleSelect,
		selected,
		isSelected,
		removeItem,
	};
};
