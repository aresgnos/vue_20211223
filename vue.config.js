module.exports = {
    devServer:{
        proxy : {

            // 이 파일 수정시 반드시 vue를 재시작!!
            // 백엔드의 http://localhost:3000이
            // vue에서 url 주소를 생략하여 사용 가능하도록 설정
        
        '/board' :{
            target:'http://localhost:3000',
            changeOrigin :true,
            logLevel : 'debug'
        },

        '/item' :{
            target:'http://localhost:3000',
            changeOrigin :true,
            logLevel : 'debug'
        },

        '/member' :{
            target:'http://localhost:3000',
            changeOrigin :true,
            logLevel : 'debug'
        }

    }
}

}