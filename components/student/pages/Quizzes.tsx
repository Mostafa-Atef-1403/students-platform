"use client";

import { useState } from "react";
import PageLayout from "../PageLayout";
import { quizzesPage } from "@/constants/consts";
import { quizzesTapsProps } from "@/types/types";

// quizzes Summary cards
const SummaryCards = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      {quizzesPage.map((type) => (
        <div className="border shadow-md" key={type.id}>
          <div className="p-4 text-center">
            <div
              className={`w-13 h-13 rounded-lg ${type.bg}
            flex items-center justify-center mx-auto mb-2`}
            >
              <i className={`${type.icon} text-[30px]`}></i>
            </div>

            <p className="text-2xl font-bold">{type.quizzes.length}</p>
            <p className="text-sm text-gray-800">{type.type}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// quizzes taps
const QuizzesTaps = ({ activeTap, setActiveTap }: quizzesTapsProps) => {
  return (
    <nav
      className="items-center justify-center rounded-md
          bg-gray-400 p-1 text-gray-800 grid gap-1.5 w-full grid-cols-4 mb-6"
    >
      {quizzesPage.map((type) => (
        <button
          className={`text-center font-medium p-1.5
            ${activeTap === type.type ? "bg-gray-50" : ""}
            transition-all duration-300`}
          key={type.id}
          onClick={() => {
            setActiveTap(type.type);
          }}
        >
          {type.type} ({type.quizzes.length})
        </button>
      ))}
    </nav>
  );
};

const Quizzes = () => {
  // taps switch
  const [activeTap, setActiveTap] = useState("Available");

  // render
  const activeCards = quizzesPage.find((type) => type.type === activeTap);
  // then use activeCards?.quizzes to render cards

  return (
    <PageLayout page="quizzes">
      <div>
        {/* summary cards */}
        <SummaryCards />

        <div className="">
          {/* quizzes taps */}
          <QuizzesTaps activeTap={activeTap} setActiveTap={setActiveTap} />

          {/* quizzes cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeCards?.quizzes.map((quiz) => (
              <div
                className="rounded-lg border text-gray-800 shadow-md"
                key={quiz.id}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h5 className="font-semibold truncate">{quiz.title}</h5>
                      <p className="text-sm text-gray-600">{quiz.subject}</p>
                    </div>
                    <div
                      className={`inline-flex items-center gap-1.5 rounded-full border-1
                  px-2.5 py-0.5 text-xs font-semibold transition-colors
                  ${
                    activeTap === "Available"
                      ? "bg-green-100 text-green-500 border-green-500"
                      : activeTap === "Missed"
                        ? "bg-red-100 text-alert border-alert"
                        : "bg-gray-100 text-gray-500 border-gray-700"
                  }
                  `}
                    >
                      <i className={`${activeCards.icon} text-[20px]`}></i>
                      {quiz.state}
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <i className="bi bi-stopwatch text-[17px]"></i>
                      <span>{quiz.duration}</span>
                      <span className="mx-2">•</span>
                      <i className="bi bi-question-circle text-[17px]"></i>
                      <span>{quiz.questions}</span>
                    </div>

                    {activeTap === "Completed" ? (
                      <div className="bg-gray-300 p-2 flex items-center gap-2.5">
                        <span>
                          <i className="bi bi-trophy text-green-600 text-[20px]"></i>
                        </span>
                        <span>score: {quiz?.score}</span>
                      </div>
                    ) : (
                      ""
                    )}

                    <div className="flex items-center gap-2 text-gray-600">
                      <i className="bi bi-calendar-event text-[20px]"></i>
                      <span>
                        {activeTap === "Completed" ? (
                          <span className="font-bold">Attempted on: </span>
                        ) : (
                          ""
                        )}
                        {quiz.date}
                      </span>
                    </div>
                  </div>

                  {activeTap === "Available" ? (
                    <button
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap 
                rounded-* text-sm font-medium h-10 px-4 py-2 w-full mt-4
                bg-gray-400 text-gray-900 hover:bg-gray-500 hover:text-gray-800 transition-all
                "
                    >
                      <i className="bi bi-play text-[20px]"></i>
                      Start Quiz
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Quizzes;
