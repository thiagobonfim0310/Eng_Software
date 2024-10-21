-- DropForeignKey
ALTER TABLE "EnvironmentUser" DROP CONSTRAINT "EnvironmentUser_environmentId_fkey";

-- DropForeignKey
ALTER TABLE "EnvironmentUser" DROP CONSTRAINT "EnvironmentUser_userId_fkey";

-- AddForeignKey
ALTER TABLE "EnvironmentUser" ADD CONSTRAINT "EnvironmentUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnvironmentUser" ADD CONSTRAINT "EnvironmentUser_environmentId_fkey" FOREIGN KEY ("environmentId") REFERENCES "Environment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
