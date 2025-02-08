import { SearchContainer } from "@/containers/Search/SearchContainer";

export default async function SearchPage({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const { keyword } = await searchParams;

	return <SearchContainer keyword={keyword?.toString() ?? ""} />;
}
