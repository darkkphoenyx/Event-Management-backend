-- DropForeignKey
ALTER TABLE "attendance" DROP CONSTRAINT "attendance_membersId_fkey";

-- CreateTable
CREATE TABLE "picture" (
    "id" SERIAL NOT NULL,
    "data" BYTEA NOT NULL,

    CONSTRAINT "picture_pkey" PRIMARY KEY ("id")
);
