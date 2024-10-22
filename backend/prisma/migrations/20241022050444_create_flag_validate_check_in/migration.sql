/*
  Warnings:

  - You are about to drop the column `validated_at` on the `check_ins` table. All the data in the column will be lost.
  - Added the required column `validated` to the `check_ins` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "check_ins" DROP COLUMN "validated_at",
ADD COLUMN     "validated" BOOLEAN NOT NULL;
