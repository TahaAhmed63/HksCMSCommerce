/*
  Warnings:

  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `role`;

-- CreateTable
CREATE TABLE `admin_users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` VARCHAR(50) NOT NULL,
    `first_name` VARCHAR(50) NOT NULL,
    `last_name` VARCHAR(50) NOT NULL,
    `date_registered` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` VARCHAR(20) NOT NULL,
    `last_login` DATETIME(3) NULL,
    `permissions` JSON NULL,

    UNIQUE INDEX `admin_users_username_key`(`username`),
    UNIQUE INDEX `admin_users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admin_actions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `admin_user_id` INTEGER NOT NULL,
    `action_type` VARCHAR(100) NOT NULL,
    `action_details` JSON NULL,
    `performed_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `admin_actions` ADD CONSTRAINT `admin_actions_admin_user_id_fkey` FOREIGN KEY (`admin_user_id`) REFERENCES `admin_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
