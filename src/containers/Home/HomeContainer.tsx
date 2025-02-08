import { MovieCard } from "@/components/Movie/MovieCard";

import style from "./HomeContainer.module.scss";
import { actionGetHomeData } from "@/modules/home/home.action";
import Carousel from "@/components/Carousel";
import type { CardType } from "@/modules/shared/shared.type";

export const revalidate = 5 * 60;

export const HomeContainer = async () => {
	const { topRated, topRatedMovieWeek, topRatedTVWeek } =
		await actionGetHomeData();

	return (
		<div>
			<section className={style.sectionContainer}>
				<Carousel slides={topRated} />
			</section>
			<section className={style.sectionContainer}>
				<h2 className="heading-section">Top Rated Movies & TV Series</h2>
				<div className={style.cardContainer}>
					{topRated.map((item) => (
						<MovieCard key={item.id} item={item} type={item.type as CardType} />
					))}
				</div>
			</section>

			<section className={style.sectionContainer}>
				<h2 className="heading-section">Top Rated Movies of the week</h2>
				<div className={style.cardContainer}>
					{topRatedMovieWeek.map((item) => (
						<MovieCard key={item.id} item={item} />
					))}
				</div>
			</section>

			<section className={style.sectionContainer}>
				<h2 className="heading-section">Top Rated Movies of the week</h2>
				<div className={style.cardContainer}>
					{topRatedTVWeek.map((item) => (
						<MovieCard key={item.id} item={item} type="tv" />
					))}
				</div>
			</section>
		</div>
	);
};
