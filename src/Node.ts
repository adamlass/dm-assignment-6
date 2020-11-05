import State from "./State"


export default class Node {
    public leftNode: Node | null
    public rightNode: Node | null

    constructor(
        public section: string,
        public state: State | null
    ) {
        this.leftNode = null
        this.rightNode = null
    }
}