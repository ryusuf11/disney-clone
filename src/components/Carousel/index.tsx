"use client";

import { useState, useEffect } from "react";
import style from "./Carousel.module.scss";
import {
	LuArrowLeft as ArrowLeft,
	LuArrowRight as ArrowRight,
	LuInfo as InfoIcon,
} from "react-icons/lu";
import Image from "next/image";
import { WatchlistButton } from "../WatchListButton";
import {
	isMovie,
	type CardItem,
	type WithType,
} from "@/modules/shared/shared.type";
import { getImage } from "@/helpers/image.helper";
import Link from "next/link";

interface CarouselProps {
	slides: WithType<CardItem>[];
}

const Carousel: React.FC<CarouselProps> = ({ slides }) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [autoPlay, setAutoPlay] = useState(true);
	const [transitionClass, setTransitionClass] = useState("");

	useEffect(() => {
		let interval: NodeJS.Timeout;
		if (autoPlay) {
			interval = setInterval(() => {
				handleNext();
			}, 5000);
		}
		return () => clearInterval(interval);
	}, [autoPlay]);

	const handleNext = () => {
		setTransitionClass("next");
		setActiveIndex((prev) => (prev + 1) % slides.length);
	};

	const handlePrev = () => {
		setTransitionClass("prev");
		setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
	};

	const getTitle = (item: WithType<CardItem>) => {
		return isMovie(item) ? item.title : item.name;
	};

	return (
		<div
			className={style["slider-container"]}
			onMouseEnter={() => setAutoPlay(false)}
			onMouseLeave={() => setAutoPlay(true)}
		>
			<div className={`${style["slider-track"]} ${transitionClass}`}>
				{slides.map((slide, index) => (
					<div
						key={slide.id}
						className={`${style.slide} ${index === activeIndex ? style.active : style.inactive}`}
					>
						<div
							style={{
								width: "100%",
								position: "relative",
								paddingBottom: "56.25%",
							}}
						>
							<Image
								src={getImage(slide.backdrop_path, 1280)}
								alt={getTitle(slide)}
								quality={50}
								width={1280}
								height={600}
								loading="lazy"
							/>
							<div className={style["slide-content"]}>
								<h3 className={style["slide-title"]}>{getTitle(slide)}</h3>
								<p className={style["slide-description"]}>{slide.overview}</p>
							</div>
							<div className={style["slide-action"]}>
								<div className={style["slide-link"]}>
									<WatchlistButton size="lg" item={slide} />
								</div>

								<Link
									href={`/${slide.type}/${slide.id}`}
									title={getTitle(slide)}
									className={style["slide-link"]}
								>
									<button type="button">
										<InfoIcon size={24} />
										See Detail
									</button>
								</Link>
							</div>
						</div>
					</div>
				))}
			</div>

			<button
				type="button"
				className={`${style["slider-button"]} ${style.prev}`}
				onClick={handlePrev}
			>
				<ArrowLeft />
			</button>
			<button
				type="button"
				className={`${style["slider-button"]} ${style.next}`}
				onClick={handleNext}
			>
				<ArrowRight />
			</button>
		</div>
	);
};

export default Carousel;
