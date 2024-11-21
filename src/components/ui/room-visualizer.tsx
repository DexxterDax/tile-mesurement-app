import React from "react"

interface RoomVisualizerProps {
  roomLength: number
  roomWidth: number
  tileSize: number
  isMetric: boolean
}

export function RoomVisualizer({ roomLength, roomWidth, tileSize, isMetric }: RoomVisualizerProps) {
  // Calculate the container size (fixed viewport)
  const containerWidth = 500  
  const containerHeight = 500
  
  // Calculate scale based on the container size and room dimensions
  const scale = Math.min(
    (containerWidth * 0.85) / roomLength,
    (containerHeight * 0.85) / roomWidth
  )

  // Calculate scaled dimensions
  const scaledLength = roomLength * scale
  const scaledWidth = roomWidth * scale

  // Convert tile size to the same unit as room dimensions (feet or meters)
  const tileSizeInFeet = tileSize / 12 // Convert inches to feet
  const gridSizeScaled = tileSizeInFeet * scale

  return (
    <div className="w-full h-full min-h-[500px] relative">
      
      <div className="absolute inset-[10%] flex items-center justify-center">
        {/* Grid pattern background */}
        <div className="relative"
             style={{ 
               width: scaledLength,
               height: scaledWidth,
               backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)',
               backgroundSize: `${gridSizeScaled}px ${gridSizeScaled}px`
             }}>
          {/* Corner dots */}
          <div className="absolute -left-1.5 -top-1.5 w-3 h-3 bg-black rounded-full shadow-md"></div>
          <div className="absolute -right-1.5 -top-1.5 w-3 h-3 bg-black rounded-full shadow-md"></div>
          <div className="absolute -left-1.5 -bottom-1.5 w-3 h-3 bg-black rounded-full shadow-md"></div>
          <div className="absolute -right-1.5 -bottom-1.5 w-3 h-3 bg-black rounded-full shadow-md"></div>

          {/* Dotted lines */}
          <div className="absolute inset-0 border-2 border-dashed border-black"></div>

          {/* Measurements */}
          <div className="absolute transition-transform duration-300 hover:bg-transparent/45 hover:text-gray-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                      bg-black text-white px-3 py-1 rounded-full text-sm font-medium">
            {(roomLength * roomWidth).toFixed(2)} sq {isMetric ? 'm' : 'ft'}
          </div>

          <div className="absolute -top-8 left-1/2 -translate-x-1/2 
                      bg-black text-white px-3 py-1 rounded-full text-sm font-medium">
            {roomLength.toFixed(2)} {isMetric ? 'm' : 'ft'}
          </div>

          <div className="absolute top-1/2 -left-8 -translate-y-1/2 -rotate-90
                      bg-black text-white px-3 py-1 rounded-full text-sm font-medium">
            {roomWidth.toFixed(2)} {isMetric ? 'm' : 'ft'}
          </div>
        </div>
      </div>
    </div>
  )
} 