import {ref} from "vue";

export const is_login = ref(false)
export const user_name = ref('')
export const user_avatar = ref('')
export const permissions = ref({
    summary_table_editor: false,
    resource_manager: false
})
