import { MongoClient } from 'mongodb';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import NextAuth from 'next-auth/next';

export const authOptions = {
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {},

            async authorize(credentials) {
                const { email, password } = credentials;

                try {
                    // Connect to the MongoDB cluster
                    const client = await MongoClient.connect(
                        process.env.MONGODB_CLIENT,
                    );

                    // Connect to the MongoDB database
                    const db = client.db(process.env.MONGODB_DATABASE);

                    // FIRST : Get the user for this email
                    // Select the "users" collection
                    let user = await db
                        .collection('users')
                        .find({ email })
                        .limit(1)
                        .toArray();

                    // If the email is not used
                    if (user.length == 0) {
                        await client.close();
                        throw new Error("Cet utilisateur n'existe pas");
                    }

                    // SECOND : Verify the password
                    const isPasswordValid = await bcrypt.compare(
                        password,
                        user[0].password,
                    );

                    // If the password isn't valid
                    if (!isPasswordValid) {
                        await client.close();
                        throw new Error('Le mot de passe est incorrect');
                    }

                    // THIRD : Our user is authenticated
                    // Format user DONT ADD SENSITIVE DATA LIKE A PASSWORD
                    user = user.map((user) => ({
                        _id: user._id.toString(),
                        username: user.username,
                        email: user.email,
                    }))[0];

                    await client.close();

                    return user;

                } catch (error) {
                    throw new Error(error.message);
                }
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: { signIn: '/login/signin' },
    callbacks: {},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
