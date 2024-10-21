/*
  Warnings:

  - You are about to drop the `_UserEnvironments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserEnvironments" DROP CONSTRAINT "_UserEnvironments_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserEnvironments" DROP CONSTRAINT "_UserEnvironments_B_fkey";

-- DropTable
DROP TABLE "_UserEnvironments";

-- CreateTable
CREATE TABLE "EnvironmentUser" (
    "userId" TEXT NOT NULL,
    "environmentId" TEXT NOT NULL,

    CONSTRAINT "EnvironmentUser_pkey" PRIMARY KEY ("userId","environmentId")
);

-- AddForeignKey
ALTER TABLE "EnvironmentUser" ADD CONSTRAINT "EnvironmentUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnvironmentUser" ADD CONSTRAINT "EnvironmentUser_environmentId_fkey" FOREIGN KEY ("environmentId") REFERENCES "Environment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
