<template>
  <div class="content-main">
    <Row class="search-con search-con-top">
      <Col :span="22">
        <Form ref="formInline" label-position="right" :label-width="120" inline>
          <FormItem label="sku">
            <Input
              clearable
              v-model="filters.sku"
              placeholder="请输入搜索sku"
            ></Input>
          </FormItem>
          <FormItem label="商品大类">
            <Input
              clearable
              v-model="filters.productType"
              placeholder="请输入商品大类"
            ></Input>
          </FormItem>
          <FormItem>
            <Button
              style="margin-right: 5px"
              @click="loadFilter()"
              type="primary"
              >搜索</Button
            >
          </FormItem>
        </Form>
      </Col>
      <Col :span="2">
        <Button @click="exportExcel()" type="primary">导出</Button>
      </Col>
    </Row>
    <Table
      ref="tables"
      height="700"
      :data="listData"
      :loading="tableLoading"
      v-bind:columns="listColums"
      stripe
    ></Table>
    <div style="margin: 10px; overflow: hidden">
      <div style="float: right">
        <Page
          :total="totalCount"
          :current="currentPage"
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
import {
  GetCountBatch as getList,
  ExportCountBatch as exportList,
} from "@/api/Analysis";
import dayjs from "dayjs";
import { filtersNewDate as filtersDate } from "@/libs/validator";
export default {
  data() {
    return {
      listColums: [
        {
          title: "sku",
          key: "sku",
          align: "center",
        },
        {
          title: "商品大类",
          key: "productType",
          align: "center",
        },
        {
          title: "国内库存",
          key: "zfStock",
          align: "center",
        },
        {
          title: "海外库存",
          key: "hwStock",
          align: "center",
        },
        {
          title: "海外在途",
          key: "hwOnQty",
          align: "center",
        },
        {
          title: "美国2周销量",
          key: "hwQty",
          align: "center",
        },
        {
          title: "欧洲2周销量",
          key: "ozQty",
          align: "center",
        },
        {
          title: "海外2周总销量",
          key: "z2Qty",
          align: "center",
        },
        {
          title: "海外4周总销量",
          key: "z4Qty",
          align: "center",
        },
        {
          title: "海外现货可售周",
          key: "hwWeek",
          align: "center",
        },
        {
          title: "总现货可售周",
          key: "zzWeek",
          align: "center",
        },
        {
          title: "海外报备需求量",
          key: "hwBhQty",
          align: "center",
        },
        {
          title: "缺货量",
          key: "qhQty",
          align: "center",
        },
      ],
      listData: [],
      totalCount: 1,
      currentPage: 1,
      pageSize: 100,
      filters: {
        sku: "",
        productType: "",
      },
      tableLoading: false,
    };
  },
  methods: {
    loadData() {
      let _this = this;
      if (!_this.currentPage) _this.currentPage = 1;
      let filtersquery = [];
      if (_this.filters.sku && _this.filters.sku != "") {
        filtersquery.push({
          key: "sku",
          value: _this.filters.sku,
          option: "lk",
          andorop: "and",
        });
      }
      if (_this.filters.productType && _this.filters.productType != "") {
        filtersquery.push({
          key: "productType",
          value: _this.filters.productType,
          option: "lk",
          andorop: "and",
        });
      }
      let data = {
        pageNum: _this.currentPage,
        pageSize: _this.pageSize,
        query: filtersquery,
      };
      _this.tableLoading = true;
      getList(data)
        .then((res) => {
          _this.tableLoading = false;
          let resData = res.data;
          if (resData.code == "200") {
            _this.listData = resData.data;
            _this.totalCount = resData.totalCount;
          } else {
            this.$Message.error({
              content: resData.msg,
              duration: 10,
              closable: true,
            });
          }
        })
        .catch((err) => {
          _this.tableLoading = false;
          console.log(err);
        });
    },
    exportExcel() {
      const _this = this;
      let filtersquery = [];
      if (_this.filters.sku && _this.filters.sku != "") {
        filtersquery.push({
          key: "sku",
          value: _this.filters.sku,
          option: "lk",
          andorop: "and",
        });
      }
      if (_this.filters.productType && _this.filters.productType != "") {
        filtersquery.push({
          key: "productType",
          value: _this.filters.productType,
          option: "lk",
          andorop: "and",
        });
      }
      let data = {
        query: filtersquery,
      };
      this.$Spin.show({
        render: (h) => {
          return h("div", [
            h("Icon", {
              class: "demo-spin-icon-load",
              props: {
                type: "ios-loading",
                size: 18,
              },
            }),
            h("div", "导出中"),
          ]);
        },
      });
      exportList(data)
        .then((res) => {
          const content = res;
          const blob = new Blob([content.data], {
            type: "application/vnd.ms-excel",
          });
          const fileName = "大货报备报表.xlsx";
          if ("download" in document.createElement("a")) {
            // 非IE下载
            const elink = document.createElement("a");
            elink.download = fileName;
            elink.style.display = "none";
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href); // 释放 URL对象
            document.body.removeChild(elink);
          } else {
            // IE10+下载
            navigator.msSaveBlob(blob, fileName);
          }
          this.$Spin.hide();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    loadFilter() {
      const _this = this;
      _this.currentPage = 1;
      _this.loadData();
    },
    changePageSize(val) {
      const _this = this;
      _this.pageSize = val;
      _this.loadData();
    },
    changePage(val) {
      const _this = this;
      _this.currentPage = val;
      _this.loadData();
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style lang="less" scoped>
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
</style>
