-- AlterTable
ALTER TABLE `User` ADD COLUMN `registeredAt` DATETIME(3) NULL,
    ALTER COLUMN `updatedAt` DROP DEFAULT;
