"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  BadgeCheck,
  Coins,
  Earth,
  Eye,
  Hourglass,
  Languages,
  MapPin,
  Medal,
} from "lucide-react";

export default function DevCard({ developer }) {
  const {
    _id,
    name,
    photo,
    skills,
    experience,
    hourlyRate,
    availability,
    level,
    country,
    state,
    preferredLanguage,
  } = developer;

  console.log("Developer Data:", _id, developer);
  return (
    <>
      <div className="group relative bg-linear-to-b from-white/5 to-white/2 backdrop-blur-xl border border-white/20 rounded-3xl p-6 hover:border-blue-500/40 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10">
        {/* Glow on Hover */}
        <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-700" />

        <div className="relative z-10">
          {/* Profile Photo */}
          <div className="flex flex-col items-center -mt-12">
            <div className="size-40 rounded-2xl overflow-hidden border-4 border-black shadow-2xl ring-4 ring-blue-500/30">
              <Image
                src={photo || "/ProfilePic.jpg"}
                alt={name}
                width={1920}
                height={1080}
                className="object-cover object-top w-full h-full"
              />
            </div>
            <h3 style={{fontFamily: "monospace"}} className="mt-4 text-2xl font-bold border-b border-white/20 pb-2 text-white">{name}</h3>
            {/* <p className="text-sm text-blue-400 font-semibold">{level}</p> */}
          </div>

          {/* Info Grid */}
          <div className="mt-6 space-y-3 text-sm grid grid-cols-3">
            <div className="flex items-center gap-2 text-gray-300">
              <BadgeCheck className="size-4 text-orange-400" />
              <span>{experience} years+</span>
            </div>

            <div className="flex items-center gap-2 text-gray-300">
              <Coins className="size-4 text-green-400" />
              <span className="font-bold">₹{hourlyRate}/hr</span>
            </div>

            <div className="flex items-center gap-2 text-gray-300">
              <MapPin className="size-4 text-purple-400" />
              <span>{state}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-300">
              <Earth className="size-4 text-blue-400" />
              <span>{country}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-300">
              <Languages className="size-4 text-pink-400" />
              <span>{preferredLanguage[0] || "English"}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-300">
              <Hourglass className="size-4 text-emerald-400" />
              <span className="font-medium">{availability}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Activity className="size-4 text-cyan-400" />
              <span>{developer?.available == true ? "Available" : "Busy"}</span>
            </div>
            <div className="flex items-center gap-2 h-fit text-gray-300">
              <Medal className="size-4 text-violet-400" />
              <span className="">{level}</span>
            </div>
          </div>

          {/* Skills */}
          <div className="mt-2 flex flex-wrap gap-2">
            {skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 text-xs font-medium bg-white/5 border border-white/10 rounded-full text-gray-300"
              >
                {skill}
              </span>
            ))}
            {skills.length > 3 && (
              <span className="px-3 py-1 text-xs font-medium bg-white/5 border border-white/10 rounded-full text-gray-300">
                +{skills.length - 3}
              </span>
            )}
          </div>

          {/* View Details Button */}
          <Link
            href={`/admin/all-developers/${_id}`}
            className="mt-4 py-2 w-full rounded-full flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold  transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
          >
            <Eye className="w-4 h-4" />
            Upate Details
          </Link>
        </div>
      </div>
    </>
  );
}
