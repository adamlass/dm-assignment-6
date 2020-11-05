import State from "./State";
import Node from "./Node"

export default class AST {
    private _state: State | null
    private root: Node | null

    constructor(private code: string) {
        this._state = null
        this.root = null
    }

    get state() {
        return this._state
    }

    set state(newState) {
        this._state = newState
    }

    public buildTree(): void {
        this.state = new State()
        let lastNode: Node | null = null

        const codeSplit = this.code.split(" ")

        for (let index = 0; index < codeSplit.length; index++) {

            const codePart = codeSplit[index]

            switch (codePart) {
                case "def":
                    // Checking name and type of def
                    const name: string = codeSplit[++index]
                    const type: string = codeSplit[++index]

                    // Checking opener i present
                    if (codeSplit[++index] !== "{") {
                        throw Error("Failed to build tree! Missing '{' to open statement.")
                    }

                    // Creating root
                    this.root = new Node(codePart, this.state)

                    // Creating name and type node
                    const nameNode = new Node(name, this.state)
                    const typeNode = new Node(type, this.state)

                    // Setting left nodes
                    this.root.leftNode = nameNode
                    nameNode.leftNode = typeNode

                    // Creating open node
                    const open: Node = new Node(codeSplit[index], this.state)
                    lastNode = open
                    this.root.rightNode = open
                    break

                case "let":
                    if (!lastNode) {
                        throw Error("Please declare a variable first!")
                    }

                    const base: Node = new Node(codePart, this.state)
                    const lName: string = codeSplit[++index]

                    if (codeSplit[++index] !== "=") {
                        throw Error("Failed to build tree! Missing '=' in let declaration.")
                    }

                    const lValue: string = codeSplit[++index]

                    const letNameNode: Node = new Node(lName, this.state)
                    const letValNode: Node = new Node(lValue, this.state)

                    if (codePart[index + 1] === "+") {
                        const leftOperator: string = codePart[++index]
                        const rightOperator: string = codePart[++index]

                        const leftOperatorNode: Node = new Node(leftOperator, this.state)
                        const rightOperatorNode: Node = new Node(rightOperator, this.state)

                        letValNode.leftNode = leftOperatorNode
                        leftOperatorNode.leftNode = rightOperatorNode
                    }

                    lastNode.leftNode = base
                    base.leftNode = letNameNode
                    letNameNode.leftNode = letValNode

                    lastNode = letValNode
                    break
            }
        }
    }



}