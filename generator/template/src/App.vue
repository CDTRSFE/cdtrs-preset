<template>
    <v-app>
        <HelloWorld></HelloWorld>
        <router-view></router-view>
    </v-app>
</template>

<script>
import HelloWorld from '@/components/HelloWorld';
export default {
    name: 'App',
    components: {
        HelloWorld,
    },
};
</script>

<style lang="scss">
@import "./scss/reset.scss";
</style>
