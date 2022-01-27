// article을 저장할 모듈
// 데이터 사용할 거니까 몽구스 가져옴
const mongoose = require('mongoose')

// 스키마를 만든다
// articles의 각각 내용들을 접근하기 위해 필요함.
// type, 꼭 필요한지, 디폴트
// 새로운 걸 만들 때 마다 이 규칙에 따라 만들어진다.
const articleSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
    },
    description: {
        type : String,
    }, 
    markdown: {
        type : String,
        required: true,
    },
    createdAt : {
        type : Date,
        default : Date.now,
    },
    password : {
        type : String,
        required: true,
    }
});

// article 스키마를 사용하기 위해서 외부에서 쓸 수 있게 만들어줘야한다.
// Aritcle이라는 걸로 불러서 articleSchema를 가져간다.
// 데이터베이스에 Article 테이블이 생겼다.(위에 있는 구체적인 정보를 담았다.)
module.exports = mongoose.model('Article', articleSchema)