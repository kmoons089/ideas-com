import { createContext, useContext, useEffect, useState } from "react";
import FirestoreServiceForPosts from "../utils/FirestoreServiceForPosts";

const PostContext = createContext();

export const usePost = () => useContext(PostContext);

const PostContextProvider = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllPosts = async () => {
      return new Promise((resolve, reject) => {
        FirestoreServiceForPosts.getAllPosts().then((response) => {
          console.log("hi");
        });
      });
    };

    return () => getAllPosts();
  }, []);

  return <div></div>;
};

export default PostContextProvider;
