/*
  Warnings:

  - You are about to drop the column `topicId` on the `Post` table. All the data in the column will be lost.
  - Added the required column `topicSlug` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_topicId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "topicId",
ADD COLUMN     "topicSlug" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_topicSlug_fkey" FOREIGN KEY ("topicSlug") REFERENCES "Topic"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
