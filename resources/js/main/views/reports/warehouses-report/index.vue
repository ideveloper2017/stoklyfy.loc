<script>
import { useRouter } from "vue-router";
import {onBeforeMount} from "vue";
import common from "../../../../common/composable/common";
import AdminPageHeader from "../../../../common/layouts/AdminPageHeader.vue";
export default {
    components: {
        AdminPageHeader,
    },
    setup() {
        const { permsArray } = common();
        const router = useRouter();


        onBeforeMount(() => {
            if (
                !(
                    permsArray.value.includes("customers_view") ||
                    permsArray.value.includes("suppliers_view") ||
                    permsArray.value.includes("admin")
                )
            ) {
                router.push("admin.dashboard.index");
            }
        });
    }
}
</script>

<template>
    <AdminPageHeader>
        <template #header>
            <a-page-header :title="$t(`menu.cash_bank`)" class="p-0" />
        </template>
        <template #breadcrumb>
            <a-breadcrumb separator="-" style="font-size: 12px">
                <a-breadcrumb-item>
                    <router-link :to="{ name: 'admin.dashboard.index' }">
                        {{ $t(`menu.dashboard`) }}
                    </router-link>
                </a-breadcrumb-item>
                <a-breadcrumb-item>
                    {{ $t(`menu.cash_bank`) }}
                </a-breadcrumb-item>
            </a-breadcrumb>
        </template>
    </AdminPageHeader>
</template>

<style scoped>

</style>
