/*
  Warnings:

  - A unique constraint covering the columns `[catimage]` on the table `categories` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `attribute_values` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `categories` ADD COLUMN `catimage` VARCHAR(100) NULL,
    ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `product_variations` ADD COLUMN `variation_image` VARCHAR(255) NULL,
    ALTER COLUMN `updated_at` DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX `categories_catimage_key` ON `categories`(`catimage`);
