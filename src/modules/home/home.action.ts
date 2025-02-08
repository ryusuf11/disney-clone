import { getTopRatedMovie, getTopRatedMovieWeek } from "../movie/movie.service";
import { getTopRatedTV, getTopRatedTVWeek } from "../tv-series/tv.service";

export const actionGetHomeData = async () => {
	const [movies, tvseries, moviesWeek, tvWeek] = await Promise.all([
		getTopRatedMovie(),
		getTopRatedTV(),
		getTopRatedMovieWeek(),
		getTopRatedTVWeek(),
	]);

	const topMovie =
		movies?.results?.map((movie) => ({ ...movie, type: "movie" })) || [];
	const topSeries =
		tvseries?.results?.map((tv) => ({ ...tv, type: "tv" })) || [];

	const topRated = [...topMovie, ...topSeries].sort(
		(a, b) => b.vote_average - a.vote_average,
	);
	const topRatedMovieWeek = moviesWeek?.results || [];
	const topRatedTVWeek = tvWeek?.results || [];

	return {
		topRated,
		topRatedMovieWeek,
		topRatedTVWeek,
	};
};
