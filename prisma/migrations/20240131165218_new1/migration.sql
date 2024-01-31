/*
  Warnings:

  - You are about to drop the column `faculty` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `semester` on the `Team` table. All the data in the column will be lost.
  - Added the required column `streamId` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamPDF` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `memberIDcard` to the `members` table without a default value. This is not possible if the table is not empty.
  - Added the required column `memberphoto` to the `members` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectPhoto` to the `project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Team" DROP COLUMN "faculty",
DROP COLUMN "semester",
ADD COLUMN     "streamId" INTEGER NOT NULL,
ADD COLUMN     "teamPDF" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "members" ADD COLUMN     "memberIDcard" TEXT NOT NULL,
ADD COLUMN     "memberphoto" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "project" ADD COLUMN     "projectPhoto" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "stream" (
    "id" SERIAL NOT NULL,
    "level" TEXT NOT NULL,
    "option" TEXT NOT NULL,
    "class" INTEGER NOT NULL,

    CONSTRAINT "stream_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attendance" (
    "id" SERIAL NOT NULL,
    "membersId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "attendance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_streamId_fkey" FOREIGN KEY ("streamId") REFERENCES "stream"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_membersId_fkey" FOREIGN KEY ("membersId") REFERENCES "members"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
