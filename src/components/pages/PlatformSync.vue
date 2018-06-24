<template>
    <div>
        <p class="index_title">平台同步</p>
        <div class="main">
            <div class="main_wrapper">
                <div class="update">
                    <p class="update_title"> <a><span class="update_logo"></span>更新状态</a>
                        <span>有可用更新版本</span>
                    </p>
                    <!--<div class="update_btn">-->
                        <!--<el-button type="success">检查更新</el-button>-->
                    <!--</div>-->
                    <div class="update_group clearfix">
                        <!--<div class="version left clearfix"> <span class="left">添加版本号</span>-->

                            <!--<div class="input right">-->
                                <!--<el-input placeholder="请填写需要添加的版本"></el-input>-->
                            <!--</div>-->
                        <!--</div>-->
                        <!--&lt;!&ndash;<div class="time left clearfix"> <span class="left">更新时间</span>&ndash;&gt;-->

                            <!--&lt;!&ndash;<div class="input right">&ndash;&gt;-->
                                <!--&lt;!&ndash;<el-date-picker v-model="value1" type="date" placeholder="选择日期" :picker-options="pickerOptions0"></el-date-picker>&ndash;&gt;-->
                            <!--&lt;!&ndash;</div>&ndash;&gt;-->
                        <!--&lt;!&ndash;</div>&ndash;&gt;-->
                        <!--<div class="start_btn left">-->
                            <!--<el-button type="info">添加</el-button>-->
                        <!--</div>-->
                      <el-form :inline=true :model="validateForm" ref="validateForm" label-width="70px" :rules="rule">
                        <el-form-item label="版本添加" prop="version" :error="error">
                          <el-input  v-model.trim="validateForm.version" auto-complete="off" placeholder="例如:v1.01"></el-input>
                        </el-form-item>
                        <el-form-item>
                          <el-button type="primary" @click="submitForm('validateForm')">提交</el-button>
                        </el-form-item>
                      </el-form>
                    </div>
                </div>
                <!--<p class="sync_title">操作记录</p>-->
                <!--<div class="operate_record">-->
                    <!--<table>-->
                        <!--<tbody>-->
                        <!--<tr v-for="item in operateDate">-->
                            <!--<td>终端</td>-->
                            <!--<td>{{item.name}}</td>-->
                            <!--<td>更新到版本</td>-->
                            <!--<td>v{{item.number}}</td>-->
                            <!--<template v-if="item.result">-->
                                <!--<td class="success">更新完成</td>-->
                            <!--</template>-->
                            <!--<template v-else="">-->
                                <!--<td class="error">更新失败<span class="update_logo"></span>-->
                                <!--</td>-->
                            <!--</template>-->
                        <!--</tr>-->
                        <!--</tbody>-->
                    <!--</table>-->
                <!--</div>-->
                <p class="sync_title">历史版本记录</p>
                <div class="version_record">
                    <table>
                        <thead>
                        <tr>
                            <th width="20%">版本号</th>
                            <th width="20%">更新时间</th>
                            <th width="60%">状态</th>
                        </tr>
                        </thead>
                        <tbody>
                      <template v-if="versionBool">
                        <tr v-for="(value,index) in versionDate">
                            <td width="20%">
                                <div class="detail" style="padding:0">{{value.version}}</div>
                            </td>
                            <td width="30%">
                                <div class="detail">{{value.update_time}}</div>
                            </td>
                            <td width="50%">
                                    <div class="detail now" v-if="value.status">当前版本</div>
                                    <div class="detail old" v-else>
                                      <span class="back" @click="changeVersion(value.id,index)">
                                        <span class="back_icon"></span>
                                        回退到此版本
                                      </span>
                                    </div>
                            </td>
                        </tr>
                      </template>
                        <template v-else>
                          <tr>
                            <td colspan="4" style="text-align: center">
                              <div class="detail">暂无历史版本</div>
                            </td>
                          </tr>
                        </template>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
  import http from "../../common/js/http.js";
  export
  default {
    data() {
      var checkVersion = (rule, value, callback) => {
        if (/^['|"]*[^\x00-\xff]*[\s ]*['|"]*[^\x00-\xff]*$/gi.test(value)) {
          callback(new Error('请输入正确格式的版本号'));
        } else {
          callback()
        }
      };
      return {
        //                pickerOptions0: {
        //                    disabledDate(time) {
        //                        return time.getTime() < Date.now() - 8.64e7;
        //                    }
        //                },
        //                value1: '',
        validateForm: {
          version: ''
        },
        error:'',
        isExist: false,
        operateDate: [
          {
            name: 'tyd01',
            number: '1.2',
            result: false
          },
          {
            name: 'tyd02',
            number: '1.1',
            result: true
          },
          {
            name: 'tyd03',
            number: '1.02',
            result: true
          },
          {
            name: 'tyd04',
            number: '1.01',
            result: true
          },
          {
            name: 'tyd05',
            number: '1.0',
            result: true
          },

        ],
        versionDate: [],
        versionBool: false,
        rule: {
          version: {
            validator: checkVersion,
            trigger: 'blur'
          }
        }
      };
    },
    mounted() {
      this.initData();
    },
    methods: {
      async changeVersion(id,index) {
        var data = await http('get', '', 'http://' + window.config.host + '/admin/updateapi/changeVersion?id=' +
          id,false,'1');
        this.initData();
      },
      async initData() {
        var data = await http('get', '', 'http://' + window.config.host + '//admin/updateapi/getVersionList',false,'1');
        this.versionDate = data.content;
        this.versionBool = data.flag;
      },
      submitForm(formName) {
        var me = this;
        me.error = '';
        me.$refs[formName].validate(async (valid) => {
          if (valid) {
            var data = await http('get', '', 'http://' + window.config.host +
              '/admin/updateapi/addVersion?version=' + me.validateForm.version,true,'1');
            if (!data.flag) {
              me.error = '该版本号已存在'
            }else{
              this.initData();
            }
          } else {
            return false;
      }
    });
  }
  }
  }
</script>
<style lang="scss" scoped type="text/css">
    @import "../../css/platform_sync.scss";
</style>
