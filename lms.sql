-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 16, 2023 at 11:53 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lms`
--

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `code` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`id`, `name`, `code`, `status`) VALUES
(1, 'Internet Application', 'cs50', 'active'),
(2, 'Software Engineering2', 'cs1111', 'active'),
(4, 'management is', 'mis2', 'inactive'),
(5, 'is', 'is3', 'inactive'),
(6, 'grafics', 'gf2', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `instructorcourse`
--

CREATE TABLE `instructorcourse` (
  `id` int(11) NOT NULL,
  `instructorId` int(11) NOT NULL,
  `courseId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `instructorcourse`
--

INSERT INTO `instructorcourse` (`id`, `instructorId`, `courseId`) VALUES
(1, 2, 1),
(2, 2, 2),
(3, 5, 1),
(4, 2, 6);

-- --------------------------------------------------------

--
-- Table structure for table `studentcourse`
--

CREATE TABLE `studentcourse` (
  `id` int(11) NOT NULL,
  `studentId` int(11) NOT NULL,
  `courseId` int(11) NOT NULL,
  `grade` int(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `studentcourse`
--

INSERT INTO `studentcourse` (`id`, `studentId`, `courseId`, `grade`) VALUES
(1, 3, 1, 20),
(2, 9, 2, 90),
(3, 3, 4, 95);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `fName` varchar(50) NOT NULL,
  `lName` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'active',
  `role` varchar(50) NOT NULL DEFAULT 'student',
  `token` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `fName`, `lName`, `email`, `password`, `phone`, `status`, `role`, `token`) VALUES
(1, 'Shahenda', 'Hemdan', 'Shahy@gmail.com', '$2a$10$4gjG9TxG2Ih9BP3F6RCVWukaJgyJDj7A95eRqwXvf/McTx5rPv5Qi', '01111111', 'active', 'admin', 'e70324527bd63ab8d25840e45195ea8e2'),
(2, 'Donia', 'Ahmed', 'Donia@gmail.com', '$2a$10$4gjG9TxG2Ih9BP3F6RCVWukaJgyJDj7A95eRqwXvf/McTx5rPv5Qi', '012334', 'active', 'instructor', 'e7043727ab12ab8d25840e45195ea8e2'),
(3, 'Aya', 'Bakar', 'aya@gmail.com', '$2a$10$4gjG9TxG2Ih9BP3F6RCVWukaJgyJDj7A95eRqwXvf/McTx5rPv5Qi', '9028397', 'active', 'student', 'e7043727bd63aa4f25840e45195ea8e2'),
(5, 'Shahenda', 'hemdan', 'sho@gmail.com', '123', '123456', 'active', 'instructor', 'e7043727bd63ed4d25840e45195ea8e2'),
(7, 'menna', 'ahmed', 'manna@gmail.com', '$2a$10$4gjG9TxG2Ih9BP3F6RCVWukaJgyJDj7A95eRqwXvf/McTx5rPv5Qi', '012313', 'active', 'student', 'e7043727ac33ab8d25840e45195ea8e2'),
(8, 'nora', 'ahmed', 'nora@gmail.com', '$2a$10$4gjG9TxG2Ih9BP3F6RCVWukaJgyJDj7A95eRqwXvf/McTx5rPv5Qi', '012313', 'active', 'student', 'e7043727ac63ab8d25840e45195ea8e2'),
(9, 'nada', 'ahmed', 'nada@gmail.com', '$2a$10$4gjG9TxG2Ih9BP3F6RCVWukaJgyJDj7A95eRqwXvf/McTx5rPv5Qi', '012313', 'active', 'student', 'bd043727bd63ab8d25840e45195ea8e2'),
(11, 'reham', 'ahmed', 'reham@gmail.com', '$2a$10$4gjG9TxG2Ih9BP3F6RCVWukaJgyJDj7A95eRqwXvf/McTx5rPv5Qi', '012313', 'active', 'student', 'e7043343bd63ab8d25840e45195ea8e2'),
(12, 'gehad', 'mohamed', 'gehad@gmail.com', '$2a$10$kAN0XAON3RG2ssBEDbT6I.MOzsqlipJSN86AQj.d7e4ni4h9sY7Za', '121332', 'active', 'instructor', 'e7043727bd63ab8d25840e45195ea8e4'),
(13, 'Shahd', 'ahmed', 'shahd@gmail.com', '$2a$10$2.yb2Lnfgn4SNIJQrIg4mODJBV1010z3zOn50bBTUxgvVUGLxBzja', '012313', 'active', 'student', 'e7043727bd63ab8d25840e45195ea8e2'),
(14, 'Omar', 'Ahmed', 'Omar@gmail.com', '$2a$10$g.WHp.nnIfo9XAbKFAOWausL36ICwLJa9/7Ds6Pa15Ankqr2Un4t.', '121332', 'active', 'instructor', '0728e94cb4d036f6009a3875c86427ac');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `instructorcourse`
--
ALTER TABLE `instructorcourse`
  ADD PRIMARY KEY (`id`),
  ADD KEY `courseId` (`courseId`),
  ADD KEY `userId` (`instructorId`);

--
-- Indexes for table `studentcourse`
--
ALTER TABLE `studentcourse`
  ADD PRIMARY KEY (`id`),
  ADD KEY `studentId` (`studentId`),
  ADD KEY `courseId` (`courseId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `instructorcourse`
--
ALTER TABLE `instructorcourse`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `studentcourse`
--
ALTER TABLE `studentcourse`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `instructorcourse`
--
ALTER TABLE `instructorcourse`
  ADD CONSTRAINT `instructorcourse_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `instructorcourse_ibfk_2` FOREIGN KEY (`instructorId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `studentcourse`
--
ALTER TABLE `studentcourse`
  ADD CONSTRAINT `studentcourse_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentcourse_ibfk_2` FOREIGN KEY (`courseId`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
