import React from 'react';
import { Stock } from '../../Stock';
import './registerStock.css';

type RegisterStockProps = {
  stocksClient: Stock[];
  returnToMyStocks:()=>void
};

const RegisterStock: React.FC<RegisterStockProps> = ({ stocksClient, returnToMyStocks }) => {
  return (
    <div onClick={(e)=>returnToMyStocks()} className="newStock d-flex align-items-center justify-content-center">
      <div className="bg-white p-5" onClick={(e)=>e.stopPropagation()}>
        <label htmlFor="exampleDataList" className="form-label text-secondary">Digite o código do ativo que queira cadastrar</label>
        <input
          className="form-control"
          list="datalistOptions"
          id="exampleDataList"
          placeholder="Encontre Um Ativo"
        />
        <div className='d-flex justify-content-around gap-3 pt-3'>
            <div className='d-flex flex-column'>
                <label htmlFor="date" className='text-secondary'>Data</label>
                <input type="date" id='date'/>
            </div>
            <div className='d-flex flex-column'>
                <label htmlFor="amount" className='text-secondary'>Quantidade</label>
                <input type="number" id='amount' min={1}/>
            </div>
            <div className='d-flex flex-column'>
                <label htmlFor="unitPrice" className='text-secondary'>Preço Unitário</label>
                <input type="text" id='unitPrice'/>
            </div>
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
