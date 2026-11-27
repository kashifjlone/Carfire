/**
 * Calculates algorithmic indicative trade-in valuation
 * based on vehicle age, odometer, and condition tier.
 */
export function estimateTradeInValuation(params: {
  year: number;
  odometerKm: number;
  condition: "excellent" | "good" | "fair" | "poor";
}): { minAud: number; maxAud: number; indicativeTradeAud: number } {
  const currentYear = new Date().getFullYear();
  const age = Math.max(0, currentYear - params.year);

  // Base starting valuation curve
  let baseValue = Math.max(3000, 32000 - age * 2200);

  // Odometer adjustment
  const expectedKm = age * 15000;
  const kmDifference = params.odometerKm - expectedKm;
  if (kmDifference > 0) {
    baseValue -= Math.min(6000, (kmDifference / 10000) * 400);
  } else {
    baseValue += Math.min(3000, (Math.abs(kmDifference) / 10000) * 300);
  }

  // Condition multiplier
  const multipliers = {
    excellent: 1.1,
    good: 1.0,
    fair: 0.85,
    poor: 0.65,
  };
  const adjusted = Math.max(1500, Math.round(baseValue * multipliers[params.condition]));

  const minAud = Math.round((adjusted * 0.92) / 100) * 100;
  const maxAud = Math.round((adjusted * 1.08) / 100) * 100;
  const indicativeTradeAud = Math.round(adjusted / 100) * 100;

  return { minAud, maxAud, indicativeTradeAud };
}
