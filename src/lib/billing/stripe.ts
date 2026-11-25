export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  priceAudMonthly: number; // Excl. GST
  maxVehicles: number;
  features: string[];
}

export const SAAS_PLANS: PricingPlan[] = [
  {
    id: "plan_starter",
    name: "Starter Plan",
    description: "Designed for small independent car yards with up to 25 cars on the lot.",
    priceAudMonthly: 199,
    maxVehicles: 25,
    features: [
      "Up to 25 published vehicles",
      "Branded Next.js storefront & custom .com.au domain",
      "Interactive Finance Repayment Calculator",
      "WhatsApp Click-to-Chat lead conversion",
      "Inbound Leads & CRM pipeline",
      "Unlimited staff user accounts",
      "CSV stock & photo migration tool",
    ],
  },
  {
    id: "plan_growth",
    name: "Growth Plan",
    description: "Best for growing independent yards looking to accelerate direct buyer leads.",
    priceAudMonthly: 349,
    maxVehicles: 50,
    features: [
      "Up to 50 published vehicles",
      "Everything in Starter Plan",
      "Facebook Automotive Inventory Ads (AIA) catalog feed",
      "Stock ageing velocity alerts (>30, >45, >60 days)",
      "Priority photo re-hosting queue",
      "Priority phone & email support",
    ],
  },
  {
    id: "plan_scale",
    name: "Scale Plan",
    description: "For multi-branch or high-turnover dealerships with up to 100 vehicles.",
    priceAudMonthly: 549,
    maxVehicles: 100,
    features: [
      "Up to 100 published vehicles",
      "Everything in Growth Plan",
      "Multi-branch location routing",
      "Electronic dealings register exports (NSW Form 1, VIC Form 2)",
      "Dedicated account onboarding manager",
    ],
  },
];
