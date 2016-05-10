app.controller("HomeCtrl", function($scope, localStorageService, $rootScope, $http, $location) {

    var host = "http://localhost:8080/LojaVirtual/api/gerenciamentoWS.php";
    var carrinho = [];
    $scope.Produtos = function() {
        $http.get(host + "/produtos").success(function(data) {
            $scope.produtos = data;
        }).error(function(erro) {
            console.log(erro);
        });
        if (localStorageService.get("carrinho") != null) {
            carrinho = localStorageService.get("carrinho");
            var total = 0;
            for (var i = 0; i < carrinho.length; i++) {
                total += carrinho[i].Produto.Preco * carrinho[i].Qtd;
            }
            $scope.total = total;
            $scope.carrinho = carrinho;
        }
        $scope.qtdProdutoCarrinho = carrinho.length > 0 ? carrinho.length : 0;
    }

    $scope.GetProduto = function(produto) {
        localStorageService.set("produto", produto);
    }

    $scope.AddProdutoCarrinho = function(produto) {
        var novoCarrinho = { Produto: produto, Qtd: 1 };
        carrinho.push(novoCarrinho);
        localStorageService.set("carrinho", carrinho);
        $scope.qtdProdutoCarrinho = carrinho.length > 0 ? carrinho.length : 0;
        alert("Produto adicionado com sucesso!");
    }

    $scope.LimparCarrinho = function() {
        carrinho = [];
        localStorageService.set("carrinho", carrinho);
        $scope.Produtos();
    };

    $scope.RemoverItemCarrinho = function(produto) {
        carrinho = carrinho.filter(function(e) {
            return e.Produto.Id !== produto.Id;
        });
        localStorageService.set("carrinho", carrinho);
        $scope.Produtos();
    }

    $scope.AlmentarQtdProduto = function(item) {
        if (item.Qtd < item.Produto.Qtd) {
            carrinho = carrinho.filter(function(e) {
                if (e.Produto.Id === item.Produto.Id) {
                    e.Qtd += 1;
                }
                return carrinho;
            });
            localStorageService.set("carrinho", carrinho);
            $scope.Produtos();
        } else {
            alert("Não há produtos suficiente");
        }
    }

    $scope.DiminuirQtdProduto = function(item) {
        if (item.Qtd > 1) {
            carrinho = carrinho.filter(function(e) {
                if (e.Produto.Id === item.Produto.Id) {
                    e.Qtd -= 1;
                }
                return carrinho;
            });
            localStorageService.set("carrinho", carrinho);
            $scope.Produtos();
        }
    }

    $scope.FinalizarCompra = function() {
        $http.post(host + "/vendas/add", carrinho).success(function(data) {
            if (data) {
                carrinho = [];
                localStorageService.set("carrinho", carrinho);
                $scope.Produtos();
                alert("Venda finalizada com sucesso!");
            } else {
                alert("Falha ao finalizar a venda!");
            }
        }).error(function(erro) {
            console.log(erro);
        });
    }

    $scope.Login = function(usuario) {
        usuario.Senha = GeraHash(usuario.Senha);
        $http.post(host + "/login", usuario).success(function(data) {
            localStorageService.set("usuarioLogado", data);
            $rootScope.usuarioLogado = data;
            $scope.usuario = null;
            $("#modalLogin").modal("hide");
            location.href = "#/admin/produtos";
        });
    }
    $scope.Produtos();
});

app.controller("DetalheProdutoCtrl", function($scope, localStorageService, $http, $rootScope) {
    
    var host = "http://localhost:8080/LojaVirtual/api/gerenciamentoWS.php";
    var carrinho = [];
    
    $scope.Produto = function() {
        $scope.produto = localStorageService.get("produto");
         if (localStorageService.get("carrinho") != null) {
            carrinho = localStorageService.get("carrinho");
            var total = 0;
            for (var i = 0; i < carrinho.length; i++) {
                total += carrinho[i].Produto.Preco * carrinho[i].Qtd;
            }
            $scope.total = total;
            $scope.carrinho = carrinho;
        }
        $scope.qtdProdutoCarrinho = carrinho.length > 0 ? carrinho.length : 0;
    }

    $scope.AddProdutoCarrinho = function(produto) {
        var novoCarrinho = { Produto: produto, Qtd: 1 };
        carrinho.push(novoCarrinho);
        localStorageService.set("carrinho", carrinho);
        $scope.qtdProdutoCarrinho = carrinho.length > 0 ? carrinho.length : 0;
        alert("Produto adicionado com sucesso!");
    }
    
    $scope.Login = function(usuario) {
        usuario.Senha = GeraHash(usuario.Senha);
        $http.post(host + "/login", usuario).success(function(data) {
            localStorageService.set("usuarioLogado", data);
            $rootScope.usuarioLogado = data;
            $scope.usuario = null;
            $("#modalLogin").modal("hide");
            location.href = "#/admin/produtos";
        });
    }
    $scope.Produto();
});
