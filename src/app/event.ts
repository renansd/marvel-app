export class Event {
  total: number;
  results: {
    id: number;
    title: string;
    description: string;
    thumbnail: {
      path: string;
      extension: string;
    }
  }    

  constructor(total:number, id: number, name:string, description: string){
      this.results.id = id;
      this.results.title = name;
      this.results.description = description;
  }
}