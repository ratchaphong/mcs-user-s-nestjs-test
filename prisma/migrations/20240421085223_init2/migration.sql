/*
  Warnings:

  - You are about to drop the column `customer_profile_id` on the `address` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `address` DROP FOREIGN KEY `Address_customer_profile_id_fkey`;

-- AlterTable
ALTER TABLE `address` DROP COLUMN `customer_profile_id`,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Address_user_id_key` ON `Address`(`user_id`);

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_pk`) ON DELETE RESTRICT ON UPDATE CASCADE;
