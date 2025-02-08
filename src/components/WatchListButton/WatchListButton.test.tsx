import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { WatchlistButton } from "./index";
import type { CardItem } from "@/modules/shared/shared.type";

const dummyItem: CardItem & { type: string } = {
	id: 1,
	type: "movie",
	adult: false,
	backdrop_path: "/movie-backdrop.jpg",
	genre_ids: [1, 2, 3],
	original_language: "en",
	original_title: "Movie Title",
	overview: "Movie overview",
	popularity: 0,
	poster_path: "/movie-poster.jpg",
	release_date: "2022-01-01",
	title: "Movie Title",
	first_air_date: "2022-01-01",
	video: false,
	vote_average: 0,
	vote_count: 0,
};

const addListMock = jest.fn();
const removeListMock = jest.fn();
const isInListMock = jest.fn();

jest.mock("@/store/watchlist.store", () => ({
	useWatchListStore: () => ({
		isInList: isInListMock,
		addList: addListMock,
		removeList: removeListMock,
	}),
}));

describe("WatchlistButton Component", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("renders the button after mounting", async () => {
		isInListMock.mockReturnValue(false);

		render(<WatchlistButton item={dummyItem} size="sm" />);
		await waitFor(() => {
			expect(screen.getByRole("button")).toBeInTheDocument();
		});
	});

	test("displays 'Add to Watchlist' when item is not in the watchlist", async () => {
		isInListMock.mockReturnValue(false);
		render(<WatchlistButton item={dummyItem} size="sm" />);
		await waitFor(() => {
			const button = screen.getByRole("button");
			expect(button).toHaveTextContent("Add to Watchlist");
		});
	});

	test("displays 'Remove Watchlist' when item is in the watchlist", async () => {
		isInListMock.mockReturnValue(true);
		render(<WatchlistButton item={dummyItem} size="sm" />);
		await waitFor(() => {
			const button = screen.getByRole("button");
			expect(button).toHaveTextContent("Remove Watchlist");
		});
	});

	test("calls addList when button is clicked and item is not in the watchlist", async () => {
		isInListMock.mockReturnValue(false);
		render(<WatchlistButton item={dummyItem} size="sm" />);
		await waitFor(() => {
			const button = screen.getByRole("button");
			fireEvent.click(button);
		});
		expect(addListMock).toHaveBeenCalledWith(dummyItem);
	});

	test("calls removeList when button is clicked and item is in the watchlist", async () => {
		isInListMock.mockReturnValue(true);
		render(<WatchlistButton item={dummyItem} size="sm" />);
		await waitFor(() => {
			const button = screen.getByRole("button");
			fireEvent.click(button);
		});
		expect(removeListMock).toHaveBeenCalledWith([
			{ id: dummyItem.id, type: dummyItem.type },
		]);
	});
});
