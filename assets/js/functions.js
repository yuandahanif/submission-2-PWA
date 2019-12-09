window.addEventListener('DOMContentLoaded', function () {
    const sNav = document.querySelector('.sidenav')
    const dropdown = document.querySelectorAll('.dropdown-trigger')
    const preload = document.querySelector('.preloader-background')
    const mainDisplay = document.querySelector('#main-display')
    M.Sidenav.init(sNav)
    M.Dropdown.init(dropdown, {
        over: true,
        belowOrigin: true,
        alignment: 'right'
    })
    // preloaded
    preload.classList.add('fade-out')

})
// init the collapsable
function initCollapsable() {
    const collaps = document.querySelectorAll('.collapsible')
    M.Collapsible.init(collaps)
}

function loadNav() {
    const xhttpNav = new XMLHttpRequest()

    xhttpNav.onreadystatechange = function () {
        if (xhttpNav.readyState == 4) {
            if (xhttpNav.status != 200) return;
            document.querySelector('.topnav').innerHTML = xhttpNav.responseText
            document.querySelector('.mobilenav').innerHTML = xhttpNav.responseText

            document.querySelectorAll('.sidenav a ,.topnav a').forEach(e => {
                e.addEventListener('click', click => {
                    // Tutup sidenav
                    let sidenav = document.querySelector(".sidenav")
                    M.Sidenav.getInstance(sidenav).close()

                    // click.preventDefault()
                    let page = click.target.getAttribute('href').substr(1)
                    if (page != '!') {
                        route(page)
                    }
                })
            })
        }
    }
    xhttpNav.open('GET', 'assets/shell/nav-shell.html')
    xhttpNav.send()
}

function loadPage(page) {
    const xhttpPage = new XMLHttpRequest()
    xhttpPage.open('GET', `page/${page}.html`, true)
    xhttpPage.send()
    return new Promise((resolve, reject) => {
        xhttpPage.onreadystatechange = function () {

            if (xhttpPage.readyState == 4) {
                const dPage = document.querySelector('#main-display')
                if (xhttpPage.status == 200) {
                    dPage.innerHTML = xhttpPage.responseText
                    resolve(page)
                } else if (xhttpPage.status == 404) {
                    dPage.innerHTML = '<h2>maaf halaman yang anda tuju tidak ditemukan</h2>'
                    reject(new Error('http.status : 404 || file not found'))
                } else {
                    dPage.innerHTML = '<h2>maaf halaman yag anda tuju tidak dapat di akses</h2>'
                    reject(new Error(`error http.status : ${xhttpPage.status}`))
                }
            }

        }
    })
}

/**
 * 
 * @param {String} url start with #
 */

function parseUrl(url) {
    let page, queryString, arr = [],
        queryObj = {}
    // url = url !== null ? url : new URL(window.location.href.replace('#',''))
    if (url != null) {
        url = url.indexOf('#') > -1 ? url.replace('#', '') : url
        page = url
        if (url.indexOf('?') > -1) {
            url = url.split('?')
            page = url[0]

            if (url[1].indexOf('&') > -1) {
                arr = url[1].split('&')
                arr.forEach(v => {
                    let subQuery = v.split('=')
                    if (subQuery[1]) {
                        queryObj[subQuery[0]] = subQuery[1]
                    } else {
                        queryObj[subQuery[0]] = true
                    }
                })
            } else {
                page = url[0]

                subQuery = url[1].indexOf('=') > -1 ? url[1].split('=') : url[1]
                if (Array.isArray(subQuery) && subQuery[1] != undefined) {
                    queryObj[subQuery[0]] = subQuery[1]
                } else {
                    queryObj[subQuery] = true
                }
            }
        } else {
            queryObj['noQuery'] = true
        }
    } else {
        page = window.location.hash != '' ? window.location.hash.split('?')[0].substr(1) : 'home'
        queryString = window.location.hash.indexOf('?') > -1 ? window.location.hash.split('?')[1] : false
        if (queryString !== false && queryString.indexOf('&') > -1) {
            arr = queryString.split('&')
            arr.forEach(v => {
                let subQuery = v.split('=')
                if (subQuery[1] != undefined) {
                    queryObj[subQuery[0]] = subQuery[1]
                } else {
                    queryObj[subQuery[0]] = true
                }
            })
        } else {
            subQuery = queryString !== false ? queryString.split('=') : false
            if (subQuery !== false && subQuery[1] != undefined) {
                queryObj[subQuery[0]] = subQuery[1]
            } else if (subQuery === false) {
                queryObj['noQuery'] = true
            } else {
                queryObj[subQuery[0]] = true
            }
        }
    }

    return new Promise((resolve, reject) => {
        if (page != undefined && Object.keys(queryObj).length != 0) {
            resolve({
                page,
                query: queryObj
            })
        } else {
            reject(new Error('url did\'nt match the requirement : ' + url))
        }

    })
}