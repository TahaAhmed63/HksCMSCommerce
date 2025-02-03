-- DropIndex
DROP INDEX `categories_catimage_key` ON `categories`;

-- AlterTable
ALTER TABLE `attribute_values` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `categories` ALTER COLUMN `updated_at` DROP DEFAULT,
    MODIFY `catimage` TEXT NULL;

-- AlterTable
ALTER TABLE `product_variations` ALTER COLUMN `updated_at` DROP DEFAULT;
