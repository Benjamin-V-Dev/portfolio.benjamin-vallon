'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { MongoClient } from 'mongodb';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

export const createSkills = async (formData) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        throw new Error('vous ne pouvez pas créer une compétence en mode invité.');
    }

    const { name, description, imageUrl, title, category } = formData;
    let client;

    try {
        client = await MongoClient.connect(process.env.MONGODB_CLIENT);
        const db = client.db(process.env.MONGODB_DATABASE);

        await db.collection('skills').insertOne({
            name,
            description,
            imageUrl,
            title,
            category,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    } catch (error) {
        throw new Error(
            error?.message || 'Erreur inconnue lors de la création de la compétence',
        );
    } finally {
        if (client) {
            await client.close(); // ne sera appelé que si client est défini
        }
    }

    revalidatePath('/');
};
