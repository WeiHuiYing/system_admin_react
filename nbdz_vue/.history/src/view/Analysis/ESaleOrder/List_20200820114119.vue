<template>
  <div class="content-main">
    <Row class="search-con search-con-top">
      <Col :span="20">
        <Form ref="formInline" label-position="right" :label-width="100" inline>
          <FormItem label="状态">
            <Select v-model="filters.e_status" style="width:150px">
              <Option value="0">未生成E贸易单据</Option>
              <Option value="1">生成E贸易单据</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button @click="loadData()" class="search-btn" type="primary">搜索</Button>
          </FormItem>
        </Form>
      </Col>
      <Col :span="4">
        <Dropdown v-if="selectionList.length > 0" placement="bottom-start" @on-click="handleSelect">
          <Button type="primary">
            操作
            <Icon type="ios-arrow-down"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="commit">确认提交</DropdownItem>
            <DropdownItem name="cancel">撤销报关单</DropdownItem>
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
import {
  getEOrder as getList,
  batchConfirmRepeal,
  batchConfirmSubmit,
} from "@/api/Analysis";
import Detils from "./Detils";
export default {
  data() {
    return {
      listColums: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "E贸易公司账号",
          key: "e_trade_account",
          width: 200,
        },
        {
          title: "批次号",
          key: "e_trade_log",
          width: 200,
        },
        {
          title: "订单编号",
          key: "orderNo",
          sortable: true,
          width: 200,
        },
        {
          title: "订单金额",
          key: "ordercharge",
          sortable: true,
          width: 200,
        },
        {
          title: "运费",
          key: "freight",
          width: 200,
        },
        {
          title: "进口行邮税",
          key: "tax",
          width: 200,
        },
        {
          title: "客户姓名",
          key: "customer",
          width: 200,
        },
        {
          title: "收货人名称",
          key: "consignee",
          width: 200,
        },
        {
          title: "收货人省份",
          key: "consigneeProvince",
          width: 200,
        },
        {
          title: "收货人城市",
          key: "consigneeCity",
          width: 200,
        },
        {
          title: "收货人地址",
          key: "consigneeAddress",
          width: 200,
        },
        {
          title: "收货人电话",
          key: "consigneeTelephone",
          width: 200,
        },
        {
          title: "收货人邮编",
          key: "consigneePostcode",
          width: 200,
        },
        {
          title: "创建时间",
          key: "create_date",
          width: 200,
        },
        {
          title: "更新时间",
          key: "update_date",
          width: 200,
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 200,
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
      filters: {
        e_status: "",
      },
      listData: [],
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100,
      tableLoading: false,
      selectionList: [],
      detilsRow: {},
      modelDetils: false,
    };
  },
  components: {
    Detils,
  },
  methods: {
    loadData() {
      let _this = this;
      let data = {
        page: _this.pageCurrent,
        page_size: _this.pageSize,
      };
      data = Object.assign(data, _this.filters);
      _this.tableLoading = true;
      getList(data)
        .then((res) => {
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
    viewDetils(params) {
      const _this = this;
      _this.detilsRow = {};
      _this.detilsRow = params.row;
      _this.modelDetils = true;
    },
    tableSelect(selection) {
      this.selectionList = selection.map((item) => {
        return item.id;
      });
    },
    handleSelect(name) {
      if (name == "commit") {
        this.handleCommit();
      } else if (name == "cancel") {
        this.handleCancel();
      }
    },
    // 批量提交
    handleCommit() {
      const _this = this;
      let data = {
        e_trade_ids: _this.selectionList.join(","),
      };
      _this.tableLoading = true;
      batchConfirmRepeal(data).then(
        (res) => {
          console.log(res);
          _this.tableLoading = false;
          _this.loadData();
        },
        (err) => {
          _this.tableLoading = false;
          if (err.response && err.response.request) {
            const response = err.response.request;
            this.$Message.error({
              content: response.responseText,
              duration: 10,
              closable: true,
            });
          }
        }
      );
    },
    // 批量撤销
    handleCancel() {
      const _this = this;
      let reason = "";
      this.$Modal.confirm({
        render: (h) => {
          return h("Input", {
            props: {
              autofocus: true,
              type: "textarea",
              rows: 4,
              placeholder: "请输入撤销原因",
            },
            on: {
              input: (val) => {
                reason = val;
              },
            },
          });
        },
        onOk: () => {
          let data = {
            e_trade_ids: _this.selectionList.join(","),
            reason: reason,
          };
          _this.tableLoading = true;
          batchConfirmSubmit(data).then(
            (res) => {
              console.log(res);
              _this.tableLoading = false;
              _this.loadData();
            },
            (err) => {
              _this.tableLoading = false;
              if (err.response && err.response.request) {
                const response = err.response.request;
                this.$Message.error({
                  content: response.responseText,
                  duration: 10,
                  closable: true,
                });
              }
            }
          );
        },
      });
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>