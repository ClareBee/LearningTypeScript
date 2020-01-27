enum ProjectStatus
  {
    Active,
    Finished
  }

// we don't care about return value
type Listener = (items: Project[]) => void;
// custom type - using class so you can instantiate it
class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus){}
}

// project state management
class ProjectState {
  private listeners: Listener[] = [];
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor(){

  }

  static getInstance(){
    if(this.instance){
      return this.instance
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addListener(listenerFn: Listener){
    this.listeners.push(listenerFn);
  }
  addProject(title: string, description: string, numOfPeople: number) {
    console.log('wtf', title)
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    );
    this.projects.push(newProject);
    console.log('new', newProject, this.projects)
    for(const listenerFn of this.listeners){
      listenerFn(this.projects.slice()); // slice to create copy
    }
  }
}

// global constant = singleton ensures only one
const projState = ProjectState.getInstance();

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

// project list class

class ProjectList {
  // fields
  templateElement: HTMLTemplateElement; // available due to dom lib in tsconfig
  hostElement: HTMLDivElement;
  element: HTMLElement; // no section element available therefore generic
  assignedProjects: Project[];

// passing in private automatically creates property with name of parameter
  constructor(private type: 'active' | 'finished'){
    this.templateElement = document.getElementById('project-list')! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;
    this.assignedProjects = [];

    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = `${this.type}-projects`;

    projState.addListener((projects: Project[]) => {
      this.assignedProjects = projects;
      this.renderProjects();
    });
    this.attach();
    this.renderContent();
  }

  private renderProjects(){
    const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
    for(const proj of this.assignedProjects) {
      const listItem = document.createElement('li');
      console.log('hi', this.assignedProjects)
      listItem.textContent = proj.title;
      listEl.appendChild(listItem);
    }
  }

  private renderContent(){
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' Projects'
  }

  private attach(){
    // before closing tag of element
    this.hostElement.insertAdjacentElement('beforeend', this.element);
  }
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
      const [title, description, people] = userInput;
      console.log(userInput)
      projState.addProject(title, description, people);
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
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');
