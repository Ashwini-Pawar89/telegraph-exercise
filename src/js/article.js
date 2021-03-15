const request = require('./request');

class Article {
	constructor(params) {
		this.params = Object.assign({
			homePagePath: "/einstein-and-churchill-both-took-daily-naps"
		}, params);
	}

	isHomePageArticle() {
		return document.location.pathname == this.params.homePagePath;
	}
    
    createComments(array){
        var commentsCountDiv = document.getElementById("comments-count");
        commentsCountDiv.querySelector("span").innerHTML = array.length+" comments";    

        var container = document.getElementById("comment-wrapper");
        var template = document.getElementById("template-comment");

        for (var i = 0; i < array.length; i++) {
            var item = array[i];
            var clone = template.content.cloneNode(true);
            clone.querySelector('.comment-name').innerHTML = item.name;
            clone.querySelector('.comment-time').innerHTML = new Date(item.date).toUTCString();
            clone.querySelector('.comment-likes').innerHTML = item.likes+" Likes";
            clone.querySelector('.comment-text').innerHTML = item.body;
            container.appendChild(clone);
        }
    }
    
    sortbyLikes(){
        var div = document.querySelector('#comment-wrapper'),
            comments = document.querySelectorAll('#comment-wrapper .comment');
        var commArr = [].slice.call(comments).sort(function (a, b) {
            return parseInt(a.querySelector(".comment-likes").textContent) > parseInt(b.querySelector(".comment-likes").textContent) ? 1 : -1;
        });

        div.innerHTML = '';
        var likedArr = commArr.reverse();
        for (let i = 0; i < commArr.length; ++i) {
          div.appendChild(commArr[i]);
        }
    }
    
    sortbyTime(){
        var div = document.querySelector('#comment-wrapper'),
            comments = document.querySelectorAll('#comment-wrapper .comment');
        var commArr = [].slice.call(comments).sort(function (a, b) {
            return new Date(a.querySelector(".comment-time").textContent) - new Date(b.querySelector(".comment-time").textContent);
        });

        div.innerHTML = '';
        var newestArr = commArr.reverse();
        for (let i = 0; i < newestArr.length; ++i) {
          div.appendChild(newestArr[i]);
        }
    }
    
    fetchCommentsJSON(){
        var url ='https://my-json-server.typicode.com/telegraph/frontend-exercise/comments';
        return request.requestComments(url);
    }
    
    init(){
        this.fetchCommentsJSON().then(data => this.createComments(JSON.parse(data)));
    }

}

module.exports = Article;