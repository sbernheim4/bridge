export function compose(...funcs: Function[]) {
    const newFuncs = funcs.reverse();

    const length = newFuncs ? newFuncs.length : 0
    let index = length

    while (index--) {
        if (typeof newFuncs[index] !== 'function') {
            throw new TypeError('Expected a function')
        }
    }

	// eslint-disable-next-line
	// @ts-ignore
	// eslint-disable-next-line
    return function(...args: any[]) {
        let index = 0
        let result = length ? newFuncs[index].apply(this, args) : args[0]
        while (++index < length) {
            result = newFuncs[index].call(this, result)
        }
        return result
    }
}

