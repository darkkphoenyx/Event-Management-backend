-- AlterTable
ALTER TABLE "Team" ALTER COLUMN "teamPDF" DROP NOT NULL;

-- AlterTable
ALTER TABLE "members" ALTER COLUMN "memberIDcard" DROP NOT NULL,
ALTER COLUMN "memberphoto" DROP NOT NULL;

-- AlterTable
ALTER TABLE "project" ALTER COLUMN "projectPhoto" DROP NOT NULL;
