import Vue from 'vue';

Vue.component('StopListGroup', {
    provide: {
        isInGroup: false,
        listItemGroup: undefined,
    },
    render() {
        return this.$scopedSlots.default();
    },
});
