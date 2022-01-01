<template>
  <main class="content">
    <form
      action="#"
      method="post"
    >
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <BuilderDoughSelector />

        <BuilderSizeSelector />

        <BuilderIngredientsSelector />

        <BuilderPizzaView />
      </div>
    </form>
  </main>
</template>

<script>
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";

export default {
  name: "Index",
  components: {
    BuilderSizeSelector,
    BuilderPizzaView,
    BuilderIngredientsSelector,
    BuilderDoughSelector,
  },
};
</script>
