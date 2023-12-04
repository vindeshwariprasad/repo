// app.js

var app = angular.module("userApp", []);

app.controller("UserController", function ($scope, $http) {
  $http.get("okay.json").then(function (response) {
    $scope.users = response.data;
    $scope.filteredUsers = angular.copy($scope.users);

    // Extract unique domains
    $scope.domains = Array.from(
      new Set($scope.users.map((user) => user.domain))
    );

    // Extract unique genders
    $scope.genders = Array.from(
      new Set($scope.users.map((user) => user.gender))
    );

    // Extract unique availabilities
    $scope.availabilities = Array.from(
      new Set($scope.users.map((user) => user.available))
    );
  });

  $scope.currentPage = 1;
  $scope.pageSize = 20;

  $scope.filterByDomain = function (user) {
    return !$scope.selectedDomain || user.domain === $scope.selectedDomain;
  };

  $scope.filterByGender = function (user) {
    return !$scope.selectedGender || user.gender === $scope.selectedGender;
  };

  $scope.filterByAvailability = function (user) {
    return (
      !$scope.selectedAvailability ||
      user.available === ($scope.selectedAvailability === "true")
    );
  };

  $scope.addToTeam = function (user) {
    if (user.available && $scope.teamDomains.indexOf(user.domain) === -1) {
      $scope.team.push(user);
      $scope.teamDomains.push(user.domain);
    }
  };

  $scope.team = [];
  $scope.teamDomains = [];
});

app.filter("startFrom", function () {
  return function (input, start) {
    start = +start; // parse to int
    return input.slice(start);
  };
});
