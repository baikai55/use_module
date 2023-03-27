<template>
    <div class="table-form">
        <grid-layout :layout="formPage.domains" :col-num="4" :row-height="30" :is-draggable="true"
            :is-resizable="true" :is-mirrored="false" :vertical-compact="true" :margin="[10, 10]"
            :use-css-transforms="true">
            <!-- 
            <grid-item v-for="item in layout"
                   :x="item.x"
                   :y="item.y"
                   :w="item.w"
                   :h="item.h"
                   :i="item.i"
                   :key="item.i">
            {{item.i}}
        </grid-item> -->
            <el-form ref="formPage" :model="formPage" class="formDag">
                <grid-item v-for="(item, index) in formPage.domains" :x="item.x" :y="item.y" :w="item.w" :h="item.h"
                    :i="item.i" :key="item.i">
                    <el-form-item :label="item.label" :key="item.key" :prop="'domains.' + index + '.value'">
                        <el-input v-model="item.value" disabled type="textarea"></el-input>
                    </el-form-item>
                </grid-item>
            </el-form>

        </grid-layout>
        <!-- <div class="table">
            <el-form ref="formPage" :model="formPage" label-width="160px">
                <el-form-item label="类型">
                    <el-input v-model="folderName" placeholder="请输入模板名称" disabled></el-input>
                </el-form-item>
                <el-form-item v-for="(domain, index) in formPage.domains" :label="domain.label" :key="domain.key"
                    :prop="'domains.' + index + '.value'">
                    <el-input v-model="domain.value" disabled></el-input>
                </el-form-item>
            </el-form>
        </div> -->
        <div class="fixed">
            <el-button @click="saveTemp">保存模板</el-button>
        </div>
    </div>
</template>

<script>
import VueGridLayout from 'vue-grid-layout'
// import { addGridFoldersDetails, getOneFolder } from "@/api/grid/details";
export default {
    components: {
        GridLayout: VueGridLayout.GridLayout,
        GridItem: VueGridLayout.GridItem
    },
    data() {
        return {
            layout: [
                { "x": 0, "y": 0, "w": 2, "h": 2, "i": "0" },
                { "x": 2, "y": 0, "w": 2, "h": 4, "i": "1" },
            ],
            formPage: {
                domains: []
            },
            formKey: ""
        }
    },
    created() {
        this.getOne();
    },
    methods: {
        // 提交 - 新增档案
        newFormConfig() {
            // console.log(this.form);

        },
        // 
        saveTemp() {
            // console.log(this.formPage.domains);
            let formStr = JSON.stringify(this.formPage.domains);
            console.log(formStr);
            addGridFoldersDetails({
                details: formStr,
                documentId: '610380596882968576',
                remark: '肇事肇祸严重精神障碍患者',
            }).then((res) => {
                console.log(res);
            });
            // this.dialogVisibleNew = false;
        },
        //获取单个
        getOne() {
            let id = '610380596882968577';
            getOneFolder(id).then((res) => {
                console.log(res.result);
                this.formKey = res.result.remark;
                // 解析表单
                this.formPage.domains = [];
                let index = 0;
                let x = 0;
                let y = 0;
                let w = 2;
                let h = 3;
                if (this.formKey) {
                    for (let item of this.formKey.split(",")) {
                        if (item) {
                            // 防止末尾【,】割出空字符串
                            this.formPage.domains.push({
                                value: "",
                                label: item,
                                key: index,
                                x: x,
                                y: y,
                                w: w,
                                h: h,
                                i: index
                            });
                            index++;
                            if (x >= 2) {
                                x = 0;
                                y += 2;
                            } else {
                                x += 2
                            }
                        }
                    }
                }
            });
        },
    }

}
</script>

<style lang="scss" scoped>
.vue-grid-item.vue-resizable.cssTransforms {
    background-color: transparent;
    touch-action: none;
    box-sizing: border-box;
    display: flex;
    // align-items: center;
    border: 1px solid #ccc;
    padding: 10px;
}

:deep .formDag {
    .el-form-item {
        margin-bottom: 0px;
        width: 100%;
        height: calc(100% - 40px);

        .el-form-item__content {
            height: 100%;
        }

        .el-textarea {
            height: 100%;

            textarea.el-textarea__inner {
                height: 100% !important;
            }
        }

    }
}

.fixed {
    position: fixed;
    top: 55px;
    right: 100px;
    padding: 10px;
    color: #000;
    width: 80px;
    z-index: 100;
}
</style>

