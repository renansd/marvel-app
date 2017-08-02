export class Event {
  total: number;
  results: {
    id: number;
    title: string;
    description: string;
    start: Date;
    end: Date;
    thumbnail: {
      path: string;
      extension: string;
    }
    characters: {
      items: any[];
    }
    next: {
      name: string;
    }
    previous: {
      name: string;
    }    
  }    

  constructor(total:number, id: number, name:string, description: string, start: Date, end: Date){
      this.results.id = id;
      this.results.title = name;
      this.results.description = description;
      this.results.start = start;
      this.results.end = end
  }
}