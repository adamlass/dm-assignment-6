"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class State {
    constructor() {
        this.states = new Map();
    }
    equals(state) {
        let isEqual = true;
        this.states.forEach((set, key) => {
            const { states } = state;
            if (!states.has(key)) {
                isEqual = false;
            }
            const stateSet = state.getState(key);
            set.forEach(val => {
                if (!(stateSet === null || stateSet === void 0 ? void 0 : stateSet.has(val))) {
                    isEqual = false;
                }
            });
        });
        return isEqual;
    }
    union(state) {
        let copy = this.copyState(this);
        state.states.forEach((set, key) => {
            if (copy.states.has(key)) {
                set.forEach(val => {
                    var _a;
                    (_a = copy.states.get(key)) === null || _a === void 0 ? void 0 : _a.add(val);
                });
            }
            else {
                copy.addState(key, set);
            }
        });
        return copy;
    }
    intersection(state) {
        let res = new State();
        this.states.forEach((set, key) => {
            var _a;
            if (state.states.has(key)) {
                let resSet = new Set();
                (_a = this.getState(key)) === null || _a === void 0 ? void 0 : _a.forEach(val => {
                    var _a;
                    if ((_a = state.getState(key)) === null || _a === void 0 ? void 0 : _a.has(val)) {
                        resSet.add(val);
                    }
                });
                if (resSet.size !== 0) {
                    res.addState(key, resSet);
                }
            }
        });
        return res;
    }
    toString() {
        let res = "";
        this.states.forEach((set, key) => {
            set.forEach(val => res += `key: ${key}, val: ${val}\n`);
        });
        return res;
    }
    addState(key, set) {
        this.states.set(key, set);
    }
    getState(key) {
        return this.states.get(key);
    }
    // private getStates(): Map<string, Set<number>> {
    //     return this.states
    // }
    getSingleStateValue(key) {
        var _a;
        //TODO may need to implement an iterator??
        return (_a = this.getState(key)) === null || _a === void 0 ? void 0 : _a.entries().next().value;
    }
    copyState(state) {
        let copy = new State();
        return Object.assign(copy, state);
    }
}
exports.default = State;
//# sourceMappingURL=State.js.map