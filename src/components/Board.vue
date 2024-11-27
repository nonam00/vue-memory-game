<script setup lang="ts">
import {useCardsStore} from "../store";
import {storeToRefs} from "pinia";
import Card from "./Card.vue";
import {ref} from "vue";

const store = useCardsStore();
const { shuffled, guessed } = storeToRefs(store);
const { shuffle, flip, removePair } = store;
const firstSelectIndex = ref<number | null>(null);
const delayId = ref<number | null>(null);

const isPair = (index1: number, index2: number) => {
  return shuffled.value[index1].id === shuffled.value[index2].id;
}

const handleOpen = (index: number) => {
  console.log(delayId.value);
  if (delayId.value !== null) {
    return;
  }
  if (firstSelectIndex.value === null) {
    flip(index);
    firstSelectIndex.value = index;
  } else {
    flip(index);
    delayId.value = setTimeout(() => {
      if (isPair(firstSelectIndex.value!, index)) {
        removePair(firstSelectIndex.value!, index);
        firstSelectIndex.value = null;
        guessed.value += 1;
      } else {
        flip(firstSelectIndex.value!);
        flip(index);
        firstSelectIndex.value = null;
      }
      delayId.value = null;
    }, 2000);
  }
}
</script>

<template>
  <button @click="shuffle">Start</button>
  <h1 v-if="guessed==8">You won</h1>
  <p v-if="guessed < 8">Guessed pairs: {{guessed}}</p>
  <div class="board">
    <Card
        v-for="(value, key) in shuffled"
        :key="key"
        :card="value"
        :index="key"
        @open="handleOpen"
    />
  </div>
</template>

<style scoped>
.board {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
