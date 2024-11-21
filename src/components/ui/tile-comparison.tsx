import { Card} from "./card"
import { Button } from "./button"
import { Star } from "lucide-react"
import { TileOption } from "@/types/types";

interface TileComparisonProps {
  options: TileOption[];
  roomArea: number;
  onSelectOption: (option: TileOption) => void;
}

export function TileComparison({ options, roomArea, onSelectOption }: TileComparisonProps) {
  const calculateTotalCost = (option: TileOption) => {
    const areaInSqFt = roomArea * 10.764;  // convert m² to ft²
    const laborCost = areaInSqFt * option.laborCostPerSqFt;
    const tilesNeeded = Math.ceil((roomArea * 10000) / (option.size * 2.54) ** 2 * 1.1);
    const materialCost = tilesNeeded * option.cost;
    return { laborCost, materialCost, total: laborCost + materialCost };
  };

  const getBestOption = () => {
    return options.reduce((best, current) => {
      const currentCost = calculateTotalCost(current).total;
      const bestCost = calculateTotalCost(best).total;
      const currentScore = current.durability + current.aestheticRating + current.maintenanceRating - (currentCost / 1000);
      const bestScore = best.durability + best.aestheticRating + best.maintenanceRating - (bestCost / 1000);
      return currentScore > bestScore ? current : best;
    }, options[0]);
  };

  const renderRatingBar = (rating: number) => (
    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
      <div 
        className="h-full bg-blue-500 transition-all duration-300"
        style={{ width: `${rating * 10}%` }}
      />
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {options.map((option, index) => {
        const costs = calculateTotalCost(option);
        const isRecommended = option === getBestOption();

        return (
          <Card 
            key={index} 
            className={`relative p-6 rounded-xl transition-transform duration-300 hover:scale-105 ${
              isRecommended ? 'ring-2 ring-blue-500' : 'ring-1 ring-gray-200'
            }`}
          >
            {isRecommended && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <div className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                  <Star className="w-4 h-4" />
                  <span>Best Choice</span>
                </div>
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-1">{option.name}</h3>
              <p className="text-gray-500">{option.size}″ × {option.size}″ tiles</p>
            </div>

            <div className="space-y-6">
              {/* Costs */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Material Cost</span>
                  <span className="font-medium">${costs.materialCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Labor Cost</span>
                  <span className="font-medium">${costs.laborCost.toFixed(2)}</span>
                </div>
                <div className="pt-3 border-t border-gray-100">
                  <div className="flex justify-between items-baseline">
                    <span className="font-medium">Total Cost</span>
                    <span className="text-xl font-bold">${costs.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Ratings */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Durability</span>
                    <span className="text-sm font-medium">{option.durability}/10</span>
                  </div>
                  {renderRatingBar(option.durability)}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Aesthetics</span>
                    <span className="text-sm font-medium">{option.aestheticRating}/10</span>
                  </div>
                  {renderRatingBar(option.aestheticRating)}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Maintenance</span>
                    <span className="text-sm font-medium">{option.maintenanceRating}/10</span>
                  </div>
                  {renderRatingBar(option.maintenanceRating)}
                </div>
              </div>

              <Button 
                onClick={() => onSelectOption(option)}
                className={`w-full py-6 rounded-xl ${
                  isRecommended 
                    ? 'bg-blue-500 hover:bg-blue-600' 
                    : 'bg-gray-900 hover:bg-gray-800'
                }`}
              >
                Select {option.name}
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
} 