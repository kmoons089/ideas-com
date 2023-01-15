import { db } from "./firestore";

import { auth } from "./firestore";

function getAllPosts() {
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
}
function getProfilePosts() {
  console.log(auth.currentUser.email);

  return new Promise((resolve, reject) => {
    db.collection("posts")
      .where("owner_email", "==", auth.currentUser.email)
      .orderBy("createdAt", "desc")
      .get()

      .then((allposts) => {
        resolve(allposts);
      })
      .catch((e) => {
        reject(e);
      });
  });
}
function updatePost(id, caption, body, owner_email, stars) {
  const date = new Date();
  const seconds = Math.floor(date.getTime() / 1000);
  console.log(caption + stars);
  return new Promise((resolve, reject) => {
    const data = {
      caption: caption,
      body: body,
      stars: stars,
      createdAt: seconds,
      owner_email: owner_email,
    };
    db.collection("posts")
      .doc(id)
      .update(data)
      .then(() => {
        resolve();
      })
      .catch((e) => {
        reject(e);
      });
  });
}

function deletePost(postID) {
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
}

export default { getAllPosts, getProfilePosts, updatePost, deletePost };
