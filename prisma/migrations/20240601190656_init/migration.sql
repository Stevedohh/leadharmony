-- CreateTable
CREATE TABLE "Stream" (
    "id" SERIAL NOT NULL,
    "partnerId" INTEGER NOT NULL,
    "apiToken" TEXT NOT NULL,
    "streamId" TEXT NOT NULL,
    "offerId" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "Stream_pkey" PRIMARY KEY ("id")
);
