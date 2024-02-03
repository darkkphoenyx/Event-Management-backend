/*
  Warnings:

  - You are about to drop the column `memberIDcard` on the `members` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "members" DROP COLUMN "memberIDcard",
ADD COLUMN     "pdfPath" TEXT;
