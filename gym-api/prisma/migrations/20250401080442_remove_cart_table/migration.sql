/*
  Warnings:

  - You are about to drop the `cart` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX `Customer_packageId_fkey` ON `customer`;

-- DropIndex
DROP INDEX `Schedule_customerId_fkey` ON `schedule`;

-- DropTable
DROP TABLE `cart`;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `Package`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Schedule` ADD CONSTRAINT `Schedule_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
