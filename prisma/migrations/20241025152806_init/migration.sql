/*
  Warnings:

  - You are about to drop the column `client_id` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `client_id` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the `client` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `User_id` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `User_id` to the `subscriptions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `orders_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `reviews` DROP FOREIGN KEY `reviews_client_id_fkey`;

-- DropForeignKey
ALTER TABLE `subscriptions` DROP FOREIGN KEY `subscriptions_client_id_fkey`;

-- AlterTable
ALTER TABLE `reviews` DROP COLUMN `client_id`,
    ADD COLUMN `User_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `subscriptions` DROP COLUMN `client_id`,
    ADD COLUMN `User_id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `client`;

-- CreateTable
CREATE TABLE `User` (
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

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_User_id_fkey` FOREIGN KEY (`User_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subscriptions` ADD CONSTRAINT `subscriptions_User_id_fkey` FOREIGN KEY (`User_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
