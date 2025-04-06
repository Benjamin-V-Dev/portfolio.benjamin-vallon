'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { MongoClient, ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

export const updateSkill = async (skillId, formData) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        throw new Error('Vous ne pouvez pas modifier une compétence en mode invité.');
    }

    const { name, description, imageUrl, title, category } = formData;
    let client;

    try {
        client = await MongoClient.connect(process.env.MONGODB_CLIENT);
        const db = client.db(process.env.MONGODB_DATABASE);

        // Vérifie que la compétence existe (optionnel mais conseillé)
        const existingSkill = await db
            .collection('skills')
            .findOne({ _id: new ObjectId(skillId) });

        if (!existingSkill) {
            throw new Error('Compétence non trouvée');
        }

        // Tu peux activer ce bloc si tu veux limiter la modif au propriétaire :
        // if (existingProject.name !== session.user.name) {
        //     throw new Error("Vous n'avez pas les droits pour modifier ce projet");
        // }

        // Mise à jour
        await db.collection('skills').updateOne(
            { _id: new ObjectId(skillId) },
            {
                $set: {
                    name,
                    description,
                    imageUrl,
                    title,
                    category,
                    updatedAt: new Date(),
                },
            },
        );
    } catch (error) {
        throw new Error(
            error?.message || 'Erreur lors de la mise à jour de la compétence',
        );
    } finally {
        if (client) {
            await client.close();
        }
    }

    revalidatePath('/');
};
