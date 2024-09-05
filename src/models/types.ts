export type CreateTransaction={
    PortfolioId:string,
    Type:string,
    Code:string,
    Date:string,
    Amount:number,
    UnitPrice:number
}
export type ReadTransaction={
    IdTransaction:number
    PortfolioId:string,
    Type:string,
    Code:string,
    Date:string,
    Amount:number,
    UnitPrice:number
}
export type StockBrapi={
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
export type ReadStock={
    id:number,
    portfolioId:string,
    unitPrice:number,
    code:string,
    amount:number,
    value:number,
    cost:number,
    mediumPrice:number,
    earnings:number
}
export type ReadMonthlyRecord={
    id:number,
    monthly:number,
    year:number,
    value:number
}
export type Portfolio ={
    transactions:ReadTransaction[],
    stocks:ReadStock[]
    profitability:number,
    patrimony:number,
    acquisitionCost:number,
    accumulatedEarnings:number,
    profit:number
    monthlyRecords:ReadMonthlyRecord[]
}

export type CreateMonthlyRecord={
    portfolioId:string,
    date:string,
    value:number
}
