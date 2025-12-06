"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";
import Link from "next/link";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "How does NoDeskDeveloper work?",
      a: "Post your project → Get instant quotes from vetted developers → Choose the best fit → Pay securely via escrow → Get your work delivered. Simple, fast, transparent."
    },
    {
      q: "Are the developers verified?",
      a: "Yes! Every developer goes through manual screening, skill tests, portfolio review, and client feedback verification before joining our platform."
    },
    {
      q: "How are payments protected?",
      a: "100% escrow protection. You release payment only after approving each milestone. Your money stays safe until you're fully satisfied."
    },
    {
      q: "Can I hire developers for long-term projects?",
      a: "Absolutely. Many clients hire full-time remote developers (40 hrs/week) at fixed monthly rates starting from ₹80,000/month."
    },
    {
      q: "What if I'm not happy with the work?",
      a: "You don’t pay until you're happy. If issues arise, our team steps in to mediate and ensure fair resolution — or refund your escrow."
    },
    {
      q: "Do you offer ready-made software?",
      a: "Yes! Get production-ready apps like CRM, ERP, POS, Inventory System, E-commerce stores — fully customizable and deployed in 24–48 hours."
    },
    {
      q: "Can I get a refund on ready-made software?",
      a: "No refunds after download/access is granted, but every product comes with 7-day free support and bug fixes."
    },
    {
      q: "How fast can I get a developer?",
      a: "Most clients get matched and start working within 24–48 hours. Urgent projects can begin same-day."
    },
    {
      q: "Do you sign NDAs?",
      a: "Yes, we provide NDA signing for all custom projects at no extra cost."
    },
    {
      q: "Where are your developers based?",
      a: "Primarily India — giving you world-class talent at 60–70% lower cost than US/EU freelancers, with excellent English and 5–12 hrs time overlap."
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-black text-white">

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-16">
          {/* Hero */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-blue-500/10 border border-blue-500/30 rounded-full px-6 py-3 mb-8">
              <HelpCircle className="w-5 h-5 text-blue-400" />
              <span className="text-blue-300 font-semibold">Got Questions?</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
              Frequently Asked{" "}
              <span className="bg-linear-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Questions
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to know about hiring developers or buying ready-made software
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-6 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl hover:bg-white/8 transition-all duration-500"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition-all"
                >
                  <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-blue-300 transition-colors">
                    {faq.q}
                  </h3>
                  <ChevronDown
                    className={`w-6 h-6 text-blue-400 transition-transform duration-500 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-8 pb-8 pt-2">
                    <p className="text-gray-300 leading-relaxed text-lg">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Still have questions? */}
          <div className="mt-20 text-center">
            <div className="inline-block bg-linear-to-r from-blue-600/20 to-teal-600/20 border border-blue-500/30 rounded-3xl p-10 backdrop-blur-xl">
              <Sparkles className="w-12 h-12 text-blue-400 mx-auto mb-6 animate-pulse" />
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Still have questions?
              </h3>
              <p className="text-gray-300 mb-8 max-w-md mx-auto">
                We&#39;re here 24/7 via WhatsApp, email, or call
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-linear-to-r from-blue-600 to-cyan-600 rounded-xl font-bold hover:scale-105 transition-all shadow-xl"
                >
                  Contact Us
                </Link>
                <a
                  href="https://wa.me/918121923831"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-green-600 rounded-xl font-bold hover:scale-105 transition-all flex items-center justify-center gap-3"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                  WhatsApp Now
                </a>
              </div>
            </div>
          </div>

        
        </div>
      </div>
    </>
  );
}