const Article = require('./article');

var articleObj = new Article();

window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed!');
    articleObj.init();
});

module.exports = {
    Article: articleObj
};
