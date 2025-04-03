'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { MongoClient, ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

export const updateProject = async (projectId, formData) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        throw new Error('Vous devez être connecté pour modifier un projet');
    }

    const { name, description, imageUrl, url, altImage } = formData;
    let client;

    try {
        client = await MongoClient.connect(process.env.MONGODB_CLIENT);
        const db = client.db(process.env.MONGODB_DATABASE);

        // Vérifie que le projet existe (optionnel mais conseillé)
        const existingProject = await db
            .collection('projects')
            .findOne({ _id: new ObjectId(projectId) });

        if (!existingProject) {
            throw new Error('Projet non trouvé');
        }

        // Tu peux activer ce bloc si tu veux limiter la modif au propriétaire :
        // if (existingProject.name !== session.user.name) {
        //     throw new Error("Vous n'avez pas les droits pour modifier ce projet");
        // }

        // Mise à jour
        await db.collection('projects').updateOne(
            { _id: new ObjectId(projectId) },
            {
                $set: {
                    name,
                    description,
                    imageUrl,
                    url,
                    altImage,
                    updatedAt: new Date(),
                },
            },
        );
    } catch (error) {
        throw new Error(
            error?.message || 'Erreur lors de la mise à jour du projet',
        );
    } finally {
        if (client) {
            await client.close();
        }
    }

    revalidatePath('/');
};
