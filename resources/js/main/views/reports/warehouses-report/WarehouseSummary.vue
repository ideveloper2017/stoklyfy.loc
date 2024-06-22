<template>
    <a-row>
        <a-col :span="24">
<!--            <div v-if="!table.loading" class="table-responsive">-->
<!--                <a-table-->
<!--                    :columns="productColumns"-->
<!--                    :row-key="(record) => record.xid"-->
<!--                    :data-source="table.data"-->
<!--                    :pagination="table.pagination"-->
<!--                    :loading="table.loading"-->
<!--                    @change="handleTableChange"-->
<!--                    id="warehouse-reports-table"-->
<!--                    bordered-->
<!--                    size="middle"-->
<!--                >-->
<!--                    <template #bodyCell="{ column, record }">-->
<!--                        <template v-if="column.dataIndex === 'date'">-->
<!--                            {{ formatDate(record.date) }}-->
<!--                        </template>-->
<!--                        <template v-if="column.dataIndex === 'payment_type'">-->
<!--                            {{-->
<!--                                record.payment_type == "in"-->
<!--                                    ? $t("menu.payment_in")-->
<!--                                    : $t("menu.payment_out")-->
<!--                            }}-->
<!--                        </template>-->
<!--                        <template v-if="column.dataIndex === 'mode_type'">-->
<!--                            {{-->
<!--                                record.payment_mode && record.payment_mode.name-->
<!--                                    ? record.payment_mode.name-->
<!--                                    : "-"-->
<!--                            }}-->
<!--                        </template>-->
<!--                        <template v-if="column.dataIndex === 'user_id'">-->
<!--                            <UserInfo :user="record.user" />-->
<!--                        </template>-->
<!--                        <template v-if="column.dataIndex === 'amount'">-->
<!--                            {{ formatAmountCurrency(record.amount) }}-->
<!--                        </template>-->
<!--                    </template>-->
<!--                </a-table>-->
<!--            </div>-->
        </a-col>
    </a-row>
</template>

<script>
import { defineComponent, ref, onMounted, watch } from "vue";
import datatable from "../../../../common/composable/datatable";
import common from "../../../../common/composable/common";
import UserInfo from "../../../../common/components/user/UserInfo.vue";
import fields from "./fields";

export default defineComponent({
    props:{

    },
    setup(props) {
        const { productColumns, paymentsHashableColumns } = fields();
        const { formatDate, formatAmountCurrency, selectedWarehouse } = common();
        const datatableVariables = datatable();
        const reportData = ref([]);
        onMounted(() => {
            const propsData = props;
            getData(propsData);
        });

        const getData = (propsData) => {
            const filters = {};
            axiosAdmin.get('reports/warehouse-report',propsData).then((response)=>{
                console.log(response.data);
                reportData.value=response.data.products;
            })
            // datatableVariables.tableUrl.value = {
            //     url:
            //         "",
            //     filters,
            // }
            // datatableVariables.hashable.value = [...paymentsHashableColumns];
            // datatableVariables.table.sorter = { field: "date", order: "desc" };
            // datatableVariables.exportDetails.value = {
            //     allowExport: true,
            //     exportType: "payment_reports",
            // };
            //
            // datatableVariables.fetch({
            //     page: 1,
            // });
        }

        watch(props, (newVal, oldVal) => {
            getData(newVal);
        });

        watch(selectedWarehouse, (newVal, oldVal) => {
            getData(props);
        });


        return {
            productColumns,
            ...datatableVariables,
            reportData,
            formatDate,
            formatAmountCurrency,
        };
    }


});
</script>


<style scoped>

</style>
