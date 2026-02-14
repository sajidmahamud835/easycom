/**
 * Seed script for Women's Clothing Categories
 * Run with: npx tsx scripts/seed-women-categories.ts
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

const categories = [
    {
        _type: 'category',
        title: 'Dresses',
        slug: { _type: 'slug', current: 'dresses' },
        description: 'Beautiful dresses for every occasion - casual, formal, maxi, and mini styles',
        featured: true,
        range: 25,
    },
    {
        _type: 'category',
        title: 'Tops',
        slug: { _type: 'slug', current: 'tops' },
        description: 'Stylish tops including blouses, t-shirts, crop tops, and tunics',
        featured: true,
        range: 15,
    },
    {
        _type: 'category',
        title: 'Bottoms',
        slug: { _type: 'slug', current: 'bottoms' },
        description: 'Trendy bottoms - jeans, skirts, pants, and shorts for all seasons',
        featured: true,
        range: 20,
    },
    {
        _type: 'category',
        title: 'Outerwear',
        slug: { _type: 'slug', current: 'outerwear' },
        description: 'Cozy jackets, coats, and cardigans to complete your look',
        featured: false,
        range: 40,
    },
    {
        _type: 'category',
        title: 'Accessories',
        slug: { _type: 'slug', current: 'accessories' },
        description: 'Essential accessories - bags, jewelry, scarves, and more',
        featured: true,
        range: 10,
    },
    {
        _type: 'category',
        title: 'Activewear',
        slug: { _type: 'slug', current: 'activewear' },
        description: 'Comfortable activewear for yoga, sports, and fitness',
        featured: false,
        range: 30,
    },
    {
        _type: 'category',
        title: 'Sale',
        slug: { _type: 'slug', current: 'sale' },
        description: 'Amazing deals and discounts on selected items',
        featured: true,
        range: 12,
    },
];

async function seedCategories() {
    console.log('🌱 Starting to seed women\'s clothing categories...\n');

    try {
        // Delete existing categories
        console.log('🗑️  Deleting old categories...');
        const oldCategories = await client.fetch('*[_type == "category"]');
        for (const cat of oldCategories) {
            await client.delete(cat._id);
            console.log(`   ✓ Deleted: ${cat.title}`);
        }

        console.log('\n📦 Creating new categories...');

        // Create new categories
        for (const category of categories) {
            const result = await client.create(category);
            console.log(`   ✓ Created: ${result.title}`);
        }

        console.log('\n✅ Successfully seeded women\'s clothing categories!');
    } catch (error) {
        console.error('❌ Error seeding categories:', error);
        process.exit(1);
    }
}

seedCategories();
