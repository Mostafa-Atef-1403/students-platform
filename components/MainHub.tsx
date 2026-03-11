"use client";

import Image from "next/image";
import { sidebar_links } from "@/constants/consts";
import { useEffect, useState } from "react";

function MainHub() {
  // components render
  const [component, setComponent] = useState("dashboard");

  // sidebar folding
  const [folded, setFolded] = useState(false);

  useEffect(() => {
    const handleFolding = () => {
      setFolded(window.innerWidth > 500);
    };
    handleFolding();
  }, []);

  console.log(folded);

  return (
    <main className=" min-w-full flex">
      {/* sidebar */}
      <section
        className="bg-green-50 min-h-[100vh] w-[250px] sm:w-[300px] p-2.5 group
      
      "
      >
        {/* folding toggle icon */}
        <div className="w-10 h-10 flexCenter rounded ml-auto">
          <button className="w-full h-full">
            <i
              className={`
                bi bi-layout-sidebar-inset text-3xl text-gray-900
              `}
            ></i>
          </button>
        </div>

        {/* sidebar header */}
        <div className="flex justify-between items-center my-5 relative">
          {/* header text */}
          <h3 className="text-gray-900">Students Hub</h3>
          {/* header icon */}
          <div className="">
            <Image
              src={"graduation-cap.svg"}
              alt="cap"
              width={40}
              height={40}
            />
          </div>

          {/* bottom border hover */}
          <div className="absolute h-[1px] w-0 bg-gray-700 -bottom-1 left-1/2 -translate-x-1/2 group-hover:w-[90%] transition-all"></div>
        </div>

        {/* sidebar links */}
        <div>
          <p className="text-xs text-gray-600 font-bold mb-3">Navigate</p>
          <ul className="p-0 space-y-1">
            {sidebar_links.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => setComponent(link.link.toLowerCase())}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2
                    rounded-lg text-left transition-colors 
                    
                    ${
                      component === link.link.toLowerCase()
                        ? "bg-green-200 text-green-800"
                        : "text-gray-700 hover:bg-gray-100"
                    }
                  `}
                  // added acive option for the viewed L(57 - 61)
                >
                  <i className={`${link.icon} text-lg`}></i>
                  <span>{link.link}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* view component */}
      <section className="flex-1 p-5 bg-white">
        <h1 className="text-2xl font-bold capitalize">{component}</h1>
        {/* Placeholder for component content */}
        <div className="mt-5">Content for {component} will go here.</div>
      </section>
    </main>
  );
}

export default MainHub;
