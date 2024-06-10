-- CreateEnum
CREATE TYPE "NotificationEnum" AS ENUM ('Telegram', 'Slack');

-- AlterTable
ALTER TABLE "Stream" ADD COLUMN     "notification" "NotificationEnum" NOT NULL DEFAULT 'Telegram';
