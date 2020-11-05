"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const State_1 = __importDefault(require("./State"));
const Node_1 = __importDefault(require("./Node"));
class AST {
    constructor(code) {
        this.code = code;
        this.state = null;
        this.root = null;
    }
    buildTree() {
        this.state = new State_1.default();
        let lastNode = null;
        const codeSplit = this.code.split(" ");
        for (let index = 0; index < codeSplit.length; index++) {
            const codePart = codeSplit[index];
            switch (codePart) {
                case "def":
                    // Checking name and type of def
                    const name = codeSplit[++index];
                    const type = codeSplit[++index];
                    // Checking opener i present
                    if (codeSplit[++index] !== "{") {
                        throw Error("Failed to build tree! Missing '{' to open statement.");
                    }
                    // Creating root
                    this.root = new Node_1.default(codePart, this.state);
                    // Creating name and type node
                    const nameNode = new Node_1.default(name, this.state);
                    const typeNode = new Node_1.default(type, this.state);
                    // Setting left nodes
                    this.root.leftNode = nameNode;
                    nameNode.leftNode = typeNode;
                    // Creating open node
                    const open = new Node_1.default(codeSplit[index], this.state);
                    lastNode = open;
                    this.root.rightNode = open;
                    break;
                case "let":
                    if (!lastNode) {
                        throw Error("Please declare a variable first!");
                    }
                    const base = new Node_1.default(codePart, this.state);
                    const lName = codeSplit[++index];
                    if (codeSplit[++index] !== "=") {
                        throw Error("Failed to build tree! Missing '=' in let declaration.");
                    }
                    const lValue = codeSplit[++index];
                    const letNameNode = new Node_1.default(lName, this.state);
                    const letValNode = new Node_1.default(lValue, this.state);
                    if (codePart[index + 1] === "+") {
                        const leftOperator = codePart[++index];
                        const rightOperator = codePart[++index];
                        const leftOperatorNode = new Node_1.default(leftOperator, this.state);
                        const rightOperatorNode = new Node_1.default(rightOperator, this.state);
                        letValNode.leftNode = leftOperatorNode;
                        leftOperatorNode.leftNode = rightOperatorNode;
                    }
                    lastNode.leftNode = base;
                    base.leftNode = letNameNode;
                    letNameNode.leftNode = letValNode;
                    lastNode = letValNode;
                    break;
                // default:
                //     throw Error("Failed to build tree!")
            }
        }
    }
}
exports.default = AST;
//# sourceMappingURL=AST.js.map