import type React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MovieCard } from "./MovieCard";
import type { Movie } from "@/modules/movie/movie.type";
import type { TVSeries } from "@/modules/tv-series/tv.type";

jest.mock("next/image", () => ({
	__esModule: true,
	default: (props: object & { alt?: string }) => (
		<img {...props} alt={props.alt || "image"} />
	),
}));

// Mock Next.js Link to render a simple <a> element.
jest.mock("next/link", () => {
	return ({
		children,
		href,
		title,
	}: { children: React.ReactNode; href: string; title: string }) => (
		<a href={href} title={title}>
			{children}
		</a>
	);
});

jest.mock("../WatchListButton", () => ({
	WatchlistButton: () => (
		<button type="button" data-testid="watchlist-button">
			Watchlist
		</button>
	),
}));

jest.mock("@/helpers/image.helper", () => ({
	getImage: (path: string, width: number) =>
		`https://example.com${path}?w=${width}`,
}));

jest.mock("@/components/CheckBox", () => ({
	CheckBox: ({
		defaultChecked,
		onToggle,
	}: { defaultChecked: boolean; onToggle: () => void }) => (
		<input
			type="checkbox"
			data-testid="mock-checkbox"
			checked={defaultChecked}
			onChange={onToggle}
		/>
	),
}));

const movieItem: Movie = {
	id: 1,
	poster_path: "/movie-poster.jpg",
	title: "Test Movie",
	overview: "Test overview for movie.",
	adult: false,
	release_date: "2023-01-01",
	genre_ids: [1, 2, 3],
	original_language: "en",
	original_title: "Test Movie",
	popularity: 0,
	video: false,
	vote_average: 0,
	vote_count: 0,
};

const tvSeriesItem: TVSeries = {
	id: 2,
	poster_path: "/tv-poster.jpg",
	name: "Test TV Series",
	overview: "Test overview for TV series.",
	first_air_date: "2023-01-01",
	adult: false,
	backdrop_path: "/tv-backdrop.jpg",
	genre_ids: [4, 5, 6],
	original_language: "en",
	original_name: "Test TV Series",
	popularity: 0,
	vote_average: 0,
	vote_count: 0,
	origin_country: ["US"],
};

describe("MovieCard Component", () => {
	test("renders movie card with movie type", () => {
		render(<MovieCard item={movieItem} type="movie" />);

		const link = screen.getByRole("link");
		expect(link).toHaveAttribute("href", "/movie/1");
		expect(link).toHaveAttribute("title", "Test Movie");

		const image = screen.getByAltText("Test Movie");
		expect(image).toHaveAttribute(
			"src",
			"https://example.com/movie-poster.jpg?w=200",
		);

		expect(screen.getByText("Test Movie")).toBeInTheDocument();
		expect(screen.getByText("Test overview for movie.")).toBeInTheDocument();

		expect(screen.getByTestId("watchlist-button")).toBeInTheDocument();
	});

	test("renders movie card with tv series type", () => {
		render(<MovieCard item={tvSeriesItem} type="tv" />);

		const link = screen.getByRole("link");
		expect(link).toHaveAttribute("href", "/tv/2");
		expect(link).toHaveAttribute("title", "Test TV Series");

		const image = screen.getByAltText("Test TV Series");
		expect(image).toHaveAttribute(
			"src",
			"https://example.com/tv-poster.jpg?w=200",
		);

		expect(screen.getByText("Test TV Series")).toBeInTheDocument();
		expect(
			screen.getByText("Test overview for TV series."),
		).toBeInTheDocument();

		expect(screen.getByTestId("watchlist-button")).toBeInTheDocument();
	});

	test("calls onSelect when checkbox is toggled", () => {
		const onSelectMock = jest.fn();
		render(
			<MovieCard
				item={movieItem}
				type="movie"
				selected={true}
				onSelect={onSelectMock}
			/>,
		);

		const checkbox = screen.getByTestId("mock-checkbox");
		expect(checkbox).toBeInTheDocument();
		expect(checkbox).toBeChecked();

		fireEvent.click(checkbox);
		expect(onSelectMock).toHaveBeenCalledWith(movieItem);
	});
});
