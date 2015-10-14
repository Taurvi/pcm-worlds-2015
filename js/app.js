var ngApp = angular.module('ngApp', ['ui.bootstrap']);

ngApp.controller('CtrlMain', ['$scope', '$uibModal', '$location', function($scope, $uibModal, $location) {
    $scope.items = ['item1', 'item2', 'item3'];

    $scope.animationsEnabled = true;

    $scope.open = function (size) {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'ticketAdditionalInfo.html',
            controller: 'ModalInstanceCtrl',
            size: size
        });
    };

    $scope.trololol = function() {
        alert('You belong in a muse-- err this button works.');
    }
}]);

ngApp.controller('ModalInstanceCtrl', ['$scope', '$location', '$modalInstance', function($scope, $location, $modalInstance) {
    $scope.success = "This worked!"

    $scope.confirmTicket = function() {
        alert('sending ticket number: ' + $scope.ngTicketNumber);
    };

    $scope.close = function () {
        $modalInstance.close();
    };
}]);