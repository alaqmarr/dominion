import { Blog } from "@/types/blog";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

const SingleBlog = ({ blog }: { blog: any }) => {

  return (
    <div className="wow fadeInUp group mb-10" data-wow-delay=".1s">
      <div className="mb-8 overflow-hidden rounded">
        <Link href={`/products/${blog.id}`} aria-label="blog cover" className="block">
          <Image
            src={blog.images[0].url!}
            alt="image"
            className="w-full transition group-hover:rotate-6 group-hover:scale-125"
            width={408}
            height={272}
          />
        </Link>
      </div>
      <div>
        {/* <span className="mb-5 inline-block rounded bg-primary px-4 py-1 text-center text-xs font-semibold leading-loose text-white">
          {format(new Date(date), "dd MMM yyyy")}
        </span> */}
        <h3>
          <Link
            href={`/products/${blog.id}`}
            className="mb-4 inline-block text-xl font-semibold text-dark hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl lg:text-xl xl:text-2xl"
          >
            {blog.name}
          </Link>
        </h3>
        <p className="text-base text-body-color dark:text-dark-6" dangerouslySetInnerHTML={{ __html: blog.description.length > 100 ? blog.description.substring(0, 100) + '...read more' : blog.description }}></p>
      </div>
    </div>
  );
};

export default SingleBlog;
