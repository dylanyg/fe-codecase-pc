import LpLogin from "@liepin/publicLogin"

let businessId = 1100100013
// initialUrl
const tenantId = "liepin"

// 猎聘租户，预上线测试

// 获取手机号验证码
export const getTelCode = ({ tel, captchaData, captchaSign }) =>
  new Promise((r, j) => {
    new LpLogin({ tenantId }).sendCaptchaRequest({
      requestType: "getTelCode",
      requestData: { tel, businessId, captchaData, captchaSign },
      success(d) {
        const { flag, data, msg, code } = d
        if (flag === 1) {
          r(data)
        } else {
          const error = new Error()
          error.message = {
            msg,
            code,
          }
          j(error)
        }
      },
    })
  })

// 登陆
export const postLoginMsg = ({ tel, smsCode, isNeedCreateUser = true }) =>
  new Promise((r, j) => {
    new LpLogin({ tenantId }).sendRequest({
      requestType: "mobileLogin",
      requestData: { tel, smsCode, businessId },
      success(data) {
        const { flag, code, msg } = data
        if (flag === 1) {
          r()
        } else {
          const err = new Error()
          err.message = {
            code,
            msg,
          }
          j(err)
        }
      },
    })
  })
