const webPush = require("web-push");

const vapidKeys = {
    publicKey : "BOXHvLqtqkbrE_vi6IcirRv9U3z5rhLNUG15CTuCMZElFZLKjPU4hXyG77qZNWe9zQzVBRZv_snB0vqWAxZovFY",
    privateKey : "zbLbevK0Qd5gB5c9m_dUSXauQ998sLUHw00RvdjzMpk"
}
const subscription = {
    endpoint : "https://fcm.googleapis.com/fcm/send/fz45hubwgCQ:APA91bGnEZA_nN_Prjzwy6ZXJAZJnJKLiqDmJgiIldMtqtzz6lSvSl7f8UNt83DNscyDYPGMX-CW3jxf51pHVPcC_InICOkvURhGMgV0Nm7mELS2P58JZr2HP1E27KcaL7rWfwmbMK-8",
    keys : {
        p256dh : "BMA+DnheoCy9bzFFirwuOE8bf+8TR7yiKVBqCadK2WasS3rGNI/iUwfoygfW23M37En3EtaxFYkJ3NfEQVe+L8k=",
        auth : "vmpuz9YSW6hQtBO843nP0g=="
    }
}
const options = {
    gcmAPIKey : "680183130582",
    TTL : 60
}
webPush.setVapidDetails('mailto:kirishima699@gmail.com',vapidKeys.publicKey,vapidKeys.privateKey)

let payloads = "selamat,push notification + subscription berhasil di gunakan"

webPush.sendNotification(
    subscription,
    payloads,
    options
)