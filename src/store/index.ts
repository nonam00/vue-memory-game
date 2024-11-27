import {defineStore} from "pinia";
import {Card} from "../types";

interface State {
    shuffled: Card[],
    guessed: number;
}

const cards = () => {
    const list: Card[] = [];
    for(let i = 1; i<=16; i++) {
        list.push({
            id: i <= 8 ? i : i - 8,
            isFlipped: false,
            gone: false
        })
    }
    return list;
}

export const useCardsStore = defineStore("cards", {
    state: (): State => {
        return {
            shuffled: [],
            guessed: 0
        }
    },
    actions: {
        shuffle() {
            this.$patch((state) => {
                const array: Card[] = cards();
                let currentIndex = 16;
                while(currentIndex != 0) {
                    let randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex--;
                    [array[currentIndex], array[randomIndex]] = [
                        array[randomIndex], array[currentIndex]];
                }
                state.guessed = 0;
                state.shuffled = array;

            })
        },
        flip(index: number) {
            this.$patch((state) => {
                state.shuffled[index].isFlipped = !state.shuffled[index].isFlipped;
            })
        },
        removePair(index1: number, index2: number) {
            this.$patch((state) => {
                state.shuffled[index1].gone = true;
                state.shuffled[index2].gone = true;
            })
        }
    }
})