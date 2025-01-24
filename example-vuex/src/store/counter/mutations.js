export default  {
    increment(state) {
        state.counter++;
    },
    increase(state, payload) {
        state.counter += payload.value;
    },
    decrement(state) {
        state.counter--;
    },
    decrease(state, payload) {
        state.counter -= payload.value;
    },
}