import mode from './modules/mode';
import { story_details as stories } from './story_details';

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
        this.story_type = Number(num) - 1;
        this.story_individual = this.stories[this.story_type];
        console.log(this.stories);
    },
    mounted: function () {
        mode();
        this.$nextTick(() => {});
    },
    methods: {},
});
