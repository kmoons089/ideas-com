import { db } from "./firestore";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  doc,
  getDocs,
} from "firebase/firestore";

import { auth } from "./firestore";

let guid = () => {
  let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
};

export const getAllPosts = () => {
  console.log("get alll posts");
  return new Promise((resolve, reject) => {
    db.collection("posts")
      .orderBy("createdAt", "desc")
      .get()
      .then((allposts) => {
        resolve(allposts);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

export const getSinglePost = async (id) => {
  console.log("get single post");
  return new Promise((resolve, reject) => {
    db.collection("posts")
      .doc(id)

      //.where(firebase.firestore.FieldPath.documentId(), "==", id)
      .get()
      .then((post) => {
        resolve(post);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

export const getProfilePosts = (email) => {
  return new Promise((resolve, reject) => {
    db.collection("posts")
      .where("owner_email", "==", email)
      .orderBy("createdAt", "desc")
      .get()

      .then((allposts) => {
        resolve(allposts);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

export const getCategoryPosts = (category) => {
  console.log("In util , category : " + category);
  return new Promise((resolve, reject) => {
    db.collection("posts")
      .where("category", "==", category)
      .orderBy("createdAt", "desc")
      .get()
      .then((posts) => {
        resolve(posts);
      })
      .catch((e) => {
        console.log(e);
        reject(e);
      });
  });
};

export const addNewPost = (data, url) => {
  console.log(guid());
  const date = new Date();
  const seconds = Math.floor(date.getTime() / 1000);
  console.log(data);
  const _data = {
    body: data.body,
    comments: data.comments,
    displayName: data.displayName,
    likes: data.likes,
    owner_email: data.owner_email,
    pfImg: data.pfImg,
    img: url,
    createdAt: seconds,
    id: guid(),
    category: data.category,
  };
  console.log(_data);
  return new Promise((resolve, reject) => {
    db.collection("posts")
      .add(_data)
      .then((posts) => {
        resolve(posts);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

export const editPost = () => {};

export const deletePost = (postID) => {
  return new Promise((resolve, reject) => {
    db.collection("posts")
      .doc(postID)
      .delete()
      .then(() => {
        resolve();
      })
      .catch((e) => {
        reject(e);
      });
  });
};

export const getComment = (id) => {
  return new Promise((resolve, reject) => {
    db.collection("comments")
      .doc(id)
      // .orderBy("createdAt", "desc")
      .get()
      .then((comment) => {
        resolve(comment);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

export const createComment = (postId, data) => {
  const date = new Date();
  const seconds = Math.floor(date.getTime() / 1000);
  const _data = {
    pfImg: data.pfImg,
    body: data.body,
    owner_email: data.owner_email,
    displayName: data.displayName,
    createdAt: seconds,
  };
  let id = "";
  console.log("Post id : " + postId);
  console.log(_data);
  return new Promise((resolve, reject) => {
    //collection -> comments
    db.collection("comments")
      .add(_data)
      .then(async (response) => {
        // console.log(response.id);
        id = response.id;
        resolve(response);
        //collection -> posts
        await db
          .collection("posts")
          .doc(postId)
          .update("comments", arrayUnion(id))
          .then(() => {
            console.log("comments added");
          });
      })
      .catch((e) => {
        reject(e);
      });
  });
};

export const RemoveLikes = async (id, email) => {
  console.log(id);
  return new Promise((resolve, reject) => {
    db.collection("posts")
      .doc(id)
      .update("likes", arrayRemove(email))
      .then((likes) => {
        resolve(likes);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

export const AddLikes = (id, email) => {
  return new Promise((resolve, reject) => {
    db.collection("posts")
      .doc(id)
      .update("likes", arrayUnion(email))
      .then((likes) => {
        resolve(likes);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

export default {
  getAllPosts,
  getCategoryPosts,
  getSinglePost,
  getProfilePosts,
  addNewPost,
  editPost,
  deletePost,
  getComment,
  createComment,
  RemoveLikes,
  AddLikes,
};
