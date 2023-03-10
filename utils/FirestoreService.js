import { db } from "./firestore";

import { auth } from "./firestore";

function getAllReviews() {
  return new Promise((resolve, reject) => {
    db.collection("reviews")
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
function getProfilePosts(email) {
  console.log("parent email L: " + email);
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
}
function addNewReview(data) {
  const date = new Date();
  const seconds = Math.floor(date.getTime() / 1000);
  return new Promise((resolve, reject) => {
    const inputdata = {
      review: data.review,
      stars: data.stars,
      createdAt: seconds,
      owner_email: data.owner_email,
    };
    console.log(inputdata);
    db.collection("reviews")
      .add(inputdata)
      .then((docRef) => {
        resolve(docRef);
      })
      .then(() => {
        setLoading(false);
        handleModal();
        setData({ ...data, caption: "", body: "", stars: "0", createdAt: 1 });
      })
      .catch((e) => {
        reject(e);
      });
  });
}
/* ---------------------------- add profile data ---------------------------- */
function addProfileData(data) {
  console.log("Profile data");
  return new Promise((resolve, reject) => {
    db.collection("profiles")
      .add(data)
      .then((docRef) => {
        resolve(docRef);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

function updateProfileData(data, id, url) {
  console.log("called");
  return new Promise((resolve, reject) => {
    const _data = {
      owner_email: data.owner_email,
      bio: data.bio,
      img: url ? url : null,
      displayName: data.displayName,
    };
    console.log(_data);
    db.collection("profiles")
      .doc(id)
      .update(_data)
      .then(() => resolve())
      .catch((e) => {
        reject(e);
      });
  });
}
function getProfileInfo(email) {
  return new Promise((resolve, reject) => {
    //const querySnapshot = await getDocs(collection(db, "users"));
    //await getDocs(collection(db, "users"))
    db.collection("profiles")
      .where("owner_email", "==", email)
      .get()

      .then((allposts) => {
        resolve(allposts);
      })
      .catch((e) => {
        reject(e);
      });
  });
}
function updateReview(id, caption, body, owner_email, stars) {
  console.log(id);
  const date = new Date();
  const seconds = Math.floor(date.getTime() / 1000);
  console.log(caption + stars);
  return new Promise((resolve, reject) => {
    const data = {
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

function deleteReview(postID) {
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

function getArticles(category) {
  console.log("category : " + category);
  return new Promise((resolve, reject) => {
    db.collection("posts")
      .where("category", "==", category)
      .orderBy("title", "desc")
      .get()

      .then((allposts) => {
        resolve(allposts);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

export default {
  getAllReviews,
  getProfilePosts,
  addNewReview,
  updateReview,
  deleteReview,
  addProfileData,
  getProfileInfo,
  updateProfileData,
  getArticles,
};
