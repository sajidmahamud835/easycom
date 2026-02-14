/**
 * Debug script to check Sanity database
 * Run with: npx tsx scripts/check-sanity.ts
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

async function checkDatabase() {
    console.log('🔍 Checking Sanity database...\n');

    try {
        // Check categories
        console.log('📦 Categories:');
        const categories = await client.fetch('*[_type == "category"]{ _id, title, "slug": slug.current }');
        console.log(`   Found ${categories.length} categories:`);
        categories.forEach((cat: any) => {
            console.log(`   - ${cat.title} (${cat.slug})`);
        });

        // Check products
        console.log('\n🛍️  Products:');
        const products = await client.fetch('*[_type == "product"]{ _id, name, price, "categories": categories[]->title }');
        console.log(`   Found ${products.length} products:`);
        products.slice(0, 10).forEach((prod: any) => {
            console.log(`   - ${prod.name} ($${prod.price}) - Categories: ${prod.categories?.join(', ') || 'None'}`);
        });

        if (products.length === 0) {
            console.log('\n⚠️  No products found! Database might be empty.');
        }

    } catch (error) {
        console.error('❌ Error checking database:', error);
    }
}

checkDatabase();
