"use client";

import Image from "next/image";
import { sidebar_links } from "@/constants/consts";
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Subjects from "./pages/Subjects";
import Attendance from "./pages/Attendance";
import Quizzes from "./pages/Quizzes";
import Profile from "./pages/Profile";

function MainHub() {
  // components render
  const [component, setComponent] = useState("dashboard");

  // sidebar expanded overlay state
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="w-full flex relative">
      {/* Backdrop overlay - clickable on all screens */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* MOBILE NAVBAR (sm screens and below) */}
      <nav className="sm:hidden fixed top-0 left-0 right-0 bg-green-50 shadow p-2.5 flex items-center justify-between z-40 h-[70px]">
        {/* Header: Logo and Title */}
        <div className="flex items-center gap-2 flex-1">
          <div className="h-10 w-10 flexCenter">
            <Image
              src={"graduation-cap.svg"}
              alt="cap"
              width={40}
              height={40}
            />
          </div>
          <h3 className="text-gray-900 font-bold">Students Hub</h3>
        </div>

        {/* Hamburger Menu Button */}
        <button
          className="w-10 h-10 flexCenter rounded"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <i className="bi bi-list text-3xl text-gray-900"></i>
        </button>
      </nav>

      {/* MOBILE MENU (drops below navbar) */}
      {isOpen && (
        <section className="sm:hidden fixed top-[70px] left-0 right-0 bg-green-50 p-2.5 shadow z-40 flex flex-col max-h-[calc(100vh-70px)] overflow-y-auto">
          {/* Navigation Links */}
          <div className="mt-1.5">
            <p className="text-xs text-gray-600 font-bold mb-3">Navigate</p>
            <ul className="p-0 space-y-1">
              {sidebar_links.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      setComponent(link.link.toLowerCase());
                      setIsOpen(false);
                    }}
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
                    <span>{link.link}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Student Info Section */}
          <div className="mt-auto pt-3 border-t border-green-400">
            <div className="flex justify-between gap-2.5 bg-green-100 p-1.5 rounded">
              <div className="sm:font-bold font-medium h-9 w-9 sm:h-10 sm:w-10 sm:text-xl text-[15px] p-1 bg-green-400 flexCenter rounded-md">
                MA
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <p className="mb-0 text-[15px] font-bold">Mostafa Atef</p>
                <p className="text-gray-600 text-[15px] max-w-[120px] text-ellipsis text-xs">
                  mostafa.atef@example.com
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* DESKTOP SIDEBAR (sm screens and above) */}
      <section
        className={`hidden sm:flex fixed top-0 left-0 bg-green-50 p-2.5 shadow flex-col
        min-h-screen transition-all duration-300 ease-in-out
        ${isOpen ? "w-[270px] md:w-[330px] z-40" : "w-[70px] z-10"}`}
      >
        {/* icon and header and links */}
        <div className="flex-1">
          <div className="flex flex-col">
            {/* fold icon */}
            <button
              className={`mb-3 w-10 h-10 flexCenter rounded ${isOpen ? "self-end" : "self-center"}`}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <i
                className={`bi bi-layout-sidebar${isOpen ? "-inset" : ""} text-3xl text-gray-900`}
              ></i>
            </button>

            {/* sidebar header */}
            <div className="flex justify-between items-center relative border-b border-green-400 mb-2.5">
              {/* header text */}
              <h3 className={`text-gray-900 ${isOpen ? "block" : "hidden"}`}>
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
            <p
              className={`text-xs text-gray-600 font-bold mb-3 ${isOpen ? "block" : "hidden"}`}
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
                    {/* ==> hide when folded */}
                    <span className={`${isOpen ? "block" : "hidden"}`}>
                      {link.link}
                    </span>
                  </button>

                  {!isOpen && (
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
        <div
          className="flex justify-between gap-2.5
        bg-green-100 p-1.5 border-t border-green-400"
        >
          {/* container for the shortcut and the name&email */}

          {/* shortcut */}
          <div
            className="sm:font-bold font-medium h-9 w-9 sm:h-10 sm:w-10
          sm:text-xl text-[15px] p-1
          bg-green-400 flexCenter rounded-md"
          >
            MA
          </div>

          {/* ==> hide when folded */}
          <div
            className={`flex-1 flex items-center justify-between gap-1.5
            ${isOpen ? "block" : "hidden"}`}
          >
            {/* name & email */}
            <div className="sm:leading-1">
              <p className="mb-0 text-[15px] sm:text-lg font-bold sm:text-md">
                Mostafa Atef
              </p>
              <p className="text-gray-600 text-[15px] sm:text-md max-w-[120px] text-ellipsis">
                mostafa.atef@example.com
              </p>
            </div>

            <button className="hidden sm:block text-gray-900 hover:text-alert">
              <i className="bi bi-box-arrow-left text-2xl"></i>
            </button>
          </div>
        </div>
      </section>

      {/* view component */}
      <section
        className={`flex-1 p-5 bg-white transition-all duration-300 overflow-hidden
        mt-[70px] sm:mt-0 sm:ml-[70px]`}
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
