export interface TileOption {
  name: string;
  size: number;  // in inches
  cost: number;  // per tile
  durability: number;  // 1-10 rating
  aestheticRating: number;  // 1-10 rating
  laborCostPerSqFt: number;
  maintenanceRating: number;  // 1-10 rating (10 being lowest maintenance)
} 