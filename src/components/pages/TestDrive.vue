<template>
    <div>
        <p class="index_title">试驾预约</p>
        <div class="main">
            <div class="main_wrapper">
                <div class="search clearfix">
                    <el-input class="name left" placeholder="搜索"></el-input>
                    <div class="add left">
                        <el-button>搜索</el-button>
                    </div>
                </div>
                <div class="table">
                    <table>
                        <thead>
                        <tr>
                            <th width="15%">预约人</th>
                            <th width="15%">手机号</th>
                            <th width="15%">预约时间</th>
                            <th width="15%">登记时间</th>
                            <th width="15%">预约车型</th>
                            <th width="25%">门店ID</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item in tableData">
                            <td width="15%">
                                <div class="name detail" style="padding:0">{{item.name}}</div>
                            </td>
                            <td width="15%">
                                <div class="phone detail">{{item.phone}}</div>
                            </td>
                            <td width="15%">
                                <div class="appoint_time detail">{{item.appointTime}}</div>
                            </td>
                            <td width="15%">
                                <div class="register_time detail">{{item.registerTime}}</div>
                            </td>
                            <td width="15%">
                                <div class="car_model detail">{{item.carModel}}</div>
                            </td>
                            <td width="25%">
                                <div class="address detail">{{item.address}}</div>
                            </td>
                        </tr>
                        </tbody>
                        <tfoot>
                        <tr>
                            <td colspan="6">
                                <div class="pages">
                                    <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
                                </div>
                            </td>
                        </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export
    default {
        data() {
        return {
            tableData: [
                {
                    name: '张晓',
                    phone: '1287676577',
                    appointTime: '2017-05-20',
                    registerTime: '2017-05-17',
                    carModel: 'X001',
                    address: '深圳'
                },
                {
                    name: '张晓',
                    phone: '1287676577',
                    appointTime: '2017-05-20',
                    registerTime: '2017-05-17',
                    carModel: 'X001',
                    address: '深圳'
                },
                {
                    name: '张晓',
                    phone: '1287676577',
                    appointTime: '2017-05-20',
                    registerTime: '2017-05-17',
                    carModel: 'X001',
                    address: '深圳'
                },
                {
                    name: '张晓',
                    phone: '1287676577',
                    appointTime: '2017-05-20',
                    registerTime: '2017-05-17',
                    carModel: 'X001',
                    address: '深圳'
                },
                {
                    name: '张晓',
                    phone: '1287676577',
                    appointTime: '2017-05-20',
                    registerTime: '2017-05-17',
                    carModel: 'X001',
                    address: '深圳'
                },
                {
                    name: '张晓',
                    phone: '1287676577',
                    appointTime: '2017-05-20',
                    registerTime: '2017-05-17',
                    carModel: 'X001',
                    address: '深圳'
                },
            ]
        }
    }
    }
</script>
<style lang="scss" scoped type="text/css">
    @import "../../css/order_record.scss";
</style>