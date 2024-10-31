/*
  Warnings:

  - You are about to drop the column `discount` on the `coupons` table. All the data in the column will be lost.
  - You are about to drop the column `expiration` on the `coupons` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `User_id` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `User_id` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `tags` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `discount_amount` to the `coupons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discount_type` to the `coupons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_updated` to the `inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `low_stock_threshold` to the `inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_price` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billing_address` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discount` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_method` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shipping_address` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shipping_cost` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shipping_method` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtotal` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tax` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billing_period` to the `subscriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `subscriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `renewal_price` to the `subscriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `subscriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `tags` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `orders_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `reviews` DROP FOREIGN KEY `reviews_User_id_fkey`;

-- DropForeignKey
ALTER TABLE `subscriptions` DROP FOREIGN KEY `subscriptions_User_id_fkey`;

-- AlterTable
ALTER TABLE `categories` ADD COLUMN `parent_category` INTEGER NULL;

-- AlterTable
ALTER TABLE `coupons` DROP COLUMN `discount`,
    DROP COLUMN `expiration`,
    ADD COLUMN `discount_amount` DOUBLE NOT NULL,
    ADD COLUMN `discount_type` VARCHAR(20) NOT NULL,
    ADD COLUMN `expiry_date` DATETIME(3) NULL,
    ADD COLUMN `min_order_value` DOUBLE NULL;

-- AlterTable
ALTER TABLE `inventory` ADD COLUMN `last_updated` DATETIME(3) NOT NULL,
    ADD COLUMN `low_stock_threshold` INTEGER NOT NULL,
    ADD COLUMN `product_variation_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `order_items` ADD COLUMN `total_price` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `orders` DROP COLUMN `address`,
    ADD COLUMN `billing_address` VARCHAR(255) NOT NULL,
    ADD COLUMN `coupon_id` INTEGER NULL,
    ADD COLUMN `discount` DOUBLE NOT NULL,
    ADD COLUMN `order_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `payment_method` VARCHAR(50) NOT NULL,
    ADD COLUMN `shipping_address` VARCHAR(255) NOT NULL,
    ADD COLUMN `shipping_cost` DOUBLE NOT NULL,
    ADD COLUMN `shipping_method` VARCHAR(50) NOT NULL,
    ADD COLUMN `status` VARCHAR(20) NOT NULL,
    ADD COLUMN `subtotal` DOUBLE NOT NULL,
    ADD COLUMN `tax` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `reviews` DROP COLUMN `User_id`,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `subscriptions` DROP COLUMN `User_id`,
    ADD COLUMN `billing_period` VARCHAR(20) NOT NULL,
    ADD COLUMN `product_id` INTEGER NOT NULL,
    ADD COLUMN `renewal_price` DOUBLE NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `tags` ADD COLUMN `slug` VARCHAR(100) NOT NULL;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` VARCHAR(50) NOT NULL,
    `first_name` VARCHAR(50) NOT NULL,
    `last_name` VARCHAR(50) NOT NULL,
    `billing_address` VARCHAR(255) NULL,
    `shipping_address` VARCHAR(255) NULL,
    `phone_number` VARCHAR(20) NULL,
    `date_registered` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `users_username_key`(`username`),
    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_id` VARCHAR(191) NOT NULL,
    `payment_date` DATETIME(3) NOT NULL,
    `payment_method` VARCHAR(50) NOT NULL,
    `payment_status` VARCHAR(20) NOT NULL,
    `transaction_id` VARCHAR(100) NOT NULL,
    `amount` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shipping_details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_id` VARCHAR(191) NOT NULL,
    `shipping_method` VARCHAR(50) NOT NULL,
    `shipping_address` VARCHAR(255) NOT NULL,
    `shipping_status` VARCHAR(20) NOT NULL,
    `tracking_number` VARCHAR(100) NULL,
    `estimated_delivery` DATETIME(3) NULL,

    UNIQUE INDEX `shipping_details_order_id_key`(`order_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `tags_slug_key` ON `tags`(`slug`);

-- AddForeignKey
ALTER TABLE `categories` ADD CONSTRAINT `categories_parent_category_fkey` FOREIGN KEY (`parent_category`) REFERENCES `categories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_coupon_id_fkey` FOREIGN KEY (`coupon_id`) REFERENCES `coupons`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `shipping_details` ADD CONSTRAINT `shipping_details_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subscriptions` ADD CONSTRAINT `subscriptions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subscriptions` ADD CONSTRAINT `subscriptions_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inventory` ADD CONSTRAINT `inventory_product_variation_id_fkey` FOREIGN KEY (`product_variation_id`) REFERENCES `product_variations`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
