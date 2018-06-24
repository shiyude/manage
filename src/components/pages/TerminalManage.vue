<template>
    <div class="content">
        <p class="index_title">终端管理</p>
        <div class="main">
            <template v-if="errorContent">
                <div class="warning">
                  <el-alert
                    :title='errorContent'
                    type="warning"
                    show-icon
                    :closable="false">
                  </el-alert>
                </div>
            </template>
            <div class="main_wrapper">
                <div class="search clearfix">
                    <el-input class="name left" placeholder="搜索终端名" v-model.trim="searchName"></el-input>
                    <div class="group left clearfix"> <span class="left">分组展示</span>
                      <el-select v-model="selectValue" placeholder="请选择" class="group_select left">
                        <el-option
                          v-for="item in selectDatas"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </div>
                  <div class="search_btn left">
                    <el-button @click="searchData">搜索</el-button>
                  </div>
                    <div class="add right">
                      <router-link to="add" tag="button" class="el-button">
                       添加平台
                      </router-link>
                    </div>
                </div>

                <div class="table">
                    <table>
                        <thead>
                        <tr>
                            <th width="25%">终端名</th>
                            <th width="15%">开机状态</th>
                            <!--<th width="10%">CUP</th>-->
                            <!--<th width="10%">IOWait</th>-->
                            <!--<th width="10%">磁盘使用率</th>-->
                            <th width="15%">开机时长</th>
                            <th width="15%">程序活跃时长</th>
                            <th width="15%">平台服务</th>
                            <th width="15%">状态</th>
                        </tr>
                        </thead>
                        <tbody>
                        <template v-if="terminalMessages.flag">
                            <tr v-for="item in tableDatas">
                                <td width="25%">
                                    <div class="name detail" style="padding:0">{{item.compoter_name}}</div>
                                </td>
                                <td width="15%">
                                    <div class="status detail"> <span class="window_logo"></span>
                                        <template v-if="item.status">
                                            <el-tag color="#42d885">up</el-tag>
                                        </template>
                                        <template v-else>
                                            <el-tag type="gray">down</el-tag>
                                        </template>
                                    </div>
                                </td>
                                <!--<td width="10%">-->
                                <!--<div class="cup detail">-->
                                <!--<template v-if="item.status">-->
                                <!--<el-progress :text-inside="true" :stroke-width="20" :percentage="item.cup" class="progress"></el-progress>-->
                                <!--</template>-->
                                <!--<template v-else="">-->
                                <!--<el-tag type="gray">Unknown</el-tag>-->
                                <!--</template>-->
                                <!--</div>-->
                                <!--</td>-->
                                <!--<td width="10%">-->
                                <!--<div class="io detail">-->
                                <!--<el-tag type="gray">Unknown</el-tag>-->
                                <!--</div>-->
                                <!--</td>-->
                                <!--<td width="10%">-->
                                <!--<div class="use detail">-->
                                <!--<template v-if="item.status">-->
                                <!--<el-progress :text-inside="true" :stroke-width="20" :percentage="item.use" class="progress"></el-progress>-->
                                <!--</template>-->
                                <!--<template v-else="">-->
                                <!--<el-tag type="gray">Unknown</el-tag>-->
                                <!--</template>-->
                                <!--</div>-->
                                <!--</td>-->
                                <td width="15%">
                                    <div class="uptime detail">{{item.access_time}}</div>
                                </td>
                                <td width="15%">
                                    <div class="active detail">{{item.run_time}}</div>
                                </td>
                                <td width="15%">
                                    <div class="server detail">
                                        <template v-if="item.status">
                                            <el-tag color="#42d885">system</el-tag>
                                            <el-tag type="gray" v-if="item.run_time=='--'">lynk&co</el-tag>
                                            <el-tag color="#20a0ff" v-else>lynk&co</el-tag>
                                        </template>
                                        <template v-else>
                                            <el-tag color="#ff6d6d">system</el-tag>
                                            <el-tag type="gray">lynk&co</el-tag>
                                        </template>
                                    </div>
                                </td>
                              <td width="15%">
                                <div class="detail state">
                                  <template v-if="!item.status||item.run_time==='--'">
                                    <span class="bad">异常</span>
                                  </template>
                                  <template v-else>
                                    <span>&nbsp;</span>
                                  </template>
                                </div>
                              </td>
                            </tr>
                        </template>
                        <template v-else>
                            <tr>
                                <td colspan="6">
                                    <div class="detail" style="text-align: center">暂无数据</div>
                                </td>
                            </tr>
                        </template>
                        </tbody>
                    </table>
                    <div class="pages">
                        <template v-if="terminalMessages.flag">
                            <el-pagination layout="prev, pager, next" :page-count="pages" @current-change="changePage"  :current-page.sync="currentPage"></el-pagination>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import http from '../../common/js/http.js';
    export
    default {
        data() {
            return {
                tableDatas:'',
                terminalMessages:'',
                pages:'',
                selectDatas:'',
                searchName: '',
                selectValue:'',
                currentPage:1,
                errorContent:''
            }
        },
        async mounted() {
            var data = await http('get', '','http://'+window.config.host+'/admin/api/getClientInfo',false,'1');
            var selectData = await http('get','','http://'+window.config.host+'/admin/api/getgroupInfo',false,'1');
            this.selectDatas = selectData.content;
            console.log( this.selectDatas);
            this.terminalMessages = data;
            this.tableDatas = data.content.clientInfo;
            this.errorContent = data.content.attribute.probleCount+'台终端出现异常';
            if(data.content.pageInfo){
              this.pages = data.content.pageInfo.total
            }},
        destroyed() {
            Message.closeAll();
        },
        watch:{
          searchName(value){
            this.searchName = value;
          },
           selectValue(value){
              this.selectValue = value;
          },
        },
        methods:{
          async changePage(value){
            var data = await http('get', '','http://'+window.config.host+'/admin/api/getClientInfo?compoterName='+this.searchName+'&groupID='+this.selectValue+'&nowPage='+value,false,'1');
            this.terminalMessages = data;
            this.tableDatas = data.content.clientInfo;
            if(data.content.pageInfo){
              this.pages = data.content.pageInfo.total
            }
          },
          async searchData(){
            var data = await http('get', '','http://'+window.config.host+'/admin/api/getClientInfo?compoterName='+this.searchName+'&groupID='+this.selectValue,false,'1');
            this.terminalMessages = data;
            this.currentPage =1;
            this.tableDatas = data.content.clientInfo;
            if(data.content.pageInfo){
              this.pages = data.content.pageInfo.total
            }
          }
        }
    }
</script>
<style lang="scss" scoped type="text/css">
@import "../../css/terminal_manage.scss";
</style>
