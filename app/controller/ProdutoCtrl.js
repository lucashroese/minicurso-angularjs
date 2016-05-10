app.controller("ProdutoCtrl", function($scope, localStorageService, $http, $rootScope) {

    var host = "http://localhost:8080/LojaVirtual/api/gerenciamentoWS.php/produtos";
    $rootScope.usuarioLogado = localStorageService.get("usuarioLogado");

    //Retorna a lista de produtos
    $scope.Produtos = function() {
        if ($rootScope.usuarioLogado != null || $rootScope.usuarioLogado != false) {
            $http.get(host).success(function(data) {
                $scope.produtos = data;
            }).error(function(erro) {
                console.log(erro);
            });
        } else {
            location.href = "#/home";
        }
    }

    //Cadastra um novo produto
    $scope.Cadastrar = function(produto) {
        $http.post(host + "/cadastrar", produto).success(function(data) {
            if (data) {
                $scope.Produtos();
                $scope.produto = null;
                $("#modalProduto").modal("hide");
            } else {
                alert("Falha ao cadastrar o produto!");
            }
        }).error(function(erro) {
            console.log(erro);
        });
    }

    //Deleta um produto do banco
    $scope.Excluir = function(id) {
        $http.get(host + "/deletar/" + id).success(function(data) {
            if (data) {
                $scope.Produtos();
            } else {
                alert("Falha ao deletar o produto!");
            }
        }).error(function(erro) {
            console.log(erro);
        });
    }

    //Recebe um produto da lista 
    $scope.GetProduto = function(produto) {
        $scope.produto = produto;
        $scope.produto.Qtd = parseInt(produto.Qtd);
        $scope.produto.Preco = parseInt(produto.Preco);
        $scope.nomeBtnModal = "Salvar";
    }

    //Atualiza os dados do produto
    $scope.Atualizar = function(produto) {
        $http.post(host + "/update", produto).success(function(data) {
            if (data) {
                $scope.Produtos();
                $("#modalProduto").modal("hide");
            } else {
                alert("Falha ao atualizar os dados do produto!");
            }
        }).error(function(erro) {
            console.log(erro);
        });
    }

    $scope.Logoff = function() {
        localStorageService.remove("usuarioLogado");
        location.href = "#/home";
    }
    $scope.Produtos();
});