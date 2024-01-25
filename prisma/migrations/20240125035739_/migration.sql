/*
  Warnings:

  - You are about to drop the column `projectID` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `valid_token` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `team_Id` on the `bill` table. All the data in the column will be lost.
  - The `tokenValue` column on the `bill` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `team_id` on the `members` table. All the data in the column will be lost.
  - You are about to drop the `coupen` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `captainName` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamId` to the `bill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamId` to the `members` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Team" DROP COLUMN "projectID",
DROP COLUMN "valid_token",
ADD COLUMN     "captainName" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "projectId" INTEGER NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Pending';

-- AlterTable
ALTER TABLE "bill" DROP COLUMN "team_Id",
ADD COLUMN     "teamId" INTEGER NOT NULL,
DROP COLUMN "tokenValue",
ADD COLUMN     "tokenValue" INTEGER NOT NULL DEFAULT 50;

-- AlterTable
ALTER TABLE "members" DROP COLUMN "team_id",
ADD COLUMN     "teamId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "coupen";

-- CreateTable
CREATE TABLE "admin" (
    "id" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coupon" (
    "id" SERIAL NOT NULL,
    "otp" TEXT NOT NULL DEFAULT '',
    "is_valid" BOOLEAN NOT NULL DEFAULT true,
    "teamId" INTEGER NOT NULL,

    CONSTRAINT "coupon_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "members" ADD CONSTRAINT "members_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coupon" ADD CONSTRAINT "coupon_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bill" ADD CONSTRAINT "bill_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
