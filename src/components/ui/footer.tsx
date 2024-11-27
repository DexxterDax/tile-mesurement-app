import { useState } from 'react';

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
              <div className="w-[200px] h-[100px] bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <div className="p-6 flex flex-col justify-center h-full">
                  <h3 className="font-semibold text-gray-900 text-base mb-1 line-clamp-1">{member.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{member.role}</p>
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
    role: "Group Leader"
  },
  {
    name: "Javaughn Miller",
    role: "Site Developer"
  },
  {
    name: "Anjali Daley",
    role: "Information Provider"
  },
  {
    name: "Michael Green",
    role: "Information Provider"
  },
  {
    name: "Ajani Latham",
    role: "Information Provider"
  },
  {
    name: "Jadan Cooper",
    role: "Information Provider"
  }
];
