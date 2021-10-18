<template>
  <div class="layout__content">
    <AppLayoutTitle>История заказов</AppLayoutTitle>

    <OrderItem v-for="order in orderList" :key="order.id" :order="order" />
  </div>
</template>

<script>
import AppLayoutTitle from "@/common/components/AppLayoutTitle";
import OrderItem from "@/modules/orders/OrderItem";
import { FETCH_ORDERS } from "@/store/actions.types";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Orders",
  components: { OrderItem, AppLayoutTitle },
  computed: {
    ...mapGetters("Orders", {
      orderList: "getOrderList",
    }),
  },
  mounted() {
    this.fetchOrders();
  },
  methods: {
    ...mapActions("Orders", {
      fetchOrders: FETCH_ORDERS,
    }),
  },
};
</script>
