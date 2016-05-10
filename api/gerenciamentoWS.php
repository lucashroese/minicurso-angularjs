<?php
	require 'Slim/Slim.php';
	require 'connection.php';
	\Slim\Slim::registerAutoloader();
	$app = new \Slim\Slim();
	$app->response()->header('Content-Type', 'application/json;charset=utf-8');
	
	$app->get('/', function () {
		echo "endereço invalido";
	});	

    //Gerenciamento de usuário
	$app->get('/usuarios','getUsuarios');
	function getUsuarios(){
		$stmt = getConn()->query("SELECT * FROM usuario");
		$usuarios = $stmt->fetchAll(PDO::FETCH_OBJ);
		echo json_encode($usuarios);
	}
    
   $app->post('/usuarios/cadastrar','cadastrarUsuario');
	function cadastrarUsuario(){	
		$request = \Slim\Slim::getInstance()->request();
		$usuario = json_decode($request->getBody());	
		$sql = "INSERT INTO usuario (Nome, Cpf, Senha) VALUES (:Nome, :Cpf, :Senha)";
		$conn = getConn();
		$stmt = $conn->prepare($sql);
		$stmt->bindParam("Nome",$usuario->Nome);
		$stmt->bindParam("Cpf",$usuario->Cpf);
		$stmt->bindParam("Senha",$usuario->Senha);
		$stmt->execute();
        echo json_encode($stmt->rowCount() > 0);
    }
    
    $app->post('/usuarios/update','updateUsuario');
	function updateUsuario(){	
		$request = \Slim\Slim::getInstance()->request();
		$usuario = json_decode($request->getBody());	
		$sql = "UPDATE usuario SET Nome = :Nome, Cpf = :Cpf WHERE Id = :Id";
		$conn = getConn();
		$stmt = $conn->prepare($sql);
		$stmt->bindParam("Id",$usuario->Id);
		$stmt->bindParam("Nome",$usuario->Nome);
		$stmt->bindParam("Cpf",$usuario->Cpf);
		$stmt->execute();	
		echo json_encode($stmt->rowCount() > 0);
	}
    
    $app->get('/usuarios/deletar/:Id','removerUsuario');
	function removerUsuario($Id){	
		$conn = getConn();
		$sql = "DELETE FROM usuario WHERE Id=:Id";
		$stmt = $conn->prepare($sql);
		$stmt->bindParam("Id",$Id);
		$stmt->execute();
		echo json_encode($stmt->rowCount() > 0);
	}
    
    //Gerenciamento de Produto
    $app->get('/produtos','getProdutos');
	function getProdutos(){
		$stmt = getConn()->query("SELECT * FROM produto");
		$produtos = $stmt->fetchAll(PDO::FETCH_OBJ);
		echo json_encode($produtos);
	}
    
   $app->post('/produtos/cadastrar','cadastrarProduto');
	function cadastrarProduto(){	
		$request = \Slim\Slim::getInstance()->request();
		$produto = json_decode($request->getBody());	
		$sql = "INSERT INTO produto (Nome, Descricao, Preco, Qtd, Img) VALUES (:Nome, :Descricao, :Preco, :Qtd, :Img)";
		$conn = getConn();
		$stmt = $conn->prepare($sql);
		$stmt->bindParam("Nome",$produto->Nome);
		$stmt->bindParam("Descricao",$produto->Descricao);
		$stmt->bindParam("Preco",$produto->Preco);
		$stmt->bindParam("Qtd",$produto->Qtd);
		$stmt->bindParam("Img",$produto->Img);
		$stmt->execute();
        echo json_encode($stmt->rowCount() > 0);
    }
    
    $app->post('/produtos/update','updateProduto');
	function updateProduto(){	
		$request = \Slim\Slim::getInstance()->request();
		$produto = json_decode($request->getBody());	
		$sql = "UPDATE produto SET Nome = :Nome, Descricao = :Descricao, Img = :Img, Preco = :Preco, Qtd = :Qtd WHERE Id = :Id";
		$conn = getConn();
		$stmt = $conn->prepare($sql);
		$stmt->bindParam("Id",$produto->Id);
		$stmt->bindParam("Nome",$produto->Nome);
		$stmt->bindParam("Descricao",$produto->Descricao);
		$stmt->bindParam("Preco",$produto->Preco);
		$stmt->bindParam("Qtd",$produto->Qtd);
		$stmt->bindParam("Img",$produto->Img);
		$stmt->execute();	
		echo json_encode($stmt->rowCount() > 0);
	}
    
    $app->get('/produtos/deletar/:Id','removerProduto');
	function removerProduto($Id){	
		$conn = getConn();
		$sql = "DELETE FROM produto WHERE Id=:Id";
		$stmt = $conn->prepare($sql);
		$stmt->bindParam("Id",$Id);
		$stmt->execute();
		echo json_encode($stmt->rowCount() > 0);
	}
    
    //Gerenciar vendas
    $app->get('/vendas','getVendas');
	function getVendas(){
		$stmt = getConn()->query("SELECT * FROM venda");
		$vendas = $stmt->fetchAll(PDO::FETCH_OBJ);
        for($i = 0; $i < count($vendas); $i++){
            $conn = getConn();
            $sql = "SELECT * FROM produto p INNER JOIN venda_produto vp ON p.Id = vp.IdProduto WHERE vp.IdVenda = :Id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam("Id", $vendas[$i]->Id);
            $stmt->execute();
            $vendas[$i]->Produtos =  $stmt->fetchAll(PDO::FETCH_OBJ);
        }
        echo json_encode($vendas);
	}
    
    $app->post('/vendas/add','addVenda');
	function addVenda(){	
		$request = \Slim\Slim::getInstance()->request();
		$carrinho = json_decode($request->getBody());       	
        $total = 0;
        for($i = 0; $i < count($carrinho); $i++){
            $total += $carrinho[$i]->Produto->Preco * $carrinho[$i]->Qtd;            
        }
		$sql = "INSERT INTO venda(Total) VALUES (:Total)";
		$conn = getConn();
		$stmt = $conn->prepare($sql);
		$stmt->bindParam("Total",$total);
		$stmt->execute();	
        $idVenda = $conn->lastInsertId();
        $vendaRealizada = $stmt->rowCount() > 0;
        if($idVenda > 0){
            for($i = 0; $i < count($carrinho); $i++){
                $vendaRealizada = addVendaProduto($idVenda, $carrinho[$i]->Produto->Id, $carrinho[$i]->Qtd);          
            }
        }
		echo json_encode($vendaRealizada);
	}
    
    function addVendaProduto($idVenda, $idProduto, $qtd){
        $sql = "INSERT INTO venda_produto (IdVenda, IdProduto, Qtd) VALUES (:IdVenda, :IdProduto, :Qtd)";
		$conn = getConn();
		$stmt = $conn->prepare($sql);
		$stmt->bindParam("IdVenda", $idVenda);
		$stmt->bindParam("IdProduto", $idProduto);
		$stmt->bindParam("Qtd", $qtd);
		$stmt->execute();	
		return $stmt->rowCount() > 0;
    }
    
    $app->post('/login','login');
	function login(){	
		$request = \Slim\Slim::getInstance()->request();
		$usuario = json_decode($request->getBody());    
		$sql = "SELECT * FROM usuario WHERE Cpf = :Cpf AND Senha = :Senha";
		$conn = getConn();
		$stmt = $conn->prepare($sql);
		$stmt->bindParam("Cpf",$usuario->Cpf);
		$stmt->bindParam("Senha",$usuario->Senha);
		$stmt->execute();	
        $usuarioLogado =  $stmt->fetchObject();
		echo json_encode($usuarioLogado);
	}
    
	$app->run();
?>

