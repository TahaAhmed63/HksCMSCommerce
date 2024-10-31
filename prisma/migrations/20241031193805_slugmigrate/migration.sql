-- AlterTable
ALTER TABLE `attribute_values` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `categories` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `product_variations` ALTER COLUMN `updated_at` DROP DEFAULT;
