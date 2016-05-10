app.controller("UsuarioCtrl", function($scope, localStorageService, $http, $rootScope) {

    var host = "http://localhost:8080/LojaVirtual/api/gerenciamentoWS.php/usuarios";
    $rootScope.usuarioLogado = localStorageService.get("usuarioLogado");

    //Retorna a lista de usuários
    $scope.Usuarios = function() {
        if ($rootScope.usuarioLogado != null) {
            $http.get(host).success(function(data) {
                $scope.usuarios = data;
            }).error(function(erro) {
                console.log(erro);
            });
        } else {
            location.href = "#/home";
        }
    }

    //Cadastra um novo usuário
    $scope.Cadastrar = function(usuario) {
        usuario.Senha = GeraHash(usuario.Senha);
        $http.post(host + "/cadastrar", usuario).success(function(data) {
            if (data) {
                $scope.Usuarios();
                $scope.usuario = null;
                $("#modalUsuario").modal("hide");
            } else {
                alert("Falha ao cadastrar o usuário!");
            }
        }).error(function(erro) {
            console.log(erro);
        });
    }

    //Deleta um usuário do banco
    $scope.Excluir = function(id) {
        $http.get(host + "/deletar/" + id).success(function(data) {
            if (data) {
                $scope.Usuarios();
            } else {
                alert("Falha ao deletar o usuário!");
            }
        }).error(function(erro) {
            console.log(erro);
        });
    }

    //Recebe um usuário da lista 
    $scope.GetUsuario = function(usuario) {
        $scope.usuario = usuario;
        $scope.nomeBtnModal = "Salvar";
    }

    //Atualiza os dados do usuário
    $scope.Atualizar = function(usuario) {
        $http.post(host + "/update", usuario).success(function(data) {
            if (data) {
                $scope.Usuarios();
                $("#modalUsuario").modal("hide");
            } else {
                alert("Falha ao atualizar os dados do usuário!");
            }
        }).error(function(erro) {
            console.log(erro);
        });
    }

    $scope.Logoff = function() {
        localStorageService.remove("usuarioLogado");
        location.href = "#/home";
    }
    $scope.Usuarios();
});