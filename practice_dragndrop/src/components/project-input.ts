import { Component } from './base-component';
import { Validatable, validate} from '../utils/validation';
import { autobind } from '../decorators/autobind';
import { projState } from '../state/project-state';

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  // fields specific to here
  titleInput: HTMLInputElement;
  descriptionInput: HTMLInputElement;
  peopleInput: HTMLInputElement;

  constructor(){
    super('project-input', 'app', true, 'user-input')
    this.titleInput = this.element.querySelector('#title')! as HTMLInputElement;
    this.descriptionInput = this.element.querySelector('#description')! as HTMLInputElement;
    this.peopleInput = this.element.querySelector('#people')! as HTMLInputElement;
    this.configure();
  }
  configure(){
    this.element.addEventListener('submit', this.submitHandler)
  }
  renderContent(){}

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
      const [title, description, people] = userInput;
      projState.addProject(title, description, people);
    }
    this.clearInputs();
  }
}
