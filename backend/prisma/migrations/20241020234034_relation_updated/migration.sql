/*
  Warnings:

  - You are about to drop the `_EnvironmentToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_EnvironmentToUser" DROP CONSTRAINT "_EnvironmentToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_EnvironmentToUser" DROP CONSTRAINT "_EnvironmentToUser_B_fkey";

-- DropTable
DROP TABLE "_EnvironmentToUser";

-- CreateTable
CREATE TABLE "_UserEnvironments" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserEnvironments_AB_unique" ON "_UserEnvironments"("A", "B");

-- CreateIndex
CREATE INDEX "_UserEnvironments_B_index" ON "_UserEnvironments"("B");

-- AddForeignKey
ALTER TABLE "_UserEnvironments" ADD CONSTRAINT "_UserEnvironments_A_fkey" FOREIGN KEY ("A") REFERENCES "Environment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserEnvironments" ADD CONSTRAINT "_UserEnvironments_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
