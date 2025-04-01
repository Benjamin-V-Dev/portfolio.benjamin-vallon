import Competences from '@/components/About/Competences';
import Parcours from '@/components/About/Parcours';
import Presentation from '@/components/About/Presentation';
import MagnetButtonMaster from '@/components/About/MagnetButtonMaster';

export default function page() {
    return (
        <>
            <Presentation />
            <MagnetButtonMaster />
            <Competences />
            <Parcours />
        </>
    );
}
