import Cards from '@/components/Home/Projects';
import Hero from '@/components/Home/Hero';
import { MongoClient } from 'mongodb';

export default async function Home() {
    let projects = [];
    let client;

    try {
        // Connect to the MongoDB cluster
        client = await MongoClient.connect(process.env.MONGODB_CLIENT);

        // Connect to the MongoDB database
        const db = client.db(process.env.MONGODB_DATABASE);

        // Select the "projects" collection
        projects = await db.collection('projects').find({}).toArray();

        // Format projects
        projects = projects.map((project) => ({
            ...project,
            _id: project._id.toString(),
        }));
    } catch (error) {
        throw new Error(error?.message || 'Erreur inconnue');
    } finally {
        if (client) {
            await client.close();
        }
    }
    return (
        <>
            <Hero></Hero>
            <Cards projects={projects}></Cards>
        </>
    );
}
