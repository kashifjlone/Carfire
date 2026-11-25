# Dealer Discovery Kit: Independent Australian Used-Car SaaS

- **Created:** 24 November 2026 (`accessed 2026-11-24` for all public sources)
- **Target ICP:** Independent Australian used-car dealers (~10–80 vehicles, 1–few branches; primary focus: **NSW, VIC, QLD**).
- **Context & Scope Guardrail:**
  - Product scope: inventory/DMS-lite, branded dealer storefront + custom domain, CRM/lead management, CSV + photo import, SaaS billing (P0); PPSR/NEVDIS, Xero/MYOB Margin Scheme sync, portal feeds, SMS (later phases unless interviews prove a day-1 blocker).
  - **Southern Auto is DROPPED.** Do **not** pitch or treat JDM-import features (auction grade, hybrid battery SOH, freight calculator) as universal P0 needs; treat them strictly as an optional niche module (`NIC-01`).
  - **Source Documents:** [REQUIREMENTS_V0_EVIDENCE_MAP.md](file:///e:/Product%20Development/Autos/research/REQUIREMENTS_V0_EVIDENCE_MAP.md), [ASSUMPTION_MAP.md](file:///e:/Product%20Development/Autos/research/ASSUMPTION_MAP.md), [05_regulatory_state.md](file:///e:/Product%20Development/Autos/research/raw/05_regulatory_state.md), [06_regulatory_national.md](file:///e:/Product%20Development/Autos/research/raw/06_regulatory_national.md), [01_competitors_dms_crm.md](file:///e:/Product%20Development/Autos/research/raw/01_competitors_dms_crm.md).

---

## 0. Master Validation Map (15 C-Items)

Every question, scoring row, and synthesis decision in this kit maps back to the **15 unvalidated `C`-items** and top-risk assumptions (`A-01` to `A-16`):

| C-Item | Topic to Validate | Linked Req / Assumption IDs |
|---|---|---|
| **C-1** | Current software stack & exact monthly spend (DMS + website + CRM + Nexgate/Podium, excl. portal ad spend) | `A-06` |
| **C-2** | Pricing metric & WTP: per-active-car (e.g., A$8/car/mo) vs flat tier (e.g., A$199/mo up to 40 cars, unlimited users) | `BIL-01`, `A-06` |
| **C-3** | Standalone storefront + CRM + inventory-lite adoption vs refusing to switch before Xero/MYOB + police books ship | `A-01`, `A-03` |
| **C-4** | Xero / MYOB workflow for second-hand GST margin scheme, stamp duty, recon costs (and whether P0 CSV sales export suffices) | `INT-01`, `A-11` |
| **C-5** | State statutory forms & registers: DMS-generated vs manual/VACC/MTA PDFs (`NSW Form 1/5`, `VIC Form 2/4/5`, `QLD Form 9/12` + transactions register) | `CMP-06`, `CMP-07`, `A-13` |
| **C-6** | NSW EGC vs Drive-Away conflict: why `82.4%` of audited NSW dealers show EGC and acceptability of forced Drive-Away headline | `INV-04`, `A-08` |
| **C-7** | CSV + photo URL / ZIP export reality from EasyCars, Nexgate, or Virtual Yard without vendor support blocking | `IMP-01`, `IMP-02`, `A-09` |
| **C-8** | Lot photo workflow: who takes 20–40 photos/car and mobile-browser upload vs native app expectation | `MED-02`, `INV-09`, `A-12` |
| **C-9** | Real lead-source split (`%` carsales vs FB Marketplace vs Google/website vs walk-ins) & current reply speed | `CRM-03`, `CRM-04`, `FED-01`, `FED-02`, `A-03`, `A-07` |
| **C-10** | Trade-in customer photo upload necessity in P0 vs text/rego/km-only trade-in capture | `TRD-02` |
| **C-11** | Online holding deposit appetite (A$500–A$1,000) vs phone/enquiry negotiation first | `CMP-08`, `A-16` |
| **C-12** | PPSR workflow: manual A$2.00 `ppsr.gov.au` vs broker (MotorWeb/InfoAgent/RedBook) vs EasyCars CarHistory, & website badge value | `CMP-04`, `INT-02`, `A-15` |
| **C-13** | Consignment & niche stock prevalence (NSW/QLD consignment, JDM import, commercial) vs standard retail passenger/4x4 stock | `INV-03`, `NIC-01`, `NIC-02`, `A-16` |
| **C-14** | Offshore vendor trust & support: acceptance of Pakistan-based team given Sydney hosting, APP 8 DPA, AEST hours, month-to-month export | `ADM-02`, `CMP-05`, `A-04` |
| **C-15** | Optional UX simplifications: single-dealership default (hide multi-org URL switcher unless 2+ orgs) & embeddable WP/Webflow stock widget | `TEN-07`, `WEB-07` |

---

## 1. Who to Interview & How to Find Them (From Pakistan)

### 1.1 Target Segments & 5–10 Interview Target Mix

Aim for **8–10 completed interviews** (minimum **5**) before committing to full engineering build. Prioritise **decision-makers** (Dealer Principal, Owner-Operator, General Manager, or Yard Manager who controls software spend and sees daily lead/compliance workflows).

| Segment | Description | Target Share (8–10 Calls) | Why Included |
|---|---|---|---|
| **S1: Mainstream Independent (Small/Medium)** | 10–60 retail used cars, 1 physical yard, passenger/SUV/4x4 stock across **VIC, NSW, QLD**. Mix of current EasyCars, Virtual Yard, Indiqator, WordPress+Nexgate, or spreadsheet yards. | **6–7 dealers** (2–3 VIC, 2–3 NSW, 1–2 QLD) | Core ICP; validates C-1..C-15 without niche skew. Include at least 2–3 NSW yards to resolve C-6 (EGC vs Drive-Away). |
| **S2: Multi-Branch Independent** | 2–4 yards, ~40–80+ total vehicles, shared staff or branch-scoped stock/registers. | **1–2 dealers** | Validates branch-scoped registers (C-5), multi-org UX simplification (C-15 / `TEN-07`), and pricing band cap (C-2). |
| **S3: Import / Consignment Specialist** | Licensed independent yard focused on JDM/grey imports OR NSW/QLD consignment retail. | **1–2 dealers max** | Stress-tests C-13 (niche separation vs core) and QLD/NSW Form 9 consignment trust workflows (`NIC-01`, `NIC-02`). Never >20% of sample. |
| **Bonus Stakeholder (Non-Dealer)** | Australian motor-dealer bookkeeper / BAS agent using Xero/MYOB for used-car yards. | **1–2 calls** | Validates C-4 (`A-11`): Margin Scheme GST, stamp duty, and recon journal reality. |

### 1.2 Screening Questionnaire & Hard Disqualifiers

Use these 5 quick screening questions via email/LinkedIn/call-opener (or on a recruitment screener) **before** booking a 30–40 min slot:

1. **"Which state(s) are your licensed retail yard(s) located in, and roughly how many retail vehicles do you keep in stock at a time?"**
   - *Accept:* NSW, VIC, or QLD (other AU states only as secondary bonus); **10–80 active retail vehicles** (allow 8–100 edge cases if 1–3 branches).
   - *Disqualify:* `< 5` vehicles / hobbyist / unlicensed private seller; `> 150` vehicles enterprise group.
2. **"Are you primarily an independent used-vehicle dealership, or a franchised new-car OEM dealership?"**
   - *Accept:* Independent used-car dealer (or specialist used/commercial/import yard).
   - *Disqualify:* Franchised OEM new-car group (e.g., Toyota/Mazda/Ford multi-rooftop using Titan/Pentana/EraPower OEM mandates).
3. **"Do you sell directly to retail consumers (with a yard website or online listings), or are you wholesale-only dealer-to-dealer?"**
   - *Accept:* Retail (or mixed retail + wholesale).
   - *Disqualify:* Pure dealer-to-dealer wholesaler with zero retail buyers/storefront needs.
4. **"What is your role at the dealership, and are you involved in choosing or paying for your DMS, website, or CRM software?"**
   - *Accept:* Owner / Dealer Principal / GM / Yard Manager / Ops Manager with software or lead-ops authority.
   - *Disqualify:* Junior salesperson, detailer, or receptionist with no visibility into software billing, compliance registers, or CSV exports.
5. **"Which system(s) do you currently use to manage your stock and website?"** *(Open check to balance stack diversity — avoid interviewing 8 dealers all on the exact same WordPress setup.)*

### 1.3 Finding & Verifying Dealers from Pakistan (Public Sources Only)

> **Rule:** Never scrape email lists for bulk blasts (illegal under *Spam Act 2003*; see Section 2). Build a **manual, vetted list of 60–80 prospects** using public registers + conspicuously published website contacts.

| Source Type | Exact Public Sources (`accessed 2026-11-24`) | How to Use from Pakistan |
|---|---|---|
| **NSW Public Register** | **Verify NSW / NSW Fair Trading** motor dealer search via [Service NSW / NSW Fair Trading](https://www.nsw.gov.au/departments-and-agencies/fair-trading) (`nsw.gov.au` [Verify NSW redirect](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE7Zz6yTSAWOftDEgHdk0rippboQ2nVH6H2cGOGN_NIrC7blK5jnxq0ugyvkVCyW4-GhN0vgnei9lia_YjTYKiWyCiHpM48j4tgO_C5hfxTRU2VOn2cmGk_L7F9hTnz1Piq-g==); search by licensee name, MDLN, ABN, or suburb/postcode [NSW search redirect](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG98FpRghCq2OqLDnUwpWarEn4QAFTsprdSjvu_6_2ZbmSp78nEq6oblWM213E6AbsglnndevGvEiV9iPbU8tM2UhlQqEWzRCA-w9xxs0lb53vYFQuYGvtMBRKYUox956c4nn8fVu9IQO3he2Fi0pJk2NUTPKvRt25h4Os5mQ==)). | Verify active licence & trading name; look up dealership website on Google to inspect current site stack & published DP/sales email. |
| **VIC Public Register** | **Consumer Affairs Victoria (CAV) / BLA** Public Register of Licensed Motor Car Traders (`consumer.vic.gov.au` [CAV register redirect](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEVtFhLXWBPsNtmEQ4-FjzVUp0SnbSgp_6wGz4WTA6BpWKTvE9sCitKRv2ka6_OmPxthdxvvD9XxBxGIJPVyjxQoUNPVKMgank4e76TmqSXqtEm4fo3LNzuoXmMutaaGU9SCmVcBq8X3hAjzDYVqfyNqEk8bLGIaIHRIrM-_QxrTpdhZcZ5Wr6P_5X19MLlYQ_ezg==); search by trader name or `LMCT` number). | Filter active LMCTs in Melbourne metro & regional VIC (e.g., Ringwood, Dandenong, Geelong, Ballarat); check site speed/stack. |
| **QLD Public Register** | **Queensland OFT** Fair Trading Licensing Register — select *"Motor Dealing"* (`qld.gov.au` / `fairtrading.qld.gov.au` [QLD register redirect](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGD_zKIWRGx8XonaDf5SDvJAIkeE7qv_r2G8dKOn6OvGO6weJypkvhp0LNVDmsIlxaRVzRwxRDixg70l1QIdSuaRZlbGMObyDMB6JMhrT8_snbfw7_dK2sePL8=)). | Verify active QLD Motor Dealer licence; focus on Brisbane, Gold Coast, Sunshine Coast, Toowoomba, Townsville independents. |
| **Industry Associations** | **MTA NSW** [Find a Member Directory](https://www.mtansw.com.au/site/DefaultSite/custom/findamember.aspx) (filter *"Automotive Dealers - Used"*); **MTAQ** [Member Search Portal](https://portal.mtaq.com.au/) (*Used Car Dealers [UCD]* division); **VACC** [vacc.com.au](https://vacc.com.au/) (`accessed 2026-11-24`). *(Note: **AADA** primarily represents franchised new-car dealers — [aada.asn.au](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFEKRnHyCxI3Ih7livWpaz7gk8ZUVyTGgiGBQgDTdBnMd844cnH3SIG_2feHQ1TOW8-2EjqWgSpxasEVD6OjI2UuCukSv763TeeTf9QQMBMducpsoITtNXB285hWyNRrRVzfCGoyeYFhKuYiw7ajS_EgwMA0ds7KaHyurxdVk0cip9BEmM=).)* | Publicly browse accredited independent used-car dealers by postcode; capture only conspicuously published business emails/landlines without *"no marketing"* disclaimers. |
| **Commercial Hubs & Maps** | Multi-dealer complexes (e.g., **CarCity** in Melbourne/Sydney — [carcity.com.au](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHzbASbITVy8d1Iua4dWCiKgOjdFWSrnmnLAoNeGZJLb1suMwUVYkRuKAn0I7JmmmkEz_NBPOR-r1l6pssQJlxW6xL-5X47XZzGk6IDrjJSolmwFh7WCkeBlyJMo9KjHOCqrEvDClp6p58YcW0=)) and Google Maps / Google Business Profiles for `"used car dealer {suburb}"`. | High density of 15–50 car independent yards; inspect live inventory count (target 10–80 cars) and current website vendor in page footer (`EasyCars`, `Dealer Studio`, `Virtual Yard`, `WordPress`). |
| **LinkedIn (Organic)** | Public LinkedIn search: `"Dealer Principal"` OR `"Yard Manager"` OR `"Owner"` + `"Used Cars"` + `"Sydney" / "Melbourne" / "Brisbane"`. | Cross-check person's role before emailing their dealership address, or send a direct LinkedIn connection note (Section 2.2). |
| **Paid B2B Recruitment Platforms** | **Respondent.io** ([respondent.io](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFOkWixWeFzI_mvuCvzYhn-qqdYypa3OvQQlaF3txTqO4lTeaz0ykYXrdFmNkXzyZo4KIsI4xJHh6TEB29g7yx_SBdpfOIFlLukA1Fi27VqOawJd3C1MAqD_6vzmZj0H7n5nPeU)) & **User Interviews** ([userinterviews.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG2FTgak2RIVclSsiLFYGUfFFS-XYX7M5kR3kiYST7rC3SpLkkIdyRaADrnzA9ITrOwJAULq8-YvQOY0mDMxkpVuRFH61SEY1RFdLUWHcn8SRg8VAzcmddbSi18PA==)) (`accessed 2026-11-24`). | **Costs & eligibility (`verify` at signup):** Secondary pricing comparisons report ~US\$80/completed B2B session on Respondent PAYG ([koji.so](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHvxrej-C_7USDaGxdOpVMZ5SD8FN-hqnqeSR66iJ5_a_k7p2M3cw_iu_Wt5_yNHVF7IXK-zSXJNrkQJlVmqeuRM63o6U8oumj6-XUerFgwzUQqPuHk_sp2fhVDre2CLk3a_ZP8Qkc=)) and ~US\$98/completed B2B session on User Interviews PAYG ([usercall.co](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEjLvVfp8vx3N7-Pso-g1CMSe_lhoxbegRLJud0Veu_lAYuyGm4Du9kp-jnkCzLveA8X6SCvGtcVZUOW8tCwWllFSGuPe_PwbijO7HA9jXHRomD8zlRXEKznRwKC2pO6oofqsybeTort8QcleOFZyFsguuxphsKkZMkSJ-6rBmEwvA47U0A0MvQIydvpb7ZonKTu2yr_BF7h-msuA==)), **plus** participant incentives (typically US\$100–\$300+ for senior B2B — `verify`). **Caveat:** Hyper-niche local AU *independent car dealer principals* may have low panel fill rates (`verify`); treat paid panels as backup only if direct outreach stalls. |

---

## 2. Outreach Templates & Time-Zone Schedule

### 2.1 Mandatory Australian Outreach Compliance Rules (Pakistan -> Australia)

Before sending any email or placing any call from Pakistan, follow [06_regulatory_national.md](file:///e:/Product%20Development/Autos/research/raw/06_regulatory_national.md) §3:
1. **Spam Act 2003 (Email / Instant Messages — ACMA):** No blanket B2B exemption. Treat *all* outreach mentioning future software as commercial electronic messages:
   - **Conspicuous Publication only (Schedule 2 cl 4):** Email ONLY a work/role address conspicuously published on the dealer's own website/public directory (with **no** *"no unsolicited marketing"* statement nearby), and keep the topic strictly relevant to their dealership role. **Never** use scraped lists or personal Gmail addresses.
   - **Identify Sender:** Full name, business/project name, Pakistan location/contact details valid for **at least 30 days**.
   - **Opt-out:** Include a clear free unsubscribe line (e.g., *"Reply STOP or 'no thanks' and I will remove you immediately"*), honoured **within 5 business days** (do it same-day in a suppression sheet).
2. **DNCR & Telemarketing Industry Standard 2017 (Voice Calls — ACMA):**
   - Prefer published **dealership landlines** (`(02)`, `(03)`, `(07)`). Sole-trader mobiles used >50% personally can be on the DNCR.
   - Permitted local hours: **Mon–Fri 9:00 am – 8:00 pm**, **Sat 9:00 am – 5:00 pm**, **NO calls on Sundays or Australian national public holidays**. (Practical dealer hours: **Mon–Fri 9:00 am–4:30 pm** avoiding weekend showroom rush.)
   - **Caller ID (CLI) enabled** and reachable for callbacks for 30+ days; state your name, organisation, and research purpose immediately; hang up and suppress immediately if asked.

### 2.2 Time-Zone Conversion Table (Nov 2026 – Apr 2027)

- **Pakistan Standard Time (PKT):** `UTC+5` year-round (no DST).
- **2026–2027 Australian DST Window:** Started **Sunday, 4 October 2026** (2:00 am AEST -> 3:00 am AEDT) and ends **Sunday, 4 April 2027** (3:00 am AEDT -> 2:00 am AEST) ([nsw.gov.au](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF9s2Dn9xfWpYcIRkOBxQL7Htwit27GbrPeii6CJWALnZsLtnQDgpo_TBJrQKhZ7N353fT66X93M-GGk2rlhREaAfuTT2q5nYo079BS4jnRNlAU1kdUY4UWPP3dHTLaQt93H1bjHg==), [timeanddate.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE95e0NVe_Xv563P9hMwC0MnvA9HcZ3gIGgv4MHds2aHXfQxEh2V7xM8zTO0i93OiIOrlrej8Gmit5aZZcfWZcHYy10cjVztT_nBdugZ35GMDPEu3HwuKMCN10_orgyMqypZwMYFca2PyJFDYzC-cA=), `accessed 2026-11-24`). **QLD, NT, and WA do not observe DST** ([timeanddate.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE3G7EhEvHPco5rPQ_8eSSl6bjXPs7sBpxJB6GVWJkkqOHRWlKfj_w31ppxVzuF83bv2LSVKCi1tXiCZoFmrhg-COiK8y2REvC5fl5SVLGPITBgY7MNxZ7v8jwhnBxBmAQbqmZLPCcELiwZrVbuAotU)).

| Australian Zone | States / Territories | Nov 2026 – 3 Apr 2027 (DST Active) | From 4 Apr 2027 (Standard Time) | Dealer Business Window (9am–5pm Local) in **PKT** | Suggested 35-Min Interview Slots (**PKT**) |
|---|---|---|---|---|---|
| **AEDT / AEST** | **NSW, VIC**, ACT, TAS | `UTC+11` (**PKT +6 hrs**) | `UTC+10` (**PKT +5 hrs**) | **3:00 am – 11:00 am PKT** *(4am–12pm from 4 Apr)* | **4:30 am – 10:30 am PKT** *(10:30 am – 4:30 pm AEDT; best: **5:00–6:30 am PKT** = 11:00 am–12:30 pm AEDT, or **8:30–10:30 am PKT** = 2:30–4:30 pm AEDT)* |
| **AEST** | **QLD** *(no DST)* | `UTC+10` (**PKT +5 hrs**) | `UTC+10` (**PKT +5 hrs**) | **4:00 am – 12:00 pm PKT** *(year-round)* | **5:00 am – 11:30 am PKT** *(10:00 am – 4:30 pm AEST)* |
| **ACDT / ACST** | SA | `UTC+10:30` (**PKT +5.5 hrs**) | `UTC+9:30` (**PKT +4.5 hrs**) | **3:30 am – 11:30 am PKT** *(4:30am–12:30pm from 4 Apr)* | **5:00 am – 11:00 am PKT** *(10:30 am – 4:30 pm ACDT)* |
| **ACST** | NT *(no DST)* | `UTC+9:30` (**PKT +4.5 hrs**) | `UTC+9:30` (**PKT +4.5 hrs**) | **4:30 am – 12:30 pm PKT** *(year-round)* | **5:30 am – 11:30 am PKT** *(10:00 am – 4:00 pm ACST)* |
| **AWST** | WA *(no DST)* | `UTC+8` (**PKT +3 hrs**) | `UTC+8` (**PKT +3 hrs**) | **6:00 am – 2:00 pm PKT** *(year-round)* | **7:00 am – 1:00 pm PKT** *(10:00 am – 4:00 pm AWST)* |

> **Hard PKT Cutoff:** During DST (until **3 April 2027**), **never** cold-call NSW/VIC after **2:00 pm PKT** (= 8:00 pm AEDT legal cutoff under the Telemarketing Standard). In practice, keep all calls/meetings between **4:00 am and 11:30 am PKT** (10:00 am – 4:30 pm local AU time, avoiding 9:00 am yard opening).

---

### 2.3 Outreach Templates

#### Template A: Cold Email (Spam Act Compliant — Research, Not Sales)

- **Target:** Conspicuously published work email of Owner / Dealer Principal / Manager on dealership website (no "no marketing" notice).
- **Subject lines (honest, non-deceptive):**
  - `Quick question on [Dealership Name]’s used-car website & DMS workflow (30-min research)`
  - `Independent [VIC/NSW/QLD] dealer research — how you handle stock & leads`

```text
Hi [First Name],

I found [Dealership Name]’s contact details on your website while researching how independent used-car yards in [NSW/VIC/QLD] manage day-to-day stock, websites, and buyer enquiries.

I’m [Founder Full Name], a software builder based in Pakistan exploring an Australian-hosted (Sydney) inventory, website, and lead-inbox tool for 10–80 car independent yards. Before building anything further, I’m interviewing 8–10 Australian dealers to understand what actually works and what breaks in current tools (like EasyCars, Virtual Yard, Nexgate, or WordPress setups).

This is strictly a research chat — not a sales call, and I have nothing to sell you today.

Would you have 30 minutes next week (for example, Tuesday or Thursday around 11:00 am or 2:30 pm [AEDT/AEST]) for a brief Zoom/Google Meet or phone call? In return, I’m happy to share our anonymised summary of what other independent yards spend and how they handle website leads — or send a modest thank-you coffee/gift card if helpful.

Thanks for your time,
[Founder Full Name]
[Title / Project Name] — [Website URL if live, or "Independent Dealer Software Research"]
Based in [City], Pakistan | Email: [founder@domain] | Phone/WhatsApp: [+92 ...]
(Valid contact details retained for 30+ days.)

---
Prefer not to hear from me? Simply reply "STOP" or "No thanks" and I will remove [Dealership Name] from my outreach list immediately.
```

#### Template B: LinkedIn Connection Note & Follow-Up

**Connection Request Note (<= 300 characters — currently ~268 chars):**
```text
Hi [First Name], I’m researching software pain points with independent used-car dealers in [NSW/VIC/QLD] (stock, websites, leads, compliance). Not selling anything—just learning from yards like [Dealership Name]. Open to connecting for a quick 20–30 min chat?
```

**LinkedIn Follow-Up (After Connection Accepted):**
```text
Thanks for connecting, [First Name].

I’m building an Australian-hosted (Sydney) tool for 10–80 car independent yards, and before writing production code I’m interviewing 8–10 Dealer Principals in NSW, VIC, and QLD about what frustrates them most in their current DMS, website, or lead workflow (and whether overseas-built tools are a non-starter or fine with local hosting/support).

Again, zero sales pitch. If you’re open to a 30-min call between 10:30 am and 4:00 pm [AEDT/AEST] next week, here are two times that work on my side: [Day/Time 1] or [Day/Time 2], or feel free to suggest one.
```

#### Template C: Follow-Up Email (Send 4–5 Business Days Later — One Bump Only)

```text
Subject: Re: Quick question on [Dealership Name]’s used-car website & DMS workflow

Hi [First Name],

Just a quick follow-up in case this slipped down your inbox between yard deliveries.

I’m speaking with a small group of independent [NSW/VIC/QLD] dealers (10–80 cars) over the next two weeks about how they handle lot photos, Xero/compliance paperwork, and carsales vs website leads. Even a 20-minute chat on how [Dealership Name] runs things today would help me avoid building the wrong thing.

If you have 20–30 minutes on [Day] at [Time AEDT/AEST], just reply with "yes" and I’ll send a calendar invite. If you’re flat out or not interested, reply "STOP" and I won’t email again.

Best regards,
[Founder Full Name]
[Project Name] | [City], Pakistan | [founder@domain] | [+92 ...]
```

#### Template D: Thank-You Note (Send Within 24 Hours of Interview)

```text
Subject: Thank you for your time today, [First Name]

Hi [First Name],

Thank you very much for taking [35] minutes today to walk me through how [Dealership Name] handles [e.g., stock uploads, Xero reconciliation, and buyer enquiries]. Your candid feedback on [specific 1-line detail they shared — e.g., why EGC pricing matters in NSW / how EasyCars handles Form 5] was genuinely eye-opening.

As promised, your responses are recorded anonymously and won’t be shared with any other dealership. Once I finish speaking with the remaining dealers in ~2 weeks, I’ll send you the short anonymised summary of software costs and lead-handling takeaways.

[Optional if they agreed in closing:] Also, if you still have a moment to share a 2-row anonymised sample CSV export (no customer data, just column headers and 1–2 dummy/public stock rows), reply here whenever convenient.

Thanks again, and best of luck with the yard this month.

Best regards,
[Founder Full Name]
[Project Name] | [founder@domain] | [+92 ...]
```

---

## 3. Consent Script & Research-Log Template

### 3.1 Verbatim Spoken Consent Script (Read at 00:00–01:30 of Every Call)

> *"Hi [Name], thanks again for making time today. Before we start, a quick 30-second check on how I handle your notes:*
> 1. *This is a product discovery interview—I’m not selling anything today, and there’s zero obligation.*
> 2. *I’d like to take written notes [and, if you’re comfortable, record the audio solely so I don’t miss details while listening]. Only I will access the recording/notes, and any quotes or costs you share will be anonymised and aggregated before I use them to decide what software to build. I won’t share [Dealership Name]’s numbers or name with any other dealer.*
> 3. *Because I’m based in Pakistan, your interview notes and contact email are accessed from outside Australia; you can ask me to delete them at any time.*
> 4. *You can skip any question or stop the call whenever you like.*
>
> *Are you happy to go ahead on that basis, and is audio recording okay—or do you prefer written notes only?"*

*(If they decline audio recording: immediately keep recording OFF and use written notes only. Log exact consent status before asking Question 1.)*

### 3.2 Research-Log Template (Master Anonymised Tracker)

Store PII (real dealership name, contact email/phone, raw recordings) in a **private, access-restricted file**, and reference participants across analysis sheets **only by `Interview ID`** (`D-01`, `D-02`, ...).

```markdown
| Interview ID | Date (YYYY-MM-DD) | State | Segment (S1/S2/S3/BK) | Active Cars | Branches | Role | Current Stack (DMS / Web / CRM) | Consent (Notes / Audio+Notes) | Duration (min) | Sample CSV Shared? | Re-Contact / Pilot Interest? | Notes File Link |
|---|---|---|---|---:|---|---|---|---|---|---|---|---|
| D-01 | 2026-11-XX | VIC | S1 | 35 | 1 | Dealer Principal | EasyCars + WP + Nexgate | Audio + Notes | 38 | Yes (pending) | Yes (design partner) | `notes/D-01.md` |
| D-02 | 2026-11-XX | NSW | S1 | 22 | 1 | Owner | Virtual Yard + VY Site | Notes only | 34 | No | Maybe after Xero | `notes/D-02.md` |
```

---

## 4. Interview Script (30–40 Minutes — Mom Test Rules)

### 4.1 Mom Test Ground Rules (Read Before Every Call)
1. **Talk about their life and past week, not your idea.** Ask *"Tell me about the last time..."* instead of *"Would you like a feature that..."*
2. **Never pitch features or defend your spec.** If they mention a pain, probe *"How did you solve that last time? How long did it take? What did it cost?"*
3. **Compliments are worthless; commitments are signal.** Ignore *"Sounds cool!"*; note only concrete past spend, real blockers, or willingness to share a CSV / join a pilot.
4. **Stay silent for 3 seconds after they finish answering** — dealers often add the real operational truth in the second sentence.

### 4.2 Timed Script & Question-to-C-Item Mapping

#### Part 1: Warm-Up & Yard Profile (0–3 min)
- **Q0 (Consent):** Read Section 3.1 verbatim.
- **Q1 [C-13, C-15]:** *"To anchor our chat, tell me briefly about your yard today—how many cars are typically on the lot, how many sites/branches do you run, and what mix of stock do you sell (standard retail passenger/4x4 vs commercial, consignment, or imports)?"*
  - *Listen for:* Single vs multi-branch (`TEN-07`), consignment/import prevalence (`INV-03`, `NIC-01`, `NIC-02`).

#### Part 2: Current Workflow Walkthrough — "Last Vehicle" (3–10 min)
- **Q2 [C-8, C-12, C-13]:** *"Think about the very last retail car you bought or traded in and got advertised online. Walk me through every step from the moment it arrived on the yard until it was live on your website and portals."*
  - *Follow-up (Photos — **C-8 / `MED-02`, `INV-09`, `A-12`**):* *"Who took the 20–40 photos, what device did they use, and how did those photos actually get into your system? Where do photos slow down or get missed?"*
  - *Follow-up (PPSR — **C-12 / `CMP-04`, `INT-02`, `A-15`**):* *"At what point did you run a PPSR/WOVR check on that car—did you do it manually for A$2 on `ppsr.gov.au`, through a broker like MotorWeb/InfoAgent/RedBook, or inside EasyCars/CarHistory? Do buyers ever ask to see PPSR on your website?"*

#### Part 3: Current Software Stack & Exact Monthly Spend (10–16 min)
- **Q3 [C-1 / `A-06`]:** *"Looking at last month’s bills, which exact software tools do you pay for to run the yard—DMS, website hosting/agency, CRM/chat like Podium, and carsales/Nexgate—and roughly what is your monthly software bill excluding your portal listing/lead spend?"*
  - *Probe:* Separate fixed SaaS fees from variable carsales/Gumtree per-lead or listing fees.
- **Q4 [C-7 / `IMP-01`, `IMP-02`, `A-09`]:** *"Have you ever tried pulling your vehicle list and photos out of [their DMS / Nexgate / Virtual Yard]—say, for an agency or spreadsheet? Can you export a CSV with photo URLs or a photo ZIP yourself, or do you have to ask support?"*
  - *Probe:* Any lock-in contracts, export fees, or missing fields?

#### Part 4: Website, Lead Sources, Trade-Ins & Deposits (16–22 min)
- **Q5 [C-9 / `CRM-03`, `CRM-04`, `FED-01`, `FED-02`, `A-03`, `A-07`]:** *"Think about the last 10–20 cars you sold. Roughly what % of those buyers came from carsales vs Facebook Marketplace vs Google / your own website vs walk-ins? And when an enquiry lands at 7 pm or on a Saturday, how fast does someone reply and via what channel (call, email, SMS, WhatsApp)?"*
- **Q6 [C-10, C-15 / `TRD-02`, `WEB-07`]:** *"On your own website right now, what happens when someone submits a trade-in enquiry—do buyers actually attach photos, or do you mostly need rego/VIN, km, and a phone number? Also, if you already had a WordPress/Webflow site you liked, would you rather replace it or plug a live stock widget into it?"*
- **Q7 [C-11 / `CMP-08`, `A-16`]:** *"In the past 6 months, how often have buyers tried or asked to pay a A$500–A$1,000 holding deposit directly on your website without calling first? How do you prefer to handle deposits given state cooling-off rules?"*

#### Part 5: Accounting & State Compliance Reality (22–28 min)
- **Q8 [C-4 / `INT-01`, `A-11`]:** *"Walk me through month-end with your bookkeeper or accountant in Xero or MYOB. How do you record second-hand GST margin scheme sales, stamp duty/rego pass-throughs, and recon bills today—and what breaks or takes manual cleanup?"*
  - *Follow-up:* *"If a new tool only exported a clean monthly CSV of sales/margins for your bookkeeper in month one rather than live Xero sync, what would happen?"*
- **Q9 [C-5 / `CMP-06`, `CMP-07`, `A-13`]:** *"Walk me through the paperwork on your last sale: which exact state forms and registers—like `[NSW: Form 1 register, Form 5/12 | VIC: Form 2 dealings book, Form 4/5 | QLD: Form 9/12, 24h transactions register]`—do you generate inside your DMS versus filling out manually, in Excel, or using VACC/MTA PDFs?"*
- **Q10 *(NSW dealers only)* [C-6 / `INV-04`, `A-08`]:** *"I noticed many NSW yards show 'Excl. Govt. Charges' on their site while some show 'Drive-Away'. How do you display prices on your site vs carsales, why, and what would happen if a website system required a Drive-Away headline price?"*

#### Part 6: Switching Trigger & Offshore Vendor Trust (28–33 min)
- **Q11 [C-3 / `A-01`, `A-03`]:** *"Imagine a system solved [their top 2 pains from earlier, e.g., slow site + slow lead reply] at roughly half your current software cost, and imported your stock via CSV + FB Marketplace feed—**without** Xero sync, state police books, or direct carsales push in version 1. Would you run it alongside [current DMS], wait until those three existed, or never switch without them? Why?"*
- **Q12 [C-14 / `ADM-02`, `CMP-05`, `A-04`]:** *"Being completely candid: I’m a founder/engineer in Pakistan. If customer data and photos sit on Sydney servers (AWS/Supabase), privacy/APP 8 terms are covered, support runs during Australian business hours, and you’re strictly month-to-month with one-click full CSV/photo export—would an overseas team stop you from signing up, or what would you need to see to feel comfortable?"*

#### Part 7: Pricing Metric & Willingness to Pay (33–38 min)
- **Q13 [C-2 / `BIL-01`, `A-06`]:**
  - *Metric preference:* *"Comparing two simple ways to bill for website + CRM + inventory (unlimited staff users, no lock-in): **(A) Per active car**—say A$8/car/month (~A$240 for 30 cars)—vs **(B) Flat band**—say A$199/month up to 40 cars. Which feels fairer when your yard stock fluctuates, and why?"*
  - *Van Westendorp 4-question price sensitivity (for their yard size, excl. GST):*
    1. *"At what monthly price would this be **so cheap** you’d question whether it’s reliable or safe?"*
    2. *"At what monthly price would it feel like a **bargain / great value**?"*
    3. *"At what monthly price would it start feeling **expensive**, though you’d still consider it?"*
    4. *"At what monthly price would it be **too expensive** to consider?"*

#### Part 8: Closing & Concrete Next Step (38–40 min)
- **Q14 [A-01, A-09]:** *"Two quick things before we wrap: (1) Is there anything big about running your yard’s software that I didn’t ask? (2) If we test a free pilot or build a preview using your public stock in the next few weeks, would you want to see it—and could you possibly send a 2-row anonymised sample stock CSV (just headers + 1–2 cars, zero customer info) so we verify compatibility?"*

---

### 4.3 Full Traceability Matrix (Questions -> C-Items -> Requirements & Assumptions)

| Question(s) | C-Item(s) | Requirement ID(s) | Assumption ID(s) |
|---|---|---|---|
| Q3 | **C-1** | `BIL-01` | `A-06` |
| Q13 | **C-2** | `BIL-01` | `A-06` |
| Q11, Q14 | **C-3** | `RPT-01`, `WEB-01`, `CRM-02` | `A-01`, `A-03` |
| Q8 | **C-4** | `INT-01` | `A-11` |
| Q9 | **C-5** | `CMP-06`, `CMP-07` | `A-13` |
| Q10 *(NSW)* | **C-6** | `INV-04`, `CMP-01` | `A-08` |
| Q4, Q14 | **C-7** | `IMP-01`, `IMP-02`, `IMP-03` | `A-09` |
| Q2 | **C-8** | `MED-01`, `MED-02`, `INV-09` | `A-12` |
| Q5 | **C-9** | `CRM-03`, `CRM-04`, `FED-01`, `FED-02` | `A-03`, `A-07` |
| Q6 | **C-10** | `TRD-01`, `TRD-02` | — |
| Q7 | **C-11** | `CMP-08` | `A-16` |
| Q2 | **C-12** | `CMP-04`, `INT-02` | `A-15` |
| Q1, Q2 | **C-13** | `INV-03`, `NIC-01`, `NIC-02` | `A-16` |
| Q12 | **C-14** | `ADM-02`, `CMP-05`, `TEN-01` | `A-04`, `A-05` |
| Q1, Q6 | **C-15** | `TEN-07`, `WEB-07` | — |

---

## 5. Note-Taking Template & Per-Interview Scoring Sheet

### 5.1 Structured Note-Taking Template (`notes/D-XX.md`)

```markdown
# Interview Notes — D-XX
- **Date:** YYYY-MM-DD | **State:** NSW / VIC / QLD | **Segment:** S1 / S2 / S3 / BK
- **Active Stock:** __ cars | **Branches:** __ | **Stock Mix:** __% retail passenger/4x4, __% commercial, __% consignment, __% import
- **Consent:** [ ] Notes only  [ ] Audio + Notes  | **Duration:** __ min

## 1. Current Stack & Exact Monthly Spend (C-1)
- DMS: __________ (A$__/mo)
- Website / Agency: __________ (A$__/mo)
- CRM / Chat (e.g. Podium): __________ (A$__/mo)
- Nexgate / Portal Plan (excl. ad/lead spend): __________ (A$__/mo)
- **Total Software Spend (excl. ads):** A$__/mo | Contract lock-in? Y/N

## 2. Observed Workflows & Facts (Mom Test — Past Behaviour Only)
- **Last car to online (C-8, C-12):** Who took photos (__), device (__), upload friction (__). PPSR method (__; badge value: Y/N).
- **Lead split & reply speed (C-9):** carsales __% | FB Marketplace __% | Google/Own site __% | Walk-in __%. Typical reply time: __. Uses WhatsApp? Y/N.
- **Trade-ins & Deposits (C-10, C-11):** Trade-in photo upload needed? Y/N. Holding deposit asked online? __ times/6mo; preference: __.
- **Accounting / Xero / MYOB (C-4):** Margin scheme pain: __. P0 CSV export acceptable? Y/N/Conditional.
- **State Compliance & Pricing (C-5, C-6):** Forms in DMS vs VACC/MTA/manual: __. (NSW) EGC vs Drive-Away view: __.
- **Export / Migration Reality (C-7):** Self-serve CSV? Y/N. Photo URLs or ZIP accessible? Y/N. Sample promised? Y/N.
- **UX Simplifications (C-15):** Single-org default ok? Y/N. Wants WP/Webflow widget vs full storefront? __.

## 3. Verbatim Quotes (Max 3–5 sharpest exact quotes)
1. "..."
2. "..."
3. "..."

## 4. Hard Blockers & Switching Triggers (C-3, C-14)
- **Would adopt P0 (Storefront + CRM + Inventory-lite) without Xero/police-book/carsales push?** Yes (standalone) / Yes (alongside DMS) / No (hard blocker: ______)
- **Offshore (Pakistan) vendor reaction (C-14):** Pass / Conditional (needs: ______) / Hard Reject
- **Pricing Preference & Van Westendorp (C-2):** Prefers Per-car / Flat | Too cheap: A$__ | Bargain: A$__ | Expensive: A$__ | Too expensive: A$__
```

### 5.2 Per-Interview Scoring Sheet

Score immediately within 2 hours of the call while memory is fresh.

- **Pain Intensity Rubric (1–5):**
  - `1` = No pain / completely happy with current tool.
  - `2` = Minor annoyance, wouldn't spend time changing.
  - `3` = Clear friction/manual workaround weekly, open to better.
  - `4` = Frequent cost/time/lead loss; actively dislikes current setup.
  - `5` = Hair-on-fire pain (paying A$500+/mo or losing deals/compliance risk; tried workarounds).
- **MoSCoW Vote Rubric (Based on *observed behaviour/hard blockers*, NOT polite enthusiasm):**
  - `Must` = Stated hard requirement or observed weekly failure they refuse to buy without.
  - `Should` = Strong operational value / would accelerate switch, not a dealbreaker day 1.
  - `Could` = Nice-to-have / low urgency.
  - `Won't` = Explicitly unwanted, irrelevant, or harmful to workflow.

| Feature / Scope Candidate | Req / C-Item | Vote (`M / S / C / W`) | Pain (1–5) | Evidence / Behaviour Observed |
|---|---|---:|---:|---|
| Fast SSR storefront + live stock sync + filters | `WEB-01/02` | | | |
| Unified CRM lead inbox + instant buyer auto-reply + WhatsApp | `CRM-02/03/04` | | | |
| Mobile-browser lot photo capture + missing-photos filter | `MED-02`, `INV-09` (C-8) | | | |
| Self-serve/assisted CSV + photo URL/ZIP migration | `IMP-01/02` (C-7) | | | |
| Standalone adoption *without* P0 Xero/MYOB sync | `INT-01` (C-3, C-4) | | | *(Mark `Won't` if they refuse to buy without live Xero)* |
| Native Xero/MYOB Margin Scheme sync in P0 | `INT-01` (C-4) | | | |
| State compliance register + Form 4/5/9/12 PDF generation in P0 | `CMP-06/07` (C-5) | | | *(vs PDF upload + CSV export)* |
| Day-1 outbound carsales / Gumtree / Drive portal feed | `FED-02` (C-3, C-9) | | | *(vs FB Catalog feed + manual/Nexgate)* |
| Facebook AIA / Catalog outbound feed | `FED-01` (C-9) | | | |
| Trade-in customer photo upload in P0 | `TRD-02` (C-10) | | | *(vs rego/km/text-only)* |
| Online holding deposit checkout (A$500–$1k) | `CMP-08` (C-11) | | | |
| Built-in PPSR/NEVDIS API vs manual PDF upload + badge | `CMP-04`, `INT-02` (C-12) | | | |
| NSW EGC headline support (alongside Drive-Away) | `INV-04` (C-6) | | | |
| Embeddable stock widget for existing WP/Webflow site | `WEB-07` (C-15) | | | |
| Consignment / JDM import niche module | `NIC-01/02` (C-13) | | | |

---

## 6. Synthesis Rule & Decision Log

### 6.1 Aggregate Cross-Interview Tally Sheet

After completing 5–10 interviews, aggregate every `D-XX` scoring sheet into one table:

| Feature / Candidate | C-Item | `Must` Count | `Should` Count | `Could` Count | `Won't` Count | Median Pain (1–5) | Final Priority |
|---|---|---:|---:|---:|---:|---:|---|
| *Example: Instant buyer reply + WhatsApp CTA* | C-9 | ? / N | ? / N | ? / N | ? / N | ? | *Apply Rule 6.2* |
| *...repeat for all 15 rows from 5.2* | | | | | | | |

### 6.2 Explicit Synthesis & Scope-Gate Rules

1. **The `>= 3 Must` Threshold:** A non-statutory feature becomes **MVP `Must` (P0)** **only when `>= 3` interviewed ICP dealers independently evidence/mark it as `Must`** (with median pain `>= 3`). *(Statutory/legal items verified at Confidence `A`—such as `TEN-01/03`, `CMP-01/02/03/05`, `BIL-03`—remain mandatory regardless of dealer vote, because breaching ACL/state law is non-negotiable.)*
2. **Cut / Defer Rule:** Any candidate with `0–1 Must` votes (e.g., if trade-in photo upload `TRD-02`, online holding deposits `CMP-08`, or JDM fields `NIC-01` score `<= 1 Must`) is formally deferred to P1/P2 or cut from core schema.
3. **Architecture / Pivot Gate (`A-01`, `A-03`, `A-11`, `A-13`):**
   - **Proceed with Lean P0 (Storefront + CRM + Inventory-lite + CSV + FB Feed):** If `>= 50%` of interviewed dealers accept adopting without live P0 Xero, state form PDF generation, and direct carsales push **AND** `>= 60%` confirm WTP in the A$149–A$299/mo (or A$8/car) band **AND** `<= 20%` hard-reject offshore/Sydney-hosted support (`A-04`).
   - **Scope Pivot (Add-On Layer vs Full DMS):** If `>= 3` ICP dealers say *"I will never switch DMS without live Xero Margin Scheme + carsales push + Form 4/5/9/12"*, pivot P0 from *"DMS replacement"* to either **(a) Add-On Storefront + WhatsApp/CRM Layer** (syncing read-only from their existing EasyCars/Nexgate feed, Dealer Studio/Dealerloop pattern) OR **(b) narrow initial launch to 1 state (e.g., VIC or QLD) with full forms + Xero first.**

### 6.3 Decision Log Format

Record every post-interview spec change here before editing `MASTER_SPEC_V2_2`:

```markdown
| Decision ID | Date | C-Item / Assumption | Evidence Tally (`n / N` dealers) | Previous Spec V2.2 Status | New Decision (`Must / Should / Defer / Cut / Pivot`) | Rationale & Next Action |
|---|---|---|---|---|---|---|
| DEC-01 | 2026-12-XX | C-10 / `TRD-02` | e.g., 1/8 Must, 6/8 text+rego enough | In spec P0 (§4.5.2 photo upload) | Defer to P1 | Ship rego+km+contact trade-in form in P0; cut public presign upload from MVP. |
```

---

## 7. Smoke-Test Plan (Pre-Build Demand & Trust Validation)

Run a **2-week low-cost smoke test** in parallel with or immediately after interviews 1–5 to test **behavioural intent** (clicks + waitlist signups with real dealership details), not just verbal answers.

### 7.1 Landing Page Copy Outline (ACL-Safe, Zero Fake Proof)

- **Hero Headline:** *"A Fast, Modern Website & Instant-Reply Lead Inbox for Independent Australian Car Yards"*
- **Subheadline:** *"Built for 10–80 vehicle dealers in NSW, VIC, and QLD. Sync your stock by CSV in minutes, convert Google & Facebook buyers faster with WhatsApp + instant replies, and stop paying agency retainers. Month-to-month—zero lock-in."*
- **3 Core Value Pillars (No JDM-niche copy):**
  1. **Sub-second mobile storefront on your `.com.au`:** Auto-updating stock filters, finance repayment estimator, trade-in capture, and built-in state licence & ACL-compliant price displays.
  2. **Convert direct leads in under 60 seconds:** Instant buyer acknowledgement + WhatsApp click-to-chat + tidy lead pipeline so enquiry emails don’t go cold overnight.
  3. **Your data, Sydney-hosted, zero lock-in:** Hosted in **Sydney (AWS/Supabase)**, export all stock & photos in one click anytime, AEST business-hours support. *(Honest transparency note: built by an independent software team in Pakistan under Australian Privacy Principle 8 safeguards.)*
- **Transparent Early-Access Pricing Preview (Test A/B or single clear anchor):**
  - *Founder Pilot Rate:* **A$199/mo ex GST** (up to 40 active cars, unlimited staff users) **or A$8/car/mo** — *"Tell us which fits your yard on the waitlist form."*
- **Primary CTA:** *"Request a Free Live Preview Using Your Public Stock"* (DealerAssist pattern from [REQUIREMENTS_V0_EVIDENCE_MAP.md](file:///e:/Product%20Development/Autos/research/REQUIREMENTS_V0_EVIDENCE_MAP.md) §1.1) — lowers friction while capturing real yards.
- **Compliance Footer:** Clear identity (Founder/entity name + Pakistan location), Privacy Policy + APP 5 Collection Notice + APP 8 disclosure, no fabricated testimonials or fake dealer logos.

### 7.2 Waitlist / Early-Access Form Fields

Keep to **7 minimal fields** + mandatory legal checkboxes:
1. Dealership Trading Name
2. State (`NSW | VIC | QLD | Other`) & Licence Number *(optional at waitlist, helps verify real dealers)*
3. Website URL *(if any — lets you build a 5-car live staging preview)*
4. Current Stock Size (`<10 | 10–25 | 26–50 | 51–80 | 80+`)
5. Current DMS / Website Tool (`EasyCars | Virtual Yard | Indiqator | WordPress | Spreadsheet / Other`)
6. Pricing Preference (`Flat A$199/mo (up to 40 cars) | Per-car A$8/car/mo | Not sure`)
7. Work Email & Preferred Contact (`Email | WhatsApp/Phone`)
- **Mandatory Checkboxes (Privacy Act APP 5 + Spam Act):**
  - `[ ]` *I understand this early-access list is operated from Pakistan with data hosted in Sydney (Australia) under the Privacy Policy [link].*
  - `[ ]` *Yes, email me product updates and a live preview invite (unsubscribe anytime).* **(Unchecked by default.)**

### 7.3 Small Ad Test Plan (Paid Validation Budget — Verify Local CPCs Before Running)

| Channel | Targeting (NSW, VIC, QLD) | Creative / Keyword Angle | Test Budget & Duration | Verification Note |
|---|---|---|---|---|
| **Google Search Ads** | Exact/phrase match in NSW, VIC, QLD: `"used car dealer website"`, `"easycars alternative"`, `"car dealer CRM australia"`, `"motor dealer software australia"` | Direct value prop: *"Modern Used-Car Dealer Site & CRM — A$199/mo, No Lock-In"* | **14 days**, capped daily spend (e.g., **A$15–A$25/day = ~A$210–A$350 total** — `verify` exact AU B2B CPCs in Google Keyword Planner before launch) | High intent; filters out consumer car buyers via negative keywords (`"buy"`, `"cheap"`, `"for sale"`, `"carsales"`). |
| **Meta / LinkedIn (Optional 2nd Leg)** | Geo: NSW/VIC/QLD; job titles/interests: *Motor Dealer, Car Dealership Owner, Automotive Retail* | *"Paying agency fees for a slow 2015 website? See your yard live in <0.5s."* | **14 days**, **A$15/day (~A$210 total)** — `verify` Meta/LinkedIn minimum daily spend & AU B2B CPMs in ad manager | Expect higher noise than Search; judge strictly on **verified licensed-dealer** leads, not raw clicks. |
| **Zero-Ad Concierge Leg (Recommended alongside ads)** | 10–15 target dealers from Section 1.3 | Manually build a static staging preview of 5 of their *public* cars and link it in Outreach Template A | **A$0 ad spend** | Directly tests **A-04 + A-05 + A-06** with zero wasted consumer clicks. |

### 7.4 Smoke-Test Success Thresholds (Go / Iterate / Stop)

Judge strictly on **verified Australian licensed dealers** (exclude spam, agencies, overseas devs, and `<5`-car hobbyists):

| Metric | Green (Go — Strong Signal) | Amber (Iterate Copy / Pricing / Wedge) | Red (Stop / Scope Pivot) |
|---|---|---|---|
| **Waitlist Conversion Rate (Targeted Search Clicks -> Verified Dealer Form)** | `>= 5%` (e.g., 5+ verified dealers per 100 targeted clicks) | `2% – 4.9%` | `< 2%` after 150+ targeted clicks |
| **Verified Dealer Signups in 14 Days (Ads + Preview Outreach)** | `>= 8` verified ICP dealers requesting preview/waitlist | `3 – 7` verified dealers | `<= 2` verified dealers |
| **Live-Preview Reply / Call Conversion (10 bespoke previews sent)** | `>= 2` bookings (`>= 20%`) | `1` booking | `0` bookings / explicit Pakistan-origin rejections `> 20%` |

---

## 8. Interview Practice Section (Rehearsal Protocol)

> **Epistemic Rule (Strict):** AI role-play and internal rehearsals are **strictly for practising phrasing, pacing, and Mom Test discipline**. **NEVER** log AI-generated answers in the Research Log, Per-Interview Scoring Sheet, or Synthesis Tally, and **NEVER** count simulated replies toward the `>= 3 Must` threshold.

### 8.1 3-Step Pre-Call Rehearsal Loop

1. **Step 1 — Solo Read-Through & Timer Drill (1 run, ~35 min):**
   - Read Section 3.1 (Consent) and Section 4.2 (Q1–Q14) aloud against a stopwatch. Ensure you reach **Q13 (Pricing)** by minute **33** so you never rush Willingness to Pay.
   - Practise the 3-second silence rule after each question.
2. **Step 2 — AI Role-Play Personas (2–3 mock runs of 15–20 min each):**
   - Feed an LLM *only* the persona brief below and instruct it to interrupt, give vague compliments if you pitch, and push back realistically on offshore support or Xero sync. Grade yourself afterwards on: *(a) Did I pitch? (b) Did I ask "tell me about the last time..."? (c) Did I get concrete numbers?*
   - **Persona A (VIC Sceptical EasyCars Lifer, 45 cars):** Busy, suspicious of overseas software, loves 24/7 local phone support, complains quietly about Xero manual journals, hates lock-ins.
   - **Persona B (NSW Price-Sensitive Yard, 22 cars):** Uses WordPress + Nexgate, displays EGC prices because *"everyone on my strip does"*, gets leads mostly from carsales + FB Marketplace, asks why they shouldn't just keep WordPress.
   - **Persona C (QLD Consignment + Older Stock Yard, 30 cars):** Sells Class A + Class B + consignment cars, terrified of getting Form 12 / 7-day cooling-off wrong, wants to know if you handle Form 9/transactions register.
3. **Step 3 — Low-Stakes Warm-Up Call (1–2 real calls):**
   - Book your first 1–2 real calls with lower-stakes contacts (e.g., an AU motor-dealer bookkeeper, or an out-of-core-state WA/SA independent dealer) to test Zoom/phone audio quality from Pakistan, CLI display, and pacing before calling priority VIC/NSW/QLD Dealer Principals.

---

## Sources (`accessed 2026-11-24`)

### Public Web Sources
1. NSW Fair Trading / Verify NSW — Motor dealer licence register & search (`nsw.gov.au`, accessed `2026-11-24`): [Verify NSW portal](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE7Zz6yTSAWOftDEgHdk0rippboQ2nVH6H2cGOGN_NIrC7blK5jnxq0ugyvkVCyW4-GhN0vgnei9lia_YjTYKiWyCiHpM48j4tgO_C5hfxTRU2VOn2cmGk_L7F9hTnz1Piq-g==) | [Dealer licence lookup](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG98FpRghCq2OqLDnUwpWarEn4QAFTsprdSjvu_6_2ZbmSp78nEq6oblWM213E6AbsglnndevGvEiV9iPbU8tM2UhlQqEWzRCA-w9xxs0lb53vYFQuYGvtMBRKYUox956c4nn8fVu9IQO3he2Fi0pJk2NUTPKvRt25h4Os5mQ==)
2. Consumer Affairs Victoria (CAV) — Public Register of Licensed Motor Car Traders (`consumer.vic.gov.au`, accessed `2026-11-24`): [LMCT register](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEVtFhLXWBPsNtmEQ4-FjzVUp0SnbSgp_6wGz4WTA6BpWKTvE9sCitKRv2ka6_OmPxthdxvvD9XxBxGIJPVyjxQoUNPVKMgank4e76TmqSXqtEm4fo3LNzuoXmMutaaGU9SCmVcBq8X3hAjzDYVqfyNqEk8bLGIaIHRIrM-_QxrTpdhZcZ5Wr6P_5X19MLlYQ_ezg==) | [Public registers overview](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHaa3oyrp47u7Lco0pWkDpvi_4rVZCYaIZBUUQYPCXZx0M1pkPkJCV3IFj1ea2TNyX8hT4cwGFoAaWWw9H-jl_OwYuCseJiaO0ibWAd5b9wfhGpeLPwQPKk3bErW3I-38XihErILx96B2PIypqBRx82OEg6NFuAP92vuQqq9wF9vHQ==)
3. Queensland Office of Fair Trading (OFT) — Fair Trading Licensing Register (`qld.gov.au` / `fairtrading.qld.gov.au`, accessed `2026-11-24`): [Motor dealing register](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGD_zKIWRGx8XonaDf5SDvJAIkeE7qv_r2G8dKOn6OvGO6weJypkvhp0LNVDmsIlxaRVzRwxRDixg70l1QIdSuaRZlbGMObyDMB6JMhrT8_snbfw7_dK2sePL8=) | [Check a motor licence](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH5TqlGaTiENTr_lAr5rhkfremOHaJOL7YSVY7uXlBlZj4K-4MbOS_mqFFZVmhAY7LymsDuZbiRg3Xx_ngGRzh5tuzdiC4zEKfFQ5Fr0MONSmWEroD2QB-Jzr4iJpLxvHTG5ePBfMvLwWnf1F9A7NHJc6PEqnGcZ6X6tRUb2rH4nD-uI8iVv0UyD4kSCYIkBl_gyqIvzavv0ZvKzdLDXVVeMT0Ys-B7aT6gY9crfvZrYWknOP7Pvb_2fJOj-u2KDBQxY1oaaTp2-FFcjJeVqMB9NcIb7aigoMLDpPHTo37xZk3h1WzXP-sh0qcOfEgMDWAE4zgfs9qwJvwWsm9zluZmvPAItif8TUM2PhM-6M8l-bXWQk2eANR6zJWrBWmwaOc=)
4. Industry Associations & Hubs (accessed `2026-11-24`): [MTA NSW Find a Member](https://www.mtansw.com.au/site/DefaultSite/custom/findamember.aspx) | [MTAQ Member Search Portal](https://portal.mtaq.com.au/) | [VACC](https://vacc.com.au/) | [AADA](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFEKRnHyCxI3Ih7livWpaz7gk8ZUVyTGgiGBQgDTdBnMd844cnH3SIG_2feHQ1TOW8-2EjqWgSpxasEVD6OjI2UuCukSv763TeeTf9QQMBMducpsoITtNXB285hWyNRrRVzfCGoyeYFhKuYiw7ajS_EgwMA0ds7KaHyurxdVk0cip9BEmM=) | [CarCity](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHzbASbITVy8d1Iua4dWCiKgOjdFWSrnmnLAoNeGZJLb1suMwUVYkRuKAn0I7JmmmkEz_NBPOR-r1l6pssQJlxW6xL-5X47XZzGk6IDrjJSolmwFh7WCkeBlyJMo9KjHOCqrEvDClp6p58YcW0=)
5. Australian Daylight Saving Time & Time Zones 2026–2027 (accessed `2026-11-24`): [NSW Government DST](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF9s2Dn9xfWpYcIRkOBxQL7Htwit27GbrPeii6CJWALnZsLtnQDgpo_TBJrQKhZ7N353fT66X93M-GGk2rlhREaAfuTT2q5nYo079BS4jnRNlAU1kdUY4UWPP3dHTLaQt93H1bjHg==) | [timeanddate.com Australia DST](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE3G7EhEvHPco5rPQ_8eSSl6bjXPs7sBpxJB6GVWJkkqOHRWlKfj_w31ppxVzuF83bv2LSVKCi1tXiCZoFmrhg-COiK8y2REvC5fl5SVLGPITBgY7MNxZ7v8jwhnBxBmAQbqmZLPCcELiwZrVbuAotU) | [timeanddate.com Oct 2026](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE95e0NVe_Xv563P9hMwC0MnvA9HcZ3gIGgv4MHds2aHXfQxEh2V7xM8zTO0i93OiIOrlrej8Gmit5aZZcfWZcHYy10cjVztT_nBdugZ35GMDPEu3HwuKMCN10_orgyMqypZwMYFca2PyJFDYzC-cA=) | [timeanddate.com SA/NT/WA/QLD](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFhGKhNdrwii7kMM80eDaCk3jvAjxY340T5bomEpj0X0yuL-EISmGb2hFZPgOV0naW0Om3bSW4j8dXNme9LgbGbIfMF6TinwR63obgspzdcgh6syl7V0m3iLCw4fyUFH-8oBB7ni8U=)
6. B2B Recruitment Platforms (costs & AU panel fill rates marked `verify`; accessed `2026-11-24`): [Respondent.io](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFOkWixWeFzI_mvuCvzYhn-qqdYypa3OvQQlaF3txTqO4lTeaz0ykYXrdFmNkXzyZo4KIsI4xJHh6TEB29g7yx_SBdpfOIFlLukA1Fi27VqOawJd3C1MAqD_6vzmZj0H7n5nPeU) | [User Interviews](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG2FTgak2RIVclSsiLFYGUfFFS-XYX7M5kR3kiYST7rC3SpLkkIdyRaADrnzA9ITrOwJAULq8-YvQOY0mDMxkpVuRFH61SEY1RFdLUWHcn8SRg8VAzcmddbSi18PA==) | [Respondent PAYG comparison (koji.so)](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHvxrej-C_7USDaGxdOpVMZ5SD8FN-hqnqeSR66iJ5_a_k7p2M3cw_iu_Wt5_yNHVF7IXK-zSXJNrkQJlVmqeuRM63o6U8oumj6-XUerFgwzUQqPuHk_sp2fhVDre2CLk3a_ZP8Qkc=) | [User Interviews PAYG comparison (usercall.co)](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEjLvVfp8vx3N7-Pso-g1CMSe_lhoxbegRLJud0Veu_lAYuyGm4Du9kp-jnkCzLveA8X6SCvGtcVZUOW8tCwWllFSGuPe_PwbijO7HA9jXHRomD8zlRXEKznRwKC2pO6oofqsybeTort8QcleOFZyFsguuxphsKkZMkSJ-6rBmEwvA47U0A0MvQIydvpb7ZonKTu2yr_BF7h-msuA==)

### Workspace Evidence Files Referenced
- [REQUIREMENTS_V0_EVIDENCE_MAP.md](file:///e:/Product%20Development/Autos/research/REQUIREMENTS_V0_EVIDENCE_MAP.md)
- [ASSUMPTION_MAP.md](file:///e:/Product%20Development/Autos/research/ASSUMPTION_MAP.md)
- [01_competitors_dms_crm.md](file:///e:/Product%20Development/Autos/research/raw/01_competitors_dms_crm.md)
- [05_regulatory_state.md](file:///e:/Product%20Development/Autos/research/raw/05_regulatory_state.md)
- [06_regulatory_national.md](file:///e:/Product%20Development/Autos/research/raw/06_regulatory_national.md) (Spam Act 2003, DNCR, Telemarketing Standard 2017, Privacy Act APPs & APP 8, ACL s 48)
