-- CreateTable
CREATE TABLE "TweetNotifications" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "twitter_id" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);
