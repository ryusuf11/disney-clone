import type React from "react";
import { render, screen } from "@testing-library/react";
import { SeasonList } from "./index";
import type { SeasonDetail } from "@/modules/tv-series/tv.type";

jest.mock("../Tab", () => ({
	__esModule: true,
	default: ({
		tabs,
	}: { tabs: { id: string; title: string; content: React.ReactNode }[] }) => (
		<div data-testid="tab-component">
			{tabs.map((tab) => (
				<div key={tab.id}>{tab.title}</div>
			))}
		</div>
	),
}));

describe("SeasonList Component", () => {
	const dummySeasons: SeasonDetail[] = [
		{
			season_number: 1,
			episodes: [],
			_id: "1",
			air_date: "",
			id: 1,
			name: "Season 1",
			overview: "",
			poster_path: "",
			vote_average: 0,
		},
		{
			season_number: 2,
			episodes: [],
			_id: "2",
			air_date: "",
			id: 2,
			name: "Season 2",
			overview: "",
			poster_path: "",
			vote_average: 0,
		},
	];

	test("renders the Tab component with correct season tabs", () => {
		render(<SeasonList seasons={dummySeasons} />);

		const tabComponent = screen.getByTestId("tab-component");
		expect(tabComponent).toBeInTheDocument();

		expect(screen.getByText("Season 1")).toBeInTheDocument();
		expect(screen.getByText("Season 2")).toBeInTheDocument();
	});
});
