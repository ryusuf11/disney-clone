import { MovieDetailContainer } from "@/containers/MovieDetail/MovieDetailContainer";

export default async function MovieDetailPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	return <MovieDetailContainer id={id} />;
}
