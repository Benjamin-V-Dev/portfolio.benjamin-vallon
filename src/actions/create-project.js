'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { MongoClient } from 'mongodb';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

export const createProject = async (formData) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        throw new Error('Vous devez être connecté pour créer un projet');
    }

    const { name, description, imageUrl, url, altImage } = formData;
    let client;

    try {
        client = await MongoClient.connect(process.env.MONGODB_CLIENT);
        const db = client.db(process.env.MONGODB_DATABASE);

        await db.collection('projects').insertOne({
            name,
            description,
            imageUrl,
            url,
            altImage,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    } catch (error) {
        throw new Error(
            error?.message || 'Erreur inconnue lors de la création du projet',
        );
    } finally {
        if (client) {
            await client.close(); // ne sera appelé que si client est défini
        }
    }

    revalidatePath('/');
};
