<template>
  <div class="content-main">
    <div class="search-con search-con-top">
      <Row>
        <Col :span="20">
          <Form
            ref="formInline"
            label-position="right"
            :label-width="60"
            inline
          >
            <FormItem label="时间">
              <DatePicker
                v-model="filters.createTime"
                type="date"
                :options="dateOptions"
                placeholder="请选择查询日期"
                style="width: 200px"
              ></DatePicker>
            </FormItem>
            <FormItem>
              <Button
                @click="loadData('filter')"
                class="search-btn"
                type="primary"
              >
                搜索
              </Button>
            </FormItem>
          </Form>
        </Col>
        <Col :span="4">
          <Upload
            action=""
            name="excelFile"
            accept=".xls, .xlsx"
            :show-upload-list="false"
            :before-upload="handleUpload"
          >
            <Button :loading="uploadLoading">导入速卖通放款信息</Button>
          </Upload>
        </Col>
      </Row>
    </div>
    <Tabs v-model="currentTab" @on-click="changeTabs()">
      <TabPane label="导入收据" name="list">
        <Table
          ref="tables"
          height="700"
          :data="listData"
          v-bind:columns="listColums"
          stripe
        ></Table>
      </TabPane>
      <TabPane label="求和数据" name="sum">
        <Table
          ref="tables"
          height="700"
          :data="listData"
          v-bind:columns="sumColums"
          stripe
        ></Table>
      </TabPane>
    </Tabs>
    <div style="margin: 10px; overflow: hidden">
      <div style="float: right">
        <Page
          :total="pageTotal"
          :current="pageCurrent"
          @on-change="changePage"
          @on-page-size-change="changePageSize"
          :page-size="pageSize"
          :page-size-opts="[100, 200, 300, 400, 500]"
          show-total
          show-elevator
          show-sizer
        ></Page>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import {
  AliepressList,
  ExportAliepressList,
  GetSumList,
  ExportSumList,
  uploadLoanInfo,
} from "@/api/order";
import dayjs from "dayjs";
export default {
  data() {
    return {
      listColums: [
        {
          title: "平台单号",
          key: "plateFormOrderCode",
        },
        {
          title: "流水号",
          key: "serialCode",
        },
        {
          title: "支付宝交易号",
          key: "alipayCode",
        },
        {
          title: "店铺",
          key: "plateForm",
        },
        {
          title: "金额",
          key: "amount",
          sortable: true,
        },
        {
          title: "币种",
          key: "currency",
        },
        {
          title: "备注",
          key: "memo",
        },
        {
          title: "导入时间",
          key: "enterTime",
        },
      ],
      sumColums: [
        {
          title: "平台单号",
          key: "plateFormOrderCode",
        },
        {
          title: "店铺",
          key: "plateForm",
        },
        {
          title: "首次放款信息",
          key: "firstLoanDate",
        },
        {
          title: "末次放款信息",
          key: "lastLoanDate",
        },
        {
          title: "金额",
          key: "amount",
          sortable: true,
        },
        {
          title: "币种",
          key: "currency",
        },
        {
          title: "备注",
          key: "memo",
        },
        {
          title: "导入时间",
          key: "createTime",
        },
      ],
      filters: {
        createTime: "",
      },
      currentTab: "list",
      dateOptions: {
        disabledDate(date) {
          return dayjs(date).isAfter(dayjs());
        },
      },
      listData: [],
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100,
      uploadLoading: false,
    };
  },
  methods: {
    loadData(type) {
      const _this = this;
      if (type && type == "filter") {
        _this.pageCurrent = 1;
      }
      let filterQuery = [];
      if (_this.filters.createTime && _this.filters.createTime != "") {
        filterQuery.push({
          key: "refNo",
          value: _this.filters.refNo,
          option: "lk",
          isAnd: "true",
        });
      }
      let data = {
        pageNum: _this.pageCurrent,
        pageSize: _this.pageSize,
        query: [],
      };
      if (_this.currentTab == "list") {
        AliepressList(data).then((res) => {
          const resData = res.data;
          _this.listData = resData.data;
          _this.pageTotal = resData.totalCount;
        });
      } else if (_this.currentTab == "sum") {
        GetSumList(data).then((res) => {
          const resData = res.data;
          _this.listData = resData.data;
          _this.pageTotal = resData.totalCount;
        });
      }
    },
    // 切换tab
    // 页码设置为1，筛选条件不变
    changeTabs() {
      let _this = this;
      _this.pageCurrent = 1;
      _this.loadData();
    },
    changePage(val) {
      let _this = this;
      _this.pageCurrent = val;
      _this.loadData();
    },
    changePageSize(size) {
      let _this = this;
      _this.pageSize = size;
      _this.loadData();
    },
    handleUpload() {
      let _this = this;
      return false;
    },
    handleSuccess(response, file, fileList) {
      let _this = this;
      if (response.code == 200) {
        _this.listData = response.data;
        this.$Message.info({
          content: response.msg,
          duration: 10,
          closable: true,
        });
      } else {
        this.$Message.error({
          content: response.msg,
          duration: 10,
          closable: true,
        });
      }
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style lang="less"></style>
