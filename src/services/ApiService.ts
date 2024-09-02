import axios from "axios";
import { NewStock } from "../models/Stock";

export function AddStock(stock:NewStock,userId:string){
    axios.post("https://localhost:7142/Stock",{
            "idUser": userId,
            "code": stock.code,
            "date": stock.date,
            "amount": stock.amount,
            "unitPrice": stock.unitPrice
    }).then((data)=>console.log(data)).catch((err)=>console.log(err))
}

export async function GetStocksOfUser(id:string){
   return await axios.get("https://localhost:7142/Stock",{
        params:{
            id:id
        }
    }).then((data)=>data.data)
}

export async function GetAllStocs(){
    return await axios.get("https://localhost:7142/Stock/All",{
     }).then((data)=>data.data)
 }