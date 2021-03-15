const express = require('express');
const exphbs  = require('express-handlebars');
const router = require('./router');

const articleJsonData = require("./content/article.json");
const metaJsonData = require("./content/meta.json");
const postsJsonData = require("./content/posts.json");

const app = express();
const port = 3000;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('meta', metaJsonData);
app.set('article', articleJsonData);
app.set('articleDate',new Date(articleJsonData.post.date).toUTCString());
app.set('posts', postsJsonData.posts);

app.use('*/static', express.static('public'));

app.use(router);

module.exports = app;
app.listen(port, () => console.log(`Listening on port ${port}!`));
