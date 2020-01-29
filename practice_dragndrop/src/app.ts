// drag and drop interfaces cf contract that classes 'sign'
interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
  dragOverHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
}


enum ProjectStatus
  {
    Active,
    Finished
  }

// we don't care about return value and input is generic
type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = [];
  addListener(listenerFn: Listener<T>){
    this.listeners.push(listenerFn);
  }
}
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
class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;
  private constructor(){
    super();
  }

  static getInstance(){
    if(this.instance){
      return this.instance
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, description: string, numOfPeople: number) {
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

// Base class using generic types & abstract type = can't be instantiated
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement; // available due to dom lib in tsconfig
  hostElement: T;
  element: U; // no section element available therefore generic
  constructor(
      templateId: string,
      hostElementId: string,
      insertAtStart: boolean,
      newElementId?: string
    ){
    this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId)! as T;
    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as U;
    if(newElementId){
      this.element.id = newElementId;
    }
    this.attach(insertAtStart);
  }
  // forces classes that inherit to include concrete implementation of these methods
  abstract configure(): void;
  abstract renderContent(): void;

  private attach(insertAtStart: boolean){
    this.hostElement.insertAdjacentElement(insertAtStart ? 'afterbegin' : 'beforeend', this.element);
  }
}

// project item class
class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
  private project: Project;

  get persons(){
    if (this.project.people === 1){
      return '1 person'
    }
    return `${this.project.people} persons`
  }

  constructor(hostId: string, project: Project){
    super('single-project', hostId, false, project.id);
    this.project = project;
    this.configure();
    this.renderContent();
  }
  @autobind
  dragStartHandler(event: DragEvent){
    console.log(event)
  }
  dragEndHandler(_: DragEvent){
    console.log('dragend');
  }
  configure(){
    this.element.addEventListener('dragstart', this.dragStartHandler)
    this.element.addEventListener('dragend', this.dragEndHandler)
  }
  renderContent(){
    this.element.querySelector('h2')!.textContent = this.project.title;
    this.element.querySelector('h3')!.textContent = this.persons + ' assigned';
    this.element.querySelector('p')!.textContent = this.project.description;
  }
}
// project list class

class ProjectList extends Component<HTMLDivElement, HTMLElement> {
  // fields
  assignedProjects: Project[];

// passing in private automatically creates property with name of parameter
  constructor(private type: 'active' | 'finished'){
    super('project-list', 'app', false, `${type}-projects`);
    this.assignedProjects = [];
    this.configure();
    this.renderContent();

  }
  configure() {
    projState.addListener((projects: Project[]) => {
      const filteredProjects = projects.filter(proj => {
        if(this.type === 'active') {
          console.log('hi there', this.type)
          return proj.status === ProjectStatus.Active;
        }
        return proj.status === ProjectStatus.Finished;
      });
      this.assignedProjects = filteredProjects;
      this.renderProjects();
    });
  }

  renderContent(){
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' Projects'
  }

  private renderProjects(){
    const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
    listEl.innerHTML = ''; // prevent appending doubles
    for(const proj of this.assignedProjects) {
        new ProjectItem(this.element.querySelector('ul')!.id, proj);
    }
  }
}


// project input class

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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
      console.log(userInput)
      projState.addProject(title, description, people);
    }
    this.clearInputs();
  }
}

const newProjInput = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');
