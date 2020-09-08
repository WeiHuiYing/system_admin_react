import {
  LoginToken,
} from '@/api/Auth'
import {
  getUserInfo
} from '@/api/Auth'
import {
  setToken,
  getToken
} from '@/libs/util'

export default {
  state: {
    userName: '',
    userId: '',
    avatarImgPath: '',
    token: getToken(),
    access: '',
    hasGetInfo: false,
    unreadCount: 0,
    messageUnreadList: [],
    messageReadedList: [],
    messageTrashList: [],
    messageContentStore: {}
  },
  mutations: {
    setAvatar(state, avatarPath) {
      state.avatarImgPath = avatarPath
    },
    setUserId(state, id) {
      state.userId = id
    },
    setUserName(state, name) {
      state.userName = name
    },
    setAccess(state, access) {
      state.access = access
    },
    setToken(state, token) {
      state.token = token
      setToken(token)
    },
    setHasGetInfo(state, status) {
      state.hasGetInfo = status
    },
    setMessageCount(state, count) {
      state.unreadCount = count
    },
    setMessageUnreadList(state, list) {
      state.messageUnreadList = list
    },
    setMessageReadedList(state, list) {
      state.messageReadedList = list
    },
    setMessageTrashList(state, list) {
      state.messageTrashList = list
    },
    updateMessageContentStore(state, {
      msg_id,
      content
    }) {
      state.messageContentStore[msg_id] = content
    },
    moveMsg(state, {
      from,
      to,
      msg_id
    }) {
      const index = state[from].findIndex(_ => _.msg_id === msg_id)
      const msgItem = state[from].splice(index, 1)[0]
      msgItem.loading = false
      state[to].unshift(msgItem)
    }
  },
  getters: {
    messageUnreadCount: state => state.messageUnreadList.length,
    messageReadedCount: state => state.messageReadedList.length,
    messageTrashCount: state => state.messageTrashList.length
  },
  actions: {
    // 登录
    handleLogin({
      commit
    }, data) {
      return new Promise((resolve, reject) => {
        LoginToken(data).then(res => {
          console.log(res)
          const resData = res.data
          if (res.status == 200) {
            commit('setToken', resData.access_token)
            resolve(resData)
          } else {
            resolve(resData);
            //alert(data.message);
          }
          return resData;
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut({
      state,
      commit
    }) {
      commit('setToken', '')
      commit('setAccess', [])
    },
    // 获取用户相关信息
    getUserInfo({
      state,
      commit
    }) {
      return new Promise((resolve, reject) => {
        try {
          getUserInfo().then(res => {
            console.log(res)
            // const data = res.data
            // commit('setAvatar', data.avatar)
            // commit('setUserName', data.name)
            // commit('setUserId', data.user_id)
            // commit('setAccess', data.access)
            // commit('setHasGetInfo', true)
            // resolve(data)
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    },
    // 此方法用来获取未读消息条数，接口只返回数值，不返回消息列表
    getUnreadMessageCount({
      state,
      commit
    }) {},
    // 获取消息列表，其中包含未读、已读、回收站三个列表
    getMessageList({
      state,
      commit
    }) {},
    // 根据当前点击的消息的id获取内容
    getContentByMsgId({
      state,
      commit
    }) {},
    // 把一个未读消息标记为已读
    hasRead({
      state,
      commit
    }) {},
    // 删除一个已读消息到回收站
    removeReaded({
      commit
    }, {
      msg_id
    }) {},
    // 还原一个已删除消息到已读消息
    restoreTrash({
      commit
    }) {}
  }
}