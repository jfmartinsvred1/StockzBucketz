import { useState } from 'react';
import './registerStock.css';
import { CreateMonthlyRecord, CreateTransaction, StockBrapi } from '../../models/types';
import { AddMonthlyRecord, AddStock } from '../../services/ApiService';

type RegisterStockProps = {
  stocksClient:StockBrapi[];
  returnToMyStocks:()=>void;
  userId:any
  updateStocks:()=>void
};

const RegisterStock= ({userId, stocksClient, returnToMyStocks,updateStocks }:RegisterStockProps) => {

  const [form,setForm]=useState({
    code:{
      value:"",
      hasChanged:false
    },
    date:{
      value:"",
      hasChanged:false,
    },
    amount:{
      value:"",
      hasChanged:false
    },
    unitPrice:{
      value:"",
      hasChanged:false
    }
  }
  )

   async function register(){
    const newBuyTransaction:CreateTransaction={
      PortfolioId:userId,
      Type:"buy",
      Code:form.code.value,
      Date:form.date.value,
      Amount:Number(form.amount.value),
      UnitPrice:Number(form.unitPrice.value)
    }
    const newMonthlyRecord:CreateMonthlyRecord={
      portfolioId:userId,
      date:form.date.value,
      value:(Number(form.amount.value)*(Number(form.unitPrice.value)))
    }
    await AddStock(newBuyTransaction);
    await AddMonthlyRecord(newMonthlyRecord);
    updateStocks()
    returnToMyStocks()
  }



  return (
    <div onClick={(e)=>returnToMyStocks()} className="newStock d-flex align-items-center justify-content-center">
      <div className="bg-white p-5 rounded" onClick={(e)=>e.stopPropagation()}>
        <label htmlFor="exampleDataList" className="form-label text-secondary">Digite o código do ativo que queira cadastrar</label>
        <input
          max={5}
          size={5}
          className="form-control"
          list="datalistOptions"
          id="exampleDataList"
          placeholder="Encontre Um Ativo"
          value={form.code.value}
          onChange={(e)=>setForm({...form,code:{hasChanged:true,value:e.target.value}})}
        />
        <div className='d-flex justify-content-around gap-3 pt-3'>
            <div className='d-flex flex-column'>
                <label htmlFor="date" className='text-secondary'>Data</label>
                <input type="date" value={form.date.value} onChange={(e)=>setForm({...form,date:{hasChanged:true,value:e.target.value}})} id='date'/>
            </div>
            <div className='d-flex flex-column'>
                <label htmlFor="amount" className='text-secondary'>Quantidade</label>
                <input value={form.amount.value} onChange={(e)=>setForm({...form,amount:{hasChanged:true,value:e.target.value}})} type="number" id='amount' min={1}/>
            </div>
            <div className='d-flex flex-column'>
                <label htmlFor="unitPrice" className='text-secondary'>Preço Unitário</label>
                <input type="text" id='unitPrice' value={form.unitPrice.value} onChange={(e)=>setForm({...form,unitPrice:{hasChanged:true,value:e.target.value}})}/>
            </div>
        </div>
        <div className='d-flex align-items-center justify-content-end gap-3 pt-3'>
            <button onClick={(e)=>returnToMyStocks()} className='btn btn-secondary'>Fechar</button>
            <button onClick={()=> register()} className='btn btn-primary'>Cadastrar</button>
        </div>
        <datalist id="datalistOptions">
          {stocksClient.map((stock,index)=>(
            <option key={index} value={stock.stock}>{stock.stock}</option>
          ))}
        </datalist>
      </div>
    </div>
  );
};

export default RegisterStock;
