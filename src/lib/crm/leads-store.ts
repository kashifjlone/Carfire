import type { LeadItem } from "@/components/admin/LeadsKanban";

const INITIAL_LEADS: LeadItem[] = [
  {
    id: "lead-1",
    name: "Daniel Morrison",
    email: "daniel.m@gmail.com",
    phone: "0412 888 999",
    vehicleTitle: "2021 Toyota RAV4 GXL AWD",
    source: "WhatsApp Click",
    stage: "new",
    createdAt: "10 mins ago",
    message: "Is this vehicle still available for inspection this Saturday?",
  },
  {
    id: "lead-2",
    name: "Amanda Watson",
    email: "a.watson@outlook.com.au",
    phone: "0423 456 789",
    vehicleTitle: "2020 Hyundai i30 Active",
    source: "Finance Enquiry",
    stage: "contacted",
    createdAt: "1 hour ago",
    message: "Seeking weekly finance quote with $3,000 cash deposit.",
  },
  {
    id: "lead-3",
    name: "Marcus Vance",
    email: "m.vance@yahoo.com.au",
    phone: "0434 111 222",
    vehicleTitle: "2019 Ford Ranger Wildtrak 4x4",
    source: "Trade-In Request",
    stage: "test_drive_booked",
    createdAt: "Yesterday",
    message: "Trading in 2016 Mazda 3 SP25 (approx 110,000 km).",
  },
];

const globalForLeads = globalThis as unknown as {
  globalLeads?: LeadItem[];
};

if (!globalForLeads.globalLeads) {
  globalForLeads.globalLeads = [...INITIAL_LEADS];
}

export function getGlobalLeads(): LeadItem[] {
  if (!globalForLeads.globalLeads) {
    globalForLeads.globalLeads = [...INITIAL_LEADS];
  }
  return [...globalForLeads.globalLeads];
}

export function addGlobalLead(lead: LeadItem): void {
  if (!globalForLeads.globalLeads) {
    globalForLeads.globalLeads = [...INITIAL_LEADS];
  }
  globalForLeads.globalLeads.unshift(lead);
}

export function updateGlobalLeadStage(leadId: string, stage: LeadItem["stage"]): boolean {
  if (!globalForLeads.globalLeads) {
    globalForLeads.globalLeads = [...INITIAL_LEADS];
  }
  const target = globalForLeads.globalLeads.find((l) => l.id === leadId);
  if (!target) return false;
  target.stage = stage;
  return true;
}
