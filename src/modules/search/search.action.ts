import { getPopularMovie, searchMovie } from "../movie/movie.service";
import { getPopularTV, searchTV } from "../tv-series/tv.service";

export const actionGetSearchData = async (keyword: string) => {
	let requests = [getPopularMovie(), getPopularTV()];

	if (keyword) {
		requests = [...requests, searchMovie(keyword), searchTV(keyword)];
	}

	const [popularMovie, popularTV, movies, tvseries] =
		await Promise.all(requests);

	const movieList = movies?.results
		? movies.results?.map((movie) => ({ ...movie, type: "movie" }))
		: [];
	const tvList = tvseries?.results
		? tvseries?.results?.map((tv) => ({ ...tv, type: "tv" }))
		: [];
	const isEmpty = keyword ? !movieList.length && !tvList.length : false;

	const popularList = [
		...(popularMovie?.results || []).map((item) => ({
			...item,
			type: "movie",
		})),
		...(popularTV?.results || []).map((item) => ({ ...item, type: "tv" })),
	];

	return {
		popularList,
		movies: movieList,
		tvseries: tvList,
		isEmpty,
	};
};
