/*
  Warnings:

  - Made the column `name` on table `product_variations` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `attribute_values` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `categories` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `product_variations` ALTER COLUMN `updated_at` DROP DEFAULT,
    MODIFY `name` VARCHAR(100) NOT NULL;
