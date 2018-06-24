<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes"  class="el-menu-vertical-demo"  unique-opened router theme="dark">
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title">{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                       {{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data() {
        return {
            items: [
              {
                index: 'typemanage',
                title: '车型管理',
              },

//                        {
//                            index:'terminalmanage',
//                            title:'终端管理'
//                        },
//                        {
//                            index:'platformsync',
//                            title:'平台同步'
//                        },

//                {
//                   index:'orderrecord',
//                    title: '订单记录',
//                },
//                {
//                    index: 'usersessions',
//                    title: '访客行为',
//                },

//                {
//                    index: 'testdrive',
//                    title: '试驾预约',
//                }
            ]
        }
    },
    computed:{
        onRoutes(){
            return this.$route.path.replace('/','');
        }
    }
    }
</script>
<style lang="scss" scoped type="text/css">
    .sidebar{
        display: block;
        position: absolute;
        width: 200px;
        left: 0;
        top:0;
        bottom:0;
        ul{
            height:100%;
        }
    }
</style>
