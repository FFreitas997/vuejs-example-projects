export default {
    increment(context) {
        setTimeout(function () {
            context.commit('increment');
        }, 2000);
    },
    increase(context, payload) {
        setTimeout(function () {
            context.commit('increase', payload);
        }, 2000);
    },
    decrement(context) {
        setTimeout(function () {
            context.commit('decrement');
        }, 2000);
    },
    decrease(context, payload) {
        setTimeout(function () {
            context.commit('decrease', payload);
        }, 2000);
    },
}