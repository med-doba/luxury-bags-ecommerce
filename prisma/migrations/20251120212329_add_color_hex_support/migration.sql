/*
  Warnings:

  - You are about to drop the column `color` on the `ColorVariant` table. All the data in the column will be lost.
  - Added the required column `colorHex` to the `ColorVariant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ColorVariant` DROP FOREIGN KEY `ColorVariant_productId_fkey`;

-- DropIndex
DROP INDEX `ColorVariant_productId_color_key` ON `ColorVariant`;

-- AlterTable
ALTER TABLE `ColorVariant` DROP COLUMN `color`,
    ADD COLUMN `colorHex` VARCHAR(191) NOT NULL,
    ADD COLUMN `colorName` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
