import { Shield, Clock, Code2, Package, Wrench, Blocks, Brain, Cloud, Palette, Server, Zap, } from "lucide-react";
import { GrWordpress } from "react-icons/gr";
import { CiMobile1 } from "react-icons/ci";
import { FaGlobeAsia } from "react-icons/fa";

export const slides = [
  {
    title: "Hire Top 1% Developers",
    subtitle: "Handpicked talent. Verified skills. Delivered on time — every time.",
    highlight: "Zero Risk. Full Control.",
    image:  "https://images.pexels.com/photos/10508800/pexels-photo-10508800.jpeg",
  },
  {
    title: "Launch in Days, Not Months",
    subtitle: "500+ successful projects. Built by experts who care about your success.",
    highlight: "Faster. Smarter. Better.",
    image:  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop",
  },
  {
    title: "Fixed Rates. No Surprises.",
    subtitle: "Transparent pricing. Milestone payments. Full escrow protection.",
    highlight: "You’re Always in Control.",
    image:  "https://images.unsplash.com/photo-1613909207039-6b173b755cc1?q=80&w=1247&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "From Idea to Launch Fast",
    subtitle: "Our developers don’t just code. They build your vision with passion.",
    highlight: "Your Success is Our Mission.",
    image:  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop",
  },
];

// services to choose

export const whyChooseUs = [
  {
    icon: Shield,
    title: "Verified Developers",
    desc: "Every developer is manually vetted & background checked",
  },
  {
    icon: Clock,
    title: "Fixed Hourly Rates",
    desc: "No surprises. Transparent pricing from day one",
  },
  {
    icon: Zap,
    title: "Pre-built Solutions",
    desc: "Launch in days with production-ready apps",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    desc: "Escrow protection & milestone-based payments",
  },
];

// Get Started Links

export const getStartedLinks = [
  {
    icon: Code2,
    title: "Hire Developer",
    desc: "Top-tier talent for your project",
    href: "/developers",
    linear: "from-violet-600 to-fuchsia-600",
  },
  {
    icon: Package,
    title: "Ready-made Software",
    desc: "Launch with proven apps instantly",
    href: "/softwares-readymade",
    linear: "from-fuchsia-600 to-pink-600",
  },
  {
    icon: Wrench,
    title: "Custom Service",
    desc: "Tailored solutions for unique needs",
    href: "/contact",
    linear: "from-pink-600 to-violet-600",
  },
];

// Starting steps

export const startingSteps = [
  {
    title: "Post Your Project",
    desc: "Tell us what you need – get quotes in hours",
    linear: "from-blue-600 via-cyan-600 to-sky-600",
  },
  {
    title: "Hire Top Talent",
    desc: "Choose from vetted freelancers with proven track record",
    linear: "from-cyan-600 via-sky-600 to-blue-600",
  },
  {
    title: "Get Work Done",
    desc: "Pay safely via escrow. Release only when satisfied",
    linear: "from-sky-600 via-blue-600 to-cyan-600",
  },
];

// Services List
export const services = [
  {
    title: "Web Development",
    icon: FaGlobeAsia,
    color: "from-blue-600 to-cyan-500",
  },
  {
    title: "Mobile Apps",
    icon: CiMobile1,
    color: "from-cyan-600 to-teal-500",
  },
  {
    title: "UI/UX Design",
    icon: Palette,
    color: "from-sky-600 to-blue-500",
  },
  {
    title: "Backend & APIs",
    icon: Server,
    color: "from-teal-600 to-cyan-500",
  },
  {
    title: "DevOps & Cloud",
    icon: Cloud,
    color: "from-blue-700 to-sky-600",
  },
  {
    title: "AI & ML",
    icon: Brain,
    color: "from-purple-600 to-blue-600",
  },
  {
    title: "WordPress",
    icon: GrWordpress,
    color: "from-sky-500 to-cyan-600",
  },
  {
    title: "No-Code Tools",
    icon: Blocks,
    color: "from-cyan-500 to-blue-700",
  },
];
