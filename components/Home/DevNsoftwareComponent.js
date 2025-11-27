"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { softwareProducts } from "../Data";
import { developers } from "../Developer/DevListData";

export default function DevelopersSoftwareSection() {
  return (
    <div className=" bg-linear-to-b from-black via-gray-950 to-black py-20 px-5 lg:px-8">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <div className="relative max-w-[1400px] mx-auto  grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Top Developers Section */}
        <div className="relative group">
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-linear-to-r from-blue-500 to-cyan-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500" />

          {/* Card */}
          <div className="relative bg-linear-to-b from-white/5 to-white/2 backdrop-blur-xl border border-blue-500/20 rounded-3xl p-8 pb-13">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-white">
                Top Developers
              </h2>
              <Link href="/developers" className="group/link flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold transition-colors" >
                View all
                <ArrowRight className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Developer Cards Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {developers.slice(0, 4).map((profile, idx) => (
                <div key={idx} className="group/card space-y-4 relative bg-white/2 hover:bg-white/5 border border-white/10 hover:border-blue-500/30 rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02]" >
                  <div className="flex justify-between  ">
                    <h3 className="text-white font-bold text-lg">{profile.name}</h3>
                    <span className="text-[10px] font-semibold text-blue-400 bg-blue-900/50 flex justify-center items-center h-fit px-2 py-1 rounded-full">
                      {profile.experience} years+
                    </span>
                  </div>
                  <div className="flex justify-between  ">
                    {/* Skills */}
                    <span className="space-x-1 mt-2 flex-wrap flex-3">
                      {profile.skills.slice(0, 2).map((skill) => (
                        <span key={skill} className="text-gray-300  gap-1 text-[10px] bg-slate-700/50 px-2 py-1 rounded-full" >
                          {skill}
                        </span>
                      ))}
                    </span>

                    {/* Rate */}
                    <p className="text-2xl font-black bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      ₹{profile.hourlyRate}
                    </p>
                  </div>
                  {/* Book Button */}
                  {/* <Link
                    href="/developers"
                    className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold text-sm transition-colors"
                  >
                    Book Developer
                    <ArrowRight className="w-4 h-4 group-hover/card:translate-x-1 transition-transform" />
                  </Link> */}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ready-Made Software Section */}
        <div className="relative group">
          {/* Glow Effect */}
          <div className="absolute  -inset-1 bg-linear-to-r from-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500" />

          {/* Card */}
          <div className="relative bg-linear-to-b from-white/5 to-white/2 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-8 pb-0">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="hidden md:block text-3xl font-black text-white">
                Ready-Made Software
              </h2>
              <h2 className="md:hidden text-2xl font-black text-white">
                Top Softwares
              </h2>
              <Link
                href="/softwares-readymade"
                className="group/link flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold transition-colors"
              >
                Browse all
                <ArrowRight className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Software Cards Grid */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {softwareProducts.slice(0, 4).map((software, idx) => {
                const Icon = software.icon;
                const techStack = [
                  "Laravel + Vue",
                  "Flutter + Firebase",
                  "React + Node",
                  "MERN Stack",
                ];

                return (
                  <div
                    key={idx}
                    className="group/card relative bg-white/2 hover:bg-white/5 border border-white/10 hover:border-purple-500/30 rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02]"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3 flex-1">
                        <div
                          className={`p-2.5 bg-linear-to-br ${software.color} rounded-xl shrink-0`}
                        >
                          <Icon
                            className="w-5 h-5 text-white"
                            strokeWidth={2.5}
                          />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-white font-bold text-base mb-0.5 truncate">
                            {software.name}
                          </h3>
                          <p className="text-gray-400 text-xs">
                            {techStack[idx]}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <p className="text-2xl font-black bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1">
                      {software.price}
                    </p>

                    {/* Actions */}
                    {/* <div className="flex items-center gap-4">
                      <Link
                        href="/softwares-readymade"
                        className="text-gray-400 hover:text-gray-300 font-medium text-sm transition-colors"
                      >
                        Request Demo
                      </Link>
                      <span className="text-gray-600">•</span>
                      <Link
                        href="/softwares-readymade"
                        className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 font-semibold text-sm transition-colors"
                      >
                        Buy Now
                        <ArrowRight className="w-4 h-4 group-hover/card:translate-x-1 transition-transform" />
                      </Link>
                    </div> */}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
