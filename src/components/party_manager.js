import axios from "axios";
import {ref} from "vue";


export const unit_data = ref({})
export const armament_data = ref({})

class Party {
    constructor(data) {
        this.union1 = data.union1
        this.union2 = data.union2
        this.union3 = data.union3
    }
}

export class Unit {
    constructor(id_) {
        this.ud = unit_data[id_]
    }
    res_path(res_group='square212x/base/', awaken=false) {

        return '/assets/worldflipper/unit/' + res_group + '.png'
    }
}


export class PartyRelease {
    constructor(data) {
        this.party = new Party(data.party)
        this.replacements = {
            union1: [],
            union2: [],
            union3: [],
        }
    }
    set_party(pos, id) {
        this.party[pos[0]][pos[1]] = id
    }
    dump() {
        const params = {}
        if (this.replacements.union1 && this.replacements.union2 && this.replacements.union3) {

        }
        return JSON.stringify(
            {
                party: this.party,
                params: params
            }
        )
    }
}

axios.post(
    // 'http://127.0.0.1:8000/unit_data',
    '/api/unit_data/',
    {}
).then(res => {
    // unit_list.value = new Map(Object.entries(res.data))
    unit_data.value = res.data
    // console.log(unit_data.value)
})

axios.post(
    // 'http://127.0.0.1:8000/unit_data',
    '/api/armament_data/',
    {}
).then(res => {
    armament_data.value = res.data
})

export function getUnitPicUrl(unit) {
    if (unit &&
        Object.hasOwn(unit, 'extraction_id')) {
        return '/assets/worldflipper/unit/square212x/base/' + unit['extraction_id'] + '.png'
    }else {
        return '/assets/worldflipper/unit/blank.png'
    }
}

export function getArmamentPicUrl(armament) {
    // console.log(armament, armament.hasOwnProperty('WfExId'))
    if (armament &&
        Object.hasOwn(armament, 'WfExId')) {
        return '/assets/worldflipper/generated/armament/normal/' + armament['WfExId'] + '.png'
    }else {
        return '/assets/worldflipper/unit/blank.png'
    }
}

export function getArmamentCorePicUrl(armament) {
    // console.log(armament, armament.hasOwnProperty('WfExId'))
    if (armament &&
        Object.hasOwn(armament, 'WfExId')) {
        return '/assets/worldflipper/generated/armament/core/' + armament['WfExId'] + '.png'
    }else {
        return '/assets/worldflipper/unit/blank.png'
    }
}

export function getElementCss(id_) {
    if(id_ === 0) return 'fire'
    else if(id_ === 1) return 'water'
    else if(id_ === 2) return 'thunder'
    else if(id_ === 3) return 'wind'
    else if(id_ === 4) return 'light'
    else if(id_ === 5) return 'dark'
    else return 'none'
}