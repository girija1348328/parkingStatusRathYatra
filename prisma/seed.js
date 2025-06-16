const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const destinations = [
  { name: "Malatipatapur bus stand", latitude: 19.862466, longitude: 85.835728, people: "tourist", vehicleType: "bus", capacity: 500, vacant: 300 },
  { name: "Nagapatana", latitude: 19.834664, longitude: 85.879662, people: "tourist", vehicleType: "bus", capacity: 500, vacant: 300 },
  { name: "Talabania parking", latitude: 19.811516, longitude: 85.849319, people: "regular", vehicleType: "bus", capacity: 1100, vacant: 850 },
  { name: "Yatrika Parking", latitude: 19.790777, longitude: 85.808508, people: "nopass", vehicleType: "car", capacity: 1000, vacant: 700 },
  { name: "Nali Field Parking", latitude: 19.791893, longitude: 85.808367, people: "nopass", vehicleType: "car", capacity: 1000, vacant: 700 },
  { name: "Horticulture Farm", latitude: 19.825738, longitude: 85.862207, people: "nopass", vehicleType: "car", capacity: 1000, vacant: 700 },
  { name: "ITI", latitude: 19.807602, longitude: 85.850039, people: "nopass", vehicleType: "car", capacity: 1000, vacant: 700 },
  { name: "Jagannath ballav parking", latitude: 19.812161, longitude: 85.823690, people: "pass", vehicleType: "car", capacity: 800, vacant: 800 },
  { name: "Gadadhar", latitude: 19.815811, longitude: 85.831028, people: "pass", vehicleType: "car", capacity: 700, vacant: 700 },
  { name: "Jagannath Ballav Old Parking", latitude: 19.810872, longitude: 85.831309, people: "general", vehicleType: "bike", capacity: 700, vacant: 600 },
  { name: "Matitota", latitude: 19.821308, longitude: 85.813180, people: "general", vehicleType: "bike", capacity: 2000, vacant: 100 },
  { name: "Barabati Kalyani Mandap", latitude: 19.803339, longitude: 85.813653, people: "vvip", vehicleType: "car", capacity: 50, vacant: 50 },
  { name: "Lokanatha/chhapan chaka", latitude: 19.804390, longitude: 85.811344, people: "vvip", vehicleType: "car", capacity: 250, vacant: 200 },
  { name: "Gadadhar high school", latitude: 19.804644, longitude: 85.811088, people: "vvip", vehicleType: "car", capacity: 130, vacant: 100 }
];

async function main() {
  for (const dest of destinations) {
    await prisma.parkingSpot.create({ data: dest });
  }
  console.log("Seeded successfully!");
}

main().finally(() => prisma.$disconnect());
