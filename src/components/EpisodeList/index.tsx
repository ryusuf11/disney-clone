import Image from "next/image";
import style from "./EpisodeList.module.scss";
import type { SeasonDetail } from "@/modules/tv-series/tv.type";
import { getImage } from "@/helpers/image.helper";
import { format, parseISO } from "date-fns";
import { timeConvert } from "@/helpers/date.helper";

type EpisodeListProps = {
	season: SeasonDetail;
};

export const EpisodeList = ({ season }: EpisodeListProps) => {
	return (
		<div className={style.episodeList}>
			{season.episodes.map((episode) => (
				<div className={style.episodeList__item} key={`episode-${episode.id}`}>
					<Image
						src={getImage(episode.still_path, 200)}
						width={200}
						height={100}
						alt={episode.name}
						className={style.poster}
						loading="lazy"
					/>
					<div className={style.episodeList__info}>
						<p className={style.subtitle}>{episode.name}</p>
						<p>
							<span>
								S{season.season_number} E{episode.episode_number} &#9679;{" "}
							</span>
							{episode.air_date && (
								<span>{format(episode.air_date, "dd MMM yyyy")} &#9679; </span>
							)}
							{episode.runtime && <span>{timeConvert(episode.runtime)}</span>}
						</p>
						<p className={style.episodeList__description}>{episode.overview}</p>
					</div>
				</div>
			))}
		</div>
	);
};
