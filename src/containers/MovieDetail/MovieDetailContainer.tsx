import style from "./MovieDetailContainer.module.scss";
import { actionGetMovieDetail } from "@/modules/movie/movie.action";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getImage } from "@/helpers/image.helper";
import { WatchlistButton } from "@/components/WatchListButton";
import Tab from "@/components/Tab";
import { timeConvert } from "@/helpers/date.helper";
import { MovieCard } from "@/components/Movie/MovieCard";

export const revalidate = 5 * 60;

export const MovieDetailContainer = async ({ id }: { id: string }) => {
	const { movieDetail, movieItem, similarMovies } =
		await actionGetMovieDetail(id);

	const tabs = [
		{
			id: "similiar-movie",
			title: "More Like This",
			content: (
				<div className={style.cardContainer}>
					{similarMovies.map((item) => (
						<MovieCard
							key={`similar-movie-${item.id}`}
							item={item}
							type="movie"
						/>
					))}
				</div>
			),
		},
	];

	if (!movieDetail) {
		return notFound();
	}

	return (
		<div className={style.container}>
			<div className={style.heroBanner}>
				<Image
					src={getImage(movieDetail.backdrop_path)}
					alt={movieDetail.title}
					width={1280}
					height={600}
					priority
					className={style.backdrop}
				/>
				<div className={style.backdrop__content}>
					<h1 className={"text-shadow"}>{movieDetail.title}</h1>
					<div className={style.info}>
						<span className={"text-shadow"}>
							{movieDetail.release_date.split("-")[0]}
						</span>
						<span className={"text-shadow"}>
							{timeConvert(movieDetail.runtime)}
						</span>
						<span className={"text-shadow"}>
							{movieDetail.spoken_languages.length} Languages
						</span>
					</div>
					<div style={{ width: "200px", margin: "16px 0" }}>
						<WatchlistButton item={movieItem} size="lg" />
					</div>
					<p className="text-shadow">{movieDetail.overview}</p>
					<div
						className={style.info}
						style={{
							marginTop: "24px",
							fontWeight: "bold",
						}}
					>
						{movieDetail.genres.map((genre) => (
							<span className={"text-shadow"} key={genre.id}>
								{genre.name}
							</span>
						))}
					</div>
				</div>
			</div>

			<div style={{ margin: "48px auto 0" }}>
				<Tab tabs={tabs} activeColor="#fff" orientation="horizontal" />
			</div>
		</div>
	);
};
