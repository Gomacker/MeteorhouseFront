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

export function del_event(event_id) {
    axios.post(
        '/api/del_event/',
        {
            event_id: event_id
        }
    ).then(r => {
        if (r.data.result === 'success') {
            ElMessage.success('删除成功')
            event_data.value = r.data.events
        }else {
            ElMessage.error('删除失败')
        }
    })
}

export function change_event(event_id, event) {
    axios.post(
        '/api/change_event/',
        {
            event_id: event_id,
            event: event,
        }
    ).then(r => {
        if (r.data.result === 'success') {
            ElMessage.success('修改成功')
            event_data.value = r.data.events
        }else {
            ElMessage.error('修改失败')
        }
    })
}