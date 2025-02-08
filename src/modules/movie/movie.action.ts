import { getMovieDetail, getSimilarMovie } from "../movie/movie.service";
import type { WithType } from "../shared/shared.type";
import type { Movie } from "./movie.type";

export const actionGetMovieDetail = async (id: string) => {
	const [movieDetail, similarMovies] = await Promise.all([
		getMovieDetail(id),
		getSimilarMovie(id),
	]);

	const movieItem = {
		adult: movieDetail?.adult,
		genre_ids: movieDetail?.genres.map((genre) => genre.id),
		id: movieDetail?.id,
		original_language: movieDetail?.original_language,
		original_title: movieDetail?.original_title,
		overview: movieDetail?.overview,
		popularity: movieDetail?.popularity,
		poster_path: movieDetail?.poster_path,
		release_date: movieDetail?.release_date,
		title: movieDetail?.title,
		video: movieDetail?.video,
		vote_average: movieDetail?.vote_average,
		vote_count: movieDetail?.vote_count,
		type: "movie",
	} as WithType<Movie>;

	return {
		movieDetail,
		movieItem,
		similarMovies: similarMovies?.results || [],
	};
};
