class ProjectInput {
  // fields
  templateElement: HTMLTemplateElement; // available due to dom lib in tsconfig
  hostElement: HTMLDivElement;
  element: HTMLFormElement;

  constructor(){
    // ! to say it'll never be null and cast as type
    this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.attach();
  }

  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

const newProjInput = new ProjectInput();
