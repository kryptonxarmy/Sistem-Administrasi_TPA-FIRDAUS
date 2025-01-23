-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profilePhoto" TEXT;

-- CreateTable
CREATE TABLE "Kegiatan" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Kegiatan_pkey" PRIMARY KEY ("id")
);
