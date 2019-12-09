
// service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('./serviceWorker.js').then(function () {
            console.log('serviceWorker: pendaftaran berhasil')
        }).catch(function () {
            console.log('sarviceWorker: pendaftaran gagal');
        })
    })
} else {
    console.log('serviseWorker: browser tidak mendukung serviceWorker');
}

// notification API
if ('Notification' in window) {
    Notification.requestPermission().then( perm => {
        if (perm == 'denied') {
            return
        }else if(perm == 'default'){
            return
        }
    })
}

// push notification API
if ('PushManager' in window) {
    navigator.serviceWorker.getRegistration().then( regis => {
        regis.pushManager.subscribe({
            userVisibleOnly : true,
            applicationServerKey : urlBase64ToUint8Array("BOXHvLqtqkbrE_vi6IcirRv9U3z5rhLNUG15CTuCMZElFZLKjPU4hXyG77qZNWe9zQzVBRZv_snB0vqWAxZovFY")
        }).then(subscribe=>{
            console.log('berhasil melakukan subscribe dengan endpoin : ',subscribe.endpoint);
            console.log('berhasil melakukan subscribe dengan p265dh key : ',btoa(String.fromCharCode.apply(null,new Uint8Array(subscribe.getKey('p256dh')))));
            console.log('berhasil melakukan subscribe dengan auth key : ',btoa(String.fromCharCode.apply(null,new Uint8Array(subscribe.getKey('auth')))));
        }).catch( err => {
            console.log('subscribetion error : ' +err.message)
        })
    }).catch(e => {
        console.log('push manager error : '+ e);
    })
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}