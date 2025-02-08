import Image from "next/image";
import style from "./MovieCard.module.scss";
import { getImage } from "@/helpers/image.helper";
import { WatchlistButton } from "../WatchListButton";
import {
	type CardItem,
	type CardType,
	isMovie,
	type WithType,
} from "@/modules/shared/shared.type";
import Link from "next/link";
import { CheckBox } from "@/components/CheckBox";
import type { Movie } from "@/modules/movie/movie.type";
import type { TVSeries } from "@/modules/tv-series/tv.type";

type MovieCardProps = {
	item: CardItem;
	type?: CardType;
	selected?: boolean;
	onSelect?: (item: WithType<CardItem>) => void;
};

export const MovieCard = ({
	item,
	type = "movie",
	selected,
	onSelect,
}: MovieCardProps) => {
	const title = isMovie({ ...item, type })
		? (item as Movie).title
		: (item as TVSeries).name;

	const toggleCheckbox = () => {
		if (onSelect) onSelect(item as WithType<CardItem>);
	};

	return (
		<Link href={`/${type}/${item.id}`} title={title}>
			<div className={style.movieCard}>
				{selected !== undefined && onSelect && (
					<div
						className={`${style.movieCard__checkbox} ${selected ? style.selected : ""}`}
					>
						<CheckBox defaultChecked={selected} onToggle={toggleCheckbox} />
					</div>
				)}
				<Image
					src={getImage(item.poster_path, 200)}
					alt={title}
					width={150}
					height={200}
					className={style.movieCard__poster}
					quality={70}
					loading="lazy"
				/>
				<div className={style.movieCard__content}>
					<h3 className={style.movieCard__title}>{title}</h3>
					<div className={style.movieCard__description}>{item.overview}</div>
					<WatchlistButton item={{ ...item, type }} size="sm" />
				</div>
			</div>
		</Link>
	);
};
