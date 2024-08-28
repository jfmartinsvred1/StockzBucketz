import { useState, useEffect } from 'react';
import './myStockets.css'
import RegisterStock from '../registerStock/index';
import { MyStock, NewStock, StockApi } from '../../models/Stock';
import { fetchStockData } from '../../services/ApiBrapiService';
import Stock from '../stock';

type MyStocksProps = {
    setMyStockss: (add: MyStock[]) => void;
    myStockss: MyStock[]; // Corrigido aqui
};


const MyStocks: React.FC<MyStocksProps>  = ({setMyStockss,myStockss}) => {

    const [investorData, setInvestorData]=useState({
        profitability: 0,
        patrimony: 0,
        acquisitionCost: 0,
        accumulatedEarnings: 0,
        profit: 0
    })
    const [allStocks,setAllStocks]=useState([
        {
            change:0,
            close:0,
            log:"",
            market_cap:0,
            name:"",
            sector:"",
            stock:"",
            type:"",
            volume:0
        }
    ])
    const [showRegisterStock, setShowRegisterStock] = useState(false)

    async function handlerRegisterStock() {
        if(allStocks.length===1){
            const data:StockApi[] = await fetchStockData()
            setAllStocks(data)
        }
        setShowRegisterStock(true)
    }

    useEffect(() => {
        calculateInvestorData();
    }, [myStockss]);
    
    function calculateInvestorData(){
        const data={
            profitability: 0,
            patrimony: 0,
            acquisitionCost: 0,
            accumulatedEarnings: 0,
            profit: 0
        }
        myStockss.map((s)=>(
            data.patrimony+=s.value,
            data.acquisitionCost+=s.cost
        ))
        data.profit= data.patrimony - data.acquisitionCost;
        data.profitability= ((data.profit/data.acquisitionCost)*100)
        setInvestorData(data)
    }
    function returnToMyStocks() {
        calculateInvestorData()
        setShowRegisterStock(false)
    }

    function updateStocks(newRegister: NewStock) {
        const existingStock = myStockss.find((s) => s.code === newRegister.code);
        const stockPrice = allStocks.find((s) => s.stock === newRegister.code);
        
        if (existingStock && stockPrice) {
            const updatedStock = new MyStock(
                existingStock.id,
                newRegister.code,
                existingStock.currentPrice,
                existingStock.amount + newRegister.amount,
                existingStock.mediumPrice,
                existingStock.earnings
            );
    
            updatedStock.AddNew(
                newRegister.amount,
                newRegister.unitPrice,
                existingStock.cost,
                existingStock.amount
            );
    
            const updatedStocks = myStockss.map(stock =>
                stock.code === newRegister.code ? updatedStock : stock
            );
    
            setMyStockss(updatedStocks);
            returnToMyStocks();
        } else if (stockPrice) {
            const newStock = new MyStock(
                myStockss.length + 1,
                newRegister.code,
                Number(stockPrice.close.toFixed(2)), 
                newRegister.amount,
                newRegister.unitPrice,
                0
            );
    
            setMyStockss([...myStockss, newStock]);
        } else {
            console.error(`Stock price for ${newRegister.code} not found`);
        }
        calculateInvestorData()
    }
    
    

    return (
        <div className="d-flex p-5 bg-light gap-5 w-100">
            <div className=" myStockets w-100 d-flex flex-column justify-content-around bg-white p-4 shadow p-3 mb-5 bg-body-tertiary rounded">
                <div className="d-flex flex-column align-items-center justify-content-center">
                    <h1 className='text-primary'>{investorData.profitability.toFixed(2) }{"%"}</h1>
                    <h6 className='text-secondary'>Rentabilidade Atual</h6>
                </div>
                <div className="d-flex align-items- justify-content-between">
                    <h6 className='text-secondary'>Patrimônio</h6>
                    <h6>{investorData.patrimony.toFixed(2)}</h6>
                </div>
                <div className="d-flex align-items- justify-content-between">
                    <h6 className='text-secondary'>Custo de aquisição</h6>
                    <h6>{investorData.acquisitionCost.toFixed(2)}</h6>
                </div>
                <div className="d-flex align-items- justify-content-between">
                    <h6 className='text-secondary'>Lucro</h6>
                    <h6 className='text-primary'>{investorData.profit.toFixed(2)}</h6>
                </div>
                <div className="d-flex align-items- justify-content-center gap-3">
                    <button onClick={(e)=>calculateInvestorData()} className='btn-newStock'>Novo Ativo</button>
                    <button onClick={(e) => { handlerRegisterStock() }} className='btn-registeStock'>Cadastrar Ativo</button>
                </div>
            </div>
            <div className='d-flex flex-column w-75'>
                <div className='p-5 d-flex flex-column mw-100 align-items-center gap-3  bg-white p-4 shadow p-3 mb-5 bg-body-tertiary rounded'>
                    <h4>Ações</h4>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Ativo </th>
                                <th scope="col">Cotação</th>
                                <th scope="col">Qtd</th>
                                <th scope="col">Valor</th>
                                <th scope="col">Custo</th>
                                <th scope="col">PM</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myStockss.map((stock, index) => (
                                <Stock 
                                    key={index} 
                                    id={index} 
                                    stock={stock}
                                />
                            ))}
                        </tbody>
                    </table>

                </div>

            </div>
            {showRegisterStock && <RegisterStock calculateInvestorData={calculateInvestorData} updateStocks={updateStocks} stocksClient={allStocks} returnToMyStocks={returnToMyStocks} />}
        </div>

    )
}
export default MyStocks