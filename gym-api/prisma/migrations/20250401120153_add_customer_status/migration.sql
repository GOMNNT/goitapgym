-- DropIndex
DROP INDEX `Customer_packageId_fkey` ON `customer`;

-- DropIndex
DROP INDEX `Schedule_customerId_fkey` ON `schedule`;

-- AlterTable
ALTER TABLE `customer` ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'pending';

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `Package`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Schedule` ADD CONSTRAINT `Schedule_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
