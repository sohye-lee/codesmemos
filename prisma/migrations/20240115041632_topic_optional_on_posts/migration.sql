-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_topicSlug_fkey";

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "topicSlug" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_topicSlug_fkey" FOREIGN KEY ("topicSlug") REFERENCES "Topic"("slug") ON DELETE SET NULL ON UPDATE CASCADE;
