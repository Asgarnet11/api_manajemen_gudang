/*
  Warnings:

  - You are about to drop the column `jumlah` on the `items` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sku]` on the table `items` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[barcode]` on the table `items` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "public"."MovementType" AS ENUM ('IN', 'OUT', 'ADJUSTMENT');

-- AlterTable
ALTER TABLE "public"."items" DROP COLUMN "jumlah",
ADD COLUMN     "barcode" TEXT,
ADD COLUMN     "minimum_stock_level" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "sku" TEXT;

-- CreateTable
CREATE TABLE "public"."item_movements" (
    "id" TEXT NOT NULL,
    "quantityChange" INTEGER NOT NULL,
    "notes" TEXT,
    "type" "public"."MovementType" NOT NULL,
    "itemId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "item_movements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "items_sku_key" ON "public"."items"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "items_barcode_key" ON "public"."items"("barcode");

-- AddForeignKey
ALTER TABLE "public"."item_movements" ADD CONSTRAINT "item_movements_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "public"."items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."item_movements" ADD CONSTRAINT "item_movements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
