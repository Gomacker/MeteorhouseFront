import {reactive, ref} from "vue";
import axios from "axios";
import {ElMessage} from "element-plus";


export const loaded_table_id = ref('')

export const table_data = ref({value: {}})

// console.log('table_data')
// console.log(table_data)

// console.log(table_data)

export function table_change(st_id) {
    axios.post('/api/summary_table/' + st_id + '/data').then(r => {

        table_data.value = r.data
    })
    loaded_table_id.value = st_id
    console.log(st_id)
    console.log(table_data)
}
export function type_change(e, e1) {
    const tar = table_data.value['content'][e[0]]["data"]["elements"][e[1]]
    if (tar.type === 'Party' && !tar.data.hasOwnProperty('party')) {
        tar.data['party'] = {"party": {"union1": [0, 0, 0, 0], "union2": [0, 0, 0, 0], "union3": [0, 0, 0, 0]}}
    }
    console.log(e1)
}

export function save_table() {
    axios.post('/api/summary_table/' + loaded_table_id.value + '/save', {
        table_data: JSON.stringify(table_data.value)
    }).then(
        r => {
            console.log(r.data)
            if (r.data['result'] === 'success') {
                ElMessage.success('保存成功')
            }else {
                ElMessage.error('保存失败')
            }
        }
    ).catch(
        () => {
            ElMessage.error('保存失败(连接失败)')
        }
    )
}

function swap_array(arr, index1, index2) {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0]
    return arr
}
export function move_to_previous(arr, index) {
    // console.log(arr)
    // console.log()
    if (index !== 0) {

        return swap_array(arr, index, index - 1);
    }
    else return arr

}
export function move_to_next(arr, index) {
    // console.log(arr)
    if (index+1 !== arr.length) {

        return swap_array(arr, index, index + 1);
    }
    else return arr

}
