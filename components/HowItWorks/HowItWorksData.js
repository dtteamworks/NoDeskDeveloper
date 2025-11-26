import {
  Search,
  ShoppingCart,
  CheckCircle,
  Filter,
  BookOpen,
  Layers,
  Users,
  Clock,
  FolderKanban,
  Wrench,
  FileText,
  Shield,
  Wallet,
  KeyIcon,
  KeyRoundIcon,
  Settings2,
  CloudUpload,
  Rocket,
  RocketIcon,
  CloudDownload,
  BugIcon,
} from "lucide-react";
import { FaPeopleCarry } from "react-icons/fa";

// Timeline Steps
export const timelineSteps = [
  {
    step: "Step 1",
    icon: Search,
    title: "Browse Developers or Apps",
    description:
      "Explore verified developer profiles with transparent hourly rates, or pick a ready-made app to launch faster.",
    proTip: "Pro tip: Use filters for tech stack, experience, and pricing.",
    tags: [
      { icon: Filter, label: "Filter" },
      { icon: BookOpen, label: "Catalog" },
      { icon: Layers, label: "Stacks" },
    ],
    color: "from-purple-500 to-pink-500",
    iconBg: "#9333ea",
  },
  {
    step: "Step 2",
    icon: ShoppingCart,
    title: "Book or Purchase",
    description:
      "Instantly book a developer or purchase a base product. Need changes? Add customization notes while booking.",
    proTip: "Pro tip: You can also request a demo before buying.",
    tags: [
      { icon: FolderKanban, label: "Scope" },
      { icon: Wrench, label: "Customize" },
      { icon: FileText, label: "Repo" },
    ],
    color: "from-blue-500 to-cyan-500",
    iconBg: "#3b82f6",
  },
  {
    step: "Step 3",
    icon: CheckCircle,
    title: "We Confirm & Assign",
    description:
      "Our team verifies your requirements and assigns the best-fit developer or delivery squad for the scope.",
    proTip: "Pro tip: You'll receive timelines and milestones.",
    tags: [
      { icon: Users, label: "Team" },
      { icon: Clock, label: "ETA" },
      { icon: FolderKanban, label: "Process" },
    ],
    color: "from-teal-500 to-emerald-500",
    iconBg: "#14b8a6",
  },
  {
    step: "Step 4",
    icon: Wallet,
    title: "Secure Payement",
    description:
      "Pay via trusted gateways (Razorpay/Stripe). Milestone-based release keep both sides fully protected.",
    proTip: "Pro tip: Invoices & GST-complaint bills includded.",
    tags: [
      { icon: Shield, label: "Protected" },
      { icon: Wallet, label: "Razorpay/Stripe" },
      { icon: KeyRoundIcon, label: "Process" },
    ],
    color: "from-sky-500 to-blue-500",
    iconBg: "#3ea6e2",
  },
  {
    step: "Step 5",
    icon: RocketIcon,
    title: "Project Starts",
    description:
      "We kick off with a sprint plan. Track progress, review builds and ship to staging and store when it's ready.",
    proTip: "Pro tip: Get weekly updates and demo links.",
    tags: [
      { icon: Rocket, label: "Sprint" },
      { icon: CloudUpload, label: "Staging" },
      { icon: Settings2, label: "CI/CD" },
    ],
    color: "from-sky-500 to-blue-500",
    iconBg: "#d2af15",
  },
  {
    step: "Step 6",
    icon: FaPeopleCarry,
    title: "Support After Delivery",
    description:
      "Post Delivery bug fixes, enhancements and maintenence options to keep your product healthy and up-to-date.",
    proTip: "Pro tip: Pick ad-hoc or a monthly plan.",
    tags: [
      { icon: FaPeopleCarry, label: "Support" },
      { icon: CloudDownload, label: "Updates" },
      { icon: BugIcon, label: "Bugfix" },
    ],
    color: "from-sky-500 to-blue-500",
    iconBg: "#6ccf5c",
  },
];

// ==================================================================================================================================
// ==================================================================================================================================
// ==================================================================================================================================

