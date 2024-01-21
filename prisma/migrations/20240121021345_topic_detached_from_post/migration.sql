/*
  Warnings:

  - You are about to drop the column `topicSlug` on the `Post` table. All the data in the column will be lost.
  - Made the column `languageName` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_languageName_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_topicSlug_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "topicSlug",
ALTER COLUMN "languageName" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_languageName_fkey" FOREIGN KEY ("languageName") REFERENCES "Language"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
