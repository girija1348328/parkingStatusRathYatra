/*
  Warnings:

  - Added the required column `occupied` to the `ParkingSpot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ParkingSpot" ADD COLUMN     "occupied" INTEGER NOT NULL;
