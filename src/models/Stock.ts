export type NewStock={
      code:string,
      date:string,
      amount:number,
      unitPrice:number
}
export type StockApi={
    change:number,
    close:number,
    log:string
    market_cap:number,
    name:string,
    sector:string,
    stock:string,
    type:string,
    volume:number

}

export class MyStock {
    public id: number;
    public code: string;
    public unitPrice: number;
    public amount: number;
    public mediumPrice: number;
    public earnings: number;
    public value: number;
    public cost: number;

    public constructor(id: number, code: string, unitPrice: number, amount: number, mediumPrice: number, earnings: number) {
        this.id = id;
        this.code = code;
        this.unitPrice = unitPrice;
        this.amount = amount;
        this.value = this.unitPrice * amount;
        this.mediumPrice = mediumPrice;
        this.cost = this.mediumPrice * amount;
        this.earnings = earnings;
    }

    public AddNew(amount: number, unitPrice: number, oldCost: number, amountOld: number) {
        const buyCost = amount * unitPrice;
        const newCost = buyCost + oldCost;
        const newAmount = amount + amountOld;
        const average = newCost / newAmount;

        this.amount = newAmount;
        this.mediumPrice = average;
        this.cost = newCost;
    }
}
