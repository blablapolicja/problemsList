angular.module('myApp', [])
	.filter('myFilter', function(){
		'use strict';
		return function(problemsList, filters) {
			var tempProblems = [];
			angular.forEach(problemsList, function(problem){
				angular.forEach(filters, function(filter){
					var index = problem.tags.indexOf(filter);
					if (tempProblems[tempProblems.length - 1] != problem && index >= 0) {
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
			{id: 1, name: "Wastewater", 	 		tags: ["Water Pollution"]},
			{id: 2, name: "Street dogs", 	 		tags: ["Other"]},
			{id: 3, name: "Illegal dumping", 		tags: ["Dump"]},
			{id: 4, name: "Beach pollution",		tags: ["Dump", "Water Pollution"]},
			{id: 5, name: "A lot of dead fish", 	tags: ["Poaching", "Water Pollution"]},
			{id: 6, name: "Illegal constructions",	tags: ["Other"]},
			{id: 7, name: "Smelly water", 			tags: ["Water Pollution", "Other", "Dump"]},
			{id: 8, name: "High level of CO2", 		tags: ["Other"]},
			{id: 9, name: "An abandoned building", 	tags: ["Other", "Dump"]},
			{id: 10, name: "Poachers", 				tags: ["Poaching"]}
		];

		$scope.tags = ["Water Pollution", "Dump", "Poaching", "Other"];//you can add new tag
		$scope.selectedTags = [];

		$scope.checkAll = function() {
			angular.copy($scope.tags, $scope.selectedTags);
		};

		//Add new problem

		$scope.name = "";
		$scope.selection = [];

		$scope.toggleSelection = function(tag, array) {
		    var index = array.indexOf(tag);
		    if (index > -1) {
		    	array.splice(index, 1);
		    } else {
		    	array.push(tag);
		    }
		};

		$scope.addProblem = function() {
			var newProblem = {
				id: $scope.problemsList.length + 1, 
				name: $scope.name, 
				tags: $scope.selection
			};
			$scope.problemsList.push(newProblem);
			$scope.name = "";
			$scope.selection =[];
		};
	});