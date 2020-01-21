// validation logic
interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
}

function validate(validatableInput: Validatable) {
  let isValid = true;
  if(validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }
  if(validatableInput.minLength != null &&
    typeof validatableInput.value === 'string') {
    isValid = isValid && validatableInput.value.trim().length > validatableInput.minLength;
  }
  // != includes null and undefined!
  if(validatableInput.maxLength != null &&
    typeof validatableInput.value === 'string') {
    isValid = isValid && validatableInput.value.trim().length < validatableInput.maxLength;
  }

  if(validatableInput.minValue != null &&
    typeof validatableInput.value === 'number'){
    isValid = isValid && validatableInput.value > validatableInput.minValue;
  }
  if(validatableInput.maxValue != null &&
    typeof validatableInput.value === 'number'){
    isValid = isValid && validatableInput.value <= validatableInput.maxValue;
  }
  return isValid
}

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

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true
    }
    const descriptionValidatable: Validatable = {
      value: enteredDesc,
      required: true,
      minLength: 5
    }
    const peopleValidatable: Validatable = {
      value: +enteredPeople,
      required: true,
      minValue: 1,
      maxValue: 5
    }
    if(
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
      ){
        alert('invalid input - please try again')
        return;
      } else {
        return [enteredTitle, enteredDesc, +enteredPeople];
      }
  }

  private clearInputs() {
    this.titleInput.value = '';
    this.descriptionInput.value = '';
    this.peopleInput.value = '';
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault(); // prevents http request
    const userInput = this.gatherUserInput()
    if(Array.isArray(userInput)) {
      const [title, description, people] = userInput
      console.log(title, description, people)
    }
    this.clearInputs();
  }
  private configure(){
    this.form.addEventListener('submit', this.submitHandler)
  }

  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.form);
  }
}

const newProjInput = new ProjectInput();
