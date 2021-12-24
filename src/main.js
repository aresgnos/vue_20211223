// App.vue가 시작파일
import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';

// axios restful 호출
import axios from 'axios';

// routes 설정파일 위치 가져오기
import routes from './routes/index.js';

// stores 설정파일 위치 가져오기
import stores from './stores/index.js';

const app = createApp(App);


// 이 위치가 설정파일들의 적용
app.use( routes);
app.use( stores);
app.use( ElementPlus);
app.config.globalProperties.axios = axios;

app.mount('#app')
