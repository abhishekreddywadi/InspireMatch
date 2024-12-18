import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import AppBar from "../components/AppBar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    console.log("hello");

    e.preventDefault();
    // send title and content to server for publishing
    //...
    if (title.trim() == "" || content.trim() == "") {
      // alert("Title and content are required");
      toast.error("title and content are required");
      return;
    }
    console.log("hello");
    await axios.post(
      `${BACKEND_URL}/api/v1/blog`,
      {
        title,
        content,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    // console.log(response.data);
    // alert("quote published successfully");
    toast.success("quote published successfully");

    // navigate to blogs page

    setTitle("");
    setContent("");
    navigate("/blogs");
  };
  return (
    <>
      <AppBar />
      <div className="w-screen h-screen flex justify-center px-2 mt-4 overflow-x-hidden">
        <div className="flex flex-col gap-6 w-full  sm:w-[50%] items-center  ">
          <div className="relative w-full  min-w-[200px]">
            <textarea
              value={title}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setTitle(e.target.value);
              }}
              className="peer h-full min-h-[100px] w-full resize-none border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" "
            ></textarea>
            <label className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-0 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-900 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              title
            </label>
          </div>
          <div className="relative w-full min-w-[200px]">
            <textarea
              value={content}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setContent(e.target.value);
              }}
              className="peer h-[40vh] min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" "
            ></textarea>
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              content
            </label>
          </div>
          <div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="bg-white w-36 h-12 rounded-md border-2 border-[#333] cursor-pointer relative group hover:bg-[#333] transition duration-300 ease-in hover:-translate-x-2 hover:translate-y-2"
            >
              <h1 className="group-hover:text-white text-[#333] font-bold">
                Publish
              </h1>
              <div className="rounded-md group-hover:border-0 w-36 h-12 border-2 border-[#333] absolute top-1 -left-2 -z-10">
                <div className="rounded-md group-hover:border-0 w-36 h-12 border-2 border-[#333] absolute top-1 -left-2 -z-10"></div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Publish;
