/*
  Warnings:

  - You are about to drop the column `pdfPath` on the `attendance` table. All the data in the column will be lost.
  - You are about to drop the column `memberIDcard` on the `members` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "attendance" DROP COLUMN "pdfPath";

-- AlterTable
ALTER TABLE "members" DROP COLUMN "memberIDcard",
ADD COLUMN     "pdfPath" TEXT;
