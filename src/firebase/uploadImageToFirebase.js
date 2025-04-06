import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebaseConfig';

export const uploadImageToFirebase = async (file, folder) => {
    const fileRef = ref(storage, `${folder}/${Date.now()}-${file.name}`);
    const snapshot = await uploadBytes(fileRef, file);
    return await getDownloadURL(snapshot.ref);
};
