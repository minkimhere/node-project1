// express 라이브러리로 서버 만들기.
const express = require('express')

// 서버연결해주는 거 접근할 수 있게 되었다.
// const mongoose = require('mongoose')
const connect = require('./models')
connect()

// 몽구스 스키마 저장되어있는 article 모듈가져오기
const Article = require('./models/article')

// 라우트 폴더에 articels를 가져와서 접근할 수 있게 되었다.
const articleRouter = require('./routes/articles')
const app = express();


// 접근한 몽고디비에 연결한다.
// mongoose.connect('mongodb://15.165.204.201', 27017, username="test", password="test",{
// mongoose.connect('mongodb://localhost:27017/blog',{
//     useNewUrlParser: true, useUnifiedTopology: true
// })

// view engine이 ejs코드를 html로 바꿔준다.
app.set('view engine', 'ejs')

// 접근해서 가져온 articels 라우터를 쓴다고 말해준다.
// 페이지의 첫 기본설정을 /articles로 나오게 한다.
// 그리고 articleRouter에서 가져온 것들은 /articles 화면에 다 추가된다.
//---
// express.unlencoded를 써줘서 route의 articles.js의 post에서 
// New Articl페이지에 form에 모든 파라미터들이 접근가능하게 해줬다.
// urlencoded가 위에 있어야 / 붙은 것들이 모두 접근이 가능하다.
app.use((req, res, next) => {
    console.log('Request URL:', req.originalUrl, ' - ', new Date());
    next();
});
app.use(express.urlencoded({extended : false}))


// main route
app.get('/', async (req, res) => {
    // 날짜 내림차순으로 하기
    const articles = await Article.find().sort({createdAt: 'desc'})

    // client에 보여주기
    // render를 씀으로써 views 폴더에 접근(경로써주기)
    // index에서 각각 다른 부분을 다 들어갈 수 있어야한다.
    // {}의 오브젝트에 다 접근 할 수 있게한다.
    // {}의 key, vaule 다 접근가능 할 수 있게 됨. (ejs에서 가능하다.)
    // 즉, articels 오브젝트 변수에 articles.js ejs로 받아와서 넣는다.
    res.render('articles/index', { articles: articles })




    //------------------------------------------------------------
    // //원래 여기 가장 위에 있었던 실험용 데이터 코드
    // //res.renderr 부분에 오브젝트를 만들어줘서 불러올 수 있게 한다.
    // //articles에 필요한 부분을 오브젝트에 추가한다. 제목, 현재날짜시간, 내용부분.
    // const articles = [{
    //     title: 'Test Article',
    //     createdAt: new Date(),
    //     description: 'Test description'
    // },
    // {
    //     title: 'Test Article2',
    //     // Date함수로 만들어서 ejs에서 현재날짜로 바꾸는 toLocaleDateString메소드를 쓸 수 있게 한다.
    //     createdAt: new Date(),
    //     description: 'Test description2'
    // }];
    //------------------------------------------------------------
});


// /붙은 것들을 그냥 맨 밑에 두고 잘 작동하는지 보자(위에 인코더가 / 아래에있었을 때 안돼서 걍 밑으로 옮김)
app.use('/articles', articleRouter)

app.listen(5000)