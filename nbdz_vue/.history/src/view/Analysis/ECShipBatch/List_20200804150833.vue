<template>
  <div class="content-main">
    <Row class="search-con search-con-top">
      <Col :span="20">
        <Form ref="formInline" label-position="right" :label-width="100" inline>
          <FormItem prop="startTime" label="下单开始时间">
            <DatePicker
              v-model="filters.startTime"
              type="date"
              :options="dateOptions"
              placeholder="请选择开始时间"
              style="width: 200px"
            ></DatePicker>
          </FormItem>
          <FormItem prop="endTime" label="下单结束时间">
            <DatePicker
              v-model="filters.endTime"
              type="date"
              :options="dateOptions"
              placeholder="请选择结束时间"
              style="width: 200px"
            ></DatePicker>
          </FormItem>
          <FormItem label="商品类型">
            <Select @on-change="filtersTypeList" v-model="filters.type" style="width:150px">
              <Option value="发块">发块</Option>
              <Option value="发帘">发帘</Option>
              <Option value="头套">头套</Option>
            </Select>
          </FormItem>
          <FormItem label="商品分类">
            <Select
              @on-change="filtersCate"
              v-model="filters.cate"
              multiple
              clearable
              style="width:150px"
            >
              <Option v-for="(item,index) in cateList" :key="index" :value="item.cate">{{item.cate}}</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button @click="loadData()" class="search-btn" type="primary">
              <Icon type="search" />&nbsp;&nbsp;搜索
            </Button>
          </FormItem>
        </Form>
      </Col>
      <Col :span="4">
        <Dropdown v-if="selectionList.length > 0" placement="bottom-start" @on-click="handleMenu">
          <Button type="primary">
            操作
            <Icon type="ios-arrow-down"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="export">导出</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Col>
    </Row>
    <Table
      ref="tables"
      height="700"
      :loading="tableLoading"
      :data="listData"
      v-bind:columns="listColums"
      @on-selection-change="tableSelect"
      stripe
    ></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page
          :total="pageTotal"
          :current="pageCurrent"
          @on-change="changePage"
          @on-page-size-change="changePageSize"
          :page-size="pageSize"
          :page-size-opts="[100,200,300,400,500]"
          show-total
          show-elevator
          show-sizer
        ></Page>
      </div>
    </div>
    <Modal
      title="详情"
      :mask-closable="false"
      v-model="modelDetils"
      width="90%"
      scrollable
      footer-hide
    >
      <Detils ref="detils" :parent="this" :detils-row="detilsRow"></Detils>
    </Modal>
  </div>
</template>

<script>
import { getShipList as getList } from "@/api/Analysis";
import Detils from "./Detils";
export default {
  components: {
    Detils,
  },
  data() {
    return {
      listColums: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "订单编码",
          key: "OrderCode",
        },
        {
          title: "入库单号",
          key: "ReferenceNo",
        },
        {
          title: "添加时间",
          key: "AddTime",
          sortable: true,
        },
        {
          title: "预计时间",
          key: "ExpectedDate",
          sortable: true,
        },
        {
          title: "用户",
          key: "UserAccount",
        },
        {
          title: "仓库",
          key: "Warehouse",
        },
        {
          title: "目标仓库",
          key: "ToWarehouse",
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "default",
                    size: "small",
                  },
                  on: {
                    click: () => {
                      this.viewDetils(params);
                    },
                  },
                },
                "详细"
              ),
            ]);
          },
        },
      ],
      listData: [],
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100,
      tableLoading: false,
      detilsRow: {},
      modelDetils: false,
      modelAdd: false,
      addData: "",
      selectionList: [],
    };
  },
  methods: {
    loadData() {
      let _this = this;
      let data = {
        page: _this.pageCurrent,
        pageSize: _this.pageSize,
      };
      _this.tableLoading = true;
      getList(data, "GET")
        .then((res) => {
          console.log(res);
          _this.tableLoading = false;
          let resData = res.data;
          if (res.status == 200) {
            _this.listData = resData.results;
            _this.pageTotal = resData.count;
          } else {
            this.$Message.error({
              content: resData.results,
              duration: 10,
              closable: true,
            });
          }
        })
        .catch((err) => {
          _this.tableLoading = false;
          if (err.response && err.response.request) {
            const response = err.response.request;
            this.$Message.error({
              content: response.responseText,
              duration: 10,
              closable: true,
            });
          }
        });
    },
    viewDetils(params) {
      let _this = this;
      _this.detilsRow = {};
      _this.detilsRow = params.row;
      _this.modelDetils = true;
    },
    tableSelect(selection) {
      this.selectionList = selection.map((item) => {
        return item.id;
      });
    },
    createOrder() {
      const _this = this;
      let data = {
        id: _this.selectionList.replace(reg, ","),
      };
      _this.tableLoading = true;
      getList(data, "PUT")
        .then((res) => {
          console.log(res);
          _this.tableLoading = false;
        })
        .catch((err) => {
          _this.tableLoading = false;
          if (err.response && err.response.request) {
            const response = err.response.request;
            this.$Message.error({
              content: response.responseText,
              duration: 10,
              closable: true,
            });
          }
        });
    },
    changePage(val) {
      let _this = this;
      _this.pageCurrent = val;
      _this.loadData();
    },
    changePageSize(val) {
      let _this = this;
      _this.pageSize = val;
      _this.loadData();
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>