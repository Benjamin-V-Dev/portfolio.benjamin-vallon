'use server';

import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import { checkEmail } from '@/utils/check-emailsyntax';

export const createUser = async (username, email, password) => {
    // If a field is empty
    if (!username || !email || !password) {
        // Notification
        throw new Error('Aucun champ ne doit être vide');
    }

    // Ckeck if the email is valid
    if (!checkEmail(email)) {
        throw new Error('Veuillez entrer un email valide');
    }

    const isStrongPassword = (password) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{12,}$/.test(
            password,
        );
    };

    if (!isStrongPassword(password)) {
        throw new Error(
            'Le mot de passe doit contenir au moins 12 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.',
        );
    }

    if (email !== process.env.AUTHORIZED_SIGNUP_EMAIL) {
        throw new Error("Vous n'êtes pas autorisé à créer un compte.");
    }

    // Connect to the MongoDB cluster
    const client = await MongoClient.connect(process.env.MONGODB_CLIENT);

    // Connect to the MongoDB database
    const db = client.db(process.env.MONGODB_DATABASE);

    try {
        // FIRST : Verify is this email is already used
        // Select the "users" collection
        let user = await db
            .collection('users')
            .find({ email })
            .limit(1)
            .toArray();

        // If the email is already used
        if (user.length !== 0) {
            await client.close();
            throw new Error("Vous n'êtes pas autorisé à créer un compte.");
            // throw new Error('Cet email est déjà utilisé');
        }

        // SECOND : Verify is this pseudo is already used
        // Select the "users" collection
        username = await db
            .collection('users')
            .find({ username })
            .limit(1)
            .toArray();

        // If the email is already used
        if (username.length !== 0) {
            await client.close();
            throw new Error("Ce nom d'utilisateur est déjà utilisé");
        }

        // THIRD : Encrypt the password
        const encryptedPassword = await bcrypt.hash(password, 10);

        // FOURTH : Create the user
        await db.collection('users').insertOne({
            username,
            email,
            password: encryptedPassword,
            creation: new Date(),
        });
    } catch (error) {
        await client.close();
        throw new Error(error);
    }
    
    // Close the connection to the MongoDB cluster
    await client.close();
};
