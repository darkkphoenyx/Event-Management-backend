/*
  Warnings:

  - Added the required column `captainName` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Made the column `status` on table `Team` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "captainName" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ALTER COLUMN "status" SET NOT NULL;

-- CreateTable
CREATE TABLE "admin" (
    "id" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);
