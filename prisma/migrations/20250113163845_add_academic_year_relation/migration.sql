/*
  Warnings:

  - Added the required column `academicYearId` to the `Attendance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semesterId` to the `Attendance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `academicYearId` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semesterId` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `academicYearId` to the `Progress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semesterId` to the `Progress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attendance" ADD COLUMN     "academicYearId" INTEGER NOT NULL,
ADD COLUMN     "semesterId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "academicYearId" INTEGER NOT NULL,
ADD COLUMN     "semesterId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Progress" ADD COLUMN     "academicYearId" INTEGER NOT NULL,
ADD COLUMN     "semesterId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_academicYearId_fkey" FOREIGN KEY ("academicYearId") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_academicYearId_fkey" FOREIGN KEY ("academicYearId") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_academicYearId_fkey" FOREIGN KEY ("academicYearId") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
