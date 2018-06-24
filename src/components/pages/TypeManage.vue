<template>
  <div style="position: absolute;top:0;bottom:0;left:0;right:0" id="manage_type_wrapper">
    <p class="index_title">车型管理</p>
    <div class="main">
      <div class="main_left main_section">
        <div class="select_type manage_section">
          <p class="manage_title">
            选择车型
          </p>
          <div class="manage_content select_content">
            <div class="btn_group">
              <div class="refresh">
                <span></span>
                刷新
              </div>
              <div class="open_alert" @click="openAlert">关联芯片</div>
            </div>
            <div class="select_group">
              <div class="car_desc car_type clearfix">
                <div class="desc_title">
                  车型
                </div>
                <div class="desc_content">
                  <span class="selected" v-if="typeName">{{typeName}}</span>
                </div>
                </div>
              <div class="car_desc car_version clearfix">
                <div class="desc_title">
                  版本
                </div>
                <div class="desc_content">
                  <span v-for="(item,index) in makeData" :title="item[0][0].car.styleName" @click="selectType(index)" :class="{selected:initIndex == index}">{{item[0][0].car.styleName}}</span>
                </div>
              </div>
              <div class="car_desc car_color clearfix">
                <div class="desc_title">
                  颜色
                </div>
                <div class="desc_content">
                 <span v-for="(item,index) in selectData" @click="selectColor(index)" :class="{selected:colorIndex == index}">{{item.car.attrs[1].attrVal}}</span>
                </div>
              </div>
              </div>
            <div class="select_text">
              <p>
                <span>typeName : {{typeName}}</span>
                <span>typeId : {{selectDesc.car?selectDesc.car.typeId:''}}</span>
              </p>
              <p>
                <span>itemName : {{selectDesc.car?selectDesc.car.name:''}}</span>
                <span>itemId : {{selectDesc.car?selectDesc.car.itemId:''}}</span>
              </p>
              <p>
                <span>skuCode : {{selectDesc.car?selectDesc.car.skuCode:''}}</span>
                <span>skuId : {{selectDesc.car?selectDesc.car.id:''}}</span>
              </p>
            </div>
            <div class="select_image">
              <img :src="selectDesc.car?selectDesc.car.image:''" alt="" />
            </div>
          </div>
        </div>
        <div class="type_detail manage_section">
          <p class="manage_title">
            车型详细信息
          </p>
          <div class="manage_content detail_content">
              {{selectDesc.car?selectDesc.car.attrs:''}}
          </div>
        </div>
      </div>
      <div class="main_right main_section">
        <div class="cms_response manage_section">
          <p class="manage_title">
            CMS应答报文
          </p>
          <div class="manage_content cms_content">
            {{selectDesc.car?selectDesc.car.attrs:''}}
          </div>
        </div>
      </div>
    </div>
    <relate-card v-if="this.$store.state.isAlert" :typeName="typeName" :selectDesc="selectDesc"></relate-card>
  </div>
</template>
<script type="text/ecmascript-6">
  import  RelateCard from './RelateCard.vue';
  import  http from '../../common/js/http.js';
  export
  default ({
    data() {
      return {
        data: '',
        initIndex: 0,
        colorIndex: 0,
        typeName: '',
        typeId: '',
        selectData: {},
        selectDesc: {},
      }
    },
    async mounted() {
      this.$store.commit('changeAlert', false);
      var data = await http('get', '',window.config.jlHost+'/admin/Carmessageapi/getList', false, '2');
      this.data = data;
      console.log(this.data)
      this.typeName = this.makeData[0][0][0].car.typeName;
      this.selectData = this.makeData[0][0];
      this.selectDesc = this.makeData[0][0][0];
    },
    methods: {
      openAlert() {
        this.$store.commit('changeAlert', true)
      },
      selectType(i) {
        this.initIndex = i;

      },
      selectColor(i) {
        this.colorIndex = i

      }
    },
    computed: {
      newData() {
        var newData = [];
        var me = this;
        for (var i = 0; i < me.data.length; i++) {
          newData[i] = [
            [me.data[i]]
          ]
        }
        return newData;
      },
      makeData() {
        var makeData = [];
        var me = this;
        for (var i = 0; i < me.newData.length - 1; i++) {
          var glob = me.newData[i][0][0].car.styleName;
          for (var j = i + 1, isAdd; j < me.newData.length; isAdd ? j++ : j) {
            if ((me.newData[j][0][0].car.styleName) && me.newData[j][0][0].car.styleName == glob) {
              me.newData[i][0].push(me.newData[j][0][0]);
              me.newData.splice(j, 1);
              isAdd = false;
            } else {
              isAdd = true
            }
          }
        }
        makeData = me.newData;
        return makeData
      }
    },
    watch: {
      initIndex(v) {
        this.colorIndex = 0;
        this.selectData = this.makeData[v][0];
        this.selectDesc = this.makeData[v][0][0];
      },
      colorIndex(v) {
        this.selectDesc = this.makeData[this.initIndex][0][v];

      }
    },
    components: {
      'relate-card': RelateCard
    },
    destroyed() {
      Message.closeAll();
    },
  })
</script>
<style lang="scss" scoped type="text/css">
  @import "../../css/type_manage.scss";
</style>
