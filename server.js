const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article')
const articleRouter = require('./routes/articles');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

/* mongoose.connect('mongodb://localhost/blog',{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
 */

mongoose.connect(
    'mongodb+srv://blog_user:Killinggnomes50@cluster0.wg4fx.mongodb.net/Cluster0?retryWrites=true&w=majority'
    , { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true},
    () => {
        console.log('DB is awesome');
       
       
    })
   
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));


app.get('/', async (req, res) =>{
    const articles = await Article.find().sort({
        createdAt: 'desc' 
    });
    res.render('articles/index', {articles: articles});
});

app.use('/articles', articleRouter);

app.listen(7000);