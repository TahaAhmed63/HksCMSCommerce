-- AlterTable
ALTER TABLE `attribute_values` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `categories` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `product_variations` ADD COLUMN `name` VARCHAR(100) NULL,
    ALTER COLUMN `updated_at` DROP DEFAULT;
