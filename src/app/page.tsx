'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Footer from "@/components/ui/footer"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { RoomVisualizer } from "@/components/ui/room-visualizer"
import { TileComparison } from "@/components/ui/tile-comparison"
import { ArrowRight, X } from "lucide-react"

interface TileOption {
  name: string;
  size: number;  // in inches
  cost: number;  // per tile
  durability: number;  // 1-10 rating
  aestheticRating: number;  // 1-10 rating
  laborCostPerSqFt: number;
  maintenanceRating: number;  // 1-10 rating (10 being lowest maintenance)
}

const DEFAULT_COST_PER_SQFT = 6.00

export default function Home() {
  const [dimensions, setDimensions] = useState({
    length: '',
    width: '',
    tileSize: '',
    tileCost: ''
  })

  const [isMetric, setIsMetric] = useState(false)
  const [result, setResult] = useState<{
    totalArea: number;
    tilesNeeded: number;
    totalCost: number;
    materialCost: number;
    laborCost: number;
  } | null>(null)

  const [tileOptions, setTileOptions] = useState<TileOption[]>([
    {
      name: "Ceramic Tile",
      size: 12, // 12 inches
      cost: 5.99,
      durability: 7,
      aestheticRating: 8,
      laborCostPerSqFt: 5.50,
      maintenanceRating: 8
    },
    {
      name: "Porcelain Tile",
      size: 12,
      cost: 8.99,
      durability: 9,
      aestheticRating: 9,
      laborCostPerSqFt: 6.00,
      maintenanceRating: 9
    },
    {
      name: "Natural Stone",
      size: 12,
      cost: 12.99,
      durability: 8,
      aestheticRating: 10,
      laborCostPerSqFt: 7.50,
      maintenanceRating: 6
    }
  ]);

  const [showComparison, setShowComparison] = useState(false);

  const calculateTiles = () => {
    // Convert inputs to numbers
    let roomLength = parseFloat(dimensions.length)
    let roomWidth = parseFloat(dimensions.width)
    const tileSizeInches = parseFloat(dimensions.tileSize)
    const costPerTile = parseFloat(dimensions.tileCost)

    // Convert feet to meters if needed
    if (!isMetric) {
      roomLength = roomLength * 0.3048
      roomWidth = roomWidth * 0.3048
    }

    // Convert inches to centimeters for tile size
    const tileSizeCm = tileSizeInches * 2.54

    // Validate inputs
    if (!roomLength || !roomWidth || !tileSizeCm || !costPerTile) {
      alert('Please fill in all fields with valid numbers')
      return
    }

    // Convert room dimensions to cm² (from meters)
    const roomArea = roomLength * roomWidth * 10000 // convert m² to cm²
    const roomAreaSqFt = roomLength * roomWidth * 10.764 // convert m² to sq ft

    // Calculate tile size in cm²
    const tileArea = tileSizeCm * tileSizeCm

    // Calculate number of tiles needed (adding 10% for waste)
    const baseTilesNeeded = Math.ceil(roomArea / tileArea)
    const tilesWithWaste = Math.ceil(baseTilesNeeded * 1.1)

    // Find selected tile option to get labor cost
    const selectedTile = tileOptions.find(t => 
      t.size === tileSizeInches && t.cost === costPerTile
    )
    const laborCostPerSqFt = selectedTile?.laborCostPerSqFt || DEFAULT_COST_PER_SQFT // default if not found

    // Calculate total costs
    const materialCost = tilesWithWaste * costPerTile
    const laborCost = roomAreaSqFt * laborCostPerSqFt
    const totalCost = materialCost + laborCost

    setResult({
      totalArea: roomArea / 10000, // convert back to m² for display
      tilesNeeded: tilesWithWaste,
      totalCost: Number(totalCost.toFixed(2)),
      materialCost: Number(materialCost.toFixed(2)),
      laborCost: Number(laborCost.toFixed(2))
    })

    
    const updatedTileOptions = tileOptions.map(option => ({
      ...option,
      size: tileSizeInches,
      laborCostPerSqFt: laborCostPerSqFt
    }))
    
    setTileOptions(updatedTileOptions)
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="py-3 px-3 sm:px-6 border-b">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-500 rounded-lg"></div>
            <span className="font-semibold text-lg">TileCalc</span>
          </div>
          <div className="flex gap-3 sm:gap-6 text-sm">
            <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Features</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Support</a>
          </div>
          <Button className="bg-black text-white hover:bg-black/90 rounded-full transition-transform duration-300 hover:scale-105 px-3 sm:px-5">
            Free Trial
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-3 sm:px-6 pt-8 sm:pt-16 pb-2 sm:pb-8 text-center">
        <div className="inline-flex items-center gap-2 bg-gray-100 px-2.5 sm:px-3 py-1.5 rounded-full mb-5 sm:mb-6 text-sm">
          <span className="text-blue-500">🎉 New</span>
          <span className="text-gray-600">Advanced calculator</span>
          <span className="text-gray-400">→</span>
        </div>
        
        <h1 className="text-3xl sm:text-[54px] font-bold leading-tight mb-3 sm:mb-5 bg-clip-text text-transparent bg-gradient-to-r from-black via-black/50 to-black animate-gradient bg-[length:200%_auto]">
          Tile Calculator Pro
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-10 max-w-xl mx-auto">
          Calculate your tiling needs with precision. Save time and money by getting accurate measurements for your next project.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-2.5 sm:gap-3 px-3 sm:px-0 pb-12">
        <Button className="bg-black text-white hover:bg-black/90 transition-transform duration-300 hover:scale-105 rounded-full px-5 sm:px-7 py-3 sm:py-5 text-base">
          Start now - for free
        </Button>
        <Button variant="outline" className="rounded-full transition-transform duration-300 hover:scale-105 px-5 sm:px-7 py-3 sm:py-5 text-base">
          Schedule a demo
        </Button>
      </div>

      {/* Calculator Section */}
      <div className="max-w-6xl mx-auto px-3 sm:px-6">
        <div className={`grid grid-cols-1 ${result ? 'sm:grid-cols-2' : 'sm:place-items-center'} gap-6`}>
          <Card className={`bg-gray-50/50 border-0 shadow-lg ring-1 ring-black/5 hover:ring-blue-500/20 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 rounded-2xl ${!result && 'max-w-lg w-full'}`}>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Calculate Your Project</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium">Room Length ({isMetric ? 'm' : 'ft'})</label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsMetric(!isMetric)}
                      className="text-xs h-6 px-2 rounded-full"
                    >
                      {isMetric ? 'Switch to ft' : 'Switch to m'}
                    </Button>
                  </div>
                  <Input 
                    type="number" 
                    placeholder={`Enter length in ${isMetric ? 'meters' : 'feet'}`}
                    value={dimensions.length}
                    onChange={(e) => setDimensions(prev => ({...prev, length: e.target.value}))}
                    className="bg-white border-gray-200 rounded-md"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Room Width ({isMetric ? 'm' : 'ft'})</label>
                  <Input 
                    type="number" 
                    placeholder={`Enter width in ${isMetric ? 'meters' : 'feet'}`}
                    value={dimensions.width}
                    onChange={(e) => setDimensions(prev => ({...prev, width: e.target.value}))}
                    className="bg-white border-gray-200"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 rounded-lg block">Tile Size (inches)</label>
                <Input 
                  type="number" 
                  placeholder="Enter tile size (e.g., 12 for 12x12in)"
                  value={dimensions.tileSize}
                  onChange={(e) => setDimensions(prev => ({...prev, tileSize: e.target.value}))}
                  className="bg-white border-gray-200"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Cost per Tile ($)</label>
                <Input 
                  type="number" 
                  placeholder="Enter cost per tile"
                  value={dimensions.tileCost}
                  onChange={(e) => setDimensions(prev => ({...prev, tileCost: e.target.value}))}
                  className="bg-white border-gray-200"
                />
              </div>

              <Button 
                className="w-full bg-black text-white hover:bg-black/90 transition-transform duration-300 hover:scale-105 rounded-full py-6 text-lg"
                onClick={calculateTiles}
              >
                Calculate
              </Button>

              {result && (
                <div className="bg-white rounded-2xl p-6 space-y-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Total Area</div>
                    <div className="text-2xl font-semibold">{result.totalArea.toFixed(2)} m²</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Tiles Required</div>
                    <div className="text-2xl font-semibold">{result.tilesNeeded} tiles</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Total Cost</div>
                    <div className="text-2xl font-semibold">
                      ${result.totalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Material Cost</div>
                    <div className="text-2xl font-semibold">
                      ${result.materialCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Labor Cost</div>
                    <div className="text-2xl font-semibold">
                      ${result.laborCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>
              )}

              {result && (
                <div className="mt-6">
                  <Button
                    onClick={() => setShowComparison(true)}
                    className="group flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full"
                  >
                    Compare Tile Options
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {result && (
            <div className="bg-gray-50/50 border-0 shadow-lg ring-1 ring-black/5 rounded-2xl  hover:ring-blue-500/20 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 p-6">
              <CardTitle className="text-lg sm:text-xl pb-3">Room Visualizer</CardTitle>
              <RoomVisualizer 
                roomLength={parseFloat(dimensions.length)}
                roomWidth={parseFloat(dimensions.width)}
                tileSize={parseFloat(dimensions.tileSize)}
                isMetric={isMetric}
              />
            </div>
          )}
        </div>
      </div>

      {showComparison && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Compare Tile Options</h2>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowComparison(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <TileComparison
              options={tileOptions}
              roomArea={result?.totalArea || 0}
              onSelectOption={(option) => {
                setDimensions(prev => ({
                  ...prev,
                  tileSize: option.size.toString(),
                  tileCost: option.cost.toString()
                }));
                setShowComparison(false);
              }}
            />
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
