export class Resource {

  private readonly _id: string;
  private readonly _title: string;
  private readonly _description: string;
  private readonly _url: string;


  constructor(id: string, title: string, description: string, url: string) {
    this._id = id;
    this._title = title;
    this._description = description;
    this._url = url;
  }


  get id(): string {
    return this._id;
  }
  get title(): string {
    return this._title;
  }

  get description(): string {
    return this._description;
  }

  get url(): string {
    return this._url;
  }
}
