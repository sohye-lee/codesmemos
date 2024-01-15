-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "languageName" TEXT;

-- CreateTable
CREATE TABLE "Language" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Language_name_key" ON "Language"("name");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_languageName_fkey" FOREIGN KEY ("languageName") REFERENCES "Language"("name") ON DELETE SET NULL ON UPDATE CASCADE;
