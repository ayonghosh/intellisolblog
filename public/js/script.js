
// application namespace
var app = app || {};

// all blog posts
app.posts = [];

// function to retrieve all blog posts
app.getPosts = function() {
	$.get("http://api.tumblr.com/v2/blog/intellisol.tumblr.com/posts?api_key=T87SJzAER6jBO2qpIkDcvgqxMxTTZ3KClAQL04uJZJ0I878USq", 
	function(data) {
		if (typeof data == 'string') {
			app.posts = JSON.parse(data);
		}else {
			app.posts = data;
		}
		console.log(posts);
	});
}


// get all blog posts
console.log("get");
app.getPosts();
