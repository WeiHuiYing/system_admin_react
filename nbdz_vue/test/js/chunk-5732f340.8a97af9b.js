(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5732f340","chunk-08f1bb0f","chunk-2d0e2664"],{"1d63":function(t,e,a){},"34a0":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content-main"},[a("div",{staticClass:"search-con search-con-top"},[a("Row",[a("Col",{attrs:{span:24}},[a("Form",{ref:"formInline",attrs:{"label-position":"right","label-width":60,inline:""}},[a("FormItem",{attrs:{label:"交易号"}},[a("Input",{staticClass:"search-input",attrs:{clearable:""},model:{value:t.filters.reportRequestId,callback:function(e){t.$set(t.filters,"reportRequestId",e)},expression:"filters.reportRequestId"}})],1),a("FormItem",[a("Button",{staticClass:"search-btn",attrs:{type:"primary"},on:{click:function(e){return t.loadFilter()}}},[t._v("搜索")])],1)],1)],1)],1)],1),a("Table",{ref:"tables",attrs:{height:"700",loading:t.tableLoading,data:t.listData,columns:t.listColumns,stripe:""}}),a("div",{staticStyle:{margin:"10px",overflow:"hidden"}},[a("div",{staticStyle:{float:"right"}},[a("Page",{attrs:{total:t.pageTotal,current:t.pageCurrent,"page-size":t.pageSize,"page-size-opts":[100,200,300,400,500],"show-total":"","show-elevator":"","show-sizer":""},on:{"on-change":t.changePage,"on-page-size-change":t.changePageSize}})],1)]),a("Modal",{attrs:{title:"详情","mask-closable":!1,width:"90%",scrollable:"","footer-hide":""},model:{value:t.modelDetils,callback:function(e){t.modelDetils=e},expression:"modelDetils"}},[a("Detils",{ref:"detils",attrs:{parent:this,"detils-row":t.detilsRow}})],1)],1)},n=[],r=a("7f10"),o=a("ebfb"),l={components:{Detils:o["default"]},data:function(){var t=this;return{filters:{reportRequestId:""},listData:[],listColumns:[{title:"交易号",key:"reportRequestId",width:"200"},{title:"交易类型",key:"reportType"},{title:"交易创建时间",key:"createDate",sortable:!0},{title:"店铺",key:"store"},{title:"交易到期时间",key:"availableDate",sortable:!0},{title:"交易结束时间",key:"endDate",sortable:!0},{title:"交易开始时间",key:"startDate",sortable:!0},{title:"操作",key:"action",align:"center",render:function(e,a){return e("div",[e("Button",{props:{type:"default",size:"small"},on:{click:function(){t.viewDetils(a)}}},"详细")])}}],pageTotal:1,pageCurrent:1,pageSize:100,detilsRow:{},modelDetils:!1,tableLoading:!1}},methods:{loadData:function(){var t=this,e=this,a=[];e.filters.reportRequestId&&""!=e.filters.reportRequestId&&a.push({key:"reportRequestId",binaryop:"eq",value:e.filters.reportRequestId,andorop:"and"});var i={pageNum:e.pageCurrent,pageSize:e.pageSize,query:a};e.tableLoading=!0,Object(r["GetAmazonList"])(i).then((function(a){var i=a.data;e.tableLoading=!1,200==i.code?(e.listData=i.data,e.pageTotal=i.totalCount):t.$Message.error(i.msg)})).catch((function(t){e.tableLoading=!1,console.log(t)}))},loadFilter:function(){var t=this;t.pageCurrent=1,t.loadData()},changePage:function(t){var e=this;e.pageCurrent=t,e.loadData()},changePageSize:function(t){var e=this;e.pageSize=t,e.loadData()},viewDetils:function(t){var e=this;e.detilsRow={},e.detilsRow=t.row,e.modelDetils=!0}},mounted:function(){this.loadData()}},s=l,d=a("2877"),u=Object(d["a"])(s,i,n,!1,null,null,null);e["default"]=u.exports},"7f10":function(t,e,a){"use strict";a.r(e),a.d(e,"GetOrderDeliverList",(function(){return n})),a.d(e,"GetPaypalList",(function(){return r})),a.d(e,"GetAmazonList",(function(){return o})),a.d(e,"GetAmazonDetailList",(function(){return l})),a.d(e,"GetShop",(function(){return s})),a.d(e,"GetPlateform",(function(){return d})),a.d(e,"GetDHCostList",(function(){return u})),a.d(e,"GetRepeatCustList",(function(){return c})),a.d(e,"ExportRepeatCust",(function(){return p})),a.d(e,"GetFinancialStatement",(function(){return h})),a.d(e,"ExportFinancialStatement",(function(){return m})),a.d(e,"uploadShippingFee",(function(){return f}));var i=a("66df"),n=function(t){return i["default"].request({url:"api/FinancialStatement/GetOrderDeliverList",method:"POST",data:t})},r=function(t){return i["default"].request({url:"api/FinancialStatement/GetPaypalList",method:"POST",data:t})},o=function(t){return i["default"].request({url:"api/FinancialStatement/GetAmazonList",method:"POST",data:t})},l=function(t){return i["default"].request({url:"api/FinancialStatement/GetAmazonDetailList",method:"POST",data:t})},s=function(t){var e;return e=t?"api/FinancialStatement/GetShop?Plateform="+t:"api/FinancialStatement/GetShop",i["default"].request({url:e,method:"GET"})},d=function(){return i["default"].request({url:"api/FinancialStatement/GetPlateform",method:"GET"})},u=function(t){return i["default"].request({url:"api/FinancialStatement/GetDHCostList",method:"POST",data:t})},c=function(t){return i["default"].request({url:"api/FinancialStatement/GetRepeatCustList",method:"POST",data:t})},p=function(t){return i["default"].request({url:"api/FinancialStatement/ExportRepeatCust",method:"POST",data:t,responseType:"blob"})},h=function(t){return i["default"].request({url:"api/FinancialStatement/GetFinancialStatement",method:"POST",data:t})},m=function(t){return i["default"].request({url:"api/FinancialStatement/ExportFinancialStatement",method:"POST",data:t,responseType:"blob"})},f=function(t){return i["default"].request({url:"api/UploadShippingFee/uploadShippingFee",method:"POST",data:t,responseType:"blob"})}},ca26:function(t,e,a){"use strict";var i=a("1d63"),n=a.n(i);n.a},ebfb:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Table",{ref:"tables",attrs:{height:"500",data:t.listData,columns:t.Colums,stripe:""}}),a("div",{staticStyle:{margin:"10px",overflow:"hidden"}},[a("Page",{attrs:{total:t.pageTotal,current:t.pageCurrent,"page-size":50,"show-total":"","show-elevator":"","show-sizer":""},on:{"on-change":t.changePage}})],1)],1)},n=[],r=a("7f10"),o={props:{detilsRow:Object,parent:Object},data:function(){return{rowInfo:{},Colums:[{title:"邮寄时间",key:"postedDate",width:"200",sortable:!0},{title:"运输方式",key:"shipmentFeeType",width:"200"},{title:"下单时间",key:"depositDate",width:"200",sortable:!0},{title:"促销类型",key:"promotionType",width:"200"},{title:"其他费用描述",key:"otherFeeReasonDescription",width:"200"},{title:"币种",key:"currency",width:"200"},{title:"购买数量",key:"quantityPurchased",width:"200"},{title:"定居地",key:"settlementId",width:"200"},{title:"商品调整项目ID",key:"merchantAdjustmentItemId",width:"200"},{title:"税额",key:"fulfillmentId",width:"200"},{title:"总额币种",key:"promotionId",width:"200"},{title:"总额",key:"marketplaceName",width:"200"},{title:"发票号码",key:"sku",width:"200"},{title:"发票号码",key:"settlementStartDate",width:"200"},{title:"发票号码",key:"orderId",width:"200"},{title:"发票号码",key:"directPaymentType",width:"200"},{title:"发票号码",key:"merchantOrderId",width:"200"},{title:"发票号码",key:"orderItemCode",width:"200"},{title:"发票号码",key:"settlementEndDate",width:"200"},{title:"发票号码",key:"priceType",width:"200"},{title:"发票号码",key:"adjustmentId",width:"200"},{title:"发票号码",key:"transactionType",width:"200"},{title:"发票号码",key:"merchantOrderItemId",width:"200"},{title:"发票号码",key:"orderFeeType",width:"200"},{title:"发票号码",key:"shipmentId",width:"200"},{title:"发票号码",key:"itemRelatedFeeType",width:"200"},{title:"发票号码",key:"itemRelatedFeeAmount",width:"200"},{title:"发票号码",key:"otherFeeAmount",width:"200"},{title:"发票号码",key:"directPaymentAmount",width:"200"},{title:"发票号码",key:"promotionAmount",width:"200"},{title:"发票号码",key:"priceAmount",width:"200"},{title:"发票号码",key:"miscFeeAmount",width:"200"},{title:"发票号码",key:"otherAmount",width:"200"},{title:"发票号码",key:"orderFeeAmount",width:"200"},{title:"发票号码",key:"amazonReportOrderId",width:"200"},{title:"发票号码",key:"totalAmount",width:"200"},{title:"发票号码",key:"shipmentFeeAmount",width:"200"},{title:"发票号码",key:"store",width:"200"}],listData:[],pageCurrent:1,pageTotal:1}},watch:{detilsRow:function(t,e){this.rowInfo=Object.assign({},t),this.rowInfo.id&&this.loadData()}},methods:{loadData:function(){var t=this,e=this,a={id:e.rowInfo.id,pageNum:e.pageCurrent,pageSize:"50"};Object(r["GetAmazonDetailList"])(a).then((function(a){var i=a.data;200==i.code?(e.listData=i.data,e.pageTotal=i.totalCount):t.$Message.error({content:i.msg,duration:10,closable:!0})}))},changePage:function(t){var e=this;e.pageCurrent=t,e.loadData()}}},l=o,s=(a("ca26"),a("2877")),d=Object(s["a"])(l,i,n,!1,null,"224fc772",null);e["default"]=d.exports}}]);