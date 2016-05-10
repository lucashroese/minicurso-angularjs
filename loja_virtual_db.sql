-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 09-Maio-2016 às 00:47
-- Versão do servidor: 10.1.10-MariaDB
-- PHP Version: 7.0.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `loja_virtual_db`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `produto`
--

CREATE TABLE `produto` (
  `Id` int(11) NOT NULL,
  `Nome` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Descricao` text COLLATE utf8_unicode_ci,
  `Preco` double DEFAULT NULL,
  `Qtd` int(11) DEFAULT NULL,
  `Img` text COLLATE utf8_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `produto`
--

INSERT INTO `produto` (`Id`, `Nome`, `Descricao`, `Preco`, `Qtd`, `Img`) VALUES
(1, 'Notebook MSI', 'notebook gaming MSI', 4250, 10, 'http://s.glbimg.com/po/tt/f/original/2013/05/23/msigt70-lead.png'),
(2, 'Notebook asus', 'notebook asus 4GB memória', 1350, 20, 'http://imagens.canaltech.com.br/115697.194089-10-notebooks.jpg'),
(3, 'Macbook air', 'macbook air 8GB de memória', 5800, 5, 'http://img.olx.com.br/images/35/355519027796282.jpg'),
(4, 'Notebook HP', 'notebook HP 14'', 4GB de memória, HD de 500GB', 1400, 15, 'http://www.notecentral.com.br/wp-content/uploads/2015/11/conserto-notebook-hp.png');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE `usuario` (
  `Id` int(11) NOT NULL,
  `Nome` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `Cpf` varchar(14) COLLATE utf8_unicode_ci NOT NULL,
  `Senha` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`Id`, `Nome`, `Cpf`, `Senha`) VALUES
(1, 'Administrador', '111.111.111-11', '7c4a8d09ca3762af61e59520943dc26494f8941b'),
(2, 'Pedro Silva', '222.222.222-22', '7c4a8d09ca3762af61e59520943dc26494f8941b');

-- --------------------------------------------------------

--
-- Estrutura da tabela `venda`
--

CREATE TABLE `venda` (
  `Id` int(11) NOT NULL,
  `Data` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Total` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `venda`
--

INSERT INTO `venda` (`Id`, `Data`, `Total`) VALUES
(1, '2016-05-08 15:47:57', 9850),
(2, '2016-05-08 16:35:49', 1350),
(3, '2016-05-08 20:42:35', 8500);

-- --------------------------------------------------------

--
-- Estrutura da tabela `venda_produto`
--

CREATE TABLE `venda_produto` (
  `Id` int(11) NOT NULL,
  `IdVenda` int(11) DEFAULT NULL,
  `IdProduto` int(11) DEFAULT NULL,
  `Qtd` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `venda_produto`
--

INSERT INTO `venda_produto` (`Id`, `IdVenda`, `IdProduto`, `Qtd`) VALUES
(1, 1, 1, 2),
(2, 1, 2, 1),
(3, 2, 2, 1),
(4, 3, 1, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `produto`
--
ALTER TABLE `produto`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `venda`
--
ALTER TABLE `venda`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `venda_produto`
--
ALTER TABLE `venda_produto`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IdVenda` (`IdVenda`),
  ADD KEY `IdProduto` (`IdProduto`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `produto`
--
ALTER TABLE `produto`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `venda`
--
ALTER TABLE `venda`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `venda_produto`
--
ALTER TABLE `venda_produto`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `venda_produto`
--
ALTER TABLE `venda_produto`
  ADD CONSTRAINT `venda_produto_ibfk_1` FOREIGN KEY (`IdVenda`) REFERENCES `venda` (`Id`),
  ADD CONSTRAINT `venda_produto_ibfk_2` FOREIGN KEY (`IdProduto`) REFERENCES `produto` (`Id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
