export enum ProjectStatus
  {
    Active,
    Finished
  }
// custom type - using class so you can instantiate it
export class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus){}
}
