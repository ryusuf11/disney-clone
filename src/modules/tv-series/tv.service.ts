import { lastWeekDate } from "@/helpers/date.helper";
import type { PaginationResponse } from "../shared/shared.type";
import type { SeasonDetail, TVSeries, TVSeriesDetail } from "./tv.type";
import { GET } from "../shared/fetcher";

export const getTopRatedTV = async () => {
	return await GET<PaginationResponse<TVSeries> | undefined>("/tv/top_rated");
};

export const getTopRatedTVWeek = async () => {
	const queryParams = new URLSearchParams();
	queryParams.append("primary_release_date.gte", lastWeekDate());
	queryParams.append("sort_by", "vote_count.desc");

	return await GET<PaginationResponse<TVSeries> | undefined>(
		`/discover/tv?${queryParams.toString()}`,
	);
};

export const getTVDetail = async (id: string) => {
	return await GET<TVSeriesDetail | undefined>(`/tv/${id}`);
};

export const getSeasonDetail = async (id: string, seasonNumber: number) => {
	return await GET<SeasonDetail | undefined>(
		`/tv/${id}/season/${seasonNumber}`,
	);
};

export const getSimilarTV = async (id: string) => {
	return await GET<PaginationResponse<TVSeries> | undefined>(
		`/tv/${id}/similar`,
	);
};

export const searchTV = async (keyword: string) => {
	const queryParams = new URLSearchParams();
	queryParams.append("query", keyword);

	return await GET<PaginationResponse<TVSeries> | undefined>(
		`/search/tv?${queryParams.toString()}`,
	);
};

export const getPopularTV = async () => {
	return await GET<PaginationResponse<TVSeries> | undefined>("/tv/popular");
};
