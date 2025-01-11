/*
  Warnings:

  - You are about to drop the column `status` on the `ProgressDetail` table. All the data in the column will be lost.
  - You are about to drop the column `subCategory` on the `ProgressDetail` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProgressDetail" DROP COLUMN "status",
DROP COLUMN "subCategory";

-- CreateTable
CREATE TABLE "SubCategoryDetail" (
    "id" SERIAL NOT NULL,
    "progressDetailId" INTEGER NOT NULL,
    "subCategory" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "SubCategoryDetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SubCategoryDetail" ADD CONSTRAINT "SubCategoryDetail_progressDetailId_fkey" FOREIGN KEY ("progressDetailId") REFERENCES "ProgressDetail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
