<template>
    <el-container>
        <el-header>
            <el-menu ref="menu" mode="horizontal" :default-active="this.$route.path" router>
                <el-menu-item v-for="(item, index) in navList" :index="item.context" :key="index">
                    <span slot="title">{{ item.name }}</span>
                </el-menu-item>
            </el-menu>
        </el-header>
        <el-main>
            <router-view />
        </el-main>
    </el-container>
</template>
<script>
import nav from '@/router/routerData'
export default {
    name: 'main',
    data() {
        return {
            navList: nav
        }
    }
}
</script>
