var intelliSolBlogControllers = angular.module('blogControllers', []);

intelliSolBlogControllers.controller('BlogListCtrl', ['$scope', '$http', 
	function BlogListCtrl($scope, $http) {
		var _scope = $scope;
		$.ajax(
		{
			url:'http://api.tumblr.com/v2/blog/intellisol.tumblr.com/posts?api_key=T87SJzAER6jBO2qpIkDcvgqxMxTTZ3KClAQL04uJZJ0I878USq',
			dataType: 'jsonp',
			success: function(data) {
				if (typeof data == 'string') {
					data = JSON.parse(data);
				}
				_scope.blogs = data.response.posts;
				console.log(_scope.blogs);
			}
		});
	}
]);

intelliSolBlogControllers.controller('BlogCtrl', ['$scope', '$http', 
	function BlogCtrl($scope, $http) {
		// TODO 
	}
])
