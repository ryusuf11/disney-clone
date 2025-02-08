import { TVDetailContainer } from "@/containers/TVDetail/TVDetailContainer";

export default async function TVDetailPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	return <TVDetailContainer id={id} />;
}
