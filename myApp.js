angular.module('myApp', [])
	.filter('myFilter', function(){
		'use strict';
		return function(problemsList, filters) {
			var tempProblems = [];
			angular.forEach(problemsList, function(problem){
				angular.forEach(filters, function(filter){
					var index = problem.type.indexOf(filter.name);
					if (filter.checked && tempProblems[tempProblems.length - 1] != problem && index >= 0) {
						tempProblems.push(problem);
					}
				});
			});
			return tempProblems;
		};
	})
	.controller('mainController', function ($scope) {
		'use strict';
		$scope.problemsList = [
			{id: 1, name: "Wastewater", 	 		type: ["Water Pollution"]},
			{id: 2, name: "Street dogs", 	 		type: ["Other"]},
			{id: 3, name: "Illegal dumping", 		type: ["Dump"]},
			{id: 4, name: "Beach pollution",		type: ["Dump", "Water Pollution"]},
			{id: 5, name: "A lot of dead fish", 	type: ["Poaching", "Water Pollution"]},
			{id: 6, name: "Illegal constructions",	type: ["Other"]},
			{id: 7, name: "Smelly water", 			type: ["Water Pollution", "Other"]},
			{id: 8, name: "High level of CO2", 		type: ["Other"]},
			{id: 9, name: "An abandoned building", 	type: ["Other", "Dump"]}
		];

		$scope.filters = [
			{name: "Water Pollution", checked: true},
			{name: "Dump", 			  checked: true},
			{name: "Poaching", 		  checked: true},
			{name: "Other", 		  checked: true}
		];

		$scope.checkAll = function() {
			angular.forEach($scope.filters, function(filter){
				filter.checked = true;
			});
		};

		//Add new problem

		$scope.name = "";
		$scope.selection = [];

		$scope.toggleSelection = function(type) {
		    var index = $scope.selection.indexOf(type);
		    if (index > -1) {
		    	$scope.selection.splice(index, 1);
		    } else {
		    	$scope.selection.push(type);
		    }
		};

		$scope.addProblem = function() {
			var newProblem = {
				id: $scope.problemsList.length + 1, 
				name: $scope.name, 
				type: $scope.selection};
			$scope.problemsList.push(newProblem);
			$scope.name = "";
			$scope.selection =[];
		};
	});