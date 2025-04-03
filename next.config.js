const { PHRASE_DEVELOPMENT_SERVER } = require('next/constants');

// Permets de gérer les variables d'environnement pour avoir une DB en test et une seconde en prod par exemple (plus propre que .env classique)
// Ici on utilise la même DB

module.exports = (env) => {
    // npm run dev
    if (env == PHRASE_DEVELOPMENT_SERVER) {
        return {
            env: {
                MONGODB_CLIENT:
                    'mongodb+srv://vbenjamindev:DiwwZQnm2iUCHVs2@cluster0.seyyr6b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
                MONGODB_DATABASE: 'portfolio',
                NEXTAUTH_SECRET:
                    '7w?hnb3J?CZW?JYd2R5NFwMKULML508u8ChL?l6Dt6C32I0z0tKqsAgf1XI@lPqHITJtcyFCmV?$G6@7',
            },
            images: {
                remotePatterns: [
                    {
                        protocol: 'https',
                        hostname: 'firebasestorage.googleapis.com',
                    },
                ],
            },
        };
    }
    // npm run build
    else {
        return {
            env: {
                MONGODB_CLIENT:
                    'mongodb+srv://vbenjamindev:DiwwZQnm2iUCHVs2@cluster0.seyyr6b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
                MONGODB_DATABASE: 'portfolio',
                NEXTAUTH_SECRET:
                    '7w?hnb3J?CZW?JYd2R5NFwMKULML508u8ChL?l6Dt6C32I0z0tKqsAgf1XI@lPqHITJtcyFCmV?$G6@7',
            },
            images: {
                remotePatterns: [
                    {
                        protocol: 'https',
                        hostname: 'firebasestorage.googleapis.com',
                    },
                ],
            },
        };
    }
};
