
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDL2yX_VYPSA6K1x3iKxwvOht35ptSEGEA",
  authDomain: "chat-app-an-c08d1.firebaseapp.com",
  projectId: "chat-app-an-c08d1",
  storageBucket: "chat-app-an-c08d1.appspot.com",
  messagingSenderId: "1019566240038",
  appId: "1:1019566240038:web:37bd06b3c1ec2e0bb651e7",
  measurementId: "G-ZVM236RX65"
};

const app = initializeApp(firebaseConfig);


const auth= getAuth(app);
const db= getFirestore(app);

const signup = async (username,email,password)=>{
    try{

        const res= await createUserWithEmailAndPassword(auth,email,password);
        const user= res.user;
        await setDoc(doc(db,"users",user.uid),{
            id:user.uid,
            username:username.toLowerCase(),
            email,
            name:"",
            avatar:"",
            bio:"Hey, There I'm using chat app",
            lastSeen:Date.now()
        })

        await setDoc(doc(db,"chats",user.uid),{
            chatsData:[]
        })



    }catch(error){
        console.error(error)
        toast.error(error.code.split('/')[1].split('-').join(" "));

    }
    

}

const login= async (email,password)=>{
    try{

        await signInWithEmailAndPassword(auth,email,password);


    }catch(error){
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" ")); 

    }

}

const logout = async() =>{
    try{

    await signOut(auth)

    }
    catch(error){

        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" ")); 

    }

}

export{signup,login,logout,auth,db}


