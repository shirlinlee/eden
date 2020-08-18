import mode from './modules/mode';
import qs from 'qs';
import { story_details as stories } from './story_details';
import { domain, domain_api, cookie_expire } from './env';

new Vue({
    el: '#app',
    data: {
        isloaded: false,
        isMobile: true,
        stories,
        totalVote: 0,
        videos: [
            {
                title: '【 也許，你不認識他們 】',
                des:
                    '在生活中，身心障礙者及家庭支持者需面對各種困境與挑戰，其實，他們與我們之間的距離並不遙遠',
                youtubeId: 'NLHHv07gKVc',
                img: 0,
            },
            {
                title: '【 放手，不放心 】',
                des:
                    '彥伯與薇蓁接受日間照顧服務及職業訓練後，人生風景大大不同，深愛他們的爸媽更是稍稍鬆了口氣，有了力量與勇氣繼續向前行...',
                youtubeId: 'WFA5SAVAK7s',
                img: 1,
            },
            {
                title: '【 我的電子眼爸爸 】',
                des:
                    '一帆風順的人生，誰也沒想到意外就這麼發生，人生也跟著跌落黑暗，等著高永彬的是無數艱難挑戰 ...',
                youtubeId: 'qVjLML8YhH4',
                img: 2,
            },
            {
                title: '【 多陪你一天 】',
                des:
                    '當歲月逐漸流逝，當家人逐漸離去，當翱翔於天際的紙飛機成了奢望，對雙老家庭而言，陪伴在身邊的兒女是永遠的天使，也是心中最沈重的羈絆...',
                youtubeId: 'SbgQ_eVdz4s',
                img: 3,
            },
            {
                title: '【 小眼睛 】',
                des:
                    '那些看得見，不，透過 相互的理解，用心感受，縮小彼此之間無形的距離，當我們在一起，就是一個家…',
                youtubeId: '9BPOetACJYc',
                img: 4,
            },
        ],
        swiper: null,
        sliderOption: {
            autoplay: {
                delay: 5000,
            },
            speed: 600,
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
        currentVideo: 'NLHHv07gKVc',
        revealOption: {
            distance: '80px',
            duration: 1000,
            // reset: true,
            // scale: 1,
        },
        story_anchor: null,
    },
    created() {
        // const {
        //     location: { search },
        // } = window;
        // const story_anchor = this.findGetParameter('story');
        // if (story_anchor) this.story_anchor = Number(this.story_anchor) + 1;
    },
    mounted: function () {
        mode();
        // console.log(stories);
        const $this = this;
        this.detectScreen();

        this.$nextTick(() => {
            this.bindVideoHandler();

            /// 從api取得此頁面投票數
            this.getVoteNumber();

            setTimeout(() => {
                $this.isloaded = true;

                window.sr = ScrollReveal();
                sr.reveal('.scr', $this.revealOption);
                sr.reveal('.scr_late', { ...$this.revealOption, delay: 400 });
            }, 800);

            $('#video_nav')
                .find('.swiper-slide')
                .each(function (item) {
                    console.log($(this).attr('data-id'));
                    if ($(this).attr('data-id') === $this.currentVideo) {
                        $(this).addClass('currentPlay');
                    }
                });

            // setTimeout(() => {
            //     if ($this.story_anchor) {
            //         $this.ScrollHandler(`st_0${$this.story_anchor}`);
            //     }
            // }, 5000);
        });
    },
    methods: {
        getVoteNumber() {
            axios
                .get(`${domain_api}/api/GetPersons.php`)
                .then((response) => {
                    const {
                        data: { totalcounts },
                        status,
                    } = response;
                    if (status === 200) {
                        this.totalVote = totalcounts;
                    } else {
                        console.warn(error);
                    }
                })
                .catch(function (error) {
                    // 请求失败处理
                    console.warn(error);
                });
        },
        bindVideoHandler() {
            const elements = document.getElementsByClassName('swiper-slide');
            const $this = this;
            for (let i = 0; i < elements.length; i++) {
                elements[i].addEventListener(
                    'click',
                    function () {
                        let id = this.getAttribute('data-id');
                        $('.swiper-slide').removeClass('currentPlay');
                        $(this).addClass('currentPlay');
                        $this.currentVideo = id;
                    },
                    false
                );
            }
        },
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
        ScrollHandler(element, to, duration) {
            window.scroll({
                top: this.$refs[element].offsetTop,
                behavior: 'smooth',
            });
        },
        scrHandler(index, isImg) {
            if (!this.isMobile) {
                // if (index % 2 === 0) {
                return isImg ? 'scr' : 'scr_late';
                // }
                // else {
                // return isImg ? 'scr_late' : 'scr';
                // }
            }
            return 'scr';
        },
        // videoHandler(id) {
        //     console.log(id);
        //     this.currentVideo = id;
        // },
        // findGetParameter(parameterName) {
        //     var result = null,
        //         tmp = [];
        //     location.search
        //         .substr(1)
        //         .split('&')
        //         .forEach(function (item) {
        //             tmp = item.split('=');
        //             if (tmp[0] === parameterName)
        //                 result = decodeURIComponent(tmp[1]);
        //         });
        //     return result;
        // },
    },
});
