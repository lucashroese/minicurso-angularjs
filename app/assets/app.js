var app = angular.module("App", ["ngRoute", "LocalStorageModule"]);

app.config(function($routeProvider) {
    //Área comum
    $routeProvider.when("/home", {
        templateUrl: "view/home.html",
        controller: "HomeCtrl",
    });
    $routeProvider.when("/detalhes-do-produto/:id", {
        templateUrl: "view/produto.html",
        controller: "DetalheProdutoCtrl",
    });
    $routeProvider.when("/carrinho", {
        templateUrl: "view/carrinho.html",
        controller: "HomeCtrl",
    });
    //Admin
    $routeProvider.when("/admin/produtos", {
        templateUrl: "view/admin/produtos.html",
        controller: "ProdutoCtrl",
    });
    $routeProvider.when("/admin/vendas", {
        templateUrl: "view/admin/vendas.html",
        controller: "VendaCtrl",
    });
    $routeProvider.when("/admin/usuarios", {
        templateUrl: "view/admin/usuarios.html",
        controller: "UsuarioCtrl",
    });
    $routeProvider.otherwise({ redirectTo: "/home" });
});

app.filter("ellipsis", function() {
    return function(input, size) {
        if (input.length < size) {
            return input;
        } else {
            var output = input.substring(0, size) + "...";
            return output;
        }
    };
});

