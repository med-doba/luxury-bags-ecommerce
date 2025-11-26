-- AlterTable
ALTER TABLE `Product` ADD COLUMN `onSale` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `originalPrice` DECIMAL(10, 2) NULL;
