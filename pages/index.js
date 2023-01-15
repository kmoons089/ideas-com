// import { server } from "../config";

import Footer from "../components/Footer";
import Category from "../components/Category";

import Carousel_Component from "../components/Carousel";
import Home_2nd_para from "../components/Home_2nd_para";

export default function Home({ articles }) {
  return (
    <div>
      <Carousel_Component />
      <Home_2nd_para />

      <Category />

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
