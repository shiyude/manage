<template>
    <div class="wrapper">
        <v-sidebar></v-sidebar>
        <div class="container" id="container">
            <!--<keep-alive>-->
        <router-view></router-view>
            <!--</keep-alive>-->
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import vSidebar from './Sidebar.vue';
    export default {
        components:{
            vSidebar
        }
    }
</script>
