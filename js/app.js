var ngApp = angular.module('ngApp', ['ui.bootstrap']);
Parse.initialize('eKRYapkjFAO9WJQgbrWTAxycmijkQujwXv6SuaSA', 'XZPU2LM3Unsdgs9UQOiV0TIcpR5mIZSoPp1abHvx');

ngApp.controller('CtrlMain', ['$scope', '$uibModal', '$location', function($scope, $uibModal, $location) {
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
    $scope.dataSent = false;
    $scope.btnDisableDefault = true;

    $scope.errorState = false;
    $scope.errorMsg = '';

    $scope.success = "This worked!";

    $scope.confirmTicket = function() {
        alert('sending ticket number: ' + $scope.ngTicketNumber);
    };

    $scope.trololol2 = function() {
        alert('SOON (TM)');
    };

    $scope.close = function () {
        $modalInstance.close();
    };

    $scope.checkValid = function(ticketNumber) {
        $scope.btnDisableDefault = false;
        if (ticketNumber.length <= 10 || ticketNumber.length == 0) {
            $scope.errorState = true;
            $scope.errorMsg = 'Please enter in a valid ticket number.';
            $scope.$apply()
            return false;
        } else if ($scope.dbCheckDuplicates(ticketNumber)) {
            $scope.errorState = true;
            $scope.errorMsg = 'You have entered in a duplicate ticket number.';
            $scope.$apply()
            return false;
        }
        else {
            $scope.errorState = false;
            $scope.errorMsg = '';
            return true;
        }

    };

    //*************************
    // Database Communications
    //*************************

    // Checks for duplicates against the database, runs when user tries to submit
    $scope.dbCheckDuplicates = function(ticketNum) {
        var WorldsTickets = Parse.Object.extend("WorldsTickets");
        var queryTickets = new Parse.Query(WorldsTickets);
        queryTickets.equalTo("ticketNumber", ticketNum);
        var tempArray = [];
        queryTickets.find({
            success: function (results) {
                if (results.length == 0) {
                    console.log('No duplciates detected.');
                    $scope.errorState = false;
                    $scope.errorMsg = '';
                    if (!$scope.dataSent) {
                        console.log('data has been sent: ' + $scope.dataSent);
                        $scope.dbSendTicket(ticketNum);
                        $scope.dataSent = true;
                    } else
                        console.log('data has already been sent!');
                    $scope.$apply();
                    return false;
                } else {
                    console.log('Duplicates detected! Ticket Number: ' + ticketNum);
                    $scope.errorState = true;
                    $scope.errorMsg = 'You have entered in a duplicate ticket number!';
                    $scope.$apply();
                    return true;
                }
            },
            error: function (error) {
                console.log("Error: " + error.code + " " + error.message);
            }
        });
    };

    // Stores ticket number on database
    $scope.dbSendTicket = function(ticketNumber) {
        // Sets up the database the
        //$scope.databaseObject = {};
        //$scope.databaseObject.ticketNumber = $scope.ngTicketNumber;

        /*
        $scope.databaseObject.firstName = $scope.ngFirstName;
        $scope.databaseObject.lastName = $scope.ngLastName;
         */
        var WorldsTicket = Parse.Object.extend("WorldsTickets");

        var newTicket = new WorldsTicket();
        newTicket.set('ticketNumber', ticketNumber);
        newTicket.set('checkedIn', false);

        newTicket.save().then(function(newTicket) {
            console.log('Success');
        }, function() {
            console.log('Failed');
        })
    }
}]);