<template>
  <div>
    <Tabs>
      <TabPane label="详情">
        <Row class="info-warp">
          <Col span="11">
            <Card dis-hover :bordered="false">
              <Row class="info-item">
                <Col class="info-title" :span="6">订单id:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.OrderId }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">订单编码:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.SaleOrderCode }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">入库单号:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.RefNo }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">平台代码:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.Plateform }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">销售单号:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.SaleOrderCode }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">系统单号:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.SysOrderCode }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">仓库单号:</Col>
                <Col :offset="1" :span="6">{{
                  rowInfo.WarehouseOrderCode
                }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">仓库运输方式代码:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.ShippingMethod }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">ShippingMethodPlatform:</Col>
                <Col :offset="1" :span="6">{{
                  rowInfo.ShippingMethodPlatform
                }}</Col>
              </Row>
            </Card>
          </Col>
          <Col span="11" offset="2">
            <Card dis-hover :bordered="false">
              <Row class="info-item">
                <Col class="info-title" :span="6">仓库代码:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.WarehouseCode }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">创建时间:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.CreatedDate }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">平台付款时间:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.DatePaidPlatform }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">平台发货时间:</Col>
                <Col :offset="1" :span="6">{{
                  rowInfo.DateWarehouseShipping
                }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">平台发货状态:</Col>
                <Col :offset="1" :span="6">{{
                  rowInfo.PlatformShipStatus
                }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">总金额:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.Amountpaid }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">paypal交易号:</Col>
                <Col :offset="1" :span="6">{{
                  rowInfo.PaypalTransactionId
                }}</Col>
              </Row>
              <Row class="info-item">
                <Col class="info-title" :span="6">用户名称:</Col>
                <Col :offset="1" :span="6">{{ rowInfo.BuyerName }}</Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </TabPane>
      <TabPane label="装箱单信息">
        <Table
          ref="tables"
          :data="rowInfo.Packing"
          v-bind:columns="packingColums"
          stripe
        ></Table>
      </TabPane>
      <TabPane label="订单产品信息">
        <Table
          ref="tables"
          :data="rowInfo.products"
          v-bind:columns="productColums"
          stripe
        ></Table>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
export default {
  props: { detilsRow: Object, parent: Object },
  data() {
    return {
      rowInfo: {},
      packingColums: [
        {
          title: "参考单号",
          key: "ReferenceNo",
        },
        {
          title: "装箱单号",
          key: "TppCode",
        },
        {
          title: "产品数量",
          key: "TppQuantity",
          sortable: true,
        },
        {
          title: "重量（kg）",
          key: "TppWeight",
        },
        {
          title: "体积（cm³）",
          key: "TppVolume",
        },
      ],
      productColums: [
        {
          title: "产品名称",
          key: "ProductTitle",
        },
        {
          title: "产品代码",
          key: "ProductBarcode",
        },
        {
          title: "三方仓库产品代码",
          key: "BarcodeCode",
        },
        {
          title: "产品数量",
          key: "OpQuantity",
        },
        {
          title: "产品体积（cm³）",
          key: "Volume",
        },
      ],
    };
  },
  watch: {
    detilsRow(newVal, oldVal) {
      this.rowInfo = Object.assign({}, newVal);
    },
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.info-warp {
  .info-item {
    font-size: 12px;
    line-height: 32px;
    .info-title {
      font-size: 14px;
      font-weight: 500;
      text-align: right;
    }
  }
}
</style>
