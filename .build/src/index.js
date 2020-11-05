"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AST_1 = __importDefault(require("./AST"));
const State_1 = __importDefault(require("./State"));
const codeInts_1 = __importDefault(require("./codeInts"));
const st1 = new State_1.default();
const s1 = new Set();
s1.add(1);
s1.add(2);
s1.add(3);
st1.addState("x", s1);
const st2 = new State_1.default();
const s2 = new Set();
s2.add(2);
s2.add(3);
s2.add(4);
st2.addState("x", s2);
console.log("st1");
console.log(st1.toString());
console.log("st2");
console.log(st2.toString());
// const stUnion: State = st1.union(st2)
// console.log("union:", stUnion.toString())
// const stInter: State = st1.intersection(st2)
// console.log("inter:", stInter.toString())
// console.log(st1.equals(st2))
const ints = new State_1.default();
const a = new Set();
const b = new Set();
const c = new Set();
a.add(2);
b.add(5);
c.add(7);
const ast = new AST_1.default(codeInts_1.default);
ast.buildTree();
//# sourceMappingURL=index.js.map