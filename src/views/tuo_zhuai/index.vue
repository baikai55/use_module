<template>
    <div id="tuozhuai">
        <div class="list" ref="list">
            <div class="list-item" v-for="item in a" :key="item.value" :style="item.color" draggable="true">
                <span class="list-item-title">{{ item.label }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
export default {
    setup() {
        let a = [
            { label: "姓名", value: "a", color: "--color:#e63e31" },
            { label: "籍贯", value: "b", color: "--color:#e63e31" },
            { label: "居住地", value: "sa", color: "--color:#e63e31" },
            { label: "年龄", value: "ad", color: "--color:#e63e31" },
            { label: "性别", value: "sb", color: "--color:#7ff0ec" }
        ]
        let source_node = ref(null)
        onMounted(() => {
            const list = document.querySelector('.list')
            const item = document.querySelectorAll('.list-item')
            // 拖拽开始
            list.ondragstart = (e) => {
                source_node = e.target
                recode(item)
                setTimeout(() => {
                    // 拖拽时样式
                    e.target.classList.add('moving')
                }, 0)
                // 设置拖动效果
                e.dataTransfer.effectAllowed = 'move'

            }
            // 拖拽放入有效目标触发
            list.ondragenter = e => {
                e.preventDefault()
                // console.log(e.target.id, list)
                if (e.target === list || e.target === source_node) {
                    return false
                }
                const childer = Array.from(list.children)
                const sourceIndex = childer.indexOf(source_node)
                const targetIndex = childer.indexOf(e.target)
                // console.log(sourceIndex, targetIndex)
                if (sourceIndex < targetIndex) {
                    // 从下往上拖动
                    list.insertBefore(source_node, e.target.nextElementSibling)
                } else {
                    // 从上往下拖动
                    list.insertBefore(source_node, e.target)
                }
                // 动画效果函数
                last([e.target, source_node])
            }

            // 拖拽结束
            list.ondragend = (e) => {
                e.target.classList.remove('moving')
            }
            // 重新计算位置
            function recode(eleAll) {
                // getBoundingClientRect 返回元素对于视口信息
                for (let i = 0; i < eleAll.length; i++) {
                    const {
                        top,
                        left
                    } = eleAll[i].getBoundingClientRect()
                    eleAll[i]._top = top
                    eleAll[i]._left = left
                }
            }
            // 添加移动动画效果
            function last(eleAll) {
                for (let i = 0; i < eleAll.length; i++) {
                    const dom = eleAll[i]
                    const {
                        top,
                        left
                    } = dom.getBoundingClientRect()
                    if (dom._left) {
                        dom.style.transform = `translate3d(${dom._left - left}px,${dom._top - top}px,0px)`
                        // 重绘动画
                        let rafId = requestAnimationFrame(function () {
                            dom.style.transition = `transform 0.3s ease-out`
                            dom.style.transform = 'none'
                        })
                        dom.addEventListener('transitionend', () => {
                            dom.style.transition = 'none'
                            // 取消requestAnimationFrame调用请求
                            cancelAnimationFrame(rafId)
                        })
                    }
                }
            }
        })
        return {
            a,
        }
    }
}
</script>

<style lang="scss">
.list {
    width: 300px;
    height: 360px;
    /* padding: 20px 0; */
    margin: 100px auto 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.list-item {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 5px 0;
    border-radius: 10px;
    /* margin-bottom: 20px; */
    background-color: var(--color);
}

.constellation {
    line-height: 2.5em;
    font-size: 20px;
    color: #fff;
}

.list-item-img {
    width: 30px;
    height: 30px;
}

.list-item-title {
    margin-left: 20px;
    color: #fff;
}

// 移动动画class
.list-item.moving {
    background-color: transparent;
    border: 2px dashed #ccc;
}
</style>