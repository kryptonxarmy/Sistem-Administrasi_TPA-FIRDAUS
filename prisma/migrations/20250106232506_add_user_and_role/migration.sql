/*
  Warnings:

  - The values [GURU,ORANG_TUA] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `activityDate` on the `AcademicCalendar` table. All the data in the column will be lost.
  - You are about to drop the column `isCompleted` on the `AcademicCalendar` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `AcademicCalendar` table. All the data in the column will be lost.
  - You are about to drop the column `dropOffBy` on the `Attendance` table. All the data in the column will be lost.
  - You are about to drop the column `pickUpBy` on the `Attendance` table. All the data in the column will be lost.
  - You are about to drop the column `ageGroup` on the `Child` table. All the data in the column will be lost.
  - You are about to drop the column `identifier` on the `Child` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `ProgressDetail` table. All the data in the column will be lost.
  - You are about to drop the column `reportId` on the `ProgressDetail` table. All the data in the column will be lost.
  - You are about to drop the column `stage` on the `ProgressDetail` table. All the data in the column will be lost.
  - You are about to drop the column `subjects` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `birthDate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `postalCode` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `LearningAchievement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MainActivity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Report` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeachingModule` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[studentId]` on the table `Child` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Teacher` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `activity` to the `AcademicCalendar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `completed` to the `AcademicCalendar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `AcademicCalendar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Attendance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `classId` to the `Child` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `Child` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `ProgressDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `progressId` to the `ProgressDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `ProgressDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subCategory` to the `ProgressDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthDate` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postalCode` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('ADMIN', 'PARENT');
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_childId_fkey";

-- DropForeignKey
ALTER TABLE "Child" DROP CONSTRAINT "Child_parentId_fkey";

-- DropForeignKey
ALTER TABLE "LearningAchievement" DROP CONSTRAINT "LearningAchievement_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "MainActivity" DROP CONSTRAINT "MainActivity_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_senderId_fkey";

-- DropForeignKey
ALTER TABLE "ProgressDetail" DROP CONSTRAINT "ProgressDetail_reportId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_childId_fkey";

-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_userId_fkey";

-- DropForeignKey
ALTER TABLE "TeachingModule" DROP CONSTRAINT "TeachingModule_teacherId_fkey";

-- DropIndex
DROP INDEX "Child_identifier_key";

-- AlterTable
ALTER TABLE "AcademicCalendar" DROP COLUMN "activityDate",
DROP COLUMN "isCompleted",
DROP COLUMN "name",
ADD COLUMN     "activity" TEXT NOT NULL,
ADD COLUMN     "completed" BOOLEAN NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "dropOffBy",
DROP COLUMN "pickUpBy",
ADD COLUMN     "remarks" TEXT,
ADD COLUMN     "teacherId" INTEGER,
ADD COLUMN     "type" TEXT NOT NULL,
ALTER COLUMN "childId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Child" DROP COLUMN "ageGroup",
DROP COLUMN "identifier",
ADD COLUMN     "classId" INTEGER NOT NULL,
ADD COLUMN     "studentId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProgressDetail" DROP COLUMN "name",
DROP COLUMN "reportId",
DROP COLUMN "stage",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "progressId" INTEGER NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "subCategory" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "subjects",
DROP COLUMN "userId",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "birthDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "postalCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "address",
DROP COLUMN "birthDate",
DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "createdAt",
DROP COLUMN "gender",
DROP COLUMN "phone",
DROP COLUMN "postalCode",
DROP COLUMN "updatedAt";

-- DropTable
DROP TABLE "LearningAchievement";

-- DropTable
DROP TABLE "MainActivity";

-- DropTable
DROP TABLE "Message";

-- DropTable
DROP TABLE "Report";

-- DropTable
DROP TABLE "TeachingModule";

-- DropEnum
DROP TYPE "ProgressStage";

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parent" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Parent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Class" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "ageGroup" TEXT NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "week" INTEGER NOT NULL,
    "module" TEXT NOT NULL,
    "classId" INTEGER NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LearningGoal" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "activityId" INTEGER NOT NULL,

    CONSTRAINT "LearningGoal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityDetail" (
    "id" SERIAL NOT NULL,
    "day" TEXT NOT NULL,
    "activity" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL,
    "remarks" TEXT NOT NULL,
    "activityId" INTEGER NOT NULL,

    CONSTRAINT "ActivityDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoreActivity" (
    "id" SERIAL NOT NULL,
    "week" INTEGER NOT NULL,
    "day" TEXT NOT NULL,
    "activity" TEXT NOT NULL,
    "remarks" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL,
    "classId" INTEGER NOT NULL,
    "teacherId" INTEGER,

    CONSTRAINT "CoreActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Progress" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "moralValue" TEXT NOT NULL,
    "motorGross" TEXT NOT NULL,
    "motorFine" TEXT NOT NULL,
    "cognitive" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "social" TEXT NOT NULL,
    "reflection" TEXT NOT NULL,
    "comments" TEXT,
    "childId" INTEGER NOT NULL,

    CONSTRAINT "Progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT,
    "link" TEXT,
    "day" TEXT,
    "date" TIMESTAMP(3),
    "menu" TEXT,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_userId_key" ON "Admin"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Parent_userId_key" ON "Parent"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Child_studentId_key" ON "Child"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_email_key" ON "Teacher"("email");

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parent" ADD CONSTRAINT "Parent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Child" ADD CONSTRAINT "Child_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Parent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Child" ADD CONSTRAINT "Child_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LearningGoal" ADD CONSTRAINT "LearningGoal_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityDetail" ADD CONSTRAINT "ActivityDetail_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoreActivity" ADD CONSTRAINT "CoreActivity_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoreActivity" ADD CONSTRAINT "CoreActivity_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgressDetail" ADD CONSTRAINT "ProgressDetail_progressId_fkey" FOREIGN KEY ("progressId") REFERENCES "Progress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
