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
    "projectID" INTEGER NOT NULL,
    "valid_token" INTEGER NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
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
    "team_id" INTEGER NOT NULL,

    CONSTRAINT "members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coupen" (
    "id" SERIAL NOT NULL,
    "otp" TEXT NOT NULL DEFAULT '',
    "qty" INTEGER NOT NULL,
    "is_valid" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "coupen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bill" (
    "id" SERIAL NOT NULL,
    "team_Id" INTEGER NOT NULL,
    "tokenValue" TEXT NOT NULL,

    CONSTRAINT "bill_pkey" PRIMARY KEY ("id")
);
