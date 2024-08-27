import React from 'react';
import { Stock } from '../../Stock';
import './registerStock.css';

type RegisterStockProps = {
  stocksClient: Stock[];
  returnToMyStocks:()=>void
};

const RegisterStock: React.FC<RegisterStockProps> = ({ stocksClient, returnToMyStocks }) => {
  const html= (
    <div onClick={(e)=>returnToMyStocks()} className="newStock d-flex align-items-center justify-content-center">
      <div className="bg-white p-5" onClick={(e)=>e.stopPropagation()}>
        <label htmlFor="exampleDataList" className="form-label text-secondary">Digite o código do ativo que queira cadastrar</label>
        <input
          className="form-control"
          list="datalistOptions"
          id="exampleDataList"
          placeholder="Encontre Um Ativo"
        />
        <datalist id="datalistOptions">
          {stocksClient.map((stock,index)=>(
            <option value={stock.code}>{stock.code}</option>
          ))}
        </datalist>
      </div>
    </div>
  );
  return html;
};

export default RegisterStock;
