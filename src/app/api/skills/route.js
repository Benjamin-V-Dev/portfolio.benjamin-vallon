import { MongoClient } from 'mongodb';

export async function GET() {
    const client = await MongoClient.connect(process.env.MONGODB_CLIENT);
    const db = client.db(process.env.MONGODB_DATABASE);

    const skills = await db.collection('skills').find({}).toArray();
    await client.close();

    return Response.json(
        skills.map((s) => ({
            _id: s._id.toString(),
            name: s.name,
            category: s.category,
            imageUrl: s.imageUrl,
            title: s.title,
        })),
    );
}
