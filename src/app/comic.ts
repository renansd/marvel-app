export class Comic {
  total: number;
  results: {
    id: number;
    title: string;
    description: string;
    issueNumber: number;
    pageCount: number;
    thumbnail: {
      path: string;
      extension: string;
    }
    characters: {
      items: any[];
    }
  }    

  constructor(total:number, id: number, name:string, description: string){
      this.results.id = id;
      this.results.title = name;
      this.results.description = description;
  }
}