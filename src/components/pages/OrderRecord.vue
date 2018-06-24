<template>
    <div>
        <p class="index_title">订单记录</p>
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
                            <th width="10%">购买人</th>
                            <th width="10%">购买时间</th>
                            <th width="10%">订单号</th>
                            <th width="10%">车型</th>
                            <th width="10%">配置</th>
                            <th width="10%">颜色</th>
                            <th width="10%">金额</th>
                            <th width="10%">付款方式</th>
                            <th width="10%">付款时间</th>
                            <th width="10%">付款状态</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item in tableData">
                            <td width="10%">
                                <div class="name detail" style="padding:0">{{item.name}}</div>
                            </td>
                            <td width="10%">
                                <div class="buy_time detail">{{item.buyTime}}</div>
                            </td>
                            <td width="10%">
                                <div class="order_number detail">{{item.orderNum}}</div>
                            </td>
                            <td width="10%">
                                <div class="car_model detail">{{item.carModel}}</div>
                            </td>
                            <td width="10%">
                                <div class="configure detail">{{item.configure}}</div>
                            </td>
                            <td width="10%">
                                <div class="color detail">{{item.color}}</div>
                            </td>
                            <td width="10%">
                                <div class="price detail">{{item.price}}</div>
                            </td>
                            <td width="10%">
                                <div class="payWay detail">{{item.payWay}}</div>
                            </td>
                            <td width="10%">
                                <div class="pay_time detail">{{item.payTime}}</div>
                            </td>
                            <td width="10%">
                                <div class="pay_status detail">
                                    <template v-if="item.payStatus"> <span style="color:#42d885">支付成功</span>

                                    </template>
                                    <template v-else=""> <span style="color:#ff4949">支付失败</span>

                                    </template>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                        <tfoot>
                        <tr>
                            <td colspan="10">
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
                    buyTime: '2017-06-17',
                    orderNum: '0012345',
                    carModel: 'X001',
                    configure: '高档',
                    color: '黑色',
                    price: '100万',
                    payWay: '网上支付',
                    payTime: '2017-05-17',
                    payStatus: 0
                },
                {
                    name: '张晓',
                    buyTime: '2017-06-17',
                    orderNum: '0012345',
                    carModel: 'X001',
                    configure: '高档',
                    color: '黑色',
                    price: '100万',
                    payWay: '网上支付',
                    payTime: '2017-05-17',
                    payStatus: 1
                },
                {
                    name: '张晓',
                    buyTime: '2017-06-17',
                    orderNum: '0012345',
                    carModel: 'X001',
                    configure: '高档',
                    color: '黑色',
                    price: '100万',
                    payWay: '网上支付',
                    payTime: '2017-05-17',
                    payStatus: 1
                },
            ]
        }
    }
    }
</script>
<style lang="scss" scoped type="text/css">
    @import "../../css/order_record.scss";
</style>