const config = {
    base_url: 'https://api.football-data.org/v2',
    token: '30af1e644c3d4632badb5cc9afbeccd2',
    liga_id: '2021',
    get endPoint() {
        return {
            base_url: this.base_url,
            klasemen: `${this.base_url}/competitions/${this.liga_id}/standings/`,
            tim: `${this.base_url}/teams/`,
            upComing: `${this.base_url}/competitions/${this.liga_id}/matches?status=SCHEDULED`,
            matchDetail: `${this.base_url}/matches`,
        }
    }
}

const {
    token,
    endPoint,
} = config

function fetchData(url) {
    return fetch(url, {
        method: "GET",
        headers: {
            'X-Auth-Token': token
        }
    })
}

async function getKlasemen() {
    try {
        if ('caches' in window) {
            let res = await caches.match(endPoint.klasemen)
            return await res.json()
        }
    } catch (error) {
        try {
            const res = await fetchData(endPoint.klasemen)
            return await res.json()
        } catch (error) {
            console.log(error);
        }
    }


}

async function getTeam(id) {
    try {
        if ('caches' in window) {
            let res = await caches.match(endPoint.tim + '/' + id)
            if (res !== undefined) {
                return await res.json()
            }
            throw 'err'
        }

    } catch (error) {
        try {
            const res = await fetchData(endPoint.tim + '/' + id)
            return await res.json()
        } catch (error) {
            console.log(error);
        }
    }
}

async function getMatchTeam(id, limit = 3) {
    try {
        if ('caches' in window) {
            let res = await caches.match(endPoint.base_url + `/teams/${id}/matches/?status=SCHEDULED${limit == 3 ? '&limit=3' : ''}`)
            return await res.json()
        }
    } catch (error) {
        try {
            const res = await fetchData(endPoint.base_url + `/teams/${id}/matches/?status=SCHEDULED${limit == 3 ? '&limit=3' : ''}`)
            return await res.json()
        } catch (error) {
            console.log(error);
        }
    }



}

async function getMatch(id) {
    if (id !== null) {
        return await getMatchTeam(id, false)
    } else {
        try {
            if ('caches' in window) {
                let res = await caches.match(endPoint.upComing)
                return await res.json()
            }
        } catch (error) {
            try {
                const res = await fetchData(endPoint.upComing)
                return await res.json()
            } catch (error) {
                console.log(error);
            }
        }
    }
}