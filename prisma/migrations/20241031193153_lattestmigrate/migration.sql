-- Alter the attribute_values table to add new columns with default values
ALTER TABLE `attribute_values` 
ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
ADD COLUMN `slug` VARCHAR(100) NULL,  -- Allow NULL temporarily for existing records
ADD COLUMN `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);  -- Initialize with CURRENT_TIMESTAMP

-- (Optional) If you want to populate slug with unique values for existing records
UPDATE `attribute_values` 
SET `slug` = CONCAT('default-', id);  -- Example: Use 'default-' + id or some meaningful value

-- Now we can modify the slug column to be NOT NULL since we have initialized it
ALTER TABLE `attribute_values` 
MODIFY COLUMN `slug` VARCHAR(100) NOT NULL;

-- Repeat similar steps for the attributes table
ALTER TABLE `attributes` 
ADD COLUMN `slug` VARCHAR(100) NULL;  -- Allow NULL temporarily

-- Populate slug with unique values for existing records
UPDATE `attributes` 
SET `slug` = CONCAT('default-', id);  -- Example: Use 'default-' + id or some meaningful value

-- Alter slug column to be NOT NULL
ALTER TABLE `attributes` 
MODIFY COLUMN `slug` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `categories` 
ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
ADD COLUMN `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);  -- Initialize with CURRENT_TIMESTAMP

-- AlterTable
ALTER TABLE `product_variations` 
ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
ADD COLUMN `slug` VARCHAR(100) NULL,  -- Allow NULL temporarily
ADD COLUMN `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);  -- Initialize with CURRENT_TIMESTAMP

-- Populate slug with unique values for existing records
UPDATE `product_variations` 
SET `slug` = CONCAT('default-', id);  -- Example: Use 'default-' + id or some meaningful value

-- Alter slug column to be NOT NULL
ALTER TABLE `product_variations` 
MODIFY COLUMN `slug` VARCHAR(100) NOT NULL;

-- CreateIndex for uniqueness
CREATE UNIQUE INDEX `attribute_values_slug_key` ON `attribute_values`(`slug`);
CREATE UNIQUE INDEX `attributes_slug_key` ON `attributes`(`slug`);
CREATE UNIQUE INDEX `product_variations_slug_key` ON `product_variations`(`slug`);
