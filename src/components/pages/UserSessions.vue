<template>
    <div>
        <p class="index_title">访客行为</p>
        <div class="main">
            <div class="main_wrapper">
                <div class="search clearfix">
                    <el-input class="name left" placeholder="搜索经销商" v-model.trim="searchName"></el-input>
                    <div class="add left">
                        <el-button @click="searchData">搜索</el-button>
                    </div>
                </div>
                <div class="table">
                    <table>
                        <thead>
                        <tr>
                            <th width="5%">ID</th>
                            <th width="15%">事件名</th>
                            <th width="15%">时间</th>
                            <th width="15%">经销商</th>
                            <th width="15%">终端名</th>
                            <th width="15%">用户</th>
                            <th width="20%">备注</th>
                        </tr>
                        </thead>
                        <tbody>
                        <template v-if="tableData.length">
                            <tr v-for="item in tableData">
                                <td width="5%">
                                  <div class="terminal_name detail" style="padding:0">{{item.id}}</div>
                                </td>
                                <td width="15%">
                                    <div class="event_name detail">{{item.even}}</div>
                                </td>
                                <td width="15%">
                                    <div class="time detail">{{item.time}}</div>
                                </td>
                              <td width="15%">
                                <div class="dealer_num detail">{{item.dealer_num}}</div>
                              </td>
                              <td width="15%">
                                <div class="user_name detail">{{item.terminal}}</div>
                              </td>
                                <td width="15%">
                                    <div class="id detail">{{item.user_name}}</div>
                                </td>
                              <td width="20%">
                                <div class="remarks detail">{{item.remarks}}</div>
                              </td>
                            </tr>
                        </template>
                        <template v-else>
                            <tr>
                                <td colspan="5">
                                    <div class="detail" style="text-align: center">暂无数据</div>
                                </td>
                            </tr>
                        </template>
                        </tbody>
                    </table>
                    <div class="pages">
                        <template v-if="tableData.length">
                          <el-pagination layout="prev, pager, next" :page-count="pages" @current-change="changePage"  :current-page.sync="currentPage"></el-pagination>
                        </template>
                      </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import http from '../../common/js/http.js'
    export
    default {
        data() {
        return {
            tableData:[],
            searchName:'',
            currentPage:1,
            pages:'1',
        }
    },
    async mounted () {
        Message.closeAll();
        var response = await http('get','',window.config.jlHost+'/admin/vister/get',false,'1');
        this.tableData = response.content.data;
        console.log(response)
        if(response.content.page){
          this.pages = Math.ceil(response.content.page.total/response.content.page.pageSize)
        }},
    methods:{
      async changePage(value){
        var response = await http('get', '',window.config.jlHost+'/admin/vister/get?dealer_num='+this.searchName+'&page='+value,false,'1');
        this.tableData = response.content.data;
        if(response.content.page){
          this.pages = Math.ceil(response.content.page.total/response.content.page.pageSize)
        }
      },
      async searchData(){
        var response = await http('get', '',window.config.jlHost+'/admin/vister/get?dealer_num='+this.searchName,false,'1');
        this.currentPage =1;
        this.tableData = response.content.data;
        if(response.content.page){
          this.pages = Math.ceil(response.content.page.total/response.content.page.pageSize)
        }
      }
    },
    destroyed(){
        Message.closeAll();
    }
    }
</script>
<style lang="scss" scoped type="text/css">
    @import "../../css/order_record.scss";
</style>
