import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

export const locService = {
    query,
    get,
    remove,
    save,
    getLocs,
    createLocation,
}

const LOC_KEY = 'locDB'

function _createDemoLocs() {
    const locs = [
        { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
        { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
    ]
    locs = locs.map((loc) => {
        loc = createLocation({ lat, lng }, loc.name)
        return loc
    })

    utilService.saveToStorage(LOC_KEY, locs)
}
function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 2000)
    })
}

function query() {
    return storageService.query(LOC_KEY)
        .then(locs => {
            if (gFilterBy.txt) {
                const regex = new RegExp(gFilterBy.txt, 'i')
                locs = locs.filter(loc => regex.test(loc.name))
            }
            if (gFilterBy.minScore) {
                locs = locs.filter(loc => loc.score >= gFilterBy.minScore)
            }
            return locs
        })
}

function get(locId) {
    return storageService.get(LOC_KEY, locId)
}

function remove(locId) {
    return storageService.remove(LOC_KEY, locId)
}

function save(loc) {
    if (loc.id) {
        return storageService.put(LOC_KEY, loc)
    } else {
        return storageService.post(LOC_KEY, loc)
    }
}

function _createLocations() {
    let locs = utilService.loadFromStorage(LOC_KEY)
    if (!locs || !locs.length) {
        _createDemoLocs()
    }
}



function createLocation(lat, lng, name = 'New Place') {
    const loc = {}
    // loc.id = storageService._makeId()
    loc.name = name
    loc.lat = lat
    loc.lng = lng
    loc.weather = 0
    // loc.createdAt = Date.now()
    // loc.updatedAt = save(loc)
    console.log('loc', loc)
    storageService.post(LOC_KEY, loc)
    return loc
}
