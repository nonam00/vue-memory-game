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
  <div class="board">
    <button @click="shuffle">Start</button>
    <h1 v-if="guessed==8">You won</h1>
    <p v-if="guessed < 8">Guessed pairs: {{guessed}}</p>
    <div class="cards-container">
      <Card
          v-for="(value, key) in shuffled"
          :key="key"
          :card="value"
          :index="key"
          @open="handleOpen"
      />
    </div>
  </div>
</template>

<style scoped>
.board {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.cards-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  justify-items: center;
  align-items: center;
}
button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  color: white;
  transition: border-color 0.25s;
}
</style>
