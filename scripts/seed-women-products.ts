/**
 * Update Products for Women's Clothing Shop
 * Run with: npx tsx scripts/seed-women-products.ts
 */

import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
    token: process.env.SANITY_API_TOKEN!,
    useCdn: false,
});

// Women's clothing product names
const clothingProducts = [
    // Dresses
    { name: 'Floral Maxi Dress', category: 'dresses', price: 59.99, description: 'Beautiful floral print maxi dress perfect for summer occasions' },
    { name: 'Little Black Dress', category: 'dresses', price: 79.99, description: 'Classic elegant black dress for any formal event' },
    { name: 'Casual Sundress', category: 'dresses', price: 39.99, description: 'Comfortable casual sundress for everyday wear' },
    { name: 'Cocktail Party Dress', category: 'dresses', price: 89.99, description: 'Stunning cocktail dress for special evenings' },

    // Tops
    { name: 'Silk Blouse', category: 'tops', price: 49.99, description: 'Elegant silk blouse for professional or casual wear' },
    { name: 'Cotton T-Shirt', category: 'tops', price: 19.99, description: 'Soft cotton basic tee in various colors' },
    { name: 'Crop Top', category: 'tops', price: 24.99, description: 'Trendy crop top perfect for summer' },
    { name: 'Flowy Tunic', category: 'tops', price: 34.99, description: 'Comfortable flowy tunic for relaxed style' },

    // Bottoms
    { name: 'High-Waist Jeans', category: 'bottoms', price: 69.99, description: 'Classic high-waist denim jeans' },
    { name: 'Pleated Skirt', category: 'bottoms', price: 44.99, description: 'Elegant pleated midi skirt' },
    { name: 'Yoga Pants', category: 'bottoms', price: 39.99, description: 'Comfortable stretch yoga pants' },
    { name: 'Denim Shorts', category: 'bottoms', price: 34.99, description: 'Casual denim shorts for warm weather' },

    // Outerwear
    { name: 'Leather Jacket', category: 'outerwear', price: 149.99, description: 'Stylish leather jacket' },
    { name: 'Wool Coat', category: 'outerwear', price: 179.99, description: 'Warm wool coat for winter' },
    { name: 'Cardigan', category: 'outerwear', price: 54.99, description: 'Cozy knit cardigan' },

    // Accessories
    { name: 'Leather Handbag', category: 'accessories', price: 99.99, description: 'Premium leather handbag' },
    { name: 'Gold Necklace', category: 'accessories', price: 79.99, description: 'Elegant gold-plated necklace' },
    { name: 'Silk Scarf', category: 'accessories', price: 29.99, description: 'Luxurious silk scarf' },

    // Activewear
    { name: 'Sports Bra', category: 'activewear', price: 34.99, description: 'Supportive sports bra for workouts' },
    { name: 'Leggings', category: 'activewear', price: 44.99, description: 'High-performance athletic leggings' },
];

async function updateProducts() {
    console.log('🌱 Updating products for women\'s clothing shop...\n');

    try {
        // Fetch existing products
        const products = await client.fetch('*[_type == "product"][0...20]');

        console.log(`📦 Found ${products.length} products to update\n`);

        // Fetch category references
        const categories = await client.fetch('*[_type == "category"]{ _id, "slug": slug.current }');
        const categoryMap = categories.reduce((acc: any, cat: any) => {
            acc[cat.slug] = { _ref: cat._id, _type: 'reference' };
            return acc;
        }, {});

        // Update products
        for (let i = 0; i < Math.min(products.length, clothingProducts.length); i++) {
            const product = products[i];
            const clothingData = clothingProducts[i];

            const categoryRef = categoryMap[clothingData.category];

            if (!categoryRef) {
                console.log(`⚠️  Category "${clothingData.category}" not found, skipping ${clothingData.name}`);
                continue;
            }

            await client
                .patch(product._id)
                .set({
                    name: clothingData.name,
                    description: clothingData.description,
                    price: clothingData.price,
                    categories: [categoryRef],
                })
                .commit();

            console.log(`   ✓ Updated: ${clothingData.name} (${clothingData.category})`);
        }

        console.log('\n✅ Successfully updated products!');
    } catch (error) {
        console.error('❌ Error updating products:', error);
        process.exit(1);
    }
}

updateProducts();
