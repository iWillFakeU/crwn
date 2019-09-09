import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCtyWmWJ7r2gN6auLT0WSRpU3yaI8sIBpY",
    authDomain: "crwn-db-46063.firebaseapp.com",
    databaseURL: "https://crwn-db-46063.firebaseio.com",
    projectId: "crwn-db-46063",
    storageBucket: "",
    messagingSenderId: "557067827712",
    appId: "1:557067827712:web:2fd499129846f9a92236e5"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth)
        return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (e) {
            console.log('Error creating user', e.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
