"use server"
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { ObjectId } from 'mongodb';
import { MongoClient } from 'mongodb';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

export const deleteSkills = async (skillId) => {
    // Variable
    const session = await getServerSession(authOptions);
    if (!session) {
        throw new Error('Vous ne pouvez pas supprimer une compétence en mode invité.');
    }

    // Connecte to the mongoDB cluster
    const client = await MongoClient.connect(process.env.MONGODB_CLIENT);

    //connect to the mongoDB database
    const db = client.db(process.env.MONGODB_DATABASE);

    // Get the project to delete
    let skills = await db
        .collection('skills')
        .find({ _id: new ObjectId(skillId) });

    // If the project doesn't exist
    if (skills.length === 0) {
        throw new Error("Le projet n'existe pas");
    }

    // If the user is not the author of the (project)
    // if (skills[0].name !== session.user.name) {
    //     throw new Error("Vous n'avez pas les droits pour supprimer ce projet");
    // }

    // Delete the project
    try {
        await db
            .collection('skills')
            .deleteOne({ _id: new ObjectId(skillId) });
    } catch (error) {
        throw new error(error);
    }

    await client.close();
    revalidatePath('/', '/dashboard/skills');
};
