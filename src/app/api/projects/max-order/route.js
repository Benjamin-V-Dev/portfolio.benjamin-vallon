// app/api/projects/max-order/route.js
import { MongoClient } from 'mongodb';

export async function GET() {
    let client;

    try {
        client = await MongoClient.connect(process.env.MONGODB_CLIENT);
        const db = client.db(process.env.MONGODB_DATABASE);

        const latest = await db
            .collection('projects')
            .find()
            .sort({ order: -1 })
            .limit(1)
            .toArray();

        const maxOrder = latest[0]?.order ?? 0;

        return Response.json({ maxOrder });
    } catch (error) {
        console.error('[max-order] erreur :', error);
        return Response.json({ error: 'Erreur serveur' }, { status: 500 });
    } finally {
        if (client) {
            await client.close();
        }
    }
}
