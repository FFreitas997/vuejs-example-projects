export class Coach {

  private _id: string
  private _firstName: string
  private _lastName: string
  private _areas: string[]
  private _description: string
  private _hourlyRate: number


  constructor(id: string, firstName: string, lastName: string, areas: string[], description: string, hourlyRate: number) {
    this._id = id;
    this._firstName = firstName;
    this._lastName = lastName;
    this._areas = areas;
    this._description = description;
    this._hourlyRate = hourlyRate;
  }


  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get areas(): string[] {
    return this._areas;
  }

  set areas(value: string[]) {
    this._areas = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get hourlyRate(): number {
    return this._hourlyRate;
  }

  set hourlyRate(value: number) {
    this._hourlyRate = value;
  }

  fullName(): string {
    return `${this._firstName} ${this._lastName}`
  }
}
