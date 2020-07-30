export class Adapter {
  private id: string;
  constructor(id: string) {
    this.id = id;
    console.log('Adapter created:', this.id);
  }
}
