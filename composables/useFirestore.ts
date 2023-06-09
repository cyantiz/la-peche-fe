import {
    getDocs as _getDocs,
    getDoc as _getDoc,
    doc as _doc,
    setDoc as _setDoc,
    collection as _collection,
    onSnapshot as _onSnapShot,
    Firestore,
    Query,
    DocumentReference,
    FirestoreError,
    DocumentSnapshot,
    serverTimestamp as _serverTimestamp,
} from 'firebase/firestore'
export default function useFirestore() {
    const { $firestore } = useNuxtApp() as unknown as { $firestore: Firestore }

    const getDoc = <T>(reference: DocumentReference<T>) => {
        return _getDoc<T>(reference)
    }

    const getDocs = <T>(query: Query<T>) => {
        return _getDocs(query)
    }

    const collection = (path: string, ...pathSegments: string[]) => {
        return _collection($firestore, path, ...pathSegments)
    }

    const doc = (path: string, ...pathSegments: string[]) => {
        return _doc($firestore, path, ...pathSegments)
    }

    const setDoc = async (
        collectionPath: string,
        docPath: string,
        data: any
    ) => {
        const docRef = doc(collectionPath, docPath)
        await _setDoc(docRef, data)
    }

    const onSnapShot = <T>(
        reference: DocumentReference<T>,
        onNext: (snapshot: DocumentSnapshot<T>) => void,
        onError?: (error: FirestoreError) => void,
        onCompletion?: () => void
    ) => {
        return _onSnapShot(reference, onNext, onError, onCompletion)
    }

    const serverTimestamp = () => {
        return _serverTimestamp()
    }

    return {
        getDocs,
        doc,
        setDoc,
        collection,
        getDoc,
        onSnapShot,
        serverTimestamp,
    }
}
