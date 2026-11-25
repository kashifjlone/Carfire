import { describe, it, expect } from "vitest";
import { parsePriceToCents, normaliseBodyType, parseAndValidateVehicleCsv } from "../import/csv-parser";

describe("CSV Import & Normalisation Engine", () => {
  it("normalises currency text to integer cents", () => {
    expect(parsePriceToCents("$29,990")).toBe(2999000);
    expect(parsePriceToCents("45000.00")).toBe(4500000);
    expect(parsePriceToCents(18500)).toBe(1850000);
    expect(parsePriceToCents("")).toBe(null);
    expect(parsePriceToCents(null)).toBe(null);
  });

  it("normalises Australian body type descriptions", () => {
    expect(normaliseBodyType("SUV 4WD")).toBe("suv");
    expect(normaliseBodyType("Dual Cab Utility")).toBe("ute");
    expect(normaliseBodyType("5D Hatchback")).toBe("hatch");
    expect(normaliseBodyType("People Mover Van")).toBe("van");
    expect(normaliseBodyType("4D Sedan")).toBe("sedan");
  });

  it("performs dry-run validation on sample dealer CSV data", () => {
    const sampleCsv = `VIN,Stock Number,Make,Model,Year,Body,Transmission,Fuel,Odometer,Price,EGC Price,Photos
6T1AA11A11A111111,S101,Toyota,RAV4,2021,SUV,Automatic,Hybrid,45000,"$34,990","$32,500",https://images.example.com/1.jpg;https://images.example.com/2.jpg
KMHD1234567890123,S102,Hyundai,i30,2020,Hatch,Automatic,Petrol,62000,21990,,https://images.example.com/3.jpg
SHORTVIN,S103,Mazda,CX-5,2019,SUV,Automatic,Petrol,80000,28990,,
`;

    const result = parseAndValidateVehicleCsv(sampleCsv);

    expect(result.totalRows).toBe(3);
    expect(result.validRows.length).toBe(2);
    expect(result.errors.length).toBe(1);

    // Assert Row 1 data
    const row1 = result.validRows[0];
    expect(row1.vin).toBe("6T1AA11A11A111111");
    expect(row1.make).toBe("Toyota");
    expect(row1.model).toBe("RAV4");
    expect(row1.totalPriceCents).toBe(3499000);
    expect(row1.egcPriceCents).toBe(3250000);
    expect(row1.photoUrls.length).toBe(2);

    // Assert error row
    const errRow = result.errors[0];
    expect(errRow.rowNumber).toBe(4);
    expect(errRow.errors[0]).toContain("VIN must be exactly 17 alphanumeric characters");
  });

  it("catches EGC price higher than headline total price", () => {
    const invalidPriceCsv = `VIN,Stock Number,Make,Model,Year,Body,Transmission,Fuel,Odometer,Price,EGC Price
6T1AA11A11A111111,S101,Toyota,Camry,2021,Sedan,Automatic,Petrol,30000,25000,28000
`;
    const result = parseAndValidateVehicleCsv(invalidPriceCsv);
    expect(result.errors.length).toBe(1);
    expect(result.errors[0].errors[0]).toContain("EGC price cannot be higher than total drive-away price");
  });
});
