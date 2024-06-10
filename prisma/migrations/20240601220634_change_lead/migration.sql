/*
  Warnings:

  - Made the column `name` on table `Lead` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `Lead` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ip` on table `Lead` required. This step will fail if there are existing NULL values in that column.
  - Made the column `country` on table `Lead` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userAgent` on table `Lead` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Lead" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "ip" SET NOT NULL,
ALTER COLUMN "country" SET NOT NULL,
ALTER COLUMN "userAgent" SET NOT NULL;
