export const getImage = (path?: string, width?: number) => {
	if (!path) return "/logo.png";

	const size = width ? `w${width}` : "original";
	const fullImage = `${process.env.NEXT_PUBLIC_IMAGE_URL}/t/p/${size}${path}`;
	return fullImage;
};
