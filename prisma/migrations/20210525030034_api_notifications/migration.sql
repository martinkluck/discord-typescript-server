-- CreateTable
CREATE TABLE "ApiNotifications" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "channel_id" TEXT NOT NULL,

    PRIMARY KEY ("id")
);
