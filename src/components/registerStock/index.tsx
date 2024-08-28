import React, { useState } from 'react';
import { Stock } from '../../Stock';
import './registerStock.css';
import { NewStock } from '../../models/Stock';

type RegisterStockProps = {
  stocksClient: Stock[];
  returnToMyStocks:()=>void
  updateStocks:(addStock:NewStock)=>void
};

const RegisterStock: React.FC<RegisterStockProps> = ({ stocksClient, returnToMyStocks,updateStocks }) => {

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

  function register(){
    const newStockRegister:NewStock={
      code:form.code.value,
      date:form.date.value,
      amount:Number(form.amount.value),
      unitPrice:Number(form.unitPrice.value)
    }
    updateStocks(newStockRegister)
  }



  return (
    <div onClick={(e)=>returnToMyStocks()} className="newStock d-flex align-items-center justify-content-center">
      <div className="bg-white p-5 rounded" onClick={(e)=>e.stopPropagation()}>
        <label htmlFor="exampleDataList" className="form-label text-secondary">Digite o código do ativo que queira cadastrar</label>
        <input
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
            <option value={stock.code}>{stock.code}</option>
          ))}
        </datalist>
      </div>
    </div>
  );
};

export default RegisterStock;
