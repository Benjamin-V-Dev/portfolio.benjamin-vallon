import BtnNewSkill from '@/components/Skills/BtnNewSkill';
import Cards from '@/components/Skills/Cards';
import { MongoClient } from 'mongodb';

export default async function SkillsPage() {
    let skills = [];
    let client;

    try {
        client = await MongoClient.connect(process.env.MONGODB_CLIENT);
        const db = client.db(process.env.MONGODB_DATABASE);
        skills = await db.collection('skills').find({}).toArray();

        skills = skills.map((skill) => ({
            ...skill,
            _id: skill._id.toString(),
        }));
    } catch (error) {
        throw new Error(error?.message || 'Erreur inconnue');
    } finally {
        if (client) await client.close();
    }

    // Grouper les skills par catégorie
    const groupedSkills = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill);
        return acc;
    }, {});
    

    return (
        <div>
            <h1 className='heading1 text-center pt-10'>Compétences</h1>
            <BtnNewSkill />
            {Object.entries(groupedSkills).map(([category, skills]) => (
                <Cards key={category} category={category} skills={skills} />
            ))}
        </div>
    );
}
