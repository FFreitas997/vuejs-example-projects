export class Request {

  private _id: string;
  private _coachId: string;
  private _userEmail: string;
  private _message: string;

  constructor(id: string, coachId: string, userEmail: string, message: string) {
    this._id = id;
    this._coachId = coachId;
    this._userEmail = userEmail;
    this._message = message;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get coachId(): string {
    return this._coachId;
  }

  set coachId(value: string) {
    this._coachId = value;
  }

  get userEmail(): string {
    return this._userEmail;
  }

  set userEmail(value: string) {
    this._userEmail = value;
  }

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }
}
