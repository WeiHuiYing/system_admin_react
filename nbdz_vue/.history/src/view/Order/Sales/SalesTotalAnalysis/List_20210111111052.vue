<template>
  <div class="content-main">
    <Row class="search-con search-con-top">
      <Col :span="18">
        <Form ref="formInline" label-position="right" :label-width="100" inline>
          <FormItem prop="startTime" label="付款开始时间">
            <DatePicker
              v-model="filters.startTime"
              type="date"
              :options="dateOptions"
              placeholder="请选择开始时间"
              style="width: 200px"
            ></DatePicker>
          </FormItem>
          <FormItem prop="endTime" label="付款结束时间">
            <DatePicker
              v-model="filters.endTime"
              type="date"
              :options="dateOptions"
              placeholder="请选择结束时间"
              style="width: 200px"
            ></DatePicker>
          </FormItem>
          <FormItem label="商品类型">
            <Select
              @on-change="filtersTypeList"
              v-model="filters.type"
              multiple
              style="width: 200px"
            >
              <Option
                v-for="(item, index) in TypeList"
                :key="index"
                :value="item"
                >{{ item }}</Option
              >
            </Select>
          </FormItem>
          <FormItem>
            <Button @click="loadData()" class="search-btn" type="primary">
              <Icon type="search" />&nbsp;&nbsp;搜索
            </Button>
          </FormItem>
        </Form>
      </Col>
      <Col :span="6">
        <Dropdown
          v-if="selectionList.length > 0"
          placement="bottom-start"
          @on-click="handleMenu"
        >
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
      stripe
      :border="true"
      show-summary
      :summary-method="handleSummary"
      @on-selection-change="tableSelect"
    ></Table>
  </div>
</template>

<script>
import {
  TotalSale as getList,
  GetProductCategoryList as getType,
} from "@/api/order";
import dayjs from "dayjs";
import excel from "@/libs/excel";
export default {
  data() {
    return {
      filters: {
        startTime: "",
        endTime: "",
        type: [],
      },
      dateOptions: {
        disabledDate(date) {
          return dayjs(date).isAfter(dayjs());
        },
      },
      tableLoading: false,
      totalData: [],
      listData: [],
      listColums: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "商品类型",
          key: "productCategory",
        },
        {
          title: "销量",
          key: "saleQty",
        },
      ],
      selectionList: [],
      TypeList: [],
    };
  },
  methods: {
    loadData() {
      let _this = this;
      let data = {};
      if (_this.filters.startTime !== "") {
        data.startTime = dayjs(_this.filters.startTime).format("YYYY-MM-DD");
      } else {
        data.startTime = dayjs().subtract(7, "day").format("YYYY-MM-DD");
        _this.filters.startTime = dayjs()
          .subtract(7, "day")
          .format("YYYY-MM-DD");
      }
      if (_this.filters.endTime !== "") {
        data.endTime = dayjs(_this.filters.endTime).format("YYYY-MM-DD");
      } else {
        data.endTime = dayjs().format("YYYY-MM-DD");
        _this.filters.endTime = dayjs().format("YYYY-MM-DD");
      }
      if (
        !dayjs(data.endTime).isAfter(dayjs(data.startTime)) &&
        dayjs(data.endTime).diff(dayjs(data.startTime), "day") != "0"
      ) {
        this.$Message.error({
          content: "结束时间在开始时间之后",
          duration: 10,
          closable: true,
        });
        return false;
      }
      _this.tableLoading = true;
      getList(data)
        .then((res) => {
          _this.tableLoading = false;
          const resData = res.data;
          if (resData.code == 200) {
            _this.totalData = resData.data;
            if (_this.filters.type.length > 0) {
              _this.filtersTypeList();
            } else {
              _this.listData = _this.totalData;
            }
          } else {
            this.$Message.error({
              content: resData.msg,
              duration: 10,
              closable: true,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    typeLoad() {
      let _this = this;
      getType()
        .then((res) => {
          const resData = res.data;
          if (resData.code == 200) {
            _this.TypeList = resData.data;
          } else {
            this.$Message.error({
              content: resData.msg,
              duration: 10,
              closable: true,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    filtersTypeList() {
      let _this = this;
      if (_this.totalData.length > 0) {
        if (_this.filters.type.length > 0) {
          _this.listData = _this.totalData.filter((item) => {
            for (let i = 0; i < _this.filters.type.length; i++) {
              if (item.productCategory == _this.filters.type[i]) {
                return item;
              }
            }
          });
        } else {
          _this.listData = _this.totalData;
        }
      }
    },
    // 合并单元格
    handleSpan({ row, column, rowIndex, columnIndex }) {
      //   console.log({ row, column, rowIndex, columnIndex });
      if (columnIndex === 2) {
        return {
          rowspan: 1,
          colspan: 1,
        };
      }
    },
    // 合计
    handleSummary({ columns, data }) {
      const sums = {};
      columns.forEach((column, index) => {
        const key = column.key;
        if (index === 0) {
          sums[key] = {
            key,
            value: "总计",
          };
          return;
        } else if (index === 1) {
          sums[key] = {
            key,
            value: "/",
          };
          return;
        }
        let stringType = false;
        const values = data.map((item) => {
          let value = JSON.stringify(item[key]);
          stringType = value.indexOf("%") != -1;
          value = value.replace("%", "");
          value = JSON.parse(value);
          return Number(value);
        });
        if (!values.every((value) => isNaN(value))) {
          let val = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          if (stringType) {
            val = parseFloat(val).toFixed(2) + "%";
          }
          sums[key] = {
            key,
            value: val,
          };
        } else {
          sums[key] = {
            key,
            value: "/",
          };
        }
      });
      return sums;
    },
    tableSelect(selection) {
      this.selectionList = selection;
    },
    handleMenu(name) {
      if (name == "export") {
        this.exportList();
      }
    },
    exportList() {
      let _this = this;
      let titleArr = [];
      let keyArr = [];
      let columnsArr = [];
      _this.listColums
        .filter((item, index) => {
          return index != 0;
        })
        .forEach((item) => {
          if (item.children) {
            item.children.forEach((child) => {
              let children = {};
              children.title = item.title + "|" + child.title;
              children.key = child.key;
              columnsArr.push(children);
            });
          } else {
            columnsArr.push(item);
          }
        });
      titleArr = columnsArr.map((item) => {
        return item.title;
      });
      keyArr = columnsArr.map((item) => {
        return item.key;
      });
      const params = {
        title: titleArr,
        key: keyArr,
        data: this.selectionList,
        autoWidth: true,
        filename: "销售汇总报表",
      };
      excel.export_array_to_excel(params);
    },
  },
  mounted() {
    this.loadData();
    this.typeLoad();
  },
};
</script>
