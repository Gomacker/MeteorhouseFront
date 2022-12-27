import axios from "axios";
import {ref} from "vue";

export const unit_data = ref({})
export const armament_data = ref({})

axios.get(
    // 'http://127.0.0.1:8000/unit_data',
    'api/unit_data/',
    {}
).then(res => {
    // unit_list.value = new Map(Object.entries(res.data))
    unit_data.value = res.data
    // console.log(unit_data.value)
})

axios.get(
    // 'http://127.0.0.1:8000/unit_data',
    'api/armament_data/',
    {}
).then(res => {
    armament_data.value = res.data
})

export const getUnitPicUrl = function (unit) {
    return 'http://127.0.0.1:8000/static/worldflipper/unit/square212x/base/' + unit['WfExId'] + '.png'
}