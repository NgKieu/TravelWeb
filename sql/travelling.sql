-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th8 19, 2023 lúc 09:56 AM
-- Phiên bản máy phục vụ: 10.4.24-MariaDB
-- Phiên bản PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `travelling`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `banking`
--

CREATE TABLE `banking` (
  `User_id` int(11) NOT NULL,
  `Bank_Name` varchar(30) NOT NULL,
  `Bank_Number` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `banking`
--

INSERT INTO `banking` (`User_id`, `Bank_Name`, `Bank_Number`) VALUES
(1, 'VPBANK', '5423534237'),
(1, 'VPBANK', '5423534237');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `discount`
--

CREATE TABLE `discount` (
  `Discount_id` int(11) NOT NULL,
  `Discount_Value` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `favorites`
--

CREATE TABLE `favorites` (
  `Favorite_id` int(11) NOT NULL,
  `Hotel_id` int(11) DEFAULT NULL,
  `User_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `favorites`
--

INSERT INTO `favorites` (`Favorite_id`, `Hotel_id`, `User_id`) VALUES
(28, 5, 19),
(29, 5, 66);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hotels`
--

CREATE TABLE `hotels` (
  `Hotel_id` int(11) NOT NULL,
  `Partner_id` int(11) NOT NULL,
  `Category_id` int(11) NOT NULL,
  `Hotel_Name` varchar(50) NOT NULL,
  `Hotel_Location` varchar(100) NOT NULL,
  `Hotel_Image` varchar(100) NOT NULL,
  `Hotel_Rating` decimal(5,1) NOT NULL DEFAULT 0.0,
  `Description` varchar(1000) NOT NULL,
  `views` int(11) NOT NULL DEFAULT 0,
  `status` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `hotels`
--

INSERT INTO `hotels` (`Hotel_id`, `Partner_id`, `Category_id`, `Hotel_Name`, `Hotel_Location`, `Hotel_Image`, `Hotel_Rating`, `Description`, `views`, `status`) VALUES
(4, 18, 4, 'Khách sạn Libra Nha Trang', 'Thuỳ Vân, Thành Phố Vũng Tàu, Bà Rịa Vũng Tàu, Việt Nam\r\n', 'd0189259.jpg', '0.0', 'Tiết kiệm chi phí với các khách sạn hợp tác chiến lược cùng Mytour, cam kết giá tốt nhất và chất lượng dịch vụ tốt nhất dành cho bạn.', 5, 0),
(5, 18, 5, 'Khách Sạn Imperial Vũng Tàu', 'Đường Nguyễn Trung Tín, Nguyễn Văn Cừ, Thành Phố Quy Nhơn, Bình Định', 'img1.png', '5.0', 'An tâm đặt phòng, hỗ trợ xuất hoá đơn nhanh chóng, tiết kiệm thời gian cho bạn.', 90, 1),
(6, 18, 4, 'Deluxe King (Khu Khách Sạn)', 'Đại Lộ Hạ Long Marine, Thành Phố Hạ Long, Quảng Ninh, Việt Nam\r\n', 'img1roomdeluxeking.jpeg', '0.0', 'Tiết kiệm chi phí với các khách sạn hợp tác chiến lược cùng Mytour, cam kết giá tốt nhất và chất lượng dịch vụ tốt nhất dành cho bạn.', 21, 1),
(7, 18, 3, 'Khách Sạn Melia Vinpearl Tây Ninh', '90, Đường Lê Duẩn, Thành Phố Tây Ninh, Tây Ninh, Việt Nam\n', 'img6.png', '0.0', 'Tiết kiệm chi phí với các khách sạn hợp tác chiến lược cùng Mytour, cam kết giá tốt nhất và chất lượng dịch vụ tốt nhất dành cho bạn.', 8, 1),
(8, 18, 5, 'Khách Sạn Century Riverside Huế', 'Tôn Đức Thắng, Quận 1, Hồ Chí Minh, Việt Nam\r\n', 'intercontinental.jpg', '0.0', 'An tâm đặt phòng, Mytour hỗ trợ xuất hoá đơn nhanh chóng, tiết kiệm thời gian cho bạn.', 4, 1),
(9, 18, 4, 'Novotel Phú Quốc Resort', 'Thành Phố Nha Trang, Khánh Hòa, Việt Nam\r\n', 'mvptaynnh_facade3.jpg', '0.0', 'Tiết kiệm chi phí với các khách sạn hợp tác chiến lược cùng Mytour, cam kết giá tốt nhất và chất lượng dịch vụ tốt nhất dành cho bạn.', 6, 1),
(10, 18, 5, 'Khách sạn Len\'s Đà Lạt', 'Bùi Thị Xuân, Thành Phố Đà Lạt, Lâm Đồng, Việt Nam', 'wld1444809659_arcadia-resort-phu-quoc.jpg', '0.0', 'An tâm đặt phòng, hỗ trợ xuất hoá đơn nhanh chóng, tiết kiệm thời gian cho bạn.', 6, 1),
(11, 18, 4, 'Flamingo Đại Lải Resort', 'An Dương Vương, Thành Phố Quy Nhơn, Bình Định, Việt Nam', 'typeroom.jpg', '0.0', 'Tiết kiệm chi phí với các khách sạn hợp tác chiến lược cùng Mytour, cam kết giá tốt nhất và chất lượng dịch vụ tốt nhất dành cho bạn.', 4, 1),
(12, 18, 3, 'Khách sạn Anya Premier Quy Nhơn', 'Ngọc Thanh, Thị Xã Phúc Yên, Vĩnh Phúc, Việt Nam', 'img2.jpg', '0.0', 'Tiết kiệm chi phí với các khách sạn hợp tác chiến lược cùng Mytour, cam kết giá tốt nhất và chất lượng dịch vụ tốt nhất dành cho bạn.', 4, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hotel_category`
--

CREATE TABLE `hotel_category` (
  `Category_id` int(11) NOT NULL,
  `Category_Name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `hotel_category`
--

INSERT INTO `hotel_category` (`Category_id`, `Category_Name`) VALUES
(1, '1 sao'),
(2, '2 sao'),
(3, '3 sao'),
(4, '4 sao'),
(5, '5 sao'),
(12, 'khach san cao cap');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `images`
--

CREATE TABLE `images` (
  `Images_id` int(11) NOT NULL,
  `Images_url` varchar(50) NOT NULL,
  `Status` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `images`
--

INSERT INTO `images` (`Images_id`, `Images_url`, `Status`) VALUES
(14, 'slider1.jpg', 1),
(15, 'slider4.jpg', 1),
(16, 'slider2.jpg', 1),
(17, 'slider3.jpg', 0),
(20, 'slider5.jpg', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `images_hotels`
--

CREATE TABLE `images_hotels` (
  `Image_id` int(11) NOT NULL,
  `Hotel_id` int(11) NOT NULL,
  `Image_URL` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `images_hotels`
--

INSERT INTO `images_hotels` (`Image_id`, `Hotel_id`, `Image_URL`) VALUES
(1, 5, 'img1.png'),
(2, 5, 'img2.jpg'),
(3, 5, 'img3.jpg'),
(4, 5, 'img4.jpg'),
(5, 5, 'img5.jpg'),
(6, 5, 'img6.jpg'),
(8, 6, 'img1roomdeluxeking.jpeg'),
(9, 6, 'img2.jpg'),
(10, 6, 'img3.jpg'),
(11, 6, 'img4.jpg'),
(12, 6, 'img5.jpg'),
(13, 6, 'img6.jpg'),
(14, 3, 'img1.png'),
(15, 3, 'img2.jpg'),
(16, 3, 'img3.jpg'),
(17, 3, 'img4.jpg'),
(18, 3, 'img5.jpg'),
(19, 3, 'img6.jpg'),
(20, 4, 'img1.png'),
(21, 4, 'img2.jpg'),
(22, 4, 'img3.jpg'),
(23, 4, 'img4.jpg'),
(24, 4, 'img5.jpg'),
(25, 4, 'img6.jpg'),
(26, 7, 'img6.png'),
(27, 7, 'img6.png'),
(28, 7, 'img3.jpg'),
(29, 7, 'img4.jpg'),
(30, 7, 'img5.jpg'),
(31, 7, 'img6.jpg'),
(32, 8, 'intercontinental.jpg'),
(33, 8, 'img2.jpg'),
(34, 8, 'img3.jpg'),
(35, 8, 'img4.jpg'),
(36, 8, 'img5.jpg'),
(37, 8, 'intercontinental.jpg'),
(38, 9, 'mvptaynnh_facade3.jpg'),
(39, 9, 'img3.jpg'),
(40, 9, 'img4.jpg'),
(41, 9, 'img5.jpg'),
(42, 9, 'img6.jpg'),
(43, 9, 'mvptaynnh_facade3.jpg'),
(44, 10, 'wld1444809659_arcadia-resort-phu-quoc.jpg'),
(45, 10, 'img3.jpg'),
(46, 10, 'img4.jpg'),
(47, 10, 'img5.jpg'),
(48, 10, 'img6.jpg'),
(49, 10, 'wld1444809659_arcadia-resort-phu-quoc.jpg'),
(50, 11, 'typeroom.jpg'),
(51, 11, 'typeroom.jpg'),
(52, 11, 'img4.jpg'),
(53, 11, 'img5.jpg'),
(54, 11, 'img6.jpg'),
(55, 11, 'img2.jpg'),
(56, 12, 'img2.jpg'),
(57, 12, 'img4.jpg'),
(58, 12, 'img5.jpg'),
(59, 12, 'img6.jpg'),
(60, 12, 'img2.jpg'),
(61, 13, 'img2.jpg'),
(62, 14, 'img2roomdeluxeking.jpeg'),
(63, 14, 'img4.jpg'),
(64, 15, 'hotel.jpg'),
(65, 15, 'img1.png'),
(66, 15, 'img3roomdeluxeking.jpeg'),
(67, 16, 'img3.jpg'),
(68, 16, 'img4.jpg'),
(69, 17, 'img3.jpg'),
(70, 17, 'img3roomdeluxeking.jpeg'),
(71, 18, 'img3roomdeluxeking.jpeg'),
(72, 18, 'img4roomdeluxeking.jpeg'),
(79, 20, '184117114_283409826852885_6355'),
(80, 20, 'd0189259.jpg'),
(81, 20, 'hotel.jpg'),
(82, 20, 'img3.jpg'),
(83, 20, 'img3roomdeluxeking.jpeg'),
(84, 20, 'img4.jpg'),
(85, 20, 'img3roomdeluxeking.jpeg'),
(86, 21, '184117114_283409826852885_6355'),
(87, 21, 'd0189259.jpg'),
(88, 21, 'hotel.jpg'),
(89, 21, 'img1.png'),
(90, 21, 'img1roomdeluxeking.jpeg'),
(91, 21, 'img2.jpg'),
(92, 21, 'img2roomdeluxeking.jpeg'),
(93, 21, 'img3.jpg');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `images_typeroom`
--

CREATE TABLE `images_typeroom` (
  `ImageTypeRoom_id` int(11) NOT NULL,
  `TypeRoom_id` int(11) NOT NULL,
  `Image_URL` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `images_typeroom`
--

INSERT INTO `images_typeroom` (`ImageTypeRoom_id`, `TypeRoom_id`, `Image_URL`) VALUES
(1, 3, 'img1.png'),
(2, 3, 'img2.jpg'),
(3, 3, 'img3.jpg'),
(4, 3, 'img4.jpg'),
(5, 3, 'img5.jpg'),
(6, 3, 'img6.jpg'),
(7, 1, 'img2.jpg'),
(8, 1, 'img3.jpg'),
(9, 1, 'img4.jpg'),
(10, 1, 'img5.jpg'),
(11, 1, 'img2.jpg'),
(12, 1, 'img4.jpg'),
(13, 1, 'img3.jpg'),
(14, 2, 'img4.jpg'),
(15, 2, 'img3.jpg'),
(16, 2, 'img5.jpg'),
(17, 3, 'img4.jpg'),
(18, 3, 'img3.jpg'),
(19, 3, 'img5.jpg'),
(20, 4, 'img4.jpg'),
(21, 4, 'img3.jpg'),
(22, 4, 'img5.jpg'),
(23, 5, 'img4.jpg'),
(24, 5, 'img3.jpg'),
(25, 5, 'img5.jpg'),
(26, 6, 'img4.jpg'),
(27, 6, 'img3.jpg'),
(28, 6, 'img5.jpg'),
(29, 7, 'img4.jpg'),
(30, 7, 'img3.jpg'),
(31, 7, 'img5.jpg'),
(32, 8, 'img4.jpg'),
(33, 8, 'img3.jpg'),
(34, 8, 'img5.jpg'),
(35, 9, 'img4.jpg'),
(36, 9, 'img3.jpg'),
(37, 9, 'img5.jpg'),
(38, 10, 'img4.jpg'),
(39, 10, 'img3.jpg'),
(40, 10, 'img5.jpg'),
(41, 11, 'img4.jpg'),
(42, 11, 'img3.jpg'),
(43, 11, 'img5.jpg'),
(44, 12, 'img4.jpg'),
(45, 12, 'img3.jpg'),
(46, 12, 'img5.jpg'),
(47, 13, 'img4.jpg'),
(48, 13, 'img3.jpg'),
(49, 13, 'img5.jpg'),
(50, 14, 'img4.jpg'),
(51, 14, 'img3.jpg'),
(52, 14, 'img5.jpg'),
(53, 15, 'img4.jpg'),
(54, 15, 'img3.jpg'),
(55, 15, 'img5.jpg'),
(56, 16, 'img4.jpg'),
(57, 16, 'img3.jpg'),
(58, 16, 'img5.jpg'),
(59, 17, 'img4.jpg'),
(60, 17, 'img3.jpg'),
(61, 17, 'img5.jpg'),
(62, 18, 'img4.jpg'),
(63, 18, 'img3.jpg'),
(64, 18, 'img5.jpg'),
(65, 19, 'img4.jpg'),
(66, 19, 'img3.jpg'),
(67, 19, 'img5.jpg'),
(68, 20, 'img4.jpg'),
(69, 20, 'img3.jpg'),
(70, 20, 'img5.jpg'),
(71, 21, 'img4.jpg'),
(72, 21, 'img3.jpg'),
(73, 21, 'img5.jpg'),
(74, 22, 'img4.jpg'),
(75, 22, 'img3.jpg'),
(76, 22, 'img5.jpg'),
(77, 23, 'img4.jpg'),
(78, 23, 'img3.jpg'),
(79, 23, 'img5.jpg'),
(80, 24, 'img4.jpg'),
(81, 24, 'img3.jpg'),
(82, 24, 'img5.jpg'),
(83, 25, 'img4.jpg'),
(84, 25, 'img3.jpg'),
(85, 25, 'img5.jpg'),
(86, 26, 'img4.jpg'),
(87, 26, 'img3.jpg'),
(88, 26, 'img5.jpg'),
(89, 27, 'img4.jpg'),
(90, 27, 'img3.jpg'),
(91, 27, 'img5.jpg'),
(92, 28, 'img4.jpg'),
(93, 28, 'img3.jpg'),
(94, 28, 'img5.jpg'),
(95, 29, 'img4.jpg'),
(96, 29, 'img3.jpg'),
(97, 29, 'img5.jpg'),
(98, 30, 'img4.jpg'),
(99, 30, 'img3.jpg'),
(100, 30, 'img5.jpg'),
(101, 31, 'img4.jpg'),
(102, 31, 'img3.jpg'),
(103, 31, 'img5.jpg');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `Order_id` int(11) NOT NULL,
  `Hotel_id` int(11) NOT NULL,
  `TypeRoom_id` int(11) NOT NULL,
  `Room_id` int(11) DEFAULT NULL,
  `CheckIn` date DEFAULT NULL,
  `CheckOut` date DEFAULT NULL,
  `User_id` int(11) DEFAULT NULL,
  `User_Name` varchar(50) NOT NULL,
  `User_Phone` varchar(13) NOT NULL,
  `User_Email` varchar(200) DEFAULT NULL,
  `PriceBefore` float NOT NULL,
  `Discount` float NOT NULL,
  `PriceAfter` float NOT NULL,
  `TimeInsert` date NOT NULL,
  `Order_Status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`Order_id`, `Hotel_id`, `TypeRoom_id`, `Room_id`, `CheckIn`, `CheckOut`, `User_id`, `User_Name`, `User_Phone`, `User_Email`, `PriceBefore`, `Discount`, `PriceAfter`, `TimeInsert`, `Order_Status`) VALUES
(1, 5, 3, 3, '2023-08-07', '2023-08-09', 1, 'Le Huu Minh', '0913126754', 'lehuuminhtc30@gmail.com', 1500000, 120000, 1380000, '2023-08-11', 3),
(37, 5, 3, 3, '2023-08-13', '2023-08-14', 1, 'Lee Huyn Min', '0855820747', 'lehuuminhtc31@gmail.com', 1700000, 136000, 1564000, '2023-08-12', 0),
(38, 5, 3, 3, '2023-08-20', '2023-08-22', 3, 'Đỗ Quốc Thành', '01256414127', 'doquocthanhtc30@gmail.com', 1700000, 136000, 1564000, '2023-08-12', 0),
(39, 5, 3, 3, '2023-08-07', '2023-08-09', 3, 'Le Huu Minh', '0913126754', 'lehuuminhtc30@gmail.com', 1500000, 120000, 1380000, '2023-01-11', 3),
(40, 5, 3, 3, '2023-08-13', '2023-08-14', 48, 'Lee Huyn Min', '0855820747', 'lehuuminhtc31@gmail.com', 1700000, 136000, 1564000, '2023-07-12', 0),
(41, 5, 3, 3, '2023-08-20', '2023-08-22', 48, 'Đỗ Quốc Thành', '01256414127', 'doquocthanhtc30@gmail.com', 1700000, 136000, 1564000, '2023-07-12', 0),
(44, 5, 1, 61, '2023-08-17', '2023-08-19', 66, 'Đỗ Quốc Thành', '07725531237', 'crcat2509@gmail.com', 1000000, 80000, 920000, '2023-08-19', 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `partners`
--

CREATE TABLE `partners` (
  `Partner_id` int(11) NOT NULL,
  `Partner_Name` varchar(30) NOT NULL,
  `Partner_Email` varchar(30) NOT NULL,
  `Partner_Phone` varchar(13) NOT NULL,
  `Partner_Password` varchar(30) NOT NULL,
  `Partner_verified` datetime DEFAULT NULL,
  `CCCD` varchar(100) NOT NULL,
  `License` varchar(100) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `partners`
--

INSERT INTO `partners` (`Partner_id`, `Partner_Name`, `Partner_Email`, `Partner_Phone`, `Partner_Password`, `Partner_verified`, `CCCD`, `License`, `status`) VALUES
(18, 'Đỗ Quốc Thành', 'thanhdq2509@gmail.com', '01286418232', '123', '2023-08-16 22:01:38', 'z4615950831790_ebc8589795c9913fd9b121843c8847ae.jpg', 'z4615950671139_b5480a571866f07f720104b4ce07e4d5.jpg', 1),
(21, 'Nguyễn Thị Mai Anh', 'thanhdev25@gmail.com', '0374319003', '123', '2023-08-19 13:52:28', 'cccd.jpg', 'gpkd.jpg', 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `reviews`
--

CREATE TABLE `reviews` (
  `Review_id` int(11) NOT NULL,
  `User_id` int(11) NOT NULL,
  `Hotel_id` int(11) NOT NULL,
  `Rating` float NOT NULL,
  `Comment` varchar(300) NOT NULL,
  `DateCreate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `rooms`
--

CREATE TABLE `rooms` (
  `Room_id` int(11) NOT NULL,
  `Room_Name` varchar(100) NOT NULL,
  `TypeRoom_id` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `rooms`
--

INSERT INTO `rooms` (`Room_id`, `Room_Name`, `TypeRoom_id`, `status`) VALUES
(1, 'Phòng 1', 5, 0),
(2, 'Phòng 2', 5, 0),
(3, 'Phòng 3', 5, 1),
(5, 'Phòng 3', 5, 1),
(6, 'Phòng 2', 6, 0),
(7, 'Phòng 1', 6, 0),
(8, 'Phòng 2', 6, 0),
(9, 'Phòng 3', 6, 0),
(12, 'Phòng 1 1', 7, 1),
(13, 'Phòng 2 1', 7, 0),
(14, 'Phòng 3 1', 7, 1),
(15, 'Phòng 3 2', 7, 1),
(16, 'Phòng 2 1', 8, 1),
(17, 'Phòng 1 1', 8, 1),
(18, 'Phòng 2 2', 8, 1),
(19, 'Phòng 3 1', 8, 1),
(20, 'Phòng 1 1', 9, 1),
(21, 'Phòng 2 1', 9, 0),
(22, 'Phòng 3 1', 9, 1),
(23, 'Phòng 3 2', 9, 1),
(24, 'Phòng 2 1', 10, 1),
(25, 'Phòng 1 1', 10, 1),
(26, 'Phòng 2 2', 10, 1),
(27, 'Phòng 3 1', 10, 1),
(28, 'Phòng 1 1 1', 11, 1),
(29, 'Phòng 2 1 1', 11, 0),
(30, 'Phòng 3 1 1', 11, 1),
(31, 'Phòng 3 2 1', 11, 1),
(32, 'Phòng 2 1 1', 12, 1),
(33, 'Phòng 1 1 1', 12, 1),
(34, 'Phòng 2 2 1', 12, 1),
(35, 'Phòng 3 1 1', 12, 1),
(36, 'Phòng 1 1', 13, 0),
(37, 'Phòng 2 1', 13, 1),
(38, 'Phòng 3 1', 13, 1),
(39, 'Phòng 3 1', 14, 1),
(40, 'Phòng 2 1', 14, 1),
(41, 'Phòng 1 1', 14, 1),
(42, 'Phòng 2 1', 15, 1),
(43, 'Phòng 3 1', 15, 1),
(44, 'Phòng 1 1 1', 16, 1),
(45, 'Phòng 2 1 1', 16, 0),
(46, 'Phòng 3 1 1', 17, 1),
(47, 'Phòng 3 2 1', 17, 1),
(48, 'Phòng 2 1 1', 18, 1),
(49, 'Phòng 1 1 1', 18, 1),
(50, 'Phòng 2 2 1', 19, 1),
(51, 'Phòng 3 1 1', 19, 1),
(52, 'Phòng 1 1 1', 20, 1),
(53, 'Phòng 2 1 1', 20, 0),
(54, 'Phòng 3 1 1', 21, 1),
(55, 'Phòng 3 2 1', 21, 1),
(56, 'Phòng 2 1 1', 22, 1),
(57, 'Phòng 1 1 1', 22, 1),
(58, 'Phòng 2 2 1', 22, 1),
(59, 'Phòng 3 1 1', 23, 1),
(60, 'Phòng 1 1 1 1', 23, 1),
(61, 'Phòng 1 1', 1, 1),
(62, 'Phòng 2 1', 1, 1),
(63, 'Phòng 3 1', 1, 1),
(64, 'Phòng 3 1', 2, 1),
(65, 'Phòng 2 1', 2, 1),
(66, 'Phòng 1 1', 3, 1),
(67, 'Phòng 2 1', 3, 1),
(68, 'Phòng 3 1', 3, 1),
(69, 'Phòng 1 1 1', 4, 1),
(70, 'Phòng 2 1 1', 4, 1);

--
-- Bẫy `rooms`
--
DELIMITER $$
CREATE TRIGGER `before_insert_room_type` BEFORE INSERT ON `rooms` FOR EACH ROW BEGIN
  DECLARE new_name VARCHAR(255);
  DECLARE name_suffix INT;

  IF NOT EXISTS (SELECT 1 FROM rooms WHERE TypeRoom_id = NEW.TypeRoom_id) THEN
    SET new_name = CONCAT(NEW.Room_Name, ' 1');
  ELSE
    SET name_suffix = 1;
    WHILE EXISTS (SELECT 1 FROM rooms WHERE Room_Name = CONCAT(NEW.Room_Name, ' ', name_suffix) AND TypeRoom_id = NEW.TypeRoom_id) DO
      SET name_suffix = name_suffix + 1;
    END WHILE;
    SET new_name = CONCAT(NEW.Room_Name, ' ', name_suffix);
  END IF;

  SET NEW.Room_Name = new_name;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `room_interior`
--

CREATE TABLE `room_interior` (
  `Interior_id` int(11) NOT NULL,
  `Interior_name` text NOT NULL,
  `TypeRoom_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `room_interior`
--

INSERT INTO `room_interior` (`Interior_id`, `Interior_name`, `TypeRoom_id`) VALUES
(1, 'Tủ lạnh', 1),
(2, 'Máy giặt', 1),
(3, 'Điều hòa nhiệt độ', 1),
(4, 'Wifi miễn phí', 1),
(5, 'Chấp nhận thú cưng', 1),
(6, 'Tủ lạnh', 1),
(7, 'Máy giặt', 1),
(8, 'Điều hòa nhiệt độ', 3),
(9, 'Wifi miễn phí', 3),
(10, 'Chấp nhận thú cưng', 3),
(37, 'Wifi miễn phí', 3),
(38, 'Chấp nhận thú cưng', 3),
(39, 'Tủ lạnh', 3),
(40, 'Máy giặt', 3),
(41, 'Tủ lạnh', 2),
(42, 'Máy giặt', 2),
(43, 'Điều hòa nhiệt độ', 2),
(44, 'Wifi miễn phí', 2),
(45, 'Chấp nhận thú cưng', 4),
(46, 'Tủ lạnh', 4),
(47, 'Máy giặt', 4),
(48, 'Điều hòa nhiệt độ', 4),
(49, 'Wifi miễn phí', 5),
(50, 'Chấp nhận thú cưng', 5),
(51, 'Wifi miễn phí', 5),
(52, 'Chấp nhận thú cưng', 5),
(53, 'Tủ lạnh', 6),
(54, 'Máy giặt', 6),
(55, 'Tủ lạnh', 7),
(56, 'Máy giặt', 7),
(57, 'Điều hòa nhiệt độ', 7),
(58, 'Wifi miễn phí', 7),
(59, 'Chấp nhận thú cưng', 7),
(60, 'Tủ lạnh', 7),
(61, 'Máy giặt', 8),
(62, 'Điều hòa nhiệt độ', 8),
(63, 'Wifi miễn phí', 8),
(64, 'Chấp nhận thú cưng', 8),
(65, 'Wifi miễn phí', 8),
(66, 'Chấp nhận thú cưng', 8),
(67, 'Tủ lạnh', 9),
(68, 'Máy giặt', 9),
(69, 'Tủ lạnh', 9),
(70, 'Máy giặt', 9),
(71, 'Điều hòa nhiệt độ', 9),
(72, 'Wifi miễn phí', 9),
(73, 'Chấp nhận thú cưng', 10),
(74, 'Tủ lạnh', 10),
(75, 'Máy giặt', 11),
(76, 'Điều hòa nhiệt độ', 11),
(77, 'Wifi miễn phí', 11),
(78, 'Chấp nhận thú cưng', 12),
(79, 'Wifi miễn phí', 12),
(80, 'Chấp nhận thú cưng', 12),
(81, 'Tủ lạnh', 12),
(82, 'Máy giặt', 13),
(83, 'Tủ lạnh', 14),
(84, 'Máy giặt', 14),
(85, 'Điều hòa nhiệt độ', 14),
(86, 'Wifi miễn phí', 15),
(87, 'Chấp nhận thú cưng', 15),
(88, 'Tủ lạnh', 15),
(89, 'Máy giặt', 15),
(90, 'Điều hòa nhiệt độ', 15),
(91, 'Wifi miễn phí', 16),
(92, 'Chấp nhận thú cưng', 16),
(93, 'Wifi miễn phí', 16),
(94, 'Chấp nhận thú cưng', 16),
(95, 'Tủ lạnh', 16),
(96, 'Máy giặt', 16),
(97, 'Tủ lạnh', 16),
(98, 'Máy giặt', 17),
(99, 'Điều hòa nhiệt độ', 17),
(100, 'Wifi miễn phí', 17),
(101, 'Chấp nhận thú cưng', 17),
(102, 'Tủ lạnh', 17),
(103, 'Máy giặt', 18),
(104, 'Điều hòa nhiệt độ', 18),
(105, 'Wifi miễn phí', 18),
(106, 'Chấp nhận thú cưng', 18),
(107, 'Wifi miễn phí', 18),
(108, 'Chấp nhận thú cưng', 18),
(109, 'Tủ lạnh', 19),
(110, 'Máy giặt', 19),
(111, 'Tủ lạnh', 19),
(112, 'Máy giặt', 19),
(113, 'Điều hòa nhiệt độ', 19),
(114, 'Wifi miễn phí', 20),
(115, 'Chấp nhận thú cưng', 20),
(116, 'Tủ lạnh', 20),
(117, 'Máy giặt', 20),
(118, 'Điều hòa nhiệt độ', 20),
(119, 'Wifi miễn phí', 20),
(120, 'Chấp nhận thú cưng', 20),
(121, 'Wifi miễn phí', 21),
(122, 'Chấp nhận thú cưng', 21),
(123, 'Tủ lạnh', 21),
(124, 'Máy giặt', 21),
(125, 'Tủ lạnh', 21),
(126, 'Máy giặt', 21),
(127, 'Điều hòa nhiệt độ', 21),
(128, 'Wifi miễn phí', 21),
(129, 'Chấp nhận thú cưng', 21),
(130, 'Tủ lạnh', 22),
(131, 'Máy giặt', 22),
(132, 'Điều hòa nhiệt độ', 23),
(133, 'Wifi miễn phí', 23),
(134, 'Chấp nhận thú cưng', 23),
(135, 'Wifi miễn phí', 23),
(136, 'Chấp nhận thú cưng', 23),
(137, 'Tủ lạnh', 24),
(138, 'Máy giặt', 24);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `type_rooms`
--

CREATE TABLE `type_rooms` (
  `TypeRoom_id` int(11) NOT NULL,
  `Hotel_id` int(11) NOT NULL,
  `TypeRoom_Name` varchar(100) DEFAULT NULL,
  `TypeRoom_Style` text NOT NULL,
  `TypeRoom_Price` float NOT NULL,
  `MaxLoad` int(10) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `type_rooms`
--

INSERT INTO `type_rooms` (`TypeRoom_id`, `Hotel_id`, `TypeRoom_Name`, `TypeRoom_Style`, `TypeRoom_Price`, `MaxLoad`, `status`) VALUES
(1, 5, 'Deluxe King (Khu Khách Sạn)', 'Giường đôi', 1000000, 2, 1),
(2, 5, 'Deluxe Twin (Khu Căn Hộ hoặc Khu Khách Sạn)', 'Hai giường đơn', 13000000, 3, 1),
(3, 5, 'Grand Deluxe King (Khu Căn Hộ hoặc Khu Khách Sạn)', '1 Giường đôi', 1200000, 2, 1),
(4, 5, 'Deluxe Triple (Khu Khách Sạn)', '1 giường đôi, 1 giường đơn', 1600000, 3, 1),
(5, 6, 'Deluxe King (Khu Khách Sạn)', 'Giường đôi', 900000, 3, 1),
(6, 6, 'Deluxe Twin (Khu Căn Hộ hoặc Khu Khách Sạn)', 'Hai giường đơn', 13000000, 3, 1),
(7, 6, 'Deluxe Twin Seaview (Khu Căn Hộ)', 'Giường đơn', 50000000, 2, 1),
(8, 6, 'Grand Deluxe King (Khu Căn Hộ hoặc Khu Khách Sạn)', 'Hai giường đôi', 1600000, 5, 1),
(9, 7, 'Deluxe King (Khu Khách Sạn)', 'Giường đôi', 900000, 3, 1),
(10, 7, 'Deluxe Twin (Khu Căn Hộ hoặc Khu Khách Sạn)', 'Hai giường đơn', 13000000, 3, 1),
(11, 7, 'Deluxe Twin Seaview (Khu Căn Hộ)', 'Giường đơn', 50000000, 2, 1),
(12, 7, 'Grand Deluxe King (Khu Căn Hộ hoặc Khu Khách Sạn)', 'Hai giường đôi', 1600000, 5, 1),
(13, 8, 'Deluxe King (Khu Khách Sạn)', 'Giường đôi', 900000, 3, 1),
(14, 8, 'Deluxe Twin (Khu Căn Hộ hoặc Khu Khách Sạn)', 'Hai giường đơn', 13000000, 3, 1),
(15, 8, 'Deluxe Twin Seaview (Khu Căn Hộ)', 'Giường đơn', 50000000, 2, 1),
(16, 8, 'Grand Deluxe King (Khu Căn Hộ hoặc Khu Khách Sạn)', 'Hai giường đôi', 1600000, 5, 1),
(17, 9, 'Deluxe King (Khu Khách Sạn)', 'Giường đôi', 900000, 3, 1),
(18, 9, 'Deluxe Twin (Khu Căn Hộ hoặc Khu Khách Sạn)', 'Hai giường đơn', 13000000, 3, 1),
(19, 9, 'Deluxe Twin Seaview (Khu Căn Hộ)', 'Giường đơn', 50000000, 2, 1),
(20, 9, 'Grand Deluxe King (Khu Căn Hộ hoặc Khu Khách Sạn)', 'Hai giường đôi', 1600000, 5, 1),
(21, 10, 'Deluxe King (Khu Khách Sạn)', 'Giường đôi', 900000, 3, 1),
(22, 10, 'Deluxe Twin (Khu Căn Hộ hoặc Khu Khách Sạn)', 'Hai giường đơn', 13000000, 3, 1),
(23, 10, 'Deluxe Twin Seaview (Khu Căn Hộ)', 'Giường đơn', 50000000, 2, 1),
(24, 10, 'Grand Deluxe King (Khu Căn Hộ hoặc Khu Khách Sạn)', 'Hai giường đôi', 1600000, 5, 1),
(25, 11, 'Deluxe King (Khu Khách Sạn)', 'Giường đôi', 900000, 3, 1),
(26, 11, 'Deluxe Twin (Khu Căn Hộ hoặc Khu Khách Sạn)', 'Hai giường đơn', 13000000, 3, 1),
(27, 11, 'Deluxe Twin Seaview (Khu Căn Hộ)', 'Giường đơn', 50000000, 2, 1),
(28, 11, 'Grand Deluxe King (Khu Căn Hộ hoặc Khu Khách Sạn)', 'Hai giường đôi', 1600000, 5, 1),
(29, 12, 'Deluxe King (Khu Khách Sạn)', 'Giường đôi', 900000, 3, 1),
(30, 12, 'Deluxe Twin (Khu Căn Hộ hoặc Khu Khách Sạn)', 'Hai giường đơn', 13000000, 3, 1),
(31, 12, 'Deluxe Twin Seaview (Khu Căn Hộ)', 'Giường đơn', 50000000, 2, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `User_id` int(11) NOT NULL,
  `User_Name` varchar(30) NOT NULL,
  `User_Email` varchar(40) NOT NULL,
  `User_Phone` varchar(13) NOT NULL,
  `User_Password` varchar(30) NOT NULL,
  `Role` int(11) NOT NULL DEFAULT 1,
  `email_verified_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`User_id`, `User_Name`, `User_Email`, `User_Phone`, `User_Password`, `Role`, `email_verified_at`) VALUES
(1, 'Lê Hữu Minh', 'lehuuminhtc30@gmail.com', '0855280747', '123123', 0, NULL),
(3, 'Do Quoc Thanh', 'doquocthanhtc30@gmail.com', '0913126754', '1231234', 1, NULL),
(19, 'abc', 'abctc30@gmail.com', '085528074788', '123123', 0, '2023-07-23 02:30:49'),
(48, 'Lê Hữu Min', 'lehuuminhtc230@gmail.com', '08552807472', '123123', 1, NULL),
(66, 'Đỗ Quốc Thành', 'crcat2509@gmail.com', '0772553123', '123', 1, '2023-08-19 13:40:43'),
(67, 'Lê Huu Minh', 'lehuuminhtc31@gmail.com', '077255312355', '123', 1, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `videos`
--

CREATE TABLE `videos` (
  `Video_id` int(11) NOT NULL,
  `Video_clip` varchar(255) NOT NULL,
  `Status` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `videos`
--

INSERT INTO `videos` (`Video_id`, `Video_clip`, `Status`) VALUES
(11, 'production_id_4205697 (1080p).mp4', 1),
(16, 'video_bg_mytour.mov', 0),
(17, 'pexels-yaroslav-shuraev-5562986 (1080p).mp4', 0);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `banking`
--
ALTER TABLE `banking`
  ADD KEY `User_id_banking` (`User_id`);

--
-- Chỉ mục cho bảng `discount`
--
ALTER TABLE `discount`
  ADD PRIMARY KEY (`Discount_id`);

--
-- Chỉ mục cho bảng `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`Favorite_id`),
  ADD KEY `Hotel_id` (`Hotel_id`),
  ADD KEY `User_id` (`User_id`);

--
-- Chỉ mục cho bảng `hotels`
--
ALTER TABLE `hotels`
  ADD PRIMARY KEY (`Hotel_id`),
  ADD KEY `Category_id` (`Category_id`),
  ADD KEY `Partner_id` (`Partner_id`);

--
-- Chỉ mục cho bảng `hotel_category`
--
ALTER TABLE `hotel_category`
  ADD PRIMARY KEY (`Category_id`);

--
-- Chỉ mục cho bảng `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`Images_id`);

--
-- Chỉ mục cho bảng `images_hotels`
--
ALTER TABLE `images_hotels`
  ADD PRIMARY KEY (`Image_id`),
  ADD KEY `Hotel_id_image` (`Hotel_id`);

--
-- Chỉ mục cho bảng `images_typeroom`
--
ALTER TABLE `images_typeroom`
  ADD PRIMARY KEY (`ImageTypeRoom_id`),
  ADD KEY `TypeRoom_id` (`TypeRoom_id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`Order_id`),
  ADD KEY `Hotel_id` (`Hotel_id`),
  ADD KEY `TypeRoom_id` (`TypeRoom_id`),
  ADD KEY `Room_id` (`Room_id`),
  ADD KEY `User_id` (`User_id`);

--
-- Chỉ mục cho bảng `partners`
--
ALTER TABLE `partners`
  ADD PRIMARY KEY (`Partner_id`);

--
-- Chỉ mục cho bảng `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`Review_id`),
  ADD KEY `Hotel_id` (`Hotel_id`),
  ADD KEY `User_id` (`User_id`);

--
-- Chỉ mục cho bảng `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`Room_id`),
  ADD KEY `TypeRoom_id` (`TypeRoom_id`);

--
-- Chỉ mục cho bảng `room_interior`
--
ALTER TABLE `room_interior`
  ADD PRIMARY KEY (`Interior_id`),
  ADD KEY `TypeRoom_id` (`TypeRoom_id`);

--
-- Chỉ mục cho bảng `type_rooms`
--
ALTER TABLE `type_rooms`
  ADD PRIMARY KEY (`TypeRoom_id`),
  ADD KEY `Hotel_id` (`Hotel_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`User_id`);

--
-- Chỉ mục cho bảng `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`Video_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `discount`
--
ALTER TABLE `discount`
  MODIFY `Discount_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `favorites`
--
ALTER TABLE `favorites`
  MODIFY `Favorite_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT cho bảng `hotels`
--
ALTER TABLE `hotels`
  MODIFY `Hotel_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT cho bảng `hotel_category`
--
ALTER TABLE `hotel_category`
  MODIFY `Category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT cho bảng `images`
--
ALTER TABLE `images`
  MODIFY `Images_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT cho bảng `images_hotels`
--
ALTER TABLE `images_hotels`
  MODIFY `Image_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT cho bảng `images_typeroom`
--
ALTER TABLE `images_typeroom`
  MODIFY `ImageTypeRoom_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=138;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `Order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT cho bảng `partners`
--
ALTER TABLE `partners`
  MODIFY `Partner_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT cho bảng `reviews`
--
ALTER TABLE `reviews`
  MODIFY `Review_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT cho bảng `rooms`
--
ALTER TABLE `rooms`
  MODIFY `Room_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT cho bảng `room_interior`
--
ALTER TABLE `room_interior`
  MODIFY `Interior_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=142;

--
-- AUTO_INCREMENT cho bảng `type_rooms`
--
ALTER TABLE `type_rooms`
  MODIFY `TypeRoom_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `User_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT cho bảng `videos`
--
ALTER TABLE `videos`
  MODIFY `Video_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `banking`
--
ALTER TABLE `banking`
  ADD CONSTRAINT `User_id_banking` FOREIGN KEY (`User_id`) REFERENCES `users` (`User_id`);

--
-- Các ràng buộc cho bảng `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`Hotel_id`) REFERENCES `hotels` (`Hotel_id`),
  ADD CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`User_id`) REFERENCES `users` (`User_id`);

--
-- Các ràng buộc cho bảng `hotels`
--
ALTER TABLE `hotels`
  ADD CONSTRAINT `hotels_ibfk_1` FOREIGN KEY (`Partner_id`) REFERENCES `partners` (`Partner_id`),
  ADD CONSTRAINT `hotels_ibfk_2` FOREIGN KEY (`Category_id`) REFERENCES `hotel_category` (`Category_id`);

--
-- Các ràng buộc cho bảng `images_typeroom`
--
ALTER TABLE `images_typeroom`
  ADD CONSTRAINT `TypeRoom_id` FOREIGN KEY (`TypeRoom_id`) REFERENCES `type_rooms` (`TypeRoom_id`);

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`Hotel_id`) REFERENCES `hotels` (`Hotel_id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`TypeRoom_id`) REFERENCES `type_rooms` (`TypeRoom_id`),
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`Room_id`) REFERENCES `rooms` (`Room_id`),
  ADD CONSTRAINT `orders_ibfk_4` FOREIGN KEY (`User_id`) REFERENCES `users` (`User_id`);

--
-- Các ràng buộc cho bảng `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`Hotel_id`) REFERENCES `hotels` (`Hotel_id`),
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`User_id`) REFERENCES `users` (`User_id`);

--
-- Các ràng buộc cho bảng `rooms`
--
ALTER TABLE `rooms`
  ADD CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`TypeRoom_id`) REFERENCES `type_rooms` (`TypeRoom_id`);

--
-- Các ràng buộc cho bảng `room_interior`
--
ALTER TABLE `room_interior`
  ADD CONSTRAINT `room_interior_ibfk_1` FOREIGN KEY (`TypeRoom_id`) REFERENCES `type_rooms` (`TypeRoom_id`);

--
-- Các ràng buộc cho bảng `type_rooms`
--
ALTER TABLE `type_rooms`
  ADD CONSTRAINT `type_rooms_ibfk_1` FOREIGN KEY (`Hotel_id`) REFERENCES `hotels` (`Hotel_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
