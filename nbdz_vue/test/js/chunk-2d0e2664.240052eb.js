(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e2664"],{"7f10":function(t,e,n){"use strict";n.r(e),n.d(e,"GetOrderDeliverList",(function(){return i})),n.d(e,"GetPaypalList",(function(){return u})),n.d(e,"GetAmazonList",(function(){return r})),n.d(e,"GetAmazonDetailList",(function(){return o})),n.d(e,"GetShop",(function(){return d})),n.d(e,"GetPlateform",(function(){return l})),n.d(e,"GetDHCostList",(function(){return p})),n.d(e,"GetRepeatCustList",(function(){return c})),n.d(e,"ExportRepeatCust",(function(){return f})),n.d(e,"GetFinancialStatement",(function(){return s})),n.d(e,"ExportFinancialStatement",(function(){return m})),n.d(e,"uploadShippingFee",(function(){return S}));var a=n("66df"),i=function(t){return a["default"].request({url:"api/FinancialStatement/GetOrderDeliverList",method:"POST",data:t})},u=function(t){return a["default"].request({url:"api/FinancialStatement/GetPaypalList",method:"POST",data:t})},r=function(t){return a["default"].request({url:"api/FinancialStatement/GetAmazonList",method:"POST",data:t})},o=function(t){return a["default"].request({url:"api/FinancialStatement/GetAmazonDetailList",method:"POST",data:t})},d=function(t){var e;return e=t?"api/FinancialStatement/GetShop?Plateform="+t:"api/FinancialStatement/GetShop",a["default"].request({url:e,method:"GET"})},l=function(){return a["default"].request({url:"api/FinancialStatement/GetPlateform",method:"GET"})},p=function(t){return a["default"].request({url:"api/FinancialStatement/GetDHCostList",method:"POST",data:t})},c=function(t){return a["default"].request({url:"api/FinancialStatement/GetRepeatCustList",method:"POST",data:t})},f=function(t){return a["default"].request({url:"api/FinancialStatement/ExportRepeatCust",method:"POST",data:t,responseType:"blob"})},s=function(t){return a["default"].request({url:"api/FinancialStatement/GetFinancialStatement",method:"POST",data:t})},m=function(t){return a["default"].request({url:"api/FinancialStatement/ExportFinancialStatement",method:"POST",data:t,responseType:"blob"})},S=function(t){return a["default"].request({url:"api/UploadShippingFee/uploadShippingFee",method:"POST",data:t,responseType:"blob"})}}}]);