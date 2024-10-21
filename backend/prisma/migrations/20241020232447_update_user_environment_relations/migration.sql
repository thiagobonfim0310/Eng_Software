/*
  Warnings:

  - You are about to drop the `EnvironmentUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EnvironmentUser" DROP CONSTRAINT "EnvironmentUser_environmentId_fkey";

-- DropForeignKey
ALTER TABLE "EnvironmentUser" DROP CONSTRAINT "EnvironmentUser_userId_fkey";

-- DropTable
DROP TABLE "EnvironmentUser";

-- CreateTable
CREATE TABLE "_EnvironmentToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EnvironmentToUser_AB_unique" ON "_EnvironmentToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_EnvironmentToUser_B_index" ON "_EnvironmentToUser"("B");

-- AddForeignKey
ALTER TABLE "_EnvironmentToUser" ADD CONSTRAINT "_EnvironmentToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Environment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EnvironmentToUser" ADD CONSTRAINT "_EnvironmentToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
