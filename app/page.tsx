"use client";

import { useScroll, useTransform } from "framer-motion";


export default function Home() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const y = useTransform(scrollY, [0, 400], [0, -100]);

  const handleScrollDown = () => {
    const aboutSection = document.getElementById("about-section");
    if (aboutSection) aboutSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full min-h-screen flex flex-col overflow-x-hidden relative">
      

      
        
      

      
      
    </div>
  );
}
