import { Project, ProjectStatus } from '../models/project';

// we don't care about return value and input is generic
type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = [];
  addListener(listenerFn: Listener<T>){
    this.listeners.push(listenerFn);
  }
}

// project state management
export class ProjectState extends State<Project> {
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
    this.updateListeners();
  }
  changeStatus(projectId: string, newStatus: ProjectStatus){
    const project = this.projects.find(proj => proj.id === projectId);
    if(project && project.status !== newStatus){
      project.status = newStatus;
      this.updateListeners()
    }
  }

  private updateListeners(){
    for(const listenerFn of this.listeners){
      listenerFn(this.projects.slice()); // slice to create copy
    }
  }
}

// global constant = singleton ensures only one
export const projState = ProjectState.getInstance();
