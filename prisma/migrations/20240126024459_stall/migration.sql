/*
  Warnings:

  - You are about to drop the `Todo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Todo";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "teamName" TEXT NOT NULL,
    "faculty" TEXT NOT NULL,
    "semester" INTEGER NOT NULL,
    "captainName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "projectId" INTEGER NOT NULL,
    "stallId" INTEGER NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stall" (
    "id" SERIAL NOT NULL,
    "stallId" INTEGER NOT NULL,
    "isFree" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "stall_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin" (
    "id" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "members" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "teamId" INTEGER NOT NULL,

    CONSTRAINT "members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coupon" (
    "id" SERIAL NOT NULL,
    "otp" TEXT NOT NULL DEFAULT '',
    "is_valid" BOOLEAN NOT NULL DEFAULT true,
    "teamId" INTEGER NOT NULL,

    CONSTRAINT "coupon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bill" (
    "id" SERIAL NOT NULL,
    "tokenValue" INTEGER NOT NULL DEFAULT 50,
    "teamId" INTEGER NOT NULL,

    CONSTRAINT "bill_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_stallId_fkey" FOREIGN KEY ("stallId") REFERENCES "stall"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "members" ADD CONSTRAINT "members_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coupon" ADD CONSTRAINT "coupon_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bill" ADD CONSTRAINT "bill_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
