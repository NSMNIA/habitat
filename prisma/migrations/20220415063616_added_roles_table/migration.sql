/*
  Warnings:

  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `user` table. All the data in the column will be lost.
  - Added the required column `firstname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `name`,
    DROP COLUMN `role`,
    ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `contact_messager` VARCHAR(255) NULL,
    ADD COLUMN `contact_whatsapp` VARCHAR(255) NULL,
    ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `firstname` VARCHAR(255) NOT NULL,
    ADD COLUMN `language` VARCHAR(191) NULL DEFAULT 'en',
    ADD COLUMN `lastname` VARCHAR(255) NOT NULL,
    ADD COLUMN `password` TEXT NULL,
    ADD COLUMN `rolesRid` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Roles` (
    `rid` VARCHAR(191) NOT NULL,
    `role_name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Roles_role_name_key`(`role_name`),
    PRIMARY KEY (`rid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_rolesRid_fkey` FOREIGN KEY (`rolesRid`) REFERENCES `Roles`(`rid`) ON DELETE SET NULL ON UPDATE CASCADE;
