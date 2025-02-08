import { MovieCard } from "@/components/Movie/MovieCard";

import style from "./SearchContainer.module.scss";
import { actionGetSearchData } from "@/modules/search/search.action";
import EmptyItem from "@/components/EmptyItem";
import { LuInfo as Info } from "react-icons/lu";
import SearchInput from "@/components/SearchInput";
import type { CardType } from "@/modules/shared/shared.type";

export const revalidate = 5 * 60;

type SearchContainerProps = {
	keyword: string;
};

export const SearchContainer = async ({ keyword }: SearchContainerProps) => {
	const { movies, tvseries, isEmpty, popularList } =
		await actionGetSearchData(keyword);

	const BaseContainer = ({ children }: { children: React.ReactNode }) => {
		return (
			<section className={style.searchContainer}>
				<div
					style={{
						marginBottom: "2rem",
					}}
				>
					<SearchInput
						placeholder="Search for movies or TV series"
						initialValue={keyword}
					/>
					{children}

					{!isEmpty && popularList.length > 0 && (
						<section className={style.sectionContainer}>
							<h2 className="heading-section">Other Recommendations</h2>
							<div className={style.cardContainer}>
								{popularList.map((item) => (
									<MovieCard
										key={item.id}
										item={item}
										type={item.type as CardType}
									/>
								))}
							</div>
						</section>
					)}
				</div>
			</section>
		);
	};

	if (isEmpty) {
		return (
			<BaseContainer>
				{isEmpty && (
					<div style={{ marginTop: "8rem" }}>
						<EmptyItem icon={<Info />} />
					</div>
				)}
			</BaseContainer>
		);
	}

	return (
		<BaseContainer>
			{movies.length > 0 && (
				<section className={style.sectionContainer}>
					<h2 className="heading-section">Movies</h2>
					<div className={style.cardContainer}>
						{movies.map((item) => (
							<MovieCard key={item.id} item={item} />
						))}
					</div>
				</section>
			)}

			{tvseries.length > 0 && (
				<section className={style.sectionContainer}>
					<h2 className="heading-section">TV Series</h2>
					<div className={style.cardContainer}>
						{tvseries.map((item) => (
							<MovieCard key={item.id} item={item} type="tv" />
						))}
					</div>
				</section>
			)}
		</BaseContainer>
	);
};
