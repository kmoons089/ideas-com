import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../utils/firestore";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const [profileData, setProfileData] = useState({
    owner_email: "",
    name: "",
    bio: "",
  });
  const signup = async (email, password) => {
    console.log(email, password);
    return createUserWithEmailAndPassword(auth, email, password)
      .then(async () => {
        console.log("okay");
      })
      .catch((error) => {
        if (error.code == "auth/email-already-in-use") {
          alert("The email address is already in use");
        } else if (error.code == "auth/invalid-email") {
          alert("The email address is not valid.");
        } else if (error.code == "auth/operation-not-allowed") {
          alert("Operation not allowed.");
        } else if (error.code == "auth/weak-password") {
          alert("The password is too weak.");
        }
      });
  };

  const login = (email, password) => {
    return new Promise(async (resolve, reject) => {
      await signInWithEmailAndPassword(auth, email, password)
        .then((response) => {
          resolve(response);
        })
        .catch((e) => {
          reject(e);
        });
    });
  };

  const logout = async () => {
    setUser(null);
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
