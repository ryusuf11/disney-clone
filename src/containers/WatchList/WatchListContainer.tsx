"use client";

import EmptyItem from "@/components/EmptyItem";
import style from "./WatchListContainer.module.scss";
import { MovieCard } from "@/components/Movie/MovieCard";
import type { CardType } from "@/modules/shared/shared.type";
import { actionWatchList } from "@/modules/watchlist/watchlist.action";
import { LuInfo as Info, LuMinus as MinusIcon } from "react-icons/lu";

export const WatchListContainer = () => {
	const {
		watchlist,
		inputValue,
		handleInputChange,
		toggleSelect,
		isSelected,
		selected,
		removeItem,
	} = actionWatchList();

	return (
		<div className={style.container}>
			<section className={style.header}>
				<h1 className="heading-section">Watchlist</h1>
				<div className={style.filterContainer}>
					{selected.length > 0 && (
						<div style={{ height: "40px" }}>
							<button
								type="button"
								className="button button--active"
								onClick={removeItem}
							>
								<MinusIcon /> remove {selected.length} item
							</button>
						</div>
					)}

					<div className={style["input-container"]}>
						<input
							className="input"
							placeholder="Search"
							value={inputValue}
							onChange={handleInputChange}
						/>
					</div>
				</div>
			</section>

			{watchlist.length === 0 ? (
				<EmptyItem icon={<Info />} />
			) : (
				<div className={style.cardContainer}>
					{watchlist.map((item) => (
						<MovieCard
							key={item.id}
							item={item}
							type={item.type as CardType}
							selected={!!selected.find((i) => isSelected(i, item))}
							onSelect={toggleSelect}
						/>
					))}
				</div>
			)}
		</div>
	);
};
