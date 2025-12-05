import { Code, GitBranch, GitCommit, Cpu, Database, Cloud, Shield, Activity, Target, Zap, ShieldCheck, DollarSign, CreditCard, ShoppingBag, Sparkles, } from "lucide-react";

// Workflow Steps Data
export const workflowSteps = [
  { icon: Code, label: "Clean Code", color: "from-blue-500 to-cyan-500" },
  {
    icon: GitBranch,
    label: "Git Flow",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: GitCommit,
    label: "Commits",
    color: "from-green-500 to-emerald-500",
  },
  { icon: Cpu, label: "CLI Ready", color: "from-orange-500 to-red-500" },
  {
    icon: Database,
    label: "DB Ready",
    color: "from-indigo-500 to-purple-500",
  },
  { icon: Cloud, label: "DevOps", color: "from-cyan-500 to-blue-500" },
  {
    icon: Activity,
    label: "Monitoring",
    color: "from-teal-500 to-green-500",
  },
  { icon: Target, label: "QA", color: "from-yellow-500 to-orange-500" },
  { icon: Zap, label: "Performance", color: "from-purple-500 to-indigo-500" },
  { icon: Shield, label: "Security", color: "from-red-500 to-pink-500" },
];

// Quick Features Data
export const quickFeatures = [
  {
    icon: ShieldCheck,
    title: "Verified Developers",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: DollarSign,
    title: "Fixed Hourly Rates",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: ShoppingBag,
    title: "Pre-built Solutions",
    color: "from-teal-500 to-emerald-500",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    color: "from-sky-500 to-blue-500",
  },
];

//   Guided Steps
export const guidedSteps = [
  { icon: Sparkles, label: "Milestones" },
  { icon: Activity, label: "Tracking" },
  { icon: Zap, label: "Maintenance" },
  { icon: Shield, label: "Secure" },
];
