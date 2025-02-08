import type { Movie } from "../movie/movie.type";
import type { TVSeries } from "../tv-series/tv.type";

export interface PaginationResponse<T> {
	page: number;
	results: T[];
	total_pages: number;
	total_results: number;
}

export type WithType<T> = T & {
	type: string;
};

export type CardType = "movie" | "tv";
export type CardItem = Movie | TVSeries;

export const isMovie = (item: WithType<CardItem>): item is WithType<Movie> => {
	return item.type === "movie";
};
