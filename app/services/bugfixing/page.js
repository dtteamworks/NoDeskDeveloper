"use client";
import { useState } from "react";
import { AlertTriangle, Zap, Shield, LifeBuoy, Wrench, FileText, Database, Globe, Beaker, CheckCircle, TestTube, Gauge, Clock, Phone, MessageCircle, HelpCircle, ArrowRight, Bug, } from "lucide-react";
import ReportIssueModal from "@/components/Modals/ReportIssueModal";

export default function ErrorsFixing() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const issueTypes = [
    { icon: AlertTriangle, label: "Urgent", color: "text-red-400" },
    { icon: Zap, label: "Performance", color: "text-yellow-400" },
    { icon: Shield, label: "Security", color: "text-blue-400" },
    { icon: LifeBuoy, label: "Rescue", color: "text-teal-400" },
    { icon: Wrench, label: "Hotfix", color: "text-blue-400" },
  ];

  const diagnose = [
    { icon: FileText, label: "Logs" },
    { icon: Beaker, label: "Trace" },
    { icon: Database, label: "DB State" },
    { icon: Globe, label: "Env" },
  ];

  const fixVerify = [
    { icon: CheckCircle, label: "Patch" },
    { icon: TestTube, label: "Test" },
    { icon: Gauge, label: "Bench" },
    { icon: Clock, label: "Quick" },
  ];

  const comms = [
    { icon: Phone, label: "Call" },
    { icon: MessageCircle, label: "Chat" },
    { icon: HelpCircle, label: "Helpdesk" },
  ];

  return (
    <>
      <div className="min-h-[110vh] bg-linear-to-b from-black via-gray-950 to-black py-12 px-4 lg:px-8 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="bg-linear-to-b from-white/10 to-white/5 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-8 lg:p-12 shadow-2xl">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-10">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Bug className="w-9 h-9 text-blue-400" strokeWidth={2.5} />
                  <h1 className="text-3xl lg:text-4xl font-black bg-linear-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                    Errors Fixing
                  </h1>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="group relative px-8 py-4 bg-linear-to-tl from-blue-600 via-sky-600 to-teal-700 rounded-2xl font-bold text-white overflow-hidden shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
              >
                <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="relative flex items-center gap-2">
                  Report Issue
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>

            {/* Issue Types */}
            <div className="flex flex-wrap gap-4 mb-10">
              {issueTypes.map((item, i) => {
                const Icon = item.icon;
                return (
                  <button
                    key={i}
                    className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-blue-500/30 rounded-full text-gray-300 font-medium hover:bg-white/20 hover:border-blue-400 transition-all flex items-center gap-2"
                  >
                    <Icon className={`w-5 h-5 ${item.color}`} />
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Diagnose & Fix Grid */}
            <div className="grid lg:grid-cols-2 gap-8 mb-10">
              {/* Diagnose */}
              <div className="bg-white/5 backdrop-blur-sm border border-red-500/30 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-linear-to-r from-blue-500 via-sky-500 to-teal-500 rounded-lg">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Diagnose</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {diagnose.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div key={i} className="px-5 py-2 bg-white/10 rounded-full text-gray-400 text-sm flex items-center gap-2 border border-blue-500/20">
                        <Icon className="w-4 h-4" />
                        {item.label}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Fix & Verify */}
              <div className="bg-white/5 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-linear-to-r from-blue-500 to-teal-500 rounded-lg">
                    <Wrench className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Fix & Verify</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {fixVerify.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div key={i} className="px-5 py-2 bg-white/10 rounded-full text-gray-400 text-sm flex items-center gap-2 border border-blue-500/20">
                        <Icon className="w-4 h-4" />
                        {item.label}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Communication */}
            <div className="flex flex-wrap gap-4">
              {comms.map((item, i) => {
                const Icon = item.icon;
                return (
                  <button
                    key={i}
                    className="px-6 py-3 bg-linear-to-r from-blue-700/50 to-teal-700/50 backdrop-blur-sm border border-blue-500/30 rounded-full text-white font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center gap-2"
                  >
                    <Icon className="w-5 h-5 text-blue-300" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && <ReportIssueModal onClose={() => setIsModalOpen(false)} />}
      </div>
    </>
  );
}