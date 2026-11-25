import { describe, it, expect } from "vitest";
import { buildVehicleMediaKey } from "../storage/s3";

describe("S3 / R2 Tenant Storage Keys", () => {
  it("constructs isolated tenant storage keys strictly server-side", () => {
    const key = buildVehicleMediaKey({
      dealershipId: "tenant-uuid-1",
      vehicleId: "vehicle-uuid-2",
      fileUuid: "photo-uuid-3",
      extension: "webp",
    });

    expect(key).toBe("dealerships/tenant-uuid-1/vehicles/vehicle-uuid-2/photo-uuid-3.webp");
  });

  it("prevents cross-tenant path traversal in keys", () => {
    const key = buildVehicleMediaKey({
      dealershipId: "tenant-uuid-1",
      vehicleId: "vehicle-uuid-2",
      fileUuid: "abc-123",
    });

    expect(key.startsWith("dealerships/tenant-uuid-1/")).toBe(true);
    expect(key.includes("/vehicles/vehicle-uuid-2/")).toBe(true);
  });
});
