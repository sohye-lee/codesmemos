/*
  Warnings:

  - You are about to drop the `Bookmark` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Code` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Language` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SaveBookmark` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SaveCode` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `linkType` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bookmark" DROP CONSTRAINT "Bookmark_userId_fkey";

-- DropForeignKey
ALTER TABLE "Code" DROP CONSTRAINT "Code_languageId_fkey";

-- DropForeignKey
ALTER TABLE "Code" DROP CONSTRAINT "Code_userId_fkey";

-- DropForeignKey
ALTER TABLE "SaveBookmark" DROP CONSTRAINT "SaveBookmark_bookmarkId_fkey";

-- DropForeignKey
ALTER TABLE "SaveBookmark" DROP CONSTRAINT "SaveBookmark_userId_fkey";

-- DropForeignKey
ALTER TABLE "SaveCode" DROP CONSTRAINT "SaveCode_codeId_fkey";

-- DropForeignKey
ALTER TABLE "SaveCode" DROP CONSTRAINT "SaveCode_userId_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "link" TEXT,
ADD COLUMN     "linkType" TEXT NOT NULL,
ADD COLUMN     "note" TEXT,
ADD COLUMN     "type" TEXT NOT NULL;

-- DropTable
DROP TABLE "Bookmark";

-- DropTable
DROP TABLE "Code";

-- DropTable
DROP TABLE "Language";

-- DropTable
DROP TABLE "SaveBookmark";

-- DropTable
DROP TABLE "SaveCode";

-- CreateTable
CREATE TABLE "Save" (
    "id" TEXT NOT NULL,
    "codeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Save_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Save" ADD CONSTRAINT "Save_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Save" ADD CONSTRAINT "Save_codeId_fkey" FOREIGN KEY ("codeId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
