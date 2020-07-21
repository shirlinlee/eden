import mode from './modules/mode';
// import Vue from 'vue';

new Vue({
    el: '#app',
    data: {
        isMobile: true,
        stories: [
            {
                des:
                    '發揮我的影響力！<br />邀請您與家人或朋友，一人一個7拼出友善愛心手勢，<br />拍下照片上傳您的社群並加入hashtag <a>#和我伊7友善</a> <a>#讓愛無礙</a>，讓友善行動任務擴散到城市的每個角落。',
                vote_text: '個人獻出暖暖的友善愛心。',
                color: '#6599cd',
            },
            {
                des:
                    '今天，送一個禮物給身心障礙朋友吧！<br />走在人來人往的路上，留意看看會遇到幾位身心障礙朋友呢？<br />若是遇到他們，給他/她一個溫暖的微笑吧！',
                vote_text: '個人送給身心障礙朋友微笑小禮物了！',
                color: '#ffcc33',
            },
            {
                des:
                    '身心障礙朋友，我來carry!<br />生活中，身心障礙朋友難免會遇到許多不方便，邀請您伸出援<br />手為他們加點力，適時給予他們需要的幫助吧！',
                vote_text: '個人成為最carry的神隊友！',
                color: '#669833',
            },
            {
                des:
                    '身障朋友多才多藝，優質商品任君挑選！<br />挑選禮物時，不妨優先選購庇護工場的產品，讓您體面送禮<br />也能做公益，更能為身障朋友帶來極大的鼓勵噢！',
                vote_text: '個人用行動支持身障朋友的用心。',
                color: '#990434',
            },
            {
                des:
                    '禮讓，讓生活更美好！<br />體貼身障者的不方便，發揮優先禮讓的美德，<br />讓生活更美好，心情也跟著美好起來！',
                vote_text: '個人體貼讓出無障礙設施給身障朋友。',
                color: '#ff9999',
            },
            {
                des:
                    '同理和接納，這是第一步！<br />身心障礙者努力學習自立生活，也在工作過程中找到屬於自<br />己的價值，他們和我們一樣，我們沒有不同！',
                vote_text: '個人願意換位思考，善待身心障礙朋友。',
                color: '#cccc65',
            },
            {
                des:
                    '讚美和鼓勵的言語人人都喜歡聽！<br />與身心障礙朋友溝通，不必過度小心翼翼，像朋友一般互動就<br />好，但要記得，人人都喜歡聽正面的言語噢！',
                vote_text: '個人帶給身心障礙朋友正面的鼓勵！',
                color: '#66cccc',
            },
        ],
        videos: [
            {
                title: '【 也許，你不認識他們 】',
                des:
                    '在生活中，身心障礙者及家庭支持者需面對各種困境與挑戰，其實，他們與我們之間的距離並不遙遠',
            },
            {
                title: '【 放手，不放心 】',
                des:
                    '彥伯與薇蓁接受日間照顧服務及職業訓練後，人生風景大大不同，深愛他們的爸媽更是稍稍鬆了口氣，有了力量與勇氣繼續向前行...',
            },
            {
                title: '【 我的電子眼爸爸 】',
                des:
                    '一帆風順的人生，誰也沒想到意外就這麼發生，人生也跟著跌落黑暗，等著高永彬的是無數艱難挑戰 ...',
            },
            {
                title: '【 多陪你一天 】',
                des:
                    '當歲月逐漸流逝，當家人逐漸離去，當翱翔於天際的紙飛機成了奢望，對雙老家庭而言，陪伴在身邊的兒女是永遠的天使，也是心中最沈重的羈絆...',
            },
            {
                title: '【 小眼睛 】',
                des:
                    '那些看得見，不，透過 相互的理解，用心感受，縮小彼此之間無形的距離，當我們在一起，就是一個家…',
            },
        ],
        swiper: null,
        sliderOption: {
            // slidesPerView: 5,
            // direction: 'vertical',
            // autoHeight: true,
            // loop: false,
            slidesPerView: 4,
            direction: 'horizontal',
            autoHeight: false,
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            // breakpoints: {
            //     599: {
            //         slidesPerView: 4,
            //         direction: 'horizontal',
            //         autoHeight: false,
            //         loop: true,
            //     },
            // },
        },
    },
    mounted: function () {
        mode();
        this.detectScreen();
        this.$nextTick(() => {
            ScrollReveal().reveal('.scr');
            // window.addEventListener('resize', this.detectScreen);
        });
    },
    methods: {
        detectScreen() {
            if (window.innerWidth >= 600 && this.isMobile) {
                this.isMobile = false;
                this.swiper = new Swiper(
                    '.swiper-container',
                    this.sliderOption
                );
            } else if (window.innerWidth < 600 && !this.isMobile) {
                this.isMobile = true;
                // this.swiper.destroy();
            }
        },
    },
});
