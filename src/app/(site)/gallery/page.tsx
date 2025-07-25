import SingleBlog from "@/components/Blog/SingleBlog";
import Breadcrumb from "@/components/Common/Breadcrumb";
import SingleImage from "@/components/Gallery";
import { getAllPosts } from "@/utils/markdown";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Blog Grids | Play SaaS Starter Kit and Boilerplate for Next.js",
  description: "Blog grids page description",
};

const Products = async () => {
  const posts = await fetch(`https://mystore.alaqmar.dev/api/dominion/products`,
    {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    }
  )
    .then((res) => res.json())

  const images = posts.map((post: any) => ({
    url: post.images[0].url,
    productId: post.id,
  }));

  return (
    <>
      <Breadcrumb pageName="Product Gallery" />

      <section className="pb-10 pt-20 lg:pb-20 lg:pt-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            {images.map((image: any, i: any) => (
              <div key={i} className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3">
                <SingleImage image={image} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
