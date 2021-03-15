'use strict';

jest.mock('../request');

const Article = require("../article");

describe( 'Article', () => {
	describe( 'isHomePage', () => {
    it("should match if on homepage", () => {
        const article = new Article();
        window.history.pushState({}, "", "/einstein-and-churchill-both-took-daily-naps");
        expect(article.isHomePageArticle()).toBeTruthy();
    });
        
    test('fetchCommentsJSON request works with resolves', () => {
        const article = new Article();
        var dbCommentsTest   = [{
                "id": 1,
                "date": "2019-04-23T22:26:43.511Z",
                "name": "Dawud Esparza",
                "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed gravida orci.",
                "likes": 33
                },
                {
                "id": 2,
                "date": "2019-04-23T19:26:41.511Z",
                "name": "Lennie Wainwright",
                "body": "Quisque maximus augue ut ex tincidunt sodales. Nullam interdum consectetur mi at pellentesque.",
                "likes": 4
            }];
      expect.assertions(1);
      return expect(article.fetchCommentsJSON()).resolves.toEqual(dbCommentsTest);
    });    
        
    test('Check comments are created in comments section', () => {
          document.body.innerHTML = `<div id="comments-count"><span></span></div><div id="comment-wrapper"></div><template id="template-comment"><div class="comment"><div><span class="comment-name"></span><time class="comment-time"></time></div><div><span class="comment-likes"></span></div><section class="comment-text"></section></div></template><button id="addComments">Add Comments</button>`;
            
        const article = new Article();
            
        var dbComments = [{
            "id": 1,
            "date": "2019-04-23T22:26:43.511Z",
            "name": "Dawud Esparza",
            "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed gravida orci.",
            "likes": 33
            },
            {
            "id": 2,
            "date": "2019-04-23T19:26:41.511Z",
            "name": "Lennie Wainwright",
            "body": "Quisque maximus augue ut ex tincidunt sodales. Nullam interdum consectetur mi at pellentesque.",
            "likes": 4
        }];
            
        document.getElementById('addComments').addEventListener('click', article.createComments(dbComments)); 

        const commentsCount = document.getElementById('comments-count');
        const commentWrapper = document.getElementById('comment-wrapper');

        var result = [];
        const blocks = Array.from(document.querySelectorAll(".comment"));

        blocks.forEach(function(item,index){
        result[index]=item.querySelector(".comment-name").innerHTML;
        });    

        var expected = ["Dawud Esparza", "Lennie Wainwright"];

        expect(result).toEqual(expected);
        expect(commentsCount.innerHTML).toBe('<span>2 comments</span>'); 
    }); 
        
    test('Test sorting by time is working in comments section', () => {
          document.body.innerHTML = `<div id="comment-wrapper"><div class="comment"><time class="comment-time">Wed, 24 Apr 2019 08:23:49 GMT</time></div><div class="comment"><time class="comment-time">Wed, 21 Apr 2019 08:23:49 GMT</time></div><div class="comment"><time class="comment-time">Wed, 22 Apr 2019 08:23:49 GMT</time></div></div><button id="sortbytime">Sort by Time</button>`;

        const article = new Article();
        document.getElementById('sortbytime').addEventListener('click', article.sortbyTime); 

        const addTodoBtn = document.getElementById('sortbytime');
        addTodoBtn.click();

        var result = [];
        const blocks = Array.from(document.querySelectorAll(".comment"));

        blocks.forEach(function(item,index){
            result[index]=item.querySelector(".comment-time").innerHTML;
        });

        var expected = ["Wed, 24 Apr 2019 08:23:49 GMT","Wed, 22 Apr 2019 08:23:49 GMT","Wed, 21 Apr 2019 08:23:49 GMT"];
        expect(result).toEqual(expected);
    }); 
        
    test('Test sorting by likes is working in comments section', () => {
          document.body.innerHTML = `<div id="comment-wrapper"><div class="comment"><span class="comment-likes">8</span></div><div class="comment"><span class="comment-likes">2</span></div><div class="comment"><span class="comment-likes">15</span></div></div><button id="sortbylikes">Sort by Time</button>`;

        const article = new Article();
        document.getElementById('sortbylikes').addEventListener('click', article.sortbyLikes); 

        const addTodoBtn = document.getElementById('sortbylikes');
        addTodoBtn.click(1);

        var result = [];
        const blocks = Array.from(document.querySelectorAll(".comment"));

        blocks.forEach(function(item,index){
            result[index]=item.querySelector(".comment-likes").innerHTML;
        });

        var expected = ["15","8","2"];
        expect(result).toEqual(expected);
    }); 

	});
});
