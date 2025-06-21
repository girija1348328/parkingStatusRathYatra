-- CreateTable
CREATE TABLE "Conjestion" (
    "id" SERIAL NOT NULL,
    "checkPointName" TEXT NOT NULL,
    "inFlow" INTEGER NOT NULL,
    "outFlow" INTEGER NOT NULL,
    "netFlow" INTEGER NOT NULL,
    "thresold" INTEGER NOT NULL,
    "colorCode" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Conjestion_pkey" PRIMARY KEY ("id")
);
