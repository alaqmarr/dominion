import Newsletter from "@/components/Blog/Newsletter";
import PopularArticle from "@/components/Blog/PopularArticle";
import SingleBlog from "@/components/Blog/SingleBlog";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { getAllPosts, getPostBySlug } from "@/utils/markdown";
import markdownToHtml from "@/utils/markdownToHtml";
import axios from "axios";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  const post = await axios.get(`https://mystore.alaqmar.dev/api/dominion/products/${slug}`)
    .then((res) => res.data)
    .catch(() => null);


  if (post) {
    const metadata = {
      title: `${post.name || "Single Post Page"} | 'DOMINION TOOLS TRADERS'`,
      author: "DOMINION TOOLS TRADERS",
      description: post.description || "This is a single post page description",
      robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
          index: true,
          follow: false,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };

    return metadata;
  } else {
    return {
      title: "Not Found",
      description: "No blog article has been found",
      author: 'DOMINION TOOLS TRADERS',
      robots: {
        index: false,
        follow: false,
        nocache: false,
        googleBot: {
          index: false,
          follow: false,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };
  }
}

export default async function Post({ params }: Props) {
  const { slug } = await params;
  const post = await fetch(`https://mystore.alaqmar.dev/api/dominion/products/${slug}`, {
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  }).then((res) => res.json());

  const category = post.category.id;

  const posts = await fetch(`https://mystore.alaqmar.dev/api/dominion/products?categoryId=${category}`, {
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  }).then((res) => res.json());

  const content = await markdownToHtml(post.description || "");

  return (
    <>
      <Breadcrumb pageName="Product Details" />

      <section className="pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            <div className="w-full px-4">
              <div
                className="wow fadeInUp relative z-20 mb-[60px] h-[300px] overflow-hidden rounded md:h-[400px] lg:h-[500px]"
                data-wow-delay=".1s"
              >
                <Image
                  src={post.images[0].url}
                  alt="image"
                  width={1288}
                  height={500}
                  className="h-full w-full object-cover object-center"
                />
                <div className="absolute left-0 top-0 z-10 flex h-full w-full items-end bg-gradient-to-t from-dark-700 to-transparent">
                  <div className="flex flex-wrap items-center p-4 pb-4 sm:p-8">
                    <div className="mb-4 flex items-center">

                      <p className="mr-5 flex items-center text-sm font-medium text-white md:mr-6">
                        <span className="mr-3">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="fill-current"
                          >
                            <path d="M11.1002 4.875H4.6502C4.3502 4.875 4.0752 5.125 4.0752 5.45C4.0752 5.775 4.3252 6.025 4.6502 6.025H11.1252C11.4252 6.025 11.7002 5.775 11.7002 5.45C11.7002 5.125 11.4252 4.875 11.1002 4.875Z" />
                            <path d="M9.8002 7.92505H4.6502C4.3502 7.92505 4.0752 8.17505 4.0752 8.50005C4.0752 8.82505 4.3252 9.07505 4.6502 9.07505H9.8002C10.1002 9.07505 10.3752 8.82505 10.3752 8.50005C10.3752 8.17505 10.1002 7.92505 9.8002 7.92505Z" />
                            <path d="M13.9998 1.9751H1.9998C1.1498 1.9751 0.424805 2.6751 0.424805 3.5501V12.9751C0.424805 13.3751 0.649805 13.7501 1.0248 13.9251C1.1748 14.0001 1.3248 14.0251 1.4748 14.0251C1.7248 14.0251 1.9498 13.9501 2.1498 13.7751L4.2748 12.0251H13.9998C14.8498 12.0251 15.5748 11.3251 15.5748 10.4501V3.5501C15.5748 2.6751 14.8498 1.9751 13.9998 1.9751ZM14.4498 10.4501C14.4498 10.7001 14.2498 10.9001 13.9998 10.9001H4.0748C3.9498 10.9001 3.8248 10.9501 3.7248 11.0251L1.5748 12.8001V3.5501C1.5748 3.3001 1.7748 3.1001 2.0248 3.1001H14.0248C14.2748 3.1001 14.4748 3.3001 14.4748 3.5501V10.4501H14.4498Z" />
                          </svg>
                        </span>
                        {post.category.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="-mx-4 flex flex-wrap">

                <div className="w-full px-4 lg:w-4/12">
                  <div>
                    <Newsletter product={post} />


                    <div
                      className="wow fadeInUp mb-12 overflow-hidden rounded"
                      data-wow-delay=".1s"
                    >
                      <Image
                        src={post.images[0].url}
                        alt="image"
                        className="w-full"
                        width={408}
                        height={254}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full px-4 lg:w-8/12">
                  <div className="blog-details xl:pr-10">
                    <div dangerouslySetInnerHTML={{ __html: post.description }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="-mx-4 flex flex-wrap">
            <div className="-mx-4 mb-8 flex flex-wrap">
              <div className="w-full px-4">
                <h2
                  className="wow fadeInUp relative pb-5 text-2xl font-semibold text-dark dark:text-white sm:text-[28px]"
                  data-wow-delay=".1s"
                >
                  Popular Products
                </h2>
                <span className="mb-10 inline-block h-[2px] w-20 bg-primary"></span>
              </div>
              {posts.slice(0, 3).map((blog: any, i: any) => (
                <PopularArticle
                  key={i}
                  image={blog.images[0].url}
                  title={blog?.name.slice(0, 30)}
                  name={''}
                />
              ))}
            </div>
            <div
              className="wow fadeInUp mt-14 w-full px-4"
              data-wow-delay=".2s"
            >
              <h2 className="relative pb-5 text-2xl font-semibold text-dark dark:text-white sm:text-[28px]">
                Related Articles
              </h2>
              <span className="mb-10 inline-block h-[2px] w-20 bg-primary"></span>
            </div>

            {posts.slice(0, 3).map((blog: any, key: any) => (
              <div key={key} className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3">
                <SingleBlog blog={blog} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
