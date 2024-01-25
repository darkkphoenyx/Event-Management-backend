/*
  Warnings:

  - You are about to drop the column `valid_token` on the `Team` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Team" DROP COLUMN "valid_token",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Pending';
