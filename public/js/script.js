
// application namespace
var blogApp = blogApp || {};

// all blog posts
blogApp.posts = [];

// function to retrieve all blog posts
blogApp.getPosts = function() {
	var _this = this;
	$.ajax(
	{
		url:"http://api.tumblr.com/v2/blog/intellisol.tumblr.com/posts?api_key=T87SJzAER6jBO2qpIkDcvgqxMxTTZ3KClAQL04uJZJ0I878USq",
		dataType: "jsonp",
		success: function(data) {
			if (typeof data == "string") {
				_this.posts = JSON.parse(data);
			}else {
				_this.posts = data;
			}
			console.log(_this.posts.response.posts);
			_this.showPostIndex();
		}
	});
}

blogApp.showPostIndex = function() {
	var html = "";
	for (var i = 0; i < this.posts.response.posts.length; i++) {
		html += this.posts.response.posts[i].title + "<br>";
	}
	$("#content").html(html);
}

// get all blog posts
blogApp.getPosts();
