// import { server } from "../config";
import ArticleList from "../components/ArticleList";
import HomeScreen from "../components/HomeScreen";
import HomeScreen2 from "../components/HomeScreen2";
import Footer from "../components/Footer";
import Category from "../components/Category";

import Carousel_Component from "../components/Carousel";
import Home_2nd_para from "../components/Home_2nd_para";
import Cat_Boot from "../components/Cat_Boot";

export default function Home({ articles }) {
  return (
    <div>
      <Carousel_Component />
      <Home_2nd_para />
      {/* <HomeScreen2 /> */}
      {/* <ArticleList articles={articles} /> */}
      <Category />
      {/* <Cat_Boot /> */}
      <Footer />
    </div>
  );
}

// export const getStaticProps = async () => {
//   const res = await fetch(`${server}/api/articles`);
//   const articles = await res.json();

//   return {
//     props: {
//       articles,
//     },
//   };
// };

// export const getStaticProps = async () => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=6`)
//   const articles = await res.json()

//   return {
//     props: {
//       articles,
//     },
//   }
// }
