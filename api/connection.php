<?php	
	function getConn(){
		$host = 'localhost';
		$nameDB = 'loja_virtual_db';
		$user = 'root';
		$pass = '';
		
		return new PDO('mysql:host='.$host.';dbname='.$nameDB.'', $user, $pass,
		array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
	}
?>