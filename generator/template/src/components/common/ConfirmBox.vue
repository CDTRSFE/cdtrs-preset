<template>
    <v-dialog v-model="show" max-width="300" persistent>
        <v-card>
            <v-card-title>{{ title }}</v-card-title>
            <v-card-text v-if="content">{{ content }}</v-card-text>
            <v-card-actions class="d-flex align-center px-3">
                <v-spacer></v-spacer>
                <v-btn tile depressed small @click="cancel">取消</v-btn>
                <v-btn
                    tile
                    depressed
                    small
                    class="ml-4"
                    color="primary"
                    @click="sure">确定</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'ConfirmBox',
    data() {
        return {
            title: '',
            content: '',
            params: null,
            promiseStatus: null,
            show: false,
        };
    },
    methods: {
        setParams(val) {
            this.params = val;
        },
        sure() {
            this.show = false;
            this.promiseStatus && this.promiseStatus.resolve();
        },
        cancel() {
            this.show = false;
            this.promiseStatus && this.promiseStatus.reject();
        },
        confirm() {
            this.show = true;
            return new Promise((resolve, reject) => {
                this.promiseStatus = {
                    resolve: resolve,
                    reject: reject,
                };
            });
        },
    },
};
</script>
