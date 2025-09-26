-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('masuk_gudang', 'keluar_gudang', 'dalam_kontainer');

-- CreateTable
CREATE TABLE "public"."items" (
    "id" TEXT NOT NULL,
    "nama_barang" TEXT NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "status" "public"."Status" NOT NULL DEFAULT 'masuk_gudang',
    "tanggal_masuk" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggal_keluar" TIMESTAMP(3),
    "customerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."items" ADD CONSTRAINT "items_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
