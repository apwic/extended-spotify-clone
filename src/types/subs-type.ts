export interface ISubs {
  creatorId: number,
  creatorName?: string,
  subscriberId: number,
  subscriberName?: string,
  status: string,
}

export interface ISubsList {
  subscription: Array<ISubs>;
}