import React , { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from "../firebase";
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { doc, setDoc} from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {

  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    
    try{
      // create user
      const res = await createUserWithEmailAndPassword(auth, email, password);
      // create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${name + date}`);
      
      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              name,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              name,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  
  

    return (
       <div className="formContainer">
          <div className="formWrapper">
            <span className="logo">LetsChat</span>
            <span className="title">Register</span>

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name"/>
                <input type="email" placeholder="Email"/>
                <input type="password" placeholder="Password"/>

                <input style={{display:"none"}} type="file" id="file"/>
                <label htmlFor="file">
                  <img className="img"
                  src="https://icon-library.com/images/gallery-icon-android/gallery-icon-android-21.jpg"/>
                  <span>Add an Avatar</span>
                </label>

                <button>Sign Up</button>
                {err && <span>Something went wrong</span>}
            </form>
            <p>If you have account an already? <Link to="/login">Login </Link></p>
          </div>
       </div>
    )
};

export default Register;