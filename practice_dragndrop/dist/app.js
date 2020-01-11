"use strict";
class ProjectInput {
    constructor() {
        // ! to say it'll never be null and cast as type
        this.templateElement = document.getElementById('project-input');
        this.hostElement = document.getElementById('app');
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.attach();
    }
    attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}
const newProjInput = new ProjectInput();
//# sourceMappingURL=app.js.map