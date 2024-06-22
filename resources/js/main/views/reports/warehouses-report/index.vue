<template>
    <AdminPageHeader>
        <template #header>
            <a-page-header :title="$t(`menu.warehouses-report`)" class="p-0" />
        </template>
        <template #breadcrumb>
            <a-breadcrumb separator="-" style="font-size: 12px">
                <a-breadcrumb-item>
                    <router-link :to="{ name: 'admin.dashboard.index' }">
                        {{ $t(`menu.dashboard`) }}
                    </router-link>
                </a-breadcrumb-item>
                <a-breadcrumb-item>
                    {{ $t(`menu.warehouses-report`) }}
                </a-breadcrumb-item>
            </a-breadcrumb>
        </template>
    </AdminPageHeader>

    <admin-page-filters>
        <a-row :gutter="[16, 16]" justify="end">
            <a-col :xs="24" :sm="24" :md="12" :lg="6" :xl="4">
                <DateRangePicker
                    @dateTimeChanged="
                        (changedDateTime) => {
                            filters.dates = changedDateTime;
                        }
                    "
                />
            </a-col>
            <a-col :span="24">

            </a-col>
        </a-row>
    </admin-page-filters>
    <admin-page-table-content>

        <WarehouseSummary/>
    </admin-page-table-content>
</template>

<script>
import { useRouter } from "vue-router";
import {defineComponent, onBeforeMount, reactive} from "vue";
import common from "../../../../common/composable/common";
import AdminPageHeader from "../../../../common/layouts/AdminPageHeader.vue";
import DateRangePicker from "../../../../common/components/common/calendar/DateRangePicker.vue";
import WarehouseSummary from "./WarehouseSummary.vue";
export default defineComponent({
    components: {
        WarehouseSummary,
        DateRangePicker,
        AdminPageHeader,

    },
    setup() {
        const { permsArray } = common();
        const router = useRouter();
        const filters = reactive({
            dates: [],
        });

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
        return {
             filters,
        };
    }
});
</script>

<style scoped>

</style>
