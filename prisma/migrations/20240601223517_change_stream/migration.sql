/*
  Warnings:

  - You are about to drop the column `partnerId` on the `Stream` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PartnerEnum" AS ENUM ('TrafficLight', 'DrCash');

-- AlterTable
ALTER TABLE "Stream" DROP COLUMN "partnerId",
ADD COLUMN     "partner" "PartnerEnum" NOT NULL DEFAULT 'TrafficLight';
