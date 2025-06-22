const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const destinations = [
  { name: "Malatipatapur bus stand", latitude: 19.862466, longitude: 85.835728, people: "tourist", vehicleType: "bus", capacity: 200, occupied: 180, vacant: 20, colorCode: "red" },
  { name: "Nagapatana", latitude: 19.834664, longitude: 85.879662, people: "tourist", vehicleType: "bus", capacity: 200, occupied: 180, vacant: 20, colorCode: "red" },
  { name: "Talabania bus Stand parking", latitude: 19.811516, longitude: 85.849319, people: "regular", vehicleType: "bus", capacity: 30, occupied: 27, vacant: 3, colorCode: "red" },
  { name: "Yatrika Parking", latitude: 19.790777, longitude: 85.808508, people: "pass", vehicleType: "car", capacity: 500, occupied: 350, vacant: 150, colorCode: "orange" },
  { name: "Nali Field Parking", latitude: 19.791893, longitude: 85.808367, people: "pass", vehicleType: "car", capacity: 70, occupied: 63, vacant: 7, colorCode: "red" },
  { name: "Horticulture Farm", latitude: 19.825738, longitude: 85.862207, people: "nopass", vehicleType: "car", capacity: 200, occupied: 120, vacant: 80, colorCode: "greed" },
  { name: "ITI", latitude: 19.807602, longitude: 85.850039, people: "nopass", vehicleType: "car", capacity: 700, occupied: 640, vacant: 60, colorCode: "red" },
  { name: "Jagannath ballav parking", latitude: 19.812161, longitude: 85.823690, people: "pass", vehicleType: "car", capacity: 800, occupied: null, vacant: 800, colorCode: null },
  { name: "Gadadhar", latitude: 19.815811, longitude: 85.831028, people: "pass", vehicleType: "car", capacity: 700, occupied: null, vacant: 700, colorCode: null },
  { name: "Jagannath Ballav Old Parking", latitude: 19.810872, longitude: 85.831309, people: "nopass", vehicleType: "bike", capacity: 5000, occupied: 3000, vacant: 2000, colorCode: "green" },
  { name: "Matitota Playground", latitude: 19.82130797, longitude: 85.81317958, people: "general", vehicleType: "bike", capacity: 5000, occupied: 2000, vacant: 3000, colorCode: null },
  { name: "Barabati Kalyani Mandap", latitude: 19.803339, longitude: 85.813653, people: "vvip", vehicleType: "car", capacity: 50, occupied: null, vacant: 50, colorCode: null },
  { name: "Lokanatha Parking", latitude: 19.804390, longitude: 85.811344, people: "vvip", vehicleType: "car", capacity: 250, occupied: null, vacant: 200, colorCode: null },
  { name: "Gadadhar high school", latitude: 19.804644, longitude: 85.811088, people: "vvip", vehicleType: "car", capacity: 150, occupied: 100, vacant: 50, colorCode: "green" },
  { name: "Swami Narayan Temple", latitude: 19.804644, longitude: 85.811088, people: "nopass", vehicleType: "bus", capacity: 50, occupied: 30, vacant: 20, colorCode: "green" },
  { name: "Indoor Stadium", latitude: 19.804644, longitude: 85.811088, people: "nopass", vehicleType: "car", capacity: 800, occupied: 350, vacant: 450, colorCode: "green" },
  { name: "Matitota Helipad", latitude: 19.8098628, longitude: 85.8478026, people: "nopass", vehicleType: "bike", capacity: 5000, occupied: 1420, vacant: 3580, colorCode: "green" },
  { name: "Talabania 2", latitude: 19.8119346, longitude: 85.8495337, people: "nopass", vehicleType: "car", capacity: 50, occupied: 30, vacant: 20, colorCode: "green" },
  { name: "Sterling Parking", latitude: 19.7857526, longitude: 85.7899782, people: "nopass", vehicleType: "car", capacity: 200, occupied: 180, vacant: 20, colorCode: "red" },
  { name: "Sterling Parking", latitude: 19.7857526, longitude: 85.7899782, people: "nopass", vehicleType: "car", capacity: 200, occupied: 180, vacant: 20, colorCode: "red" },
  { name: "SMS College", latitude: 19.7857526, longitude: 85.7899782, people: "nopass", vehicleType: "car", capacity: 600, occupied: 420, vacant: 180, colorCode: "orange" },
  { name: "OLA Guest House", latitude: 19.7857526, longitude: 85.7899782, people: "nopass", vehicleType: "car", capacity: 350, occupied: 200, vacant: 150, colorCode: "green" },
  { name: "Jagannath Ballav New Parking", latitude: 19.7857526, longitude: 85.7899782, people: "nopass", vehicleType: "car", capacity: 800, occupied: 560, vacant: 240, colorCode: "orange" },
  { name: "Blueflag Beach", latitude: 19.7857526, longitude: 85.7899782, people: "nopass", vehicleType: "bike", capacity: 1500, occupied: 1400, vacant: 100, colorCode: "red" },
  { name: "Neelachala", latitude: 19.7857526, longitude: 85.7899782, people: "nopass", vehicleType: "bike", capacity: 3500, occupied: 2540, vacant: 960, colorCode: "orange" },
  { name: "Holiday Resort", latitude: 19.7857526, longitude: 85.7899782, people: "nopass", vehicleType: "bike", capacity: 500, occupied: 300, vacant: 200, colorCode: "green" }
];


async function main() {
  for (const dest of destinations) {
    await prisma.parkingSpot.create({ data: dest });
  }
  console.log("Seeded successfully!");
}

main().finally(() => prisma.$disconnect());
