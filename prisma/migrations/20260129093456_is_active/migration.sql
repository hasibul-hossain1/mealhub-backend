/*
  Warnings:

  - A unique constraint covering the columns `[userId,mealId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_mealId_key" ON "Review"("userId", "mealId");
