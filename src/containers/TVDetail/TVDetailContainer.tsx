import style from "./TVDetailContainer.module.scss";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getImage } from "@/helpers/image.helper";
import { WatchlistButton } from "@/components/WatchListButton";
import Tab from "@/components/Tab";
import { actionGetTVDetail } from "@/modules/tv-series/tv.action";
import { MovieCard } from "@/components/Movie/MovieCard";
import { SeasonList } from "@/components/SeasonList";

export const revalidate = 5 * 60;

export const TVDetailContainer = async ({ id }: { id: string }) => {
	const { tvDetail, tvItem, allSeasons, similarTV } =
		await actionGetTVDetail(id);

	const tabs = [
		{
			id: "tab1",
			title: "Episodes",
			content: <SeasonList seasons={allSeasons} />,
		},
		{
			id: "similar-tv",
			title: "More Like This",
			content: (
				<div className={style.cardContainer}>
					{similarTV.map((item) => (
						<MovieCard key={`similiar-tv-${item.id}`} item={item} type="tv" />
					))}
				</div>
			),
		},
	];

	if (!tvDetail) {
		return notFound();
	}

	return (
		<div className={style.container}>
			<div className={style.heroBanner}>
				<Image
					src={getImage(tvDetail.backdrop_path)}
					alt={tvDetail.name}
					width={1280}
					height={600}
					priority
					className={style.backdrop}
				/>
				<div className={style.backdrop__content}>
					<h1 className={"text-shadow"}>{tvDetail.name}</h1>
					<div className={style.info}>
						<span className={"text-shadow"}>
							{tvDetail.first_air_date.split("-")[0]}
						</span>
						<span className={"text-shadow"}>
							{tvDetail.spoken_languages.length} Languages
						</span>
					</div>
					<div style={{ width: "200px", margin: "16px 0" }}>
						<WatchlistButton item={tvItem} size="lg" />
					</div>
					<p className="text-shadow">{tvDetail.overview}</p>
					<div
						className={style.info}
						style={{
							marginTop: "24px",
							fontWeight: "bold",
						}}
					>
						{tvDetail.genres.map((genre) => (
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
