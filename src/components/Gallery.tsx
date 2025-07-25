import { Blog } from "@/types/blog";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

const SingleImage = ({ image }: { image: any }) => {

  return (
    <div className="wow fadeInUp group mb-10" data-wow-delay=".1s">
      <div className="mb-8 overflow-hidden rounded">
        <Link href={`/products/${image.productId}`} aria-label="blog cover" className="block">
          <Image
            src={image.url}
            alt="image"
            className="w-full transition group-hover:rotate-6 group-hover:scale-125"
            width={408}
            height={272}
          />
        </Link>
      </div>
    </div>
  );
};

export default SingleImage;
