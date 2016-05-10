app.controller("VendaCtrl", function($scope, localStorageService, $http, $rootScope) {

    var host = "http://localhost:8080/LojaVirtual/api/gerenciamentoWS.php/vendas";
    $rootScope.usuarioLogado = localStorageService.get("usuarioLogado");

    $scope.Vendas = function() {
        if ($rootScope.usuarioLogado != null) {
            $http.get(host).success(function(data) {
                $scope.vendas = data;
                console.log($scope.vendas);
            }).error(function(erro) {
                console.log(erro);
            });
        } else {
            location.href = "#/home";
        }
    };

    $scope.Logoff = function() {
        localStorageService.remove("usuarioLogado");
        location.href = "#/home";
    }
    $scope.Vendas();
});