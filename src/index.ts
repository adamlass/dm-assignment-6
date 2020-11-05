import AbstractSyntaxTree from "./AbstractSyntaxTree";
import State from "./State";
import codeInts from "./codeInts"

const st1 = new State()
const s1: Set<number> = new Set()
s1.add(1)
s1.add(2)
s1.add(3)
st1.addState("x", s1)

const st2 = new State()
const s2: Set<number> = new Set()

s2.add(2)
s2.add(3)
s2.add(4)
st2.addState("x", s2)


// console.log("st1")
// console.log(st1.toString())
// console.log("st2")
// console.log(st2.toString())

// const stUnion: State = st1.union(st2)
// console.log("union:", stUnion.toString())

// const stInter: State = st1.intersection(st2)
// console.log("inter:", stInter.toString())

// console.log(st1.equals(st2))


const ints = new State()
const a: Set<number> = new Set()
const b: Set<number> = new Set()
const c: Set<number> = new Set()

a.add(2)
b.add(5)
c.add(7)

ints.addState("a", a)
ints.addState("b", b)
ints.addState("c", c)

const ast = new AbstractSyntaxTree(codeInts)

ast.buildTree()

const isEqual = ast.state?.equals(ints)

console.log('isEqual:', isEqual)