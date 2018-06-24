import  axios from 'axios';
async function http(type,data,url,isAlert,isTable){
 var loading;
  if(isTable == '1'){
    loading= loadingInstance({
      target:'table'
    });
  }else if(isTable == '2'){
    loading= loadingInstance({
      target:'#manage_type_wrapper'
    });
  }else if(isTable == '3'||isTable == '4'){
    loading= loadingInstance({
      target:'#card_list'
    });
  }
    try{
        var response = await axios({
            method:type,
            data:data,
            url:url,
            timeout:10000
        });
        if(response){
          loading.close();
          if(isAlert&&response.data.flag){
            if(isTable == '3'){
              Message({
                type: 'success',
                message: '关联成功'
              });
            }else if(isTable == '1'){
              Message({
                type: 'success',
                message: '添加成功'
              });
            }else if(isTable == '4'){
              Message({
                type: 'success',
                message: '更新成功'
              });
            }
          }
            return Promise.resolve(response.data);
        }else{
          loading.close();
          if(isAlert){
            if(isTable == '3'){
              Message({
                type: 'error',
                message: '关联失败'
              });
            }else if(isTable == '1'){
              Message({
                type: 'error',
                message: '添加失败'
              });
            }else if(isTable == '4'){
              Message({
                type: 'error',
                message: '更新失败'
              });
            }
          }
            Message({
                type:'error',
                message:'暂无数据'
            });
            return Promise.reject('暂无数据');
        }

    }catch(e) {
      loading.close();
      Message({
        type: 'error',
        message: '网络出现故障'
      });
      return Promise.reject('网络出现故障');
    }
}
export  default http
