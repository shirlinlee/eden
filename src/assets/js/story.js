import mode from './modules/mode';
import qs from 'qs';
import { story_details as stories } from './story_details';
import { domain, domain_api, cookie_expire } from './env';

new Vue({
    el: '#storyPage',
    data: {
        stories,
        story_index: 0,
        story_individual: {},
        story_voting_num: 0,
        canVote: true,
        showLb: false,
    },
    created: function () {
        // 初始化story需呈現內容
        const {
            location: { hash },
        } = window;
        const [tag, num] = hash.split('#');
        if (!!Number(num)) {
            this.story_index = Number(num) - 1;
        }
        this.story_individual = this.stories[this.story_index];

        // 從api取得此頁面投票數
        this.getVoteNumber();
        window.addEventListener('hashchange', () => {
            location.reload();
        });
    },
    mounted: function () {
        console.log(this.story_index);
        mode();
        this.$nextTick(() => {
            // 從cookie取得是否可以投票
            this.canVote = Cookies.get(`story${this.story_index}_voted`)
                ? false
                : true;
        });
    },
    methods: {
        getVoteNumber() {
            axios
                .get(`${domain_api}/api/GetPersons.php`)
                .then((response) => {
                    const {
                        data: { individual },
                        status,
                    } = response;
                    if (status === 200) {
                        const arr = individual.filter((el) => {
                            // console.log(el);
                            return el.type === this.story_index + 1;
                            // return el;
                        });
                        this.story_voting_num = arr[0].counts;
                        Cookies.set(
                            `story${this.story_index}`,
                            voted_num,
                            cookie_expire
                        );
                    } else {
                        console.warn(error);
                    }
                })
                .catch(function (error) {
                    // 请求失败处理
                    console.warn(error);
                });
        },
        voting() {
            // 先檢查是否可以投
            if (this.canVote) {
                const voted_num = this.story_voting_num + 1;
                axios
                    .post(
                        `${domain_api}/api/CountPerson.php`,
                        qs.stringify({
                            type: this.story_index + 1,
                        })
                    )
                    .then((response) => {
                        const {
                            data: { individual },
                            status,
                        } = response;
                        if (status === 200) {
                            Cookies.set(
                                `story${this.story_index}`,
                                voted_num,
                                cookie_expire
                            );
                            Cookies.set(
                                `story${this.story_index}_voted`,
                                new Date(),
                                cookie_expire
                            );
                            this.story_voting_num = this.story_voting_num + 1;
                            this.canVote = false;
                            this.showLb = true;
                        } else {
                            console.warn(error);
                        }
                    })
                    .catch(function (error) {
                        // 请求失败处理
                        console.warn(error);
                    });
            }
        },
        shareToFB() {
            console.log(domain);
            FB.ui(
                {
                    display: 'popup',
                    method: 'feed', //feed\share
                    link: domain,
                    picture: `${domain}/assets/images/share.jpg`,
                    name: "伊7'友善 讓愛無礙",
                    description:
                        '在台灣，每20個人就有一位是身心障礙者，在生活中，他們除了需要面對自身障礙所帶來的考驗外，就連生活環境也處處充滿挑戰。友善，是我們可以給身心障礙朋友的溫暖。伊甸基金會愛心大使張睿家，誠摯地邀請您與我們一同響應7個友善行動任務，讓愛無礙從你、我開始做起！',
                },
                function (response) {
                    console.log(response, 'fb');
                }
            );
        },
        LbHandler(open) {
            this.showLb = false;
        },
    },
});
