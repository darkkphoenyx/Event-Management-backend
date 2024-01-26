/*
  Warnings:

  - You are about to drop the column `projectId` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `teamId` on the `bill` table. All the data in the column will be lost.
  - You are about to drop the column `teamId` on the `members` table. All the data in the column will be lost.
  - You are about to drop the `coupon` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `projectID` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valid_token` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `team_Id` to the `bill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `team_id` to the `members` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_projectId_fkey";

-- DropForeignKey
ALTER TABLE "bill" DROP CONSTRAINT "bill_teamId_fkey";

-- DropForeignKey
ALTER TABLE "coupon" DROP CONSTRAINT "coupon_teamId_fkey";

-- DropForeignKey
ALTER TABLE "members" DROP CONSTRAINT "members_teamId_fkey";

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "projectId",
DROP COLUMN "status",
ADD COLUMN     "projectID" INTEGER NOT NULL,
ADD COLUMN     "valid_token" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "bill" DROP COLUMN "teamId",
ADD COLUMN     "team_Id" INTEGER NOT NULL,
ALTER COLUMN "tokenValue" DROP DEFAULT,
ALTER COLUMN "tokenValue" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "members" DROP COLUMN "teamId",
ADD COLUMN     "team_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "coupon";

-- CreateTable
CREATE TABLE "coupen" (
    "id" SERIAL NOT NULL,
    "otp" TEXT NOT NULL DEFAULT '',
    "qty" INTEGER NOT NULL,
    "is_valid" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "coupen_pkey" PRIMARY KEY ("id")
);
