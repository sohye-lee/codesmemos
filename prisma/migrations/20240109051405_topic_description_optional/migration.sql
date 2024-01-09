-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "linkType" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Save" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'save';

-- AlterTable
ALTER TABLE "Topic" ALTER COLUMN "description" DROP NOT NULL;
