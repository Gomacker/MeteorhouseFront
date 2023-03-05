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
        this.id = data.id
        // this.party = new Party(data.party)
        this.party = data.party
        // this.params = {}
        // this.params.replacements = {
        //     union1: [[], [], [], []],
        //     union2: [[], [], [], []],
        //     union3: [[], [], [], []],
        // }
        this.tags = data.hasOwnProperty('tags') ? data.tags : []
        this.title = data.hasOwnProperty('title') ? data.title : 'Invalid Title'
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

export function getUnitPicUrl(unit, awakened=false) {
    if (unit &&
        Object.hasOwn(unit, 'extraction_id')) {
        return '/assets/worldflipper/unit/square212x/' + (awakened ? 'awakened' : 'base') + '/' + unit['extraction_id'] + '.png'
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

export function format_content(content, icon_size=24) {
    let s = '<p>'
    s += content.replaceAll('\n', '</p><p>')
    s += '</p>'
    s = s.replaceAll('火属性', '<img style="width: ' + icon_size + 'px; vertical-align: bottom; margin: 0 2px;" src="/assets/worldflipper/icon/desc_fire.png" alt=""/>')
    s = s.replaceAll('水属性', '<img style="width: ' + icon_size + 'px; vertical-align: bottom; margin: 0 2px;" src="/assets/worldflipper/icon/desc_water.png" alt=""/>')
    s = s.replaceAll('雷属性', '<img style="width: ' + icon_size + 'px; vertical-align: bottom; margin: 0 2px;" src="/assets/worldflipper/icon/desc_thunder.png" alt=""/>')
    s = s.replaceAll('风属性', '<img style="width: ' + icon_size + 'px; vertical-align: bottom; margin: 0 2px;" src="/assets/worldflipper/icon/desc_wind.png" alt=""/>')
    s = s.replaceAll('風属性', '<img style="width: ' + icon_size + 'px; vertical-align: bottom; margin: 0 2px;" src="/assets/worldflipper/icon/desc_wind.png" alt=""/>')
    s = s.replaceAll('光属性', '<img style="width: ' + icon_size + 'px; vertical-align: bottom; margin: 0 2px;" src="/assets/worldflipper/icon/desc_light.png" alt=""/>')
    s = s.replaceAll('暗属性', '<img style="width: ' + icon_size + 'px; vertical-align: bottom; margin: 0 2px;" src="/assets/worldflipper/icon/desc_dark.png" alt=""/>')
    s = s.replaceAll('闇属性', '<img style="width: ' + icon_size + 'px; vertical-align: bottom; margin: 0 2px;" src="/assets/worldflipper/icon/desc_dark.png" alt=""/>')
    s = s.replaceAll('作为主要角色编成：', '<img style="width: ' + icon_size + 'px; vertical-align: bottom; margin: 0 2px;" src="/assets/worldflipper/icon/desc_main.png" alt=""/>')

    s = s.replaceAll('攻击力 +', '<span style="color: rgb(255, 128, 0)">攻击力</span> +')
    s = s.replaceAll('攻击力提升(', '<span style="color: rgb(255, 128, 0)">攻击力提升</span>(')
    s = s.replaceAll('技能伤害 +', '<span style="color: rgb(0, 128, 255)">技能伤害</span> +')
    s = s.replaceAll('技能伤害提升(', '<span style="color: rgb(0, 128, 255)">技能伤害提升</span>(')
    s = s.replaceAll('强化弹射伤害 +', '<span style="color: rgb(0,159,79)">强化弹射伤害</span> +')
    s = s.replaceAll('强化弹射伤害提升(', '<span style="color: rgb(0,159,79)">强化弹射伤害提升</span>(')
    s = s.replaceAll('直接攻击伤害 +', '<span style="color: rgb(169,45,255)">直接攻击伤害</span> +')
    s = s.replaceAll('直接攻击伤害提升(', '<span style="color: rgb(169,45,255)">直接攻击伤害提升</span>(')
    s = s.replaceAll('能力伤害 +', '<span style="color: rgb(255, 0, 128)">能力伤害</span> +')
    s = s.replaceAll('能力伤害提升(', '<span style="color: rgb(255, 0, 128)">能力伤害提升</span>(')
    return s
}