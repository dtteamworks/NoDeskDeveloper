import {guidedSteps,quickFeatures,workflowSteps,} from "@/components/QuicLinksData";
import { Sparkles } from "lucide-react";

export default function HowItWorksComponent() {
  return (
    <div className="min-h-screen bg-linear-to-b from-black via-gray-950 to-black py-20 px-5 lg:px-8">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative max-w-[1350px] mx-auto">
        {/* Main Header */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4">
            <span className="text-white">How It </span>
            <span className="bg-linear-to-r from-blue-600 via-sky-600 to-teal-600 bg-clip-text text-transparent">
              Works
            </span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-lg max-w-2xl">
            A simple, transparent workflow—from discovery to delivery to
            post-launch support.
          </p>
        </div>

        {/* Workflow Tags */}
        <div className="flex flex-wrap gap-3 mb-16">
          {workflowSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="group relative">
                {/* Hover Glow */}
                <div
                  className={`absolute -inset-1 bg-linear-to-r ${step.color} rounded-xl opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-300`}
                />

                {/* Tag */}
                <div className="relative flex items-center gap-2 px-4 py-2.5 bg-white/5 backdrop-blur-xl border border-blue-500/20 rounded-xl hover:border-blue-500/40 transition-all duration-300">
                  <div
                    className={`p-1 bg-linear-to-r ${step.color} rounded-lg`}
                  >
                    <Icon
                      className="size-3 sm:size-4 text-white"
                      strokeWidth={2.5}
                    />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-300">
                    {step.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Card - Guided Workflow */}
          <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-linear-to-r from-blue-600 via-sky-600 to-teal-600 rounded-3xl opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-500" />

            {/* Card */}
            <div className="relative h-full bg-linear-to-b from-white/10 to-white/5 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-linear-to-r from-blue-500 via-sky-600 to-teal-500 rounded-xl">
                  <Sparkles className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <h3 className="text-xl font-bold text-white">
                  Guided Workflow
                </h3>
              </div>

              <h2 className="text-3xl font-black text-white mb-4">
                From Browse → Book → Build → Support
              </h2>

              <p className="text-gray-400 mb-8">
                Clear steps, milestone billing, and post-launch care. Everything
                you need in one place.
              </p>

              {/* Steps */}
              <div className="flex flex-wrap gap-3">
                {guidedSteps.map((step, idx) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-blue-500/30 rounded-xl hover:bg-white/10 transition-colors duration-300"
                    >
                      <Icon
                        className="w-5 h-5 text-blue-400"
                        strokeWidth={2.5}
                      />
                      <span className="text-sm font-medium text-gray-300">
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Side - Feature Cards Grid */}
          <div className="grid grid-cols-2 gap-4">
            {quickFeatures.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="relative group">
                  {/* Glow Effect */}
                  <div
                    className={`absolute -inset-1 bg-linear-to-r ${feature.color} rounded-2xl opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-300`}
                  />

                  {/* Card */}
                  <div className="relative h-full bg-linear-to-b from-white/10 to-white/5 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300">
                    <div
                      className={`inline-flex p-3 bg-linear-to-r ${feature.color} rounded-xl mb-4 shadow-lg`}
                    >
                      <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                    </div>
                    <h4 className="text-base font-bold text-white leading-tight">
                      {feature.title}
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
