import { lastWeekDate } from "@/helpers/date.helper";
import type { PaginationResponse } from "../shared/shared.type";
import type { Movie, MovieDetail } from "./movie.type";
import { GET } from "../shared/fetcher";

export const getTopRatedMovie = async () => {
	return await GET<PaginationResponse<Movie> | undefined>("/movie/top_rated");
};

export const getTopRatedMovieWeek = async () => {
	const queryParams = new URLSearchParams();
	queryParams.append("primary_release_date.gte", lastWeekDate());
	queryParams.append("sort_by", "vote_count.desc");

	return await GET<PaginationResponse<Movie> | undefined>(
		`/discover/movie?${queryParams.toString()}`,
	);
};

export const getMovieDetail = async (id: string) => {
	return await GET<MovieDetail | undefined>(`/movie/${id}`);
};

export const getSimilarMovie = async (id: string) => {
	return await GET<PaginationResponse<Movie> | undefined>(
		`/movie/${id}/similar`,
	);
};

export const searchMovie = async (keyword: string) => {
	const queryParams = new URLSearchParams();
	queryParams.append("query", keyword);

	return await GET<PaginationResponse<Movie> | undefined>(
		`/search/movie?${queryParams.toString()}`,
	);
};

export const getPopularMovie = async () => {
	return await GET<PaginationResponse<Movie> | undefined>("/movie/popular");
};
