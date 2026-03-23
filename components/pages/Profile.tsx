import PageLayout from "../PageLayout";

import { personalInfo, academicInfo } from "@/constants/consts";

const Profile = () => {
  return (
    <PageLayout page="profile">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Personal Info */}
        <section className="p-2.5 border border-gray-600 shadow rounded md:col-span-2">
          {/* info header */}
          <header>
            <h1 className="text-xs">
              <span className="text-2xl">
                <i className="bi bi-person mr-1"></i>
              </span>
              <span className="text-2xl">Personal Information</span>
            </h1>

            <p>Your registered details from the database.</p>
          </header>

          {/* info content */}
          <div className="">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-24 h-24 bg-gray-500 rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold text-white">
                  {"Mostafa Atef"
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </span>
              </div>

              <div>
                <h4>Mostafa Atef</h4>
                <div className="bg-gray-500 mt-2 text-white flexCenter rounded-full cursor-pointer hover:bg-gray-700">
                  <i className="bi bi-mortarboard mr-1 text-xl"></i>Faculty Type
                </div>
              </div>
            </div>

            <hr />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {personalInfo.map((info) => (
                <div
                  key={info.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-200
                  relative"
                >
                  {/* info icon */}
                  <div
                    className="w-10 h-10 shrink-0 rounded-lg bg-gray-300 
                        flex items-center justify-center"
                  >
                    <i className={info.icon}></i>
                  </div>

                  {/* info labels */}
                  <div className="text-gray-900">
                    <p className="text-sm mb-0">{info.label}</p>
                    <p className="font-medium truncate max-w-35">
                      {info.value}
                    </p>
                  </div>

                  {/* edit button */}
                  <button
                    className="absolute top-1 right-4 hover:text-alert"
                    onClick={() => {}}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Academic Stats */}
        <section className="p-2.5 border border-gray-600 shadow rounded md:col-span-1">
          <header>
            <h1 className="text-xs">
              <span className="text-2xl">
                <i className="bi bi-trophy mr-1 text-green-500"></i>
              </span>
              <span className="text-2xl">Academic Stats</span>
            </h1>

            <p>Your academic performance.</p>
          </header>

          {/* academic content */}
          <div className="space-y-4">
            {academicInfo.map((stat) => (
              <div
                key={stat.id}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-200"
              >
                <div className="flex items-center gap-3">
                  <i className={stat.icon}></i>
                  <span className="text-sm text-gray-700">{stat.label}</span>
                </div>

                <span className="font-bold text-lg">{stat.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* security */}
        <section className="p-2.5 border border-gray-600 shadow rounded md:col-span-3">
          <header>
            <h1 className="text-xs">
              <span className="text-2xl">
                <i className="bi bi-lock mr-1 text-orange-500"></i>
              </span>
              <span className="text-2xl">Security</span>
            </h1>

            <p>Update your password to keep your account secure.</p>
          </header>

          {/* password changing ===> all this gonna be a one state, and when clicking change, it'll display a new structure. not now */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-400">
            <div className="flex items-center gap-3">
              <i className="bi bi-lock text-2xl text-gray-900"></i>
              <div>
                <p className="font-medium">Password</p>
                <p className="text-[15px] text-gray-800">Last changed: Never</p>
              </div>
            </div>

            <button
              className="text-white bg-gray-700 rounded-xl
              p-2.5 hover:bg-alert/70"
              onClick={() => {}}
            >
              Change Password
            </button>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Profile;
