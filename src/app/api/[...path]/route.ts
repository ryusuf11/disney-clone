import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const runtime = "edge";

type ContextParams = Promise<{ path: string }>;

export async function GET(
	req: NextRequest,
	{ params }: { params: ContextParams },
) {
	return handleProxyRequest(req, params);
}

async function handleProxyRequest(req: NextRequest, params: ContextParams) {
	try {
		const { path } = await params;

		const pathSegments = path || [];
		const baseUrl = process.env.API_URL;
		const searchParams = new URL(req.url).searchParams;

		const targetUrl = new URL(
			`${baseUrl}/${(Array.isArray(pathSegments) ? pathSegments : [pathSegments]).join("/")}?${searchParams}`,
		);

		const headers = new Headers(req.headers);
		headers.set("Authorization", `Bearer ${process.env.API_KEY}`);
		headers.set("X-Forwarded-Host", "api.themoviedb.org");
		headers.delete("host");

		const res = await fetch(targetUrl, {
			method: req.method,
			headers,
			body: req.body,
			redirect: "manual",
			cache: "force-cache",
		});

		const responseHeaders = new Headers(res.headers);
		responseHeaders.set(
			"Access-Control-Allow-Origin",
			req.headers.get("origin") || "*",
		);
		responseHeaders.set(
			"Access-Control-Allow-Methods",
			"GET, POST, PUT, DELETE, OPTIONS",
		);
		responseHeaders.set(
			"Access-Control-Allow-Headers",
			"Content-Type, Authorization",
		);

		return new NextResponse(res.body, {
			status: res.status,
			statusText: res.statusText,
			headers: responseHeaders,
		});
	} catch (error) {
		console.error("Proxy error:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}

export async function OPTIONS() {
	return new NextResponse(null, {
		headers: {
			"Access-Control-Allow-Origin": `${process.env.NEXT_PUBLIC_BASE_URL}`,
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type, Authorization",
		},
	});
}
