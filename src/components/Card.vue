<script setup lang="ts">
import {Card} from "../types";

const props = defineProps<{
  card: Card
  index: number
}>()
const emit = defineEmits<{
  (e: "open", index: number): void
}>()
const onClick = () => {
  if (!props.card.isFlipped) {
    return emit("open", props.index);
  }
}
</script>

<template>
  <div class="container">
    <div
        v-if="!(card.gone)"
        class="card"
        @click="onClick">
      <span v-if="card.isFlipped">
        {{card.id}}
      </span>
    </div>
  </div>
</template>

<style scoped>
  * {
    margin: 0;
    padding: 0;
  }
  .container {
    width: 5rem;
    height: 9rem;
    margin: 0.5rem;
  }
  .card {
    border: solid 1px white;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  span {
    color: white;
    font-size: 4rem;
  }
</style>