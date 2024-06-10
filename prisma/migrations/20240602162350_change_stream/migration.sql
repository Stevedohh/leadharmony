/*
  Warnings:

  - You are about to drop the column `notification` on the `Stream` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Stream" DROP COLUMN "notification",
ADD COLUMN     "slackChannelId" TEXT;

-- DropEnum
DROP TYPE "NotificationEnum";
