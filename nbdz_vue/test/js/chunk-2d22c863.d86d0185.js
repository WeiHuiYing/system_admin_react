(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d22c863"],{f432:function(t,e,u){"use strict";u.r(e),u.d(e,"getList",(function(){return r})),u.d(e,"getChildList",(function(){return d})),u.d(e,"Add",(function(){return i})),u.d(e,"Edit",(function(){return o})),u.d(e,"Delete",(function(){return s})),u.d(e,"Get",(function(){return a}));var n=u("66df"),r=function(t){return n["default"].request({url:"api/ResDept/GetList",data:t,method:"post"})},d=function(t){return n["default"].request({url:"api/ResDept/GetChildList/"+t,method:"post"})},i=function(t){var e=t;return n["default"].request({url:"api/ResDept/Add",data:e,method:"post"})},o=function(t){var e=t;return n["default"].request({url:"api/ResDept/Edit",data:e,method:"post"})},s=function(t){return n["default"].request({url:"api/ResDept/Delete/"+t,method:"post"})},a=function(t){return n["default"].request({url:"api/ResDept/Get",data:t,method:"post"})}}}]);