import Layout from "@components/layout";
import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import { NextPage } from "next";
import Link from "next/link";

interface Post {
  title: string;
  date: string;
  category: string;
  slug: string;
}

const Blog: NextPage<{ posts: Post[] }> = ({ posts }) => {
  return (
    <Layout title="blog" seoTitle="Blog">
      <h1 className="font-semibold text-xl mt-5 mb-10 text-center ">
        Latest Posts
      </h1>
      <ul>
        {posts.map((post, idx) => (
          <div key={idx} className="mb-5">
            <Link href={`/blog/${post.slug}`}>
              <a>
                <span className="text-lg text-red-500">{post.title}</span>
                <div>
                  <span>
                    {post.date} / {post.category}
                  </span>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </ul>
    </Layout>
  );
};

export async function getStaticProps() {
  const blogPosts = readdirSync("./posts").map((file) => {
    const conetent = readFileSync(`./posts/${file}`, "utf-8");
    const [slug, _] = file.split(".");
    return { ...matter(conetent).data, slug };
  });
  return {
    props: {
      posts: blogPosts,
    },
  };
}

export default Blog;
