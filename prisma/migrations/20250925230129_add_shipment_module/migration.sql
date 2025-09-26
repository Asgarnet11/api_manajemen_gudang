-- CreateEnum
CREATE TYPE "public"."ShipmentStatus" AS ENUM ('LOADING', 'IN_TRANSIT', 'ARRIVED', 'COMPLETED');

-- AlterTable
ALTER TABLE "public"."items" ADD COLUMN     "shipmentId" TEXT;

-- CreateTable
CREATE TABLE "public"."shipments" (
    "id" TEXT NOT NULL,
    "trackingNumber" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "etd" TIMESTAMP(3) NOT NULL,
    "eta" TIMESTAMP(3) NOT NULL,
    "status" "public"."ShipmentStatus" NOT NULL DEFAULT 'LOADING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shipments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "shipments_trackingNumber_key" ON "public"."shipments"("trackingNumber");

-- AddForeignKey
ALTER TABLE "public"."items" ADD CONSTRAINT "items_shipmentId_fkey" FOREIGN KEY ("shipmentId") REFERENCES "public"."shipments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
