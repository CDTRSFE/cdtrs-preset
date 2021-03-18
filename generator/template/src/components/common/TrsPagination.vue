<template>
    <div class="d-flex align-center justify-center body-2">
        <div v-if="totalItems" class="flex-grow-0">
            <span class="mr-5">共 {{ total }} 条数据</span>
        </div>
        <div v-if="selectPageSize" class="flex-grow-0 d-flex align-center">
            <span class="mr-5">单页显示 </span>
            <div class="mr-8">
                <el-select v-model="pageSizeCopy" style="width: 80px;" placeholder="请选择">
                    <el-option v-for="item in pagesizes" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>
        <v-hover v-slot:default="{ hover }">
            <v-btn
                v-if="lastPage"
                :class="!hover?'firstpage':'firstpage-selected'"
                :outlined="!hover"
                small
                depressed
                :color="hover ? 'primary' : '#bebebe'"
                @click="jumpTo('first')">首页</v-btn>
        </v-hover>
        <el-pagination
            background
            :page-size="pageSizeCopy"
            :current-page.sync="currentpageCopy"
            prev-text="上一页"
            next-text="下一页"
            layout=" prev,pager,next"
            :total="total"
            :pager-count="pagerCount">
        </el-pagination>
        <v-hover v-slot:default="{ hover }">
            <v-btn
                v-if="lastPage"
                :class="!hover?'firstpage':'firstpage-selected'"
                :outlined="!hover"
                small
                depressed
                :color="hover ? 'primary' : '#bebebe'"
                @click="jumpTo('last')">尾页</v-btn>
        </v-hover>
        <div v-if="jump" class="d-flex align-baseline ml-8">
            <span>到第</span>
            <v-text-field v-model="toPage" hide-details="auto" class="mx-2" dense style="width: 30px;"></v-text-field>
            <span class="mr-5">页</span>
            <v-btn color="primary" small depressed @click="jumpTo('page')">跳转</v-btn>
        </div>
    </div>
</template>
<script>
export default {
    name: 'TrsPagination',
    props: {
        totalItems: { // 是否显示总条数
            type: Boolean,
            default: true,
        },
        selectPageSize: { // 是否提供选择每页展示多少条数据功能
            type: Boolean,
            default: true,
        },
        lastPage: { // 是否显示展示尾页
            type: Boolean,
            default: true,
        },
        jump: { // 是否提供跳转到指定页功能
            type: Boolean,
            default: true,
        },
        currentpage: { // 当前选中页
            type: Number,
            default: 1,
        },
        total: { // 数据总条数
            type: Number,
            required: true,
        },
        pagerCount: { // 页码数量
            type: Number,
            default: 7,
        },
        pageSize: { // 每页展示多少条数据
            type: Number,
            default: 20,
        },
        pagesizes: { // 选择每页展示多少条数据数组
            type: Array,
            default: () =>
                [{
                    label: '20',
                    value: 20,
                }, {
                    label: '50',
                    value: 50,
                }, {
                    label: '100',
                    value: 100,
                }, {
                    label: '200',
                    value: 200,
                }],

        },

    },
    data() {
        return {
            toPage: 1, // 指定页
            pageSizeCopy: this.pageSize,
            currentpageCopy: 1,
        };
    },
    watch: {
        pageSizeCopy: {
            handler() {
                this.$emit('update:pageSize', this.pageSizeCopy);
                this.$emit('size-change', this.pageSizeCopy);
                this.currentpageCopy = 1;
                this.toPage = 1;
            },
        },
        currentpageCopy: {
            handler() {
                this.toPage = this.currentpageCopy;
                this.$emit('update:currentpage', this.currentpageCopy);
                this.$emit('current-change', this.currentpageCopy);
            },
        },
        currentpage: {
            handler() {
                this.currentpageCopy = this.currentpage;
            },
        },

    },
    created() {
        this.pageSizeCopy = this.pageSize;
        this.currentpageCopy = this.currentpage;
    },
    methods: {
        jumpTo(val) { // 跳转到指定页
            switch (val) {
                case 'first':
                    this.currentpageCopy = 1;
                    break;
                case 'last':
                    this.currentpageCopy = Math.ceil(this.total / this.pageSizeCopy);
                    break;
                case 'page':
                    if (isNaN(Number(this.toPage)) || Number(this.toPage) <= 0) {
                        this.$message('warning', '必须输入一个正整数');
                    } else if (this.toPage > (Math.ceil(this.total / this.pageSize) || 1)) {
                        this.$message('warning', '超出查询范围，页码不能大于总页数');
                    } else {
                        this.currentpageCopy = Number(this.toPage);
                    }
            }
        },
    },
};
</script>
<style lang="scss" >
.el-pagination {
    .el-pager {
        padding-left: 0 !important;
    }
    .el-input,
    input {
        font-size: 14px;
        font-weight: normal !important;
    }
    .el-select {
        .el-input.is-focus .el-input__inner,
        .el-input__inner:focus {
            border-color: #d64541 !important;
        }
    }
}
.firstpage {
    color: #3e3e3e !important;
    border: solid thin #bebebe;
}
.firstpage-selected {
    color: #fff !important;
    border: solid thin transparent;
}
.el-pagination.is-background {
    .btn-prev,
    .btn-next,
    .el-pager li {
        font-size: 13px;
        background-color: transparent !important;
        color: #3e3e3e !important;
        min-width: 30px;
        min-height: 30px;
        border-radius: 2px;
        font-weight: normal;
        border: solid thin #bebebe;
    }
    .btn-prev,
    .btn-next {
        padding: 0 6px !important;
    }
    .btn-prev:hover,
    .btn-next:hover {
        background-color: #d64541 !important;
        color: #fff !important;
        border: solid thin transparent;
    }
    .el-pager {
        li.active,
        li:hover {
            background-color: #d64541 !important;
            color: #fff !important;
            border: solid thin transparent;
        }
    }
}
</style>
