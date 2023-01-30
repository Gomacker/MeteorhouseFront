import {ref} from "vue";
import axios from "axios";
import {ElMessage} from "element-plus";

export const event_data = ref({})
export function get_event_data() {
    axios.post(
        '/api/event_data/'
    ).then(r => {
        console.log(r.data)
        event_data.value = r.data
    })
}

export function add_event(event) {
    axios.post(
        '/api/add_event/',
        {
            event: event
        }
    ).then(r => {
        if (r.data.result === 'success') {
            ElMessage.success('添加成功')
            event_data.value = r.data.events
        }else {
            ElMessage.error('添加失败')
        }
    })
}

export function del_event(event) {
    axios.post(
        '/api/add_event/',
        {
            event: event
        }
    ).then(r => {

    })
}