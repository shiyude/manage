<template>
  <div class="card_wrapper">
    <div class="card_content">
      <p class="title">
        关联芯片
        <span> 录入信息</span>
      </p>
      <div class="card_desc">
        <p>
          <span>typeName : {{typeName}}</span>
          <span>typeId : {{selectDesc.car.typeId}}</span>
        </p>
        <p>
          <span>itemName : {{selectDesc.car.name}}</span>
          <span>itemId : {{selectDesc.car.itemId}}</span>
        </p>
        <p>
          <span>skuCode : {{selectDesc.car.skuCode}}</span>
          <span>skuId : {{selectDesc.car.id}}</span>
        </p>
      </div>
      <div class="car_image">
        <img :src="selectDesc.car.image" alt=""/>
      </div>
      <div class="response_section">
          <div v-if="is_focus">请将芯片放入感应区</div>
          <div v-else><el-button @click="get_focus">点击这里开始关联</el-button></div>
           <input  type="text"  placeholder="请输入内容" v-model="card_num"  style="position: absolute;opacity:0;-webkit-opacity:0;-moz-opacity:0;filter:alpha(opacity=0);top:0;left:0;height:0" @keyup.13="post_data" ref="input" @focus="focusTrue" @blur="focusFalse"/>
      </div>
      <div class="card_list" id="card_list">
        <table>
          <tbody>
            <tr v-for="item in  get_data">
              <td :class="{error:!item.add_status}">芯片ID   {{item.id}}</td>
              <template v-if="item.update_status">
                <td >更新成功</td>
              </template>
              <template v-else>
                <td v-if="item.add_status">关联成功</td>
                <td v-else class="error">已取消</td>
              </template>
              <td :class="{error:!item.add_status}">{{item.date}}</td>
              <td v-if="!item.add_status" class="error">改芯片已有关联车型信息</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="close_btn" @click="closeAlert"></div>
    </div>
    <div class="alert_update" v-if="is_update">
      <div class="update_content">
        <p>该芯片已有关联车型信息，是否更新？</p>
        <div>
          <span class="update_btn" @click="update_card">更新</span>
          <span class="cancel_btn" @click="closeUpdate">取消</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import http from '../../common/js/http.js';
  import  axios from 'axios';
  export
  default ({
    data(){
    return {
      card_num:'',
      get_data:[],
      is_update:false,
      is_focus:true
    }
  },
     async mounted() {
      this.is_update = false;
      this.get_data=[];
      this.$refs.input.focus()
  },
  methods: {
    closeAlert() {
      this.$store.commit('changeAlert', false)
    },
    closeUpdate(){
      this.is_update = false;
    },
   async post_data(){
      var card_num;
      if(this.card_num>2){
        if(this.card_num.slice(0,2) == '34'){
          card_num = '3430483959'
        }else if(this.card_num.slice(0,2) == '39'){
          card_num = '3941229975'
        }else {
          card_num = this.card_num
        }
      }else{
        card_num = this.card_num

      }
      console.log(card_num)
      var data = await http('get', '',window.config.jlHost+'/admin/Rfidapi/addRfidapi?rfid='+card_num+'&skucode='+this.selectDesc.car.skuCode, true, '3');
      if(data.content.length) {
        this.get_data.unshift({
          'id': card_num,
          add_status: data.flag,
          update_status: false,
          'date': data.content[0]
        });
        this.card_num = ''
      }
      if(!data.flag){
        this.is_update = true;
        this.card_num = card_num
      }
     console.log(1)
    },
    async update_card(){
      var data = await http('get', '',window.config.jlHost+'/admin/Rfidapi/updateRfidapi?rfid='+this.card_num+'&skucode='+this.selectDesc.car.skuCode, true, '4');
      console.log(data)
      if(data.flag){
        this.is_update = false;
        this.get_data.unshift({
          'id': this.card_num,
          add_status: true,
          update_status: data.flag,
          'date': data.content[0]
        })
      }
      this.card_num = ''
    },
    focusTrue(){
      this.is_focus = true
    },
    focusFalse(){
      this.is_focus = false
    },
    get_focus(){
      this.$refs.input.focus();
      this.card_num = '';
      this.is_focus = true;
    }
  },
  props: ['typeName', 'selectDesc'],
    destroyed() {
    Message.closeAll();
  }
  })
</script>
<style lang="scss" scoped type="text/css">
@import '../../css/relate_card.scss';
</style>
