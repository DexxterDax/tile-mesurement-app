import { useState } from 'react';
import Image from 'next/image';

export default function Footer() {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

  return (
    <footer className="bg-white py-16 mt-15">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="text-center mb-12">
          <h4 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900">
            Group 3
          </h4>
          <p className="text-gray-600 text-lg">
            Our Members
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="flex justify-center items-center gap-4">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`transition-all duration-300 ${
                hoveredMember === index ? 'scale-105' : ''
              }`}
              onMouseEnter={() => setHoveredMember(index)}
              onMouseLeave={() => setHoveredMember(null)}
            >
              <div className="w-[180px] bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="aspect-square relative">
                  <Image
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 text-sm">{member.name}</h3>
                  <p className="text-xs text-gray-500">{member.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

const teamMembers = [

  {
    name: "Ronjae Brown",
    role: "Group Leader",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop"
  },

  {
    name: "Javaughn Miller",
    role: "Site Developer",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop"
  },
  {
    name: "Anjali Daley",
    role: "Information Provider",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop"
  },
  {
    name: "Michael Green",
    role: "Information Provider",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop"
  },
  {
    name: "Ajani Latham",
    role: "Information Provider",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop"
  },
  {
    name: "Jadan Cooper",
    role: "Information Provider",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop"
  },
];
