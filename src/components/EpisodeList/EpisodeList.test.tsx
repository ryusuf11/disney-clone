import React from "react";
import { render, screen } from "@testing-library/react";
import { format } from "date-fns";
import { EpisodeList } from "./index";
import type { SeasonDetail } from "@/modules/tv-series/tv.type";

jest.mock("next/image", () => ({
	__esModule: true,
	default: (props: object & { alt?: string }) => (
		<img {...props} alt={props.alt || "image"} />
	),
}));

jest.mock("@/helpers/image.helper", () => ({
	getImage: (path: string, width: number) =>
		`https://example.com${path}?w=${width}`,
}));

jest.mock("@/helpers/date.helper", () => ({
	timeConvert: (runtime: number) => `${runtime} mins`,
}));

const season: SeasonDetail = {
	season_number: 1,
	episodes: [
		{
			id: 101,
			still_path: "/test-image.jpg",
			name: "Episode One",
			episode_number: 1,
			air_date: "2021-10-05",
			runtime: 45,
			overview: "Overview for episode one.",
			crew: [],
			guest_stars: [],
			episode_type: "regular",
			production_code: "12345",
			season_number: 1,
			show_id: 1,
			vote_average: 7.5,
			vote_count: 100,
		},
		{
			id: 102,
			still_path: "/test-image2.jpg",
			name: "Episode Two",
			episode_number: 2,
			air_date: "",
			runtime: 50,
			overview: "Overview for episode two.",
			crew: [],
			guest_stars: [],
			episode_type: "regular",
			production_code: "12345",
			season_number: 1,
			show_id: 1,
			vote_average: 7.5,
			vote_count: 100,
		},
	],
	_id: "",
	air_date: "",
	name: "",
	overview: "",
	id: 0,
	poster_path: "",
	vote_average: 0,
};

describe("EpisodeList Component", () => {
	test("renders episode information correctly", () => {
		render(<EpisodeList season={season} />);

		expect(screen.getByText("Episode One")).toBeInTheDocument();
		expect(screen.getByText("Overview for episode one.")).toBeInTheDocument();
		expect(screen.getByText("Episode Two")).toBeInTheDocument();
		expect(screen.getByText("Overview for episode two.")).toBeInTheDocument();

		const imgEpisodeOne = screen.getByAltText("Episode One");
		expect(imgEpisodeOne).toBeInTheDocument();
		expect(imgEpisodeOne).toHaveAttribute(
			"src",
			"https://example.com/test-image.jpg?w=200",
		);

		const imgEpisodeTwo = screen.getByAltText("Episode Two");
		expect(imgEpisodeTwo).toBeInTheDocument();
		expect(imgEpisodeTwo).toHaveAttribute(
			"src",
			"https://example.com/test-image2.jpg?w=200",
		);

		expect(screen.getByText(/S1 E1/)).toBeInTheDocument();
		expect(screen.getByText(/S1 E2/)).toBeInTheDocument();

		const formattedDate = format(new Date("2021-10-05"), "dd MMM yyyy");

		expect(
			screen.getByText(new RegExp(`${formattedDate}`)),
		).toBeInTheDocument();

		expect(screen.getByText("45 mins")).toBeInTheDocument();
		expect(screen.getByText("50 mins")).toBeInTheDocument();
	});
});
