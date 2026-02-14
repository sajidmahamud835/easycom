/**
 * Test Sanity Connection and Product Fetch
 * Run with: npx tsx scripts/test-sanity-fetch.ts
 */

import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-01-01',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
});

async function testFetch() {
    console.log('🔍 Testing Sanity connection...\n');
    console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
    console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET);
    console.log('API Version:', process.env.NEXT_PUBLIC_SANITY_API_VERSION);

    try {
        // Test 1: Fetch all products
        console.log('\n📦 Test 1: Fetching all products...');
        const allProducts = await client.fetch('*[_type == "product"]');
        console.log(`✓ Found ${allProducts.length} products`);

        // Test 2: Fetch with order and selection (same as getProducts)
        console.log('\n📦 Test 2: Fetching products with selection...');
        const query = `*[_type == "product"] | order(_createdAt desc) {
      _id,
      _type,
      name,
      "slug": slug,
      price,
      description,
      "images": images,
      discount,
      stock
    }`;
        const products = await client.fetch(query);
        console.log(`✓ Found ${products.length} products with query`);

        if (products.length > 0) {
            console.log('\n🔍 First product:');
            console.log(JSON.stringify(products[0], null, 2));
        }

        // Test 3: Fetch categories
        console.log('\n📁 Test 3: Fetching categories...');
        const categories = await client.fetch('*[_type == "category"]{ _id, title, "slug": slug.current }');
        console.log(`✓ Found ${categories.length} categories:`);
        categories.forEach((cat: any) => console.log(`   - ${cat.title}`));

    } catch (error) {
        console.error('❌ Error:', error);
    }
}

testFetch();
