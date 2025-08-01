import About from "@/components/About";
import HomeBlogSection from "@/components/Blog/HomeBlogSection";
import CallToAction from "@/components/CallToAction";
import Clients from "@/components/Clients";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Faq from "@/components/Faq";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import { getAllPosts } from "@/utils/markdown";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DOMINION TOOLS TRADERS",
  description: "Free Next.js SaaS Boilerplate and Starter Kit designed and built for SaaS startups. It comes with all necessary integrations, pages, and components you need to launch a feature-rich SaaS websites.",
};

export default async function Home() {
  const posts = await fetch(`https://mystore.alaqmar.dev/api/dominion/products`,
    {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    }
  )
    .then((res) => res.json());

  return (
    <main>
      <ScrollUp />
      <Hero />
      {/* <Features /> */}
      <About />
      <CallToAction />
      {/* <Pricing /> */}
      {/* <Testimonials /> */}
      {/* <Faq /> */}
      {/* <Team /> */}
      <HomeBlogSection posts={posts} />
      <Contact />
      <Clients />
    </main>
  );
}
