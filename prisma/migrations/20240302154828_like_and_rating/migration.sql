/*
  Warnings:

  - You are about to drop the column `questionId` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Like` table. All the data in the column will be lost.
  - Added the required column `likedTime` to the `Like` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_userId_fkey";

-- AlterTable
ALTER TABLE "Like" DROP COLUMN "questionId",
DROP COLUMN "userId",
ADD COLUMN     "likedTime" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Rating" (
    "id" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);
