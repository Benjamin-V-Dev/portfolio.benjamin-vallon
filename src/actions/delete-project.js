"use server"
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { ObjectId } from 'mongodb';
import { MongoClient } from 'mongodb';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

export const deleteProject = async (projectId) => {
    // Variable
    const session = await getServerSession(authOptions);
    if (!session) {
        throw new Error('Vous devez être connecté pour supprimer un projet');
    }

    // Connecte to the mongoDB cluster
    const client = await MongoClient.connect(process.env.MONGODB_CLIENT);

    //connect to the mongoDB database
    const db = client.db(process.env.MONGODB_DATABASE);

    // Get the project to delete
    let projects = await db
        .collection('projects')
        .find({ _id: new ObjectId(projectId) });

    // If the project doesn't exist
    if (projects.length === 0) {
        throw new Error("Le projet n'existe pas");
    }

    // If the user is not the author of the (project)
    // if (projects[0].name !== session.user.name) {
    //     throw new Error("Vous n'avez pas les droits pour supprimer ce projet");
    // }

    // Delete the project
    try {
        await db
            .collection('projects')
            .deleteOne({ _id: new ObjectId(projectId) });
    } catch (error) {
        throw new error(error);
    }

    await client.close();
    revalidatePath('/', '/dashboard/projects');
};
