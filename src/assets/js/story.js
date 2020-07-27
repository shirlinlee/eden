import mode from './modules/mode';
import { story_details as stories } from './story_details';
import { domain } from './env';

new Vue({
    el: '#storyPage',
    data: {
        stories,
        story_type: 0,
        story_individual: {},
    },
    created: function () {
        const {
            location: { hash },
        } = window;
        const [tag, num] = hash.split('#');
        if (!!Number(num)) {
            this.story_type = Number(num) - 1;
        }
        this.story_individual = this.stories[this.story_type];
    },
    mounted: function () {
        mode();
        this.$nextTick(() => {
            this.getVoteNumber();
        });
    },
    methods: {
        getVoteNumber() {
            axios
                .get(`${domain}/api/GetPersons.php`)
                .then((response) => {
                    console.log(response);
                })
                .catch(function (error) {
                    // 请求失败处理
                    console.warn(error);
                });
        },
        voting() {
            axios
                .post(`${domain}/api/CountPerson.php`, {
                    type: this.story_type,
                })
                .then((response) => {
                    console.log(response);
                    Cookies.set(`type${this.story_type}`, 'value', {
                        expires: 7,
                        path: '',
                    });
                })
                .catch(function (error) {
                    // 请求失败处理
                    console.warn(error);
                });
        },
    },
});
