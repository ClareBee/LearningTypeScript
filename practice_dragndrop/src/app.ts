// autobind decorator
function autobind(_: any, _2: string, descriptor: PropertyDescriptor){
    const originalMethod = descriptor.value;
    const adjustedDescriptor: PropertyDescriptor = {
      configurable: true,
      get() {
        const boundFn = originalMethod.bind(this);
        return boundFn;
      }
    }
    return adjustedDescriptor;
}

// project input class

class ProjectInput {
  // fields
  templateElement: HTMLTemplateElement; // available due to dom lib in tsconfig
  hostElement: HTMLDivElement;
  form: HTMLFormElement;
  titleInput: HTMLInputElement;
  descriptionInput: HTMLInputElement;
  peopleInput: HTMLInputElement;

  constructor(){
    // ! to say it'll never be null and cast as type
    this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    const importedNode = document.importNode(this.templateElement.content, true);
    this.form = importedNode.firstElementChild as HTMLFormElement;
    this.form.id = 'user-input';

    this.titleInput = this.form.querySelector('#title')! as HTMLInputElement;
    this.descriptionInput = this.form.querySelector('#description')! as HTMLInputElement;
    this.peopleInput = this.form.querySelector('#people')! as HTMLInputElement;
    this.configure();
    this.attach();
  }

  private gatherUserInput():[string, string, number] | void {
    const enteredTitle = this.titleInput.value;
    const enteredDesc = this.descriptionInput.value;
    const enteredPeople = this.peopleInput.value;

    if(enteredTitle.trim().length === 0 ||
        enteredDesc.trim().length === 0 ||
        enteredPeople.trim().length === 0
      ){
        alert('invalid input - please try again')
        return;
      } else {
        return [enteredTitle, enteredDesc, +enteredPeople];
      }
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault(); // prevents http request
    const userInput = this.gatherUserInput()
    if(Array.isArray(userInput)) {
      const [title, description, people] = userInput
      console.log(title, description, people)
    }
  }
  private configure(){
    this.form.addEventListener('submit', this.submitHandler)
  }

  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.form);
  }
}

const newProjInput = new ProjectInput();
