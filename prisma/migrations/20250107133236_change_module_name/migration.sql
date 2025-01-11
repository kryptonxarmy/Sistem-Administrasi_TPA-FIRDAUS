/*
  Warnings:

  - You are about to drop the column `moduleId` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the `Module` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `learningModuleId` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_moduleId_fkey";

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "moduleId",
ADD COLUMN     "learningModuleId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Module";

-- CreateTable
CREATE TABLE "LearningModule" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "LearningModule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_learningModuleId_fkey" FOREIGN KEY ("learningModuleId") REFERENCES "LearningModule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
