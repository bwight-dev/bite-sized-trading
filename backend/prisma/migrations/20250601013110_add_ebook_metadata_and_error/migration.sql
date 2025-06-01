/*
  Warnings:

  - Added the required column `updatedAt` to the `Ebook` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ebook" ADD COLUMN     "error" TEXT,
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "Ebook_userId_idx" ON "Ebook"("userId");

-- CreateIndex
CREATE INDEX "Ebook_status_idx" ON "Ebook"("status");
