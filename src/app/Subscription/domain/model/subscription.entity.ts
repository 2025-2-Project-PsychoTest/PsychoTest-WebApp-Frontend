import {BaseEntity} from '../../../shared/infrastructure/base-entity';

export class Subscription implements BaseEntity {
  private _id: number;
  private _userId: number;
  private _planId: number;
  private _startDate: Date;
  private _endDate?: Date;
  private _isActive: boolean;

  constructor(subscription: {
    id: number;
    userId: number;
    planId: number;
    startDate: Date;
    endDate?: Date;
    isActive: boolean;
  }) {
    this._id = subscription.id;
    this._userId = subscription.userId;
    this._planId = subscription.planId;
    this._startDate = subscription.startDate;
    this._endDate = subscription.endDate;
    this._isActive = subscription.isActive;
  }

  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }

  get userId(): number {
    return this._userId;
  }
  set userId(value: number) {
    this._userId = value;
  }

  get planId(): number {
    return this._planId;
  }
  set planId(value: number) {
    this._planId = value;
  }

  get startDate(): Date {
    return this._startDate;
  }
  set startDate(value: Date) {
    this._startDate = value;
  }

  get endDate(): Date | undefined {
    return this._endDate;
  }
  set endDate(value: Date | undefined) {
    this._endDate = value;
  }

  get isActive(): boolean {
    return this._isActive;
  }
  set isActive(value: boolean) {
    this._isActive = value;
  }
}
