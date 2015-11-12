var app = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ngAnimate']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/', {
      title: 'Contatos',
      templateUrl: 'partials/contatos.html',
      controller: 'contatosCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });;
}]);
    