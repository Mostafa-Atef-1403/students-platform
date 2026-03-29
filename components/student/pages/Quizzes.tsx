import PageLayout from "../PageLayout";

const Quizzes = () => {
  return (
    <PageLayout page="quizzes">
      <div>
        {/* summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {/* card */}
          <div className="border shadow-md">
            <div className="p-4 text-center">
              <div
                className="w-13 h-13 rounded-lg bg-green-100
            flex items-center justify-center mx-auto mb-2"
              >
                <i className="bi bi-play text-[30px] text-green-500"></i>
              </div>

              <p className="text-2xl font-bold">1</p>
              <p className="text-sm text-gray-800">Available</p>
            </div>
          </div>

          {/* card */}
          <div className="border shadow-md">
            <div className="p-4 text-center">
              <div
                className="w-13 h-13 rounded-lg bg-gray-200
            flex items-center justify-center mx-auto mb-2"
              >
                <i className="bi bi-calendar text-[30px] text-gray-500"></i>
              </div>

              <p className="text-2xl font-bold">4</p>
              <p className="text-sm text-gray-800">Upcoming</p>
            </div>
          </div>

          {/* card */}
          <div className="border shadow-md">
            <div className="p-4 text-center">
              <div
                className="w-13 h-13 rounded-lg bg-gray-200
            flex items-center justify-center mx-auto mb-2"
              >
                <i className="bi bi-check-circle text-[30px] text-gray-500"></i>
              </div>

              <p className="text-2xl font-bold">1</p>
              <p className="text-sm text-gray-800">Completed</p>
            </div>
          </div>

          {/* card */}
          <div className="border shadow-md">
            <div className="p-4 text-center">
              <div
                className="w-13 h-13 rounded-lg bg-red-100
            flex items-center justify-center mx-auto mb-2"
              >
                <i className="bi bi-x-circle text-[30px] text-alert"></i>
              </div>

              <p className="text-2xl font-bold">1</p>
              <p className="text-sm text-gray-800">Missed</p>
            </div>
          </div>
        </div>

        <div className="">
          {/* quizzes taps */}
          <nav
            className="items-center justify-center rounded-md
          bg-gray-400 p-1 text-gray-800 grid gap-2.5 w-full grid-cols-4 mb-6"
          >
            <div className="cursor-pointer font-medium bg-gray-50 p-1.5">
              Available (1)
            </div>
            <div className="cursor-pointer font-medium p-1.5">Upcoming (4)</div>
            <div className="cursor-pointer font-medium p-1.5">
              Completed (1)
            </div>
            <div className="cursor-pointer font-medium p-1.5">Missed (1)</div>
          </nav>

          {/* quizzes cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* card */}
            <div className="rounded-lg border text-gray-800 shadow-md">
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h5 className="font-semibold truncate">
                      Network Protocols Quiz
                    </h5>
                    <p className="text-sm text-gray-600">Computer Networks</p>
                  </div>
                  <div
                    className="inline-flex items-center rounded-full border-1
                  px-2.5 py-0.5 text-xs font-semibold transition-colors
                  bg-green-100 text-success border-green-500
                  focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
                  "
                  >
                    <i className="bi bi-play text-[20px]"></i>
                    Available
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <i className="bi bi-stopwatch text-[17px]"></i>
                    <span>40 minutes</span>
                    <span className="mx-2">•</span>
                    <i className="bi bi-question-circle text-[17px]"></i>
                    <span>20 questions</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <i className="bi bi-calendar-event text-[20px]"></i>
                    <span>Jan 31, 8:00 AM - Feb 1, 11:59 PM</span>
                  </div>
                </div>
                <button
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap 
                rounded-* text-sm font-medium h-10 px-4 py-2 w-full mt-4
                bg-gray-400 text-gray-900 hover:bg-gray-500 hover:text-gray-800 transition-all
                "
                >
                  <i className="bi bi-play text-[20px]"></i>
                  Start Quiz
                </button>
              </div>
            </div>

            {/* card */}
            <div className="rounded-lg border text-gray-800 shadow-md">
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h5 className="font-semibold truncate">
                      Network Protocols Quiz
                    </h5>
                    <p className="text-sm text-gray-600">Computer Networks</p>
                  </div>
                  <div
                    className="inline-flex items-center rounded-full border-1
                  px-2.5 py-0.5 text-xs font-semibold transition-colors
                  bg-green-100 text-success border-green-500
                  focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
                  "
                  >
                    <i className="bi bi-play text-[20px]"></i>
                    Available
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <i className="bi bi-stopwatch text-[17px]"></i>
                    <span>40 minutes</span>
                    <span className="mx-2">•</span>
                    <i className="bi bi-question-circle text-[17px]"></i>
                    <span>20 questions</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <i className="bi bi-calendar-event text-[20px]"></i>
                    <span>Jan 31, 8:00 AM - Feb 1, 11:59 PM</span>
                  </div>
                </div>
                <button
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap 
                rounded-* text-sm font-medium h-10 px-4 py-2 w-full mt-4
                bg-gray-400 text-gray-900 hover:bg-gray-500 hover:text-gray-800 transition-all
                "
                >
                  <i className="bi bi-play text-[20px]"></i>
                  Start Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Quizzes;
