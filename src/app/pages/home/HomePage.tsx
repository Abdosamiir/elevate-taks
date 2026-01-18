import { getPosts } from "@/app/services/api";
// import { ComponentExample } from "@/components/component-example";

const HomePage = () => {
  const posts = getPosts();
  console.log(posts);
// post list here
  return (
    <>
      <div>hello</div>
      {/* <ComponentExample /> */}
    </>
  );
};

export default HomePage;
