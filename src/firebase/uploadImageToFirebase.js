import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebaseConfig';

export const uploadImageToFirebase = async (file) => {
    const fileRef = ref(storage, `projects/${Date.now()}-${file.name}`);
    const snapshot = await uploadBytes(fileRef, file);
    return await getDownloadURL(snapshot.ref);
};
