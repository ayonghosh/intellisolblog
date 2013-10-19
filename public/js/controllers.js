var intelliSolBlogControllers = angular.module('blogControllers', []);

intelliSolBlogControllers.controller('BlogListCtrl', ['$scope', '$http', 
	function BlogListCtrl($scope, $http) {
		$.ajax(
		{
			url:'http://api.tumblr.com/v2/blog/intellisol.tumblr.com/posts?api_key=T87SJzAER6jBO2qpIkDcvgqxMxTTZ3KClAQL04uJZJ0I878USq',
			dataType: 'jsonp',
			success: function(data) {
				if (typeof data == 'string') {
					data = JSON.parse(data);
				}
				//$scope.blogs = data.response.posts;
				$scope.blogs = [
				    {'title': 'Nexus S',
				     'snippet': 'Fast just got faster with Nexus S.'},
				    {'title': 'Motorola XOOM™ with Wi-Fi',
				     'snippet': 'The Next, Next Generation tablet.'},
				    {'title': 'MOTOROLA XOOM™',
				     'snippet': 'The Next, Next Generation tablet.'}
				  ];
				console.log($scope.blogs);
			}
		});
	}
]);

intelliSolBlogControllers.controller('BlogCtrl', ['$scope', '$http', 
	function BlogCtrl($scope, $http) {
		// TODO 
	}
])
