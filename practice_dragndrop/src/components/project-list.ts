import { DragTarget } from '../models/drag-drop.js';
import { Component } from './base-component.js';
import { autobind } from '../decorators/autobind.js';
import { projState } from '../state/project-state.js';
import { ProjectItem } from './project-item.js';
import { Project, ProjectStatus } from '../models/project.js';


export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
  // fields
  assignedProjects: Project[];

// passing in private automatically creates property with name of parameter
  constructor(private type: 'active' | 'finished'){
    super('project-list', 'app', false, `${type}-projects`);
    this.assignedProjects = [];
    this.configure();
    this.renderContent();

  }
  @autobind
  dragOverHandler(event: DragEvent){
    if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
      event.preventDefault(); // to allow drop
      const listEl = this.element.querySelector('ul')!
      listEl.classList.add('droppable');
    }

  }
  @autobind
  dropHandler(event: DragEvent){
    const projId = event.dataTransfer!.getData('text/plain');
    projState.changeStatus(projId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished);
  }
  @autobind
  dragLeaveHandler(_: DragEvent){
    const listEl = this.element.querySelector('ul')!
    listEl.classList.remove('droppable');
  }
  configure() {
    this.element.addEventListener('dragover', this.dragOverHandler);
    this.element.addEventListener('dragleave', this.dragLeaveHandler);
    this.element.addEventListener('drop', this.dropHandler);
    projState.addListener((projects: Project[]) => {
      const filteredProjects = projects.filter(proj => {
        if(this.type === 'active') {
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
