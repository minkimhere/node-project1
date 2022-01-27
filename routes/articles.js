//server.js에 넣으면 너무 많으니까 분리
//article과 관련된 라우트 넣는곳

//라우트를 쓰기 위해서 먼저 express 라이브러리 설정해준다.
//스키마에 따라 데이터베이스에 저장하는 걸 만든 article모듈을 불러온다. (모듈을 보통 대문자로 시작)
//router를 사용해서 server.js의 app처럼 사용할 수 있도록 한다.
const express = require('express')
const Article = require('../models/article')
const router = express.Router()
const mongoose = require('mongoose')
// String을 ObjectId로 바꾸기 위해 모듈 불러옴
const ObjectId = mongoose.Types.ObjectId

// / 경로로 들어가면 보일 수 있다고 생각하는데
// server에서 가져올 때 articles 경로로 설정해줬기 때문에 /articles로 접근한다.
// 뒤에 new가 붙었으므로 /articles/new로 http 경로설정.
// render 써서 articles폴더의 new로 접근
// article 이 articles/new에서 접근가능하게 만듦
router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article() })
    //article 없으면 홈으로 가기
    if (article == null) res.redirect('/')
    res.render('articles/show', { article: article })
})

// id값 가져옴, {article : article}해서 pass(접근 가능하게 함)
// findById 는 async function이므로 async 써준다
 // const article = await Article.findById(req.params.id)
router.get('/:id', async (req, res) => {

    const id = req.params.id;
    const article = await Article.findOne({id})
   
    res.render('articles/show', {article: article})

    // const { params: { _id }, } = req; 
    // const article = await Article.find({ _id: _id }); 
    // res.status(200).render('articles/show', { article : article });

    // mongoose의 ObjectId기능을 활용하기 위해 mongoose require해온다.
    // String을 ObjectId로 바꾸기 위해 모듈 불러옴(맨 위에 추가) const ObjectId = mongoose.Types.ObjectId;
    // req.params.id로 받은 string값을 ObjectId객체로 바꿔준다.
    // const id = ObjectId(req.params.id)
    // const article = await Article.findById(id)


    //case1 : findById 할 때 object가 아닌 string으로 찾아오는 문제(업데이트 때문인듯)
    // const id = ObjectId(req.params.id)
    // const article = await Article.findById(id)
    // res.json(article)

    //case2: 해결 됐다 싶더니 findOne은 맨 위 데이터만 찾아오는 문제 생김
    // const id = req.params.id;
    // const article = await Article.findOne({id})
    // res.json(article)
    // console.log(article)

    //case3: 쇼핑몰 따라해보기 html이 안뜨는 문제
    // const { articleId } = req.params;
    // const article = await Article.find({ articleId: Number(articleId) })

    //case4: 쇼핑몰 다시 따라하기
    // const { articleId } = req.params.id;
    // const article = await Article.find({ articleId: articleId });
    // console.log(article)

})

// 제출하기를 누를 때마다 이걸 불러준다.
// article을 post 메소드를 사용해서 데이터베이스에 저장하려면 연결해줘야한다.
// 이 post request가 article의 form에 access 하려면 express한테 어떻게 access할지 말해줘야한다.
// server.js에서 use부분에서 알려줬음. 
// request로 articled의 제목, 설명, 마크다운 부분을 가져온다.
// form으로 부터 입력받는 article이 완성되었다.
// try에서 article을 한 번 더 받으므로 let으로 변경
router.post('/', async (req, res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown,
    })

    try {
        //저장 
        //async 함수여서 async, await를 써준다.
        // 성공할경우 article로 리턴해서 article 값에 새롭게 저장해줌. 저장하면 아이디가 생김
        // http 맨 뒤에 id 값 붙어서 새로고침해줌. (:id 붙은 get으로 리다이렉팅함.)
        article = await article.save()
        res.redirect(`/articles/:${article.id}`)
    } catch (e) {
        //실패할경우
        //전에 썼었던 화면으로 돌아간다.
        console.log(e);
        res.render('articles/new', { article: article })
    }

})


// 라우터를 쓰고 있다고 말해줘야한다.
// 라우터를 발행해줘서 서버에서도 가져다 쓸 수 있다.
module.exports = router