import type { WithType } from "../shared/shared.type";
import { getSeasonDetail, getSimilarTV, getTVDetail } from "./tv.service";
import type { SeasonDetail, TVSeries } from "./tv.type";

export const actionGetTVDetail = async (id: string) => {
	const [tvDetail, similarTV] = await Promise.all([
		getTVDetail(id),
		getSimilarTV(id),
	]);

	const allSeasons = await Promise.all(
		Array.from({ length: tvDetail?.number_of_seasons || 0 }, (_, i) =>
			getSeasonDetail(id, i + 1),
		),
	);

	const tvItem = {
		adult: tvDetail?.adult,
		genre_ids: tvDetail?.genres.map((genre) => genre.id),
		id: tvDetail?.id,
		original_language: tvDetail?.original_language,
		overview: tvDetail?.overview,
		popularity: tvDetail?.popularity,
		poster_path: tvDetail?.poster_path,
		vote_average: tvDetail?.vote_average,
		vote_count: tvDetail?.vote_count,
		type: "tv",
		backdrop_path: tvDetail?.backdrop_path,
		first_air_date: tvDetail?.first_air_date,
		name: tvDetail?.name,
		origin_country: tvDetail?.origin_country,
		number_of_episodes: tvDetail?.number_of_episodes,
		number_of_seasons: tvDetail?.number_of_seasons,
		original_name: tvDetail?.original_name,
	} as WithType<TVSeries>;

	return {
		tvDetail,
		tvItem,
		allSeasons: (allSeasons || []) as SeasonDetail[],
		similarTV: similarTV?.results || [],
	};
};
