import {
  stringify
} from 'querystring';
import {
  router
} from 'umi';
import {
  AccountLogin,
  GetAccess
} from '@/services/login';
import {
  setAuthority
} from '@/utils/authority';
import {
  getPageQuery
} from '@/utils/utils';
const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    * login({
      payload
    }, {
      call,
      put
    }) {
      const response = yield call(AccountLogin, payload);
      // Login successfully
      if (response.code === 1) {
        if (response.data.token) {
          localStorage.setItem('token', 'Bearer ' + response.data.token);
          const userInfo = yield call(GetAccess);
          yield put({
            type: 'changeLoginStatus',
            payload: userInfo,
          });
        }
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let {
          redirect
        } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }

        router.replace(redirect || '/');
      }
    },

    logout() {
      const {
        redirect
      } = getPageQuery(); // Note: There may be security issues, please note

      if (window.location.pathname !== '/user/login' && !redirect) {
        router.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    changeLoginStatus(state, {
      payload
    }) {
      setAuthority(payload);
      return {
        ...state,
        type: payload.user_code
      };
    },
  },
};
export default Model;
