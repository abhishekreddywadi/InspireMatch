import { useEffect, useState } from "react";
import BlogCart from "../components/BlogCart";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Skeleton from "../components/Skeleton";
import AppBar from "../components/AppBar";

interface Blogs {
  author: {
    firstName: string;
  };
  content: string;
  id: string;
  title: string;
  createdAt: string;
}

const Blogs = () => {
  const [loading, setLoading] = useState(true);
  const [Blogs1, setBlogs] = useState<Blogs[]>([]);

  const fetchData = async () => {
    try {
      const posts = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
      });
      setBlogs(posts.data.posts);
      console.log(Blogs1);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Skeleton />;
  }

  return (
    <div className="overflow-x-hidden">
      <AppBar />
      <div className="flex  w-screen items-center flex-col gap-2 overflow-x-hidden">
        {Blogs1 &&
          Blogs1.map((blog) => (
            <BlogCart
              id={blog.id}
              key={blog.id}
              author={blog.author.firstName || "Anonymous"}
              title={blog.title}
              content={blog.content}
              createdAt={blog.createdAt}
            />
          ))}
      </div>
    </div>
  );
};

export default Blogs;
