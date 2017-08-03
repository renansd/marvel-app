export class Character {

  total: number;
  results: {
    id: number;
    name: string;
    description: string;
    thumbnail: {
      path: string,
      extension: string;
    }
    series: {
      items: any[];
    }
  }

  constructor(total: number, id: number, name: string, description: string) {
    this.total = total;
    this.results.id = id;
    this.results.name = name;
    this.results.description = description;
  }
}