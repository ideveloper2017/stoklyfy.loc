import { useI18n } from "vue-i18n";
import common from "../../../../common/composable/common";


const fields=()=>{
    const { t } = useI18n();
    const { formatDate, formatAmountCurrency } = common();
    const paymentsHashableColumns = ['user_id'];


    const productColumns = [
        {
            title: t("warehouse.name"),
            dataIndex: "name",
            dbKey: "name",
        },
        {
            title: t("product.purchase_price"),
            dataIndex: "purchase_price",
            dbKey: "purchase_price",

        },     {
            title: t("product.sales_price"),
            dataIndex: "sales_price",
            dbKey: "sales_price",

        },
        {
            title: t("product.current_stock"),
            dataIndex: "current_stock",
            dbKey: "current_stock",
        }
    ];

    return {
        productColumns,
        paymentsHashableColumns,
    }
}

export default fields;
