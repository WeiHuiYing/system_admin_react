(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-180bf072","chunk-2d22c863"],{"820e":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("Tree",{attrs:{data:t.DeptTree},on:{"on-select-change":t.deptTreeChange}})],1)},d=[],a=n("f432"),i={props:{parent:{}},data:function(){return{Depts:[],DeptTree:[],DeptTreeItems:[]}},methods:{loadData:function(){var t=this;t.Depts=[],t.DeptTree=[],t.DeptTreeItems=[];var e={navPropertyPaths:["childrenDept"]};Object(a["getList"])(e).then((function(e){var n=e.data,r=n.data;t.Depts=r,t.loadTree()})).catch((function(t){}))},loadTree:function(){var t=this;t.DeptTree=t.loadDeptChild(t.Depts)},loadDeptChild:function(t){var e=this,n=[];return n=t.map((function(t){if(!t.parentId){var n={expand:!0};return n.title=t.deptName,n.id=t.id,n.value=t.deptCode,t.childrenDept.length>0?n.children=e.loadDeptChildItem(t.childrenDept):n.children=[],n}})).filter((function(t){if(t)return t})),n},loadDeptChildItem:function(t){var e=this,n=[];return n=t.map((function(t){var n={expand:!0};return n.title=t.deptName,n.id=t.id,n.value=t.deptCode,t.childrenDept.length>0?n.children=e.loadDeptChildItem(t.childrenDept):n.children=[],n})),n},deptSelect:function(){(!this.Depts||this.Depts.length<=0)&&this.loadData()},deptTreeChange:function(t){var e=t[0];this.parent.deptChange(e)}},mounted:function(){this.loadData()}},u=i,p=n("2877"),o=Object(p["a"])(u,r,d,!1,null,null,null);e["default"]=o.exports},f432:function(t,e,n){"use strict";n.r(e),n.d(e,"getList",(function(){return d})),n.d(e,"getChildList",(function(){return a})),n.d(e,"Add",(function(){return i})),n.d(e,"Edit",(function(){return u})),n.d(e,"Delete",(function(){return p})),n.d(e,"Get",(function(){return o}));var r=n("66df"),d=function(t){return r["default"].request({url:"api/ResDept/GetList",data:t,method:"post"})},a=function(t){return r["default"].request({url:"api/ResDept/GetChildList/"+t,method:"post"})},i=function(t){var e=t;return r["default"].request({url:"api/ResDept/Add",data:e,method:"post"})},u=function(t){var e=t;return r["default"].request({url:"api/ResDept/Edit",data:e,method:"post"})},p=function(t){return r["default"].request({url:"api/ResDept/Delete/"+t,method:"post"})},o=function(t){return r["default"].request({url:"api/ResDept/Get",data:t,method:"post"})}}}]);