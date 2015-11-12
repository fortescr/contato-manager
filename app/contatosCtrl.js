app.controller('contatosCtrl', function ($scope, $modal, $filter, Data) {
    $scope.contato = {};
    Data.get('contatos').then(function(result){
        $scope.contatos = result.data;
    });
    
 $scope.columns = [
                    {text:"ID",predicate:"id",sortable:true,dataType:"number"},
                    {text:"Nome",predicate:"nome",sortable:true}
                ];

$scope.deleteContato = function(contato){
        if(confirm("Deseja realmente deletar o contato")){
            Data.delete("contatos/"+contato.id).then(function(result){
                $scope.contatos = _.without($scope.contatos, _.findWhere($scope.contatos, {id:contato.id}));
            });
        }
    };
    $scope.open = function (p,size) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/contatosEdit.html',
          controller: 'contatoEditCtrl',
          size: size,
          resolve: {
            item: function () {
              return p;
            }
          }
        });
        modalInstance.result.then(function(selectedObject) {
            if(selectedObject.save == "insert"){
                $scope.contatos.push(selectedObject);
                $scope.contatos = $filter('orderBy')($scope.contatos, 'id', 'reverse');
            }else if(selectedObject.save == "update"){
                p.nome = selectedObject.nome;
            }
        });
    };
    
 $scope.columns = [
                    {text:"ID",predicate:"id",sortable:true,dataType:"number"},
                    {text:"Nome",predicate:"nome",sortable:true}
                ];

});


app.controller('contatoEditCtrl', function ($scope, $modalInstance, item, Data) {

  $scope.contato = angular.copy(item);
        
        $scope.cancel = function () {
            $modalInstance.dismiss('Close');
        };
        $scope.title = (item.id > 0) ? 'Edita Contato' : 'Add Contato';
        $scope.buttonText = (item.id > 0) ? 'Update Contato' : 'Add Novo Contato';

        var original = item;
        $scope.isClean = function() {
            return angular.equals(original, $scope.contato);
        }
        $scope.saveContato = function (contato) {
            contato.uid = $scope.uid;
            if(contato.id > 0){
                Data.put('contatos/'+contato.id, contato).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(contato);
                        x.save = 'update';
                        $modalInstance.close(x);
                    }else{
                        console.log(result);
                    }
                });
            }else{
                Data.post('contatos', contato).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(contato);
                        x.save = 'insert';
                        x.id = result.data;
                        $modalInstance.close(x);
                    }else{
                        console.log(result);
                    }
                });
            }
        };
});