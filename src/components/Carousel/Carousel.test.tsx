import type React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import Carousel from "./index";
import type { CardItem, WithType } from "@/modules/shared/shared.type";

jest.mock("next/image", () => ({
	__esModule: true,
	default: (props: object & { alt?: string }) => (
		<img {...props} alt={props.alt || "image"} />
	),
}));

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
			WatchlistButton
		</button>
	),
}));

jest.mock("@/helpers/image.helper", () => ({
	getImage: (path: string, width: number) =>
		`https://example.com${path}?w=${width}`,
}));

const dummySlides: WithType<CardItem>[] = [
	{
		id: 1,
		type: "movie",
		title: "Movie Title 1",
		overview: "Overview 1",
		backdrop_path: "/backdrop1.jpg",
		adult: false,
		poster_path: "/poster1.jpg",
		genre_ids: [1, 2, 3],
		original_language: "en",
		original_title: "Movie Title 1",
		popularity: 100,
		release_date: "2022-01-01",
		video: false,
		vote_average: 8,
		vote_count: 1000,
	},
	{
		id: 2,
		type: "tv",
		title: "Movie Title 2",
		overview: "Overview 2",
		backdrop_path: "/backdrop2.jpg",
		adult: false,
		poster_path: "/poster2.jpg",
		genre_ids: [1, 2, 3],
		original_language: "en",
		original_title: "Movie Title 1",
		popularity: 100,
		release_date: "2020-02-02",
		video: false,
		vote_average: 8,
		vote_count: 90,
	},
];

describe("Carousel Component", () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});
	afterEach(() => {
		jest.runOnlyPendingTimers();
		jest.useRealTimers();
	});

	test("renders the initial slide correctly", () => {
		const { container } = render(<Carousel slides={dummySlides} />);
		const activeSlide = container.querySelector(".active");
		expect(activeSlide).toBeInTheDocument();
		expect(activeSlide).toHaveTextContent("Movie Title 1");
	});

	test("clicking the next button advances to the next slide", () => {
		const { container } = render(<Carousel slides={dummySlides} />);
		let activeSlide = container.querySelector(".active");
		expect(activeSlide).toHaveTextContent("Movie Title 1");

		const nextButton = container.querySelector("button.next");
		if (!nextButton) {
			throw new Error("Next button not found");
		}
		act(() => {
			fireEvent.click(nextButton);
		});

		activeSlide = container.querySelector(".active");
		expect(activeSlide).toHaveTextContent("Overview 2");
	});

	test("clicking the previous button loops to the last slide", () => {
		const { container } = render(<Carousel slides={dummySlides} />);
		let activeSlide = container.querySelector(".active");
		expect(activeSlide).toHaveTextContent("Movie Title 1");

		const prevButton = container.querySelector("button.prev");
		if (!prevButton) {
			throw new Error("Previous button not found");
		}
		act(() => {
			fireEvent.click(prevButton);
		});

		activeSlide = container.querySelector(".active");
		expect(activeSlide).toHaveTextContent("Overview 2");
	});

	test("auto-play advances slides every 5 seconds", () => {
		const { container } = render(<Carousel slides={dummySlides} />);
		let activeSlide = container.querySelector(".active");
		expect(activeSlide).toHaveTextContent("Movie Title 1");

		act(() => {
			jest.advanceTimersByTime(5000);
		});
		activeSlide = container.querySelector(".active");
		expect(activeSlide).toHaveTextContent("Overview 2");
	});

	test("pauses auto-play on mouse enter and resumes on mouse leave", () => {
		const { container } = render(<Carousel slides={dummySlides} />);
		const sliderContainer = container.querySelector(".slider-container");
		if (!sliderContainer) {
			throw new Error("Slider container not found");
		}

		let activeSlide = container.querySelector(".active");
		expect(activeSlide).toHaveTextContent("Movie Title 1");

		// Wrap mouseEnter in act:
		act(() => {
			fireEvent.mouseEnter(sliderContainer);
		});
		act(() => {
			jest.advanceTimersByTime(5000);
		});
		activeSlide = container.querySelector(".active");
		expect(activeSlide).toHaveTextContent("Movie Title 1");

		// Wrap mouseLeave in act:
		act(() => {
			fireEvent.mouseLeave(sliderContainer);
		});
		act(() => {
			jest.advanceTimersByTime(5000);
		});
		activeSlide = container.querySelector(".active");
		expect(activeSlide).toHaveTextContent("Overview 2");
	});

	test("renders WatchlistButton and detail link for the active slide", () => {
		const { container } = render(<Carousel slides={dummySlides} />);
		const watchlistButtons = screen.getAllByTestId("watchlist-button");
		expect(watchlistButtons.length).toBeGreaterThan(0);

		const detailLinks = screen.getAllByRole("link", { name: /see detail/i });
		expect(detailLinks.length).toBeGreaterThan(0);
		const activeDetailLink = detailLinks[0];
		expect(activeDetailLink).toHaveAttribute("href", "/movie/1");
		expect(activeDetailLink).toHaveAttribute("title", "Movie Title 1");
		expect(activeDetailLink).toHaveTextContent(/see detail/i);
	});
});
