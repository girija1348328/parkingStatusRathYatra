-- AlterTable
ALTER TABLE "ParkingSpot" ADD COLUMN     "colorCode" TEXT,
ALTER COLUMN "vacant" DROP NOT NULL,
ALTER COLUMN "occupied" DROP NOT NULL;
