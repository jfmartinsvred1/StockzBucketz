import axios from "axios";
import { CreateMonthlyRecord, CreateTransaction } from "../models/types";


export async function AddStock(transaction:CreateTransaction){
    await axios.post("http://localhost:5053/Portfolio/AddStock",{
            "portfolioId": transaction.PortfolioId,
            "type":transaction.Type,
            "code": transaction.Code,
            "date": transaction.Date,
            "amount": transaction.Amount,
            "unitPrice": transaction.UnitPrice
    }).then(()=>{
    }
    )
    .catch(
        (err)=>console.log(err)
    )
}

export async function AddMonthlyRecord(monthlyRecord:CreateMonthlyRecord){
    await axios.post("http://localhost:5053/Portfolio/AddMonthlyRecord",{
            "portfolioId": monthlyRecord.portfolioId,
            "date": monthlyRecord.date,
            "value":monthlyRecord.value
    }).then(()=>{
    }
    )
    .catch(
        (err)=>console.log(err)
    )
}

export async function GetPortfolio(id:string){

   return await axios.get("http://localhost:5053/Portfolio",{
        params:{
            userId:id
        }
    }).then((data)=>data.data)
}
export async function CreatePortfolio(id:string){

    return await axios.post("http://localhost:5053/Portfolio",{
         "portfolioId": id,
     }).then((data)=>data.data)
 }

export async function GetAllStocs(){
    return await axios.get("http://localhost:5053/Portfolio/AllStocks",{
     }).then((data)=>data.data)
 }

 export async function DeleteStock(id:number){
    return await axios.delete("http://localhost:5053/Stock",{
        params:{
            id:id
        }
     }).then((data)=>data.data).catch((err)=>console.log(err))
 }