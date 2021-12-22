<template>
  <div v-if="orderList.length" class="layout__content">
    <AppLayoutTitle>История заказов</AppLayoutTitle>

    <OrderItem v-for="order in orderList" :key="order.id" :order="order" />
  </div>
</template>

<script>
import AppLayoutTitle from "@/common/components/AppLayoutTitle";
import OrderItem from "@/modules/orders/OrderItem";
import { FETCH_MISC, FETCH_ORDERS } from "@/store/actions.types";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Orders",
  components: { OrderItem, AppLayoutTitle },
  computed: {
    ...mapGetters("Orders", {
      orderList: "getOrderList",
    }),

    ...mapGetters("Cart", {
      miscList: "getMisc",
    }),
  },
  async mounted() {
    await this.fetchOrders();

    if (!this.miscList.length) {
      await this.fetchMisc();
    }
  },
  methods: {
    ...mapActions("Orders", {
      fetchOrders: FETCH_ORDERS,
    }),
    ...mapActions("Cart", {
      fetchMisc: FETCH_MISC,
    }),
  },
};
</script>
