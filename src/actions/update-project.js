'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { MongoClient, ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

export const updateProject = async (projectId, formData) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        throw new Error(
            'Vous ne pouvez pas modifier un projet en mode invité.',
        );
    }

    const { name, description, imageUrl, url, tags, order } = formData;
    let client;

    try {
        client = await MongoClient.connect(process.env.MONGODB_CLIENT);
        const db = client.db(process.env.MONGODB_DATABASE);

        const projectObjectId = new ObjectId(projectId);

        const existingProject = await db
            .collection('projects')
            .findOne({ _id: projectObjectId });
        if (!existingProject) throw new Error('Projet non trouvé');

        const oldOrder = existingProject.order;

        if (oldOrder !== order) {
            if (order > oldOrder) {
                // Décalage vers le bas : ceux entre old+1 et new doivent -1
                await db.collection('projects').updateMany(
                    {
                        order: { $gt: oldOrder, $lte: order },
                        _id: { $ne: projectObjectId },
                    },
                    { $inc: { order: -1 } },
                );
            } else {
                // Décalage vers le haut : ceux entre new et old-1 doivent +1
                await db.collection('projects').updateMany(
                    {
                        order: { $gte: order, $lt: oldOrder },
                        _id: { $ne: projectObjectId },
                    },
                    { $inc: { order: +1 } },
                );
            }
        }

        await db.collection('projects').updateOne(
            { _id: projectObjectId },
            {
                $set: {
                    name,
                    description,
                    imageUrl,
                    url,
                    tags,
                    order,
                    updatedAt: new Date(),
                },
            },
        );
    } catch (error) {
        throw new Error(
            error?.message || 'Erreur lors de la mise à jour du projet',
        );
    } finally {
        if (client) await client.close();
    }

    revalidatePath('/');
};
