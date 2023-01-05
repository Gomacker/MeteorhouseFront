import {ref} from "vue";
import axios from "axios";

export const loaded_table_id = ref('')

export const table_data = ref({})

export function table_change(st_id) {
    axios.get('/api/summary_table/' + st_id + '/data').then(r => {
        table_data.value = r.data
    })
    loaded_table_id.value = st_id
    console.log(st_id)
}
export function type_change(e, e1) {
    console.log(this.table_data.value['content'][e[0]]["data"]["elements"][e[1]])
    console.log(e1)
}