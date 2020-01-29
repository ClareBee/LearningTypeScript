// Base class using generic types & abstract type = can't be instantiated
export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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
