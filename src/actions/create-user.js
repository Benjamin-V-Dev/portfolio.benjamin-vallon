'use server';

import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import { checkEmail } from '@/utils/check-emailsyntax';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const createUser = async (username, email, password) => {
    // Vérifie que l'utilisateur est connecté
    const session = await getServerSession(authOptions);
    if (!session) {
        throw new Error('Vous devez être connecté pour créer un utilisateur');
    }

    // Vérifie que les champs ne sont pas vides
    if (!username || !email || !password) {
        throw new Error('Aucun champ ne doit être vide');
    }

    // Vérifie que l'email est valide
    if (!checkEmail(email)) {
        throw new Error('Veuillez entrer un email valide');
    }

    // Vérifie que le mot de passe est suffisamment fort
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

    // Connexion au cluster MongoDB
    const client = await MongoClient.connect(process.env.MONGODB_CLIENT);
    const db = client.db(process.env.MONGODB_DATABASE);

    // Vérification email et username unique
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    await db.collection('users').createIndex({ username: 1 }, { unique: true });

    console.log('Index uniques créés sur email et username');

    try {
        // Vérifie si l'email est déjà utilisé
        const existingEmail = await db
            .collection('users')
            .find({ email })
            .limit(1)
            .toArray();

        if (existingEmail.length !== 0) {
            throw new Error('Cet email est déjà utilisé');
        }

        // Vérifie si le nom d'utilisateur est déjà utilisé
        const existingUsername = await db
            .collection('users')
            .find({ username })
            .limit(1)
            .toArray();

        if (existingUsername.length !== 0) {
            throw new Error("Ce nom d'utilisateur est déjà utilisé");
        }

        // Chiffre le mot de passe
        const encryptedPassword = await bcrypt.hash(password, 10);

        // Crée le nouvel utilisateur avec un rôle par défaut "member" et un statut "suspended"
        await db.collection('users').insertOne({
            username,
            email,
            password: encryptedPassword,
            role: 'member',
            status: 'suspended',
            creation: new Date(),
        });
    } catch (error) {
        throw new Error(
            error?.message || "Erreur lors de la création de l'utilisateur",
        );
    } finally {
        // Ferme la connexion à la base de données dans tous les cas
        await client.close();
    }
};
