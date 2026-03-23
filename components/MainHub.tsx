"use client";

import Image from "next/image";
import { sidebar_links } from "@/constants/consts";
import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import Subjects from "./pages/Subjects";
import Attendance from "./pages/Attendance";
import Quizzes from "./pages/Quizzes";
import Profile from "./pages/Profile";

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
    <main className="w-full flex relative h-1250">
      {/* sidebar */}
      {/* ==> affect on folding */}
      <section
        className={`fixed top-0 left-0 bg-green-50  p-2.5 shadow flex flex-col
        h-[100vh] ${folded ? "w-[300px] sm:w-[330px]" : "w-[70px]"} 
        transition-all duration-300 ease-in-out
        `}
      >
        {/* icon andd header and links */}
        <div className="flex-1">
          <div className="flex flex-col">
            {/* fold icon */}
            <button
              className={`mb-3 w-10 h-10 flexCenter rounded ${folded ? "self-end" : "selfcenter"}`}
              onClick={() => setFolded((prev) => !prev)}
            >
              <i
                className={`
                bi bi-layout-sidebar${!folded ? "" : "-inset"} text-3xl text-gray-900
              `}
              ></i>
            </button>

            {/* sidebar header */}
            <div className="flex justify-between items-center relative border-b border-green-400 mb-2.5">
              {/* header text */}
              {/* ==> hide on folding */}
              <h3 className={`text-gray-900 ${folded ? "block" : "hidden"}`}>
                Students Hub
              </h3>

              {/* header icon */}
              <div className="">
                <Image
                  src={"graduation-cap.svg"}
                  alt="cap"
                  width={40}
                  height={40}
                />
              </div>
            </div>
          </div>

          {/* sidebar links */}
          <div className="mt-1.5">
            {/* ==> hide on folding */}
            <p
              className={`text-xs text-gray-600 font-bold mb-3 ${folded ? "block" : "hidden"}`}
            >
              Navigate
            </p>

            <ul className="p-0 space-y-1">
              {sidebar_links.map((link) => (
                <li key={link.id} className="relative group">
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
                  >
                    <i className={`${link.icon} text-lg`}></i>
                    {/* ==> hide on folding */}
                    <span className={`${folded ? "block" : "hidden"}`}>
                      {link.link}
                    </span>
                  </button>

                  {!folded && (
                    <p
                      className="hidden group-hover:block absolute left-full ml-3 top-1/2 -translate-y-1/2
                        bg-green-600 text-white px-2 py-1 rounded text-sm whitespace-nowrap z-50
                        before:content-[''] before:absolute before:right-full before:top-1/2 before:-translate-y-1/2
                        before:border-8 before:border-transparent before:border-r-green-600"
                    >
                      {link.link}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* student name */}
        <div className="flex justify-between gap-2.5 bg-green-100 p-1.5 border-t border-green-400">
          {/* container for the shortcut and the name&email */}

          {/* shortcut */}
          <div
            className="sm:font-bold font-medium h-9 w-9 sm:h-10 sm:w-10
          sm:text-xl text-[15px] p-1
          bg-green-400 flexCenter rounded-md"
          >
            MA
          </div>

          {/* ==> hide on folding */}
          <div
            className={`flex-1 flex items-center justify-between gap-1.5
            ${folded ? "block" : "hidden"}`}
          >
            {/* name & email */}
            <div className="leading-1">
              <h5 className="text-[15px] sm:text-md">Mostafa Atef</h5>
              <p className="text-gray-600 text-[15px] sm:text-md">
                mostafa.atef@example.com
              </p>
            </div>

            <button className="text-gray-900 hover:text-alert">
              <i className="bi bi-box-arrow-left text-2xl"></i>
            </button>
          </div>
        </div>
      </section>

      {/* view component */}
      <section
        className={`flex-1 p-5 bg-white transition-all duration-300 overflow-hidden
        ${folded ? "ml-[300px] sm:ml-[330px]" : "ml-[70px]"}`}
      >
        {component === "dashboard" && <Dashboard />}
        {component === "subjects" && <Subjects />}
        {component === "attendance" && <Attendance />}
        {component === "quizzes" && <Quizzes />}
        {component === "profile" && <Profile />}
      </section>
    </main>
  );
}

export default MainHub;

/*
  ===> sidebar structure.

<section className="flex flex-col">  

  <div> this div will have a flex-1

    <div>  => flex col
      <div>Toggle</div> => since its the first row, align it to the right always.
      Header => the second row.
    </div>     
    
    <div>Links</div>  

  </div>

  <div>Student</div> stick it and align to the bottom
  
</section>
*/
