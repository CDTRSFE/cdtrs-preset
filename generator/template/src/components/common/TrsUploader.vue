<template>
    <div>
        <div v-if="canEdit" class="d-inline-block mb-4" @click="openFileSelect()">
            <!-- 上传触发器 -->
            <slot :upLoading="upLoading">
                <v-btn class="primary mr-4" :disabled="upLoading" tile>
                    <v-icon v-if="!upLoading" size="18px">mdi-progress-upload</v-icon>
                    <v-progress-circular
                        v-if="upLoading"
                        size="20"
                        indeterminate
                        color="light-blue"
                    ></v-progress-circular>
                    {{ upLoading ? '上传中...' : uploadText }}
                </v-btn>
            </slot>
        </div>

        <!-- 上传文件类型提示 -->
        <v-menu v-if="showAcceptInfo && canEdit" v-model="showDialog" :nudge-width="200" offset-x :close-on-content-click="false">
            <template v-slot:activator="{ on, attrs }">
                <v-btn text color="primary" v-bind="attrs" v-on="on">支持的附件格式</v-btn>
            </template>

            <v-card max-width="400">
                <v-card-subtitle class="font-weight-bold">支持的附件格式:</v-card-subtitle>
                <v-divider></v-divider>
                <v-card-text>{{ accept }}</v-card-text>
            </v-card>
        </v-menu>

        <input ref="input" type="file" class="d-none" :accept="accept" :multiple="multiple" />

        <!-- 文件展示列表 -->
        <div v-if="showFileLists" class="d-flex flex-wrap">
            <v-hover v-for="(file, index) in fileLists" :key="index" v-slot:default="{ hover }">
                <v-card outlined :loading="file.status === 'ing'" class="mr-2 mt-2 d-flex" width="250px" height="60px">
                    <div class="d-flex align-center flex-grow-1">

                        <!-- 上传文件/图片预览 -->
                        <div class="d-flex align-center justify-center flex-grow-1" style="cursor: pointer;" @click="preview(file)">
                            <v-icon v-if="!isImgFile(file.srcfile)" size="30px">mdi-file-check-outline</v-icon>
                            <v-img
                                v-else
                                aspect-ratio="1.4"
                                max-width="60px"
                                contain
                                :src="file.preview"
                                class="ma-1"></v-img>
                        </div>

                        <div style="width: 100px;" class="flex-shrink-0">
                            <div class="text-truncate" :title="file.srcfile">{{ file.srcfile }}</div>
                            <v-chip label x-small color="primary">{{ getFileExt(file.srcfile) }}</v-chip>
                        </div>

                        <!-- 操作 -->
                        <div style="width: 50px; height: 80%;" class="flex-shrink-0 d-flex flex-column align-center">
                            <v-icon v-if="file.status === 'success'" size="18px" color="success">mdi-check-circle</v-icon>
                            <v-icon v-if="file.status === 'fail'" size="18px" color="error">mdi-alert-circle</v-icon>
                            <v-btn v-if="canEdit && hover" small icon color="error" @click.stop="delFile(file, index)">
                                <v-icon size="18px">mdi-close</v-icon>
                            </v-btn>
                        </div>
                    </div>
                </v-card>
            </v-hover>
        </div>
    </div>
</template>
<script>
export default {
    name: 'TrsUploader',
    props: {
        accept: {
            type: String,
            default: '.doc,.docx,.pdf,.xls,.xlsx,.mp4,.avi,.wma,.mpeg',
        },
        uploadText: {
            type: String,
            required: false,
            default: '上传附件',
        },
        uploadUrl: {
            type: String,
            required: false,
            default: '/propagateAnalyse/appendix/upload',
        },
        files: {
            type: Array,
            default: () => [],
        },
        limit: {
            type: [Number, String],
            default: 100,
        },
        showFileLists: {
            type: Boolean,
            default: true,
        },
        multiple: {
            type: Boolean,
            default: false,
        },
        showAcceptInfo: {
            type: Boolean,
            default: true,
        },
        canEdit: {
            type: Boolean,
            default: true, // 是否允许上传和删除
        },
    },
    data() {
        return {
            upLoading: false, // 有没有正在上传中的文件
            finishedFlag: false,
            fileLists: [], // 上传的文件
            showDialog: false, // 文件格式弹窗展示
        };
    },
    mounted() {
        this.initFileLists();
        this.fileInput = this.$refs.input;
        this.uploadFileHandler();
    },
    methods: {
        // 打开上传文件弹窗
        openFileSelect() {
            if (!this.checkLimitNum()) return;
            this.fileInput.click();
        },

        // 检查上传的文件是不是已经超过限制
        checkLimitNum() {
            if (this.fileLists.length >= parseInt(this.limit)) {
                this.$message('error', `已经超过所允许上传的最大文件数${this.limit}个了`);
                return false;
            }
            return true;
        },

        // 重置
        async reset() {
            await this.$nextTick();
            this.initFileLists();
        },

        // 回显
        async initFileLists() {
            const arr = [];
            for (const item of this.files) {
                const newFile = {
                    srcfile: item.srcfile,
                    filePath: item.filePath,
                    status: 'success',
                    server: item,
                };
                newFile.preview = await this.getFilePreivew(newFile);
                arr.push(newFile);
            }
            this.fileLists = arr;
        },

        // 获取文件后缀
        getFileExt(fileName) {
            return fileName.substring(fileName.lastIndexOf('.') + 1);
        },

        // 判断文件是否为图片
        isImgFile(fileName) {
            return 'jpg,jpeg,png,gif,bmp'.indexOf(this.getFileExt(fileName)) >= 0;
        },

        // 获取文件的预览地址
        async getFilePreivew(file) {
            if (this.isImgFile(file.srcfile)) {
                if (file.filePath) {
                    return window.location.origin + '/upload/' + file.filePath;
                } else { // 本地预览
                    return await this.localPreviewImage(file.input);
                }
            }
            return null;
        },

        // 本地预览图片
        localPreviewImage(file) {
            return new Promise(resolve => {
                const reads = new FileReader();
                reads.readAsDataURL(file);
                reads.onload = function(e) {
                    resolve(this.result);
                };
            });
        },

        // 检查文件类型
        checkFileType(file) {
            const fileType = this.getFileExt(file.name).toLocaleLowerCase();
            if (!this.accept.includes(fileType)) {
                this.$message('error', `不允许上传${fileType}格式的文件`);
                return false;
            }
            return true;
        },

        // 检查文件尺寸  10M
        checkFileSize(file) {
            if (file.size > 10 * 1024 * 1024) {
                this.$message('error', '你选择的文件超过10M，不允许上传');
                return false;
            }
            return true;
        },

        // 判断是不是图片
        isImg(item) {
            if ('jpg,jpeg,png,gif,bmp'.indexOf(item.fileExt) >= 0) {
                item.isImg = true;
                item.previewUrl = window.location.origin + '/upload/' + item.filePath;
            } else {
                item.isImg = false;
            }
        },

        // 点击已上传的文件的操作
        preview(file) {
            const url = `/propagateAnalyse/appendix/downFlie?filePath=${file.filePath}&sourceFileName=${file.srcfile}`;
            window.open(url);
        },

        // 选择上传文件之后新建一个上传文件对象
        async newFile(file) {
            const data = {
                srcfile: file.name, // 原文件名
                status: 'ing', // 上传状态  上传中 ing   成功 success  失败 fail
                input: file,
                server: null, // 上传成功之后服务端返回的数据
                // filePath: 'xxx' // 上传之后服务器返回的文件名
            };
            data.preview = await this.getFilePreivew(data);
            return data;
        },

        // 上传文本框监听
        uploadFileHandler() {
            this.fileInput.onchange = async event => {
                this.upLoading = true;
                const actions = [...event.target.files].map(file => this.uploadOneFile(file));
                await Promise.all(actions);
                this.upLoading = false;
                this.fileInput.value = null; // 解决不能连续传相同的文件
            };
        },

        // 上传单个文件
        async uploadOneFile(file) {
            const form = new FormData();
            if (!this.checkFileType(file)) return false;
            if (!this.checkFileSize(file)) return false;
            const newFile = await this.newFile(file);
            this.fileLists.push(newFile);
            form.append('file', file);
            await this.requestMethod(form, newFile);
        },

        // 通知父组件上传之后的文件数组
        emitChange() {
            this.$emit('change', this.fileLists.filter(item => item.status === 'success'));
        },

        // 发送上传文件请求
        async requestMethod(form, file) {
            const res = await this.$axios.request({
                url: this.uploadUrl,
                method: 'post',
                data: form,
                params: {
                    // userId: this.$store.state.session.mem.userId,
                    type: 0,
                    uploadType: this.$isInterClient() ? 1 : 0,
                },
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.status !== 'success') {
                file.status = 'fail';
                this.$message('error', '上传失败,请重新上传');
                return;
            }
            file.status = 'success';
            file.filePath = res.msg[0].filePath;
            file.server = res.msg[0];
            this.$message('success', '上传成功');
            this.emitChange();
        },

        // 删除文件
        delFile(item, index) {
            this.fileLists.splice(index, 1);
            this.$emit('delete', { item: item, files: this.fileLists });
            this.emitChange();
        },
    },
};
</script>
