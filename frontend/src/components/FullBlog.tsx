interface FullBlogProps {
  author: {
    fullName: string;
  };
  title?: string;
  content?: string;
  createdAt?: string;
}
const FullBlog = ({ author, title, content, createdAt }: FullBlogProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-center   w-[90vw] pt-5 gap-3">
      <div className="flex flex-col gap-4 w-full sm:w-[60%]  px-3">
        <div className="font-bold sm:leading-relaxed text-xl sm:text-[2.5rem]">
          <h1>{title}</h1>
        </div>
        <div className="sm:text-[1rem] text-sm text-gray-700">
          Posted on {createdAt?.split("-")[0]}/{createdAt?.split("-")[1]}
        </div>
        <div className="text-[1rem]  ">{content}</div>
      </div>
      <div className="flex flex-col px-3 gap-1 sm:gap-3">
        <div className="font-semibold ">Author</div>
        <div className="font-bold text-lg sm:text-xl">{author.fullName}</div>
      </div>
    </div>
  );
};

export default FullBlog;
