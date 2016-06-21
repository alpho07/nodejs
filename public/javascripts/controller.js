/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('ContactApp', [])
        .controller('AppCtrl', function ($scope, $http) {

            var refresh = function () {
                $http.get('/contactlist').success(function (response) {
                    console.log(response);
                    $scope.people = response;
                    $scope.contact = '';
                });
            };
            refresh();

            $scope.addContact = function () {
                $http.post('/contactlist', $scope.contact).success(function (response) {
                    ;
                    refresh();
                });
            };

            $scope.remove = function (id) {
                $http.delete('/contactlist/' + id).success(function (response) {
                    refresh();
                });
            };

            $scope.edit = function (id) {
                $http.get('/contactlist/' + id).success(function (response) {
                    console.log(response);
                    $scope.contact = response;
                });
            };

            $scope.updateContact = function () {
                $http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function (response) {
                    refresh();
                });
            };

            $scope.clearContact = function () {
                $scope.contact = '';

            };

        });



