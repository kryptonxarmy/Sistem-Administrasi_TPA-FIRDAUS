/*
  Warnings:

  - You are about to drop the column `activity` on the `CoreActivity` table. All the data in the column will be lost.
  - You are about to drop the column `remarks` on the `CoreActivity` table. All the data in the column will be lost.
  - You are about to drop the column `teacherId` on the `CoreActivity` table. All the data in the column will be lost.
  - You are about to drop the column `activityId` on the `LearningGoal` table. All the data in the column will be lost.
  - You are about to drop the `Activity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ActivityDetail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Allocation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `learningModuleId` to the `CoreActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `CoreActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `moduleId` to the `LearningGoal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `conceptMap` to the `LearningModule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `durationWeeks` to the `LearningModule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `facilityDesc` to the `LearningModule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pancasilaDesc` to the `LearningModule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semesterId` to the `LearningModule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_allocationId_fkey";

-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_classId_fkey";

-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_learningModuleId_fkey";

-- DropForeignKey
ALTER TABLE "ActivityDetail" DROP CONSTRAINT "ActivityDetail_activityId_fkey";

-- DropForeignKey
ALTER TABLE "CoreActivity" DROP CONSTRAINT "CoreActivity_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "LearningGoal" DROP CONSTRAINT "LearningGoal_activityId_fkey";

-- AlterTable
ALTER TABLE "Attendance" ADD COLUMN     "pengantar" TEXT,
ADD COLUMN     "penjemput" TEXT;

-- AlterTable
ALTER TABLE "Class" ADD COLUMN     "semesterId" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "CoreActivity" DROP COLUMN "activity",
DROP COLUMN "remarks",
DROP COLUMN "teacherId",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "learningModuleId" INTEGER NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "LearningGoal" DROP COLUMN "activityId",
ADD COLUMN     "moduleId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "LearningModule" ADD COLUMN     "conceptMap" TEXT NOT NULL,
ADD COLUMN     "durationWeeks" INTEGER NOT NULL,
ADD COLUMN     "facilityDesc" TEXT NOT NULL,
ADD COLUMN     "pancasilaDesc" TEXT NOT NULL,
ADD COLUMN     "semesterId" INTEGER NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- DropTable
DROP TABLE "Activity";

-- DropTable
DROP TABLE "ActivityDetail";

-- DropTable
DROP TABLE "Allocation";

-- CreateTable
CREATE TABLE "AcademicYear" (
    "id" SERIAL NOT NULL,
    "year" TEXT NOT NULL,

    CONSTRAINT "AcademicYear_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Semester" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "academicYearId" INTEGER NOT NULL,
    "weeks" INTEGER NOT NULL,

    CONSTRAINT "Semester_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ClassLearningModules" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ClassLearningModules_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ClassLearningModules_B_index" ON "_ClassLearningModules"("B");

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoreActivity" ADD CONSTRAINT "CoreActivity_learningModuleId_fkey" FOREIGN KEY ("learningModuleId") REFERENCES "LearningModule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Semester" ADD CONSTRAINT "Semester_academicYearId_fkey" FOREIGN KEY ("academicYearId") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LearningModule" ADD CONSTRAINT "LearningModule_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LearningGoal" ADD CONSTRAINT "LearningGoal_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "LearningModule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassLearningModules" ADD CONSTRAINT "_ClassLearningModules_A_fkey" FOREIGN KEY ("A") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassLearningModules" ADD CONSTRAINT "_ClassLearningModules_B_fkey" FOREIGN KEY ("B") REFERENCES "LearningModule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
