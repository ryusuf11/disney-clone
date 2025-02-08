export const GET = async <T>(url: string): Promise<T | null> => {
	const headers = new Headers();
	headers.set("Authorization", `Bearer ${process.env.API_KEY}`);
	headers.set("X-Forwarded-Host", "api.themoviedb.org");

	let response: T | null = null;

	try {
		response = (await fetch(`${process.env.API_URL}/${url}`, {
			headers,
		}).then((res) => res.json())) as T;
	} catch (err) {
		console.log("Error fetching server", JSON.stringify(err));
	}

	return response;
};
