import firebase from '../firebase';

import Button from '@material-ui/core/Button';

const auth = firebase.auth();
const firestore = firebase.firestore();

function Login() {

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).then((user) => {
          //after we have the credential - lets check if the user exists in firestore
          var docRef = firestore.collection('users').doc(auth.currentUser.uid);
          docRef.get().then(doc => {
            if (doc.exists) {
              //user exists then just update the login time
              return user
            } else {
              //user doesn't exist - create a new user in firestore
              addNewUserToFirestore(user);        
            }
          })
        });
      }
    
      return (
        <Button variant="outlined" onClick={signInWithGoogle}>Sign in with Google</Button>
      )
}

function addNewUserToFirestore(user) {
    const collection = firestore.collection('users');
    const {profile} = user.additionalUserInfo;
    const details = {
      firstName: profile.given_name,
      lastName: profile.family_name,
      fullName: profile.name,
      email: profile.email,
    };
    collection.doc(auth.currentUser.uid).set(details);
    return {user, details};
  }
  

export default Login;