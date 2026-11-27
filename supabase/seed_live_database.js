// Seed script to populate live Supabase database with initial tenant & vehicle catalog
const fs = require("fs");
const path = require("path");

// Load from environment or .env.local
let url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
let key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY || "";

if (!url || !key) {
  try {
    const envContent = fs.readFileSync(path.join(__dirname, "../.env.local"), "utf8");
    for (const line of envContent.split("\n")) {
      const trimmed = line.trim();
      if (trimmed.startsWith("NEXT_PUBLIC_SUPABASE_URL=")) url = trimmed.split("=")[1].trim();
      if (trimmed.startsWith("SUPABASE_SERVICE_ROLE_KEY=")) key = trimmed.split("=")[1].trim();
    }
  } catch {}
}

async function runSeed() {
  console.log("Seeding live Supabase database...");

  // 1. Create Dealership
  const dealershipId = "11111111-1111-1111-1111-111111111111";
  const branchId = "22222222-2222-2222-2222-222222222222";

  const dealership = {
    id: dealershipId,
    name: "Peninsula Motor Group",
    legal_entity_name: "Peninsula Motor Group Pty Ltd",
    abn: "12345678901",
    slug: "peninsula-motors",
    subscription_status: "active",
    primary_domain: "localhost:3000",
    phone: "(02) 9876 5432",
    email: "sales@peninsulamotors.com.au",
    whatsapp_number: "61412345678",
  };

  const res1 = await fetch(`${url}/rest/v1/dealerships`, {
    method: "POST",
    headers: {
      "apikey": key,
      "Authorization": `Bearer ${key}`,
      "Content-Type": "application/json",
      "Prefer": "resolution=merge-duplicates",
    },
    body: JSON.stringify(dealership),
  });
  console.log("Dealership insert:", res1.status, res1.statusText);

  // 2. Create Branch
  const branch = {
    id: branchId,
    dealership_id: dealershipId,
    name: "Main Showroom",
    address: "124 Parramatta Road, Granville NSW 2142",
    state: "NSW",
    phone: "(02) 9876 5432",
  };

  const res2 = await fetch(`${url}/rest/v1/branches`, {
    method: "POST",
    headers: {
      "apikey": key,
      "Authorization": `Bearer ${key}`,
      "Content-Type": "application/json",
      "Prefer": "resolution=merge-duplicates",
    },
    body: JSON.stringify(branch),
  });
  console.log("Branch insert:", res2.status, res2.statusText);

  // 3. Create Dealer License
  const license = {
    dealership_id: dealershipId,
    branch_id: branchId,
    licence_type: "Motor Dealer Licence",
    licence_number: "MD #089123",
    jurisdiction: "NSW",
    status: "active",
  };

  const res3 = await fetch(`${url}/rest/v1/dealer_licenses`, {
    method: "POST",
    headers: {
      "apikey": key,
      "Authorization": `Bearer ${key}`,
      "Content-Type": "application/json",
      "Prefer": "resolution=merge-duplicates",
    },
    body: JSON.stringify(license),
  });
  console.log("Dealer license insert:", res3.status, res3.statusText);

  // 4. Create Host Domain Mappings (localhost, 127.0.0.1, platform)
  const domains = [
    {
      dealership_id: dealershipId,
      hostname: "localhost",
      status: "active",
      is_primary: true,
      ssl_status: "provisioned",
    },
    {
      dealership_id: dealershipId,
      hostname: "127.0.0.1",
      status: "active",
      is_primary: false,
      ssl_status: "provisioned",
    },
    {
      dealership_id: dealershipId,
      hostname: "dealers.apexautos.com.au",
      status: "active",
      is_primary: false,
      ssl_status: "provisioned",
    },
  ];

  for (const d of domains) {
    const resDom = await fetch(`${url}/rest/v1/dealership_domains`, {
      method: "POST",
      headers: {
        "apikey": key,
        "Authorization": `Bearer ${key}`,
        "Content-Type": "application/json",
        "Prefer": "resolution=merge-duplicates",
      },
      body: JSON.stringify(d),
    });
    console.log(`Domain ${d.hostname} insert:`, resDom.status, resDom.statusText);
  }

  // 5. Create Sample Vehicles
  const now = Date.now();
  const vehicles = [
    {
      id: "33333333-3333-3333-3333-333333333303",
      dealership_id: dealershipId,
      branch_id: branchId,
      vin: "6T1AA11A1MA345678",
      stock_number: "S1044",
      make: "Ford",
      model: "Ranger",
      year: 2019,
      variant: "Wildtrak 4x4",
      body_type: "ute",
      transmission: "automatic",
      fuel_type: "diesel",
      odometer_km: 82000,
      total_price_cents: 4899000, // $48,990 Drive Away
      egc_price_cents: 4699000,
      publication_status: "published",
      availability: "in_stock",
      slug: "2019-ford-ranger-wildtrak-s1044",
      features: ["Roller Shutter", "Tow Bar (3.5T)", "Leather Accented Seats", "SYNC 3 Navigation", "Diff Lock"],
      imperfections: ["Slight wear on driver seat bolster"],
      public_description: "Loaded 2019 Ford Ranger Wildtrak 3.2L Turbo Diesel 4x4 dual-cab. Ready for work and weekend touring.",
      ppsr_status: "clear",
      statutory_warranty_class: "nsw_standard",
      published_at: new Date(now - 20000).toISOString(),
    },
    {
      id: "33333333-3333-3333-3333-333333333302",
      dealership_id: dealershipId,
      branch_id: branchId,
      vin: "6T1AA11A1MA234567",
      stock_number: "S1043",
      make: "Hyundai",
      model: "i30",
      year: 2020,
      variant: "Active",
      body_type: "hatch",
      transmission: "automatic",
      fuel_type: "petrol",
      odometer_km: 54200,
      total_price_cents: 2289000, // $22,890 Drive Away
      egc_price_cents: 2150000,
      publication_status: "published",
      availability: "in_stock",
      slug: "2020-hyundai-i30-active-s1043",
      features: ["Touchscreen Display", "Bluetooth", "Rear Parking Sensors", "16-inch Alloys"],
      imperfections: [],
      public_description: "Very tidy 2020 Hyundai i30 Active 5-door hatch. Economical 2.0L 4-cylinder engine, perfect city commuter.",
      ppsr_status: "clear",
      statutory_warranty_class: "nsw_standard",
      published_at: new Date(now - 10000).toISOString(),
    },
    {
      id: "33333333-3333-3333-3333-333333333301",
      dealership_id: dealershipId,
      branch_id: branchId,
      vin: "6T1AA11A11A111111",
      stock_number: "S1042",
      make: "Toyota",
      model: "RAV4",
      year: 2021,
      variant: "GXL AWD",
      body_type: "suv",
      transmission: "automatic",
      fuel_type: "petrol",
      odometer_km: 48500,
      total_price_cents: 3499000, // $34,990 Drive Away
      egc_price_cents: 3350000,
      publication_status: "published",
      availability: "in_stock",
      slug: "2021-toyota-rav4-gxl-s1042",
      features: ["Apple CarPlay", "Adaptive Cruise Control", "Lane Keep Assist", "Reversing Camera", "Blind Spot Monitor"],
      imperfections: ["Minor stone chip on bonnet (touched up)"],
      public_description: "Immaculate one-owner 2021 Toyota RAV4 GXL AWD with full dealer service history and balance of statutory warranty.",
      ppsr_status: "clear",
      statutory_warranty_class: "nsw_standard",
      published_at: new Date(now).toISOString(),
    },
  ];

  for (const v of vehicles) {
    const resV = await fetch(`${url}/rest/v1/vehicles`, {
      method: "POST",
      headers: {
        "apikey": key,
        "Authorization": `Bearer ${key}`,
        "Content-Type": "application/json",
        "Prefer": "resolution=merge-duplicates",
      },
      body: JSON.stringify(v),
    });
    console.log(`Vehicle ${v.slug} insert:`, resV.status, resV.statusText);
  }

  console.log("Seeding completed successfully!");
}

runSeed();
