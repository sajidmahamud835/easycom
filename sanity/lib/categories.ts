import { client } from "./client";

// Fetch categories for navigation
export const getCategories = async () => {
    const query = `*[_type == "category"] | order(range asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    featured
  }`;

    try {
        const categories = await client.fetch(query, undefined, {
            cache: 'no-store',
        });
        console.log("[getCategories] Fetched", categories?.length || 0, "categories");
        return JSON.parse(JSON.stringify(categories || []));
    } catch (error) {
        console.error("[getCategories] Error fetching categories:", error);
        return [];
    }
};
