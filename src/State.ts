
export default class State {
    private states: Map<string, Set<number>>

    constructor() {
        this.states = new Map()
    }

    public equals(state: State) {
        let isEqual = true
        this.states.forEach((set, key) => {
            const { states } = state
            if (!states.has(key)) {
                isEqual = false
            }

            const stateSet = state.getState(key)
            set.forEach(val => {
                if (!stateSet?.has(val)) {
                    isEqual = false
                }
            })

        })
        return isEqual
    }

    public union(state: State): State {
        let copy: State = this.copyState(this)

        state.states.forEach((set, key) => {
            if (copy.states.has(key)) {
                set.forEach(val => {
                    copy.states.get(key)?.add(val)
                })
            } else {
                copy.addState(key, set)
            }
        })

        return copy
    }

    public intersection(state: State) {
        let res: State = new State()

        this.states.forEach((set, key) => {
            if (state.states.has(key)) {
                let resSet: Set<number> = new Set()
                this.getState(key)?.forEach(val => {
                    if (state.getState(key)?.has(val)) {
                        resSet.add(val)
                    }
                })
                if (resSet.size !== 0) {
                    res.addState(key, resSet)
                }
            }
        })
        return res
    }

    public toString(): string {
        let res: string = ""
        this.states.forEach((set, key) => {
            set.forEach(val => res += `key: ${key}, val: ${val}\n`)
        })
        return res
    }

    public addState(key: string, set: Set<number>): void {
        this.states.set(key, set)
    }

    private getState(key: string): Set<number> | undefined {
        return this.states.get(key)
    }

    private copyState(state: State): State {
        let copy: State = new State()
        return Object.assign(copy, state)
    }

}