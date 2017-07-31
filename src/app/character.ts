export class Character {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    path: string,
    extension: string;
  }

  constructor(id: number, name: string, description: string){
      this.id = id;
      this.name = name;
      this.description = description;
  }
}