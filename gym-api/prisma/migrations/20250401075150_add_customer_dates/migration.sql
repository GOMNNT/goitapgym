/*
  Warnings:

  - You are about to drop the column `joinDate` on the `customer` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Cart_customerId_fkey` ON `cart`;

-- DropIndex
DROP INDEX `Cart_packageId_fkey` ON `cart`;

-- DropIndex
DROP INDEX `Customer_packageId_fkey` ON `customer`;

-- DropIndex
DROP INDEX `Schedule_customerId_fkey` ON `schedule`;

-- AlterTable
ALTER TABLE `customer` DROP COLUMN `joinDate`,
    ADD COLUMN `endDate` DATETIME(3) NULL,
    ADD COLUMN `startDate` DATETIME(3) NULL;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `Package`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Schedule` ADD CONSTRAINT `Schedule_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `Package`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
