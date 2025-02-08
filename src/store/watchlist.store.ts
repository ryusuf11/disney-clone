"use client";

import type { CardItem, WithType } from "@/modules/shared/shared.type";
import { create } from "zustand";
import { combine, persist } from "zustand/middleware";

export const useWatchListStore = create(
	persist(
		combine({ watchlist: [] as WithType<CardItem>[] }, (set, get) => ({
			addList: (item: WithType<CardItem>) => {
				if (!item) return;

				const { watchlist } = get();
				const isExist = watchlist.find(
					(list) => list.id === item.id && list.type === item.type,
				);
				if (!isExist) {
					set({ watchlist: [...watchlist, item] });
				}
			},
			removeList: (item: { id: number; type: string }[]) => {
				if (!item) return;

				const { watchlist } = get();
				const newList = watchlist.filter(
					(list) => !item.find((i) => i.id === list.id && i.type === list.type),
				);
				set({ watchlist: newList });
			},
			isInList: (item: WithType<CardItem>) => {
				if (!item) return;

				const { watchlist } = get();
				const isExist = watchlist.find(
					(list) => list.id === item.id && list.type === item.type,
				);
				return !!isExist;
			},
		})),
		{
			name: "watchlist",
		},
	),
);
