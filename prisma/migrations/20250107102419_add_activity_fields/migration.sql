/*
  Warnings:

  - You are about to drop the column `module` on the `Activity` table. All the data in the column will be lost.
  - Added the required column `allocationId` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `facilityDesc` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `moduleId` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profilePancasilaDesc` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "module",
ADD COLUMN     "allocationId" INTEGER NOT NULL,
ADD COLUMN     "facilityDesc" TEXT NOT NULL,
ADD COLUMN     "moduleId" INTEGER NOT NULL,
ADD COLUMN     "profilePancasilaDesc" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Module" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Module_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Allocation" (
    "id" SERIAL NOT NULL,
    "duration" TEXT NOT NULL,

    CONSTRAINT "Allocation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_allocationId_fkey" FOREIGN KEY ("allocationId") REFERENCES "Allocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
