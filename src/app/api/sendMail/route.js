import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        // Récupération des données du formulaire
        const { name, email, message } = await request.json();

        // Configuration du transporteur de mail
        const transporter = nodemailer.createTransport({
            host: 'smtp.hostinger.com',
            port: 465,
            secure: true, // true pour les connexions SSL/TLS
            auth: {
                user: 'contact@benjamin-vallon.fr',

                pass: process.env.SMTP_PASSWORD,
            },
        });


        // Template HTML du premier email (administrateurs)
        const mailContentFirst = `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
                <div style="background-color: #007BFF; color: white; padding: 10px; text-align: center;">
                    <h1>Nouvelle demande de contact depuis le formulaire du portfolio</h1>
                </div>
                <div style="margin-top: 20px;">
                    <p><strong>Nom :</strong> ${name}</p>
                    <p><strong>Message (facultatif) :</strong>${message}</p>
                </div>
            </div>
        `;

        // Template HTML pour le second email (utilisateur)
        const mailContentSecond = `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
                <div style="background-color: #28a745; color: white; padding: 10px; text-align: center;">
                    <h1>Demande de contact</h1>
                </div>
                <div style="margin-top: 20px;">
                    <p>Bonjour,</p>
                    <p style="margin-top: 10px;">Votre demande de contact a bien été envoyée.</p>
                    <p style="margin-top: 10px;">Je reste à votre disposition si besoin au 07 45 15 25 42.</p>
                    <p>À bientôt, Benjamin Vallon.</p>
                </div>
            </div>
        `;

        // Premier email envoyé aux administrateurs
        const mailOptionsFirst = {
            from: 'contact@benjamin-vallon.fr',
            to: ['contact@benjamin-vallon.fr', 'vallon.benjamin@gmail.com'],
            subject: `Portfolio : Nouvelle demande de contact de ${name}`,
            html: mailContentFirst,
        };

        // Second email envoyé à l'utilisateur
        const mailOptionsSecond = {
            from: 'contact@benjamin-vallon.fr',
            to: email,
            subject: `Demande de contact sur le portfolio de Benjamin Vallon`,
            html: mailContentSecond,
        };

        // Envoi des deux emails
        await transporter.sendMail(mailOptionsFirst);
        await transporter.sendMail(mailOptionsSecond);

        return NextResponse.json(
            { message: 'Emails envoyés avec succès' },
            { status: 200 },
        );
    } catch (error) {
        console.error('Erreur d’envoi de l’email:', error);
        return NextResponse.json(
            { message: 'Échec de l’envoi des emails' },
            { status: 500 },
        );
    }
}
