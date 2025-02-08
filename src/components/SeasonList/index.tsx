import type { SeasonDetail } from "@/modules/tv-series/tv.type";
import Tab from "../Tab";
import { EpisodeList } from "../EpisodeList";

type SeasonListProps = {
	seasons: SeasonDetail[];
};

export const SeasonList = ({ seasons }: SeasonListProps) => {
	const tabs = seasons.map((season) => ({
		id: `season-${season.season_number}`,
		title: `Season ${season.season_number}`,
		content: <EpisodeList season={season} />,
	}));

	return (
		<div style={{ margin: "0 auto" }}>
			<Tab tabs={tabs} activeColor="#fff" orientation="horizontal" />
		</div>
	);
};
