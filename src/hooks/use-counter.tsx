import { $, useComputed$, useSignal } from "@builder.io/qwik"

export const useCounter = ((init = 0) => {
    const counter = useSignal(init);

    const increase = $(() => {
        counter.value++;
    })

    const decrease = $(() => {
        counter.value--;
    })


    return {
        counter: useComputed$(() => counter.value),
        increase,
        decrease
    }
})