var todoApp = angular.module('todoApp', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // GET and display all todos (/api/todos)
    $http.get('/api/todos')
        .success(function(data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // POST (/api/todos)
    $scope.createTodo = function() {
        $scope.formData.done = false;
        $http.post('/api/todos', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // DELETE
    $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log("Error: " + data);
            });
    };
}
