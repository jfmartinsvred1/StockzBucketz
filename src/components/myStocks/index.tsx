import { useState } from 'react';
import './myStockets.css'
import RegisterStock from '../registerStock/index';
import { MyStock, NewStock, StockApi } from '../../models/Stock';
import { fetchStockData } from '../../services/ApiBrapiService';
const MyStocks = () => {
    const [myStocks, setMyStocks] = useState([
        {
            id: 1,
            code: "BBDC4",
            currentPrice: 25.00,
            amount: 100,
            value: 2500.00,
            cost: 2300.00,
            mediumPrice: 23.00,
            earnings: 200.00
        },
        {
            id: 2,
            code: "ITUB4",
            currentPrice: 27.00,
            amount: 50,
            value: 1350.00,
            cost: 1250.00,
            mediumPrice: 25.00,
            earnings: 100.00
        },
        {
            id: 3,
            code: "PETR4",
            currentPrice: 30.00,
            amount: 80,
            value: 2400.00,
            cost: 2200.00,
            mediumPrice: 27.50,
            earnings: 200.00
        },
        {
            id: 4,
            code: "VALE3",
            currentPrice: 90.00,
            amount: 30,
            value: 2700.00,
            cost: 2550.00,
            mediumPrice: 85.00,
            earnings: 150.00
        },
        {
            id: 5,
            code: "ABEV3",
            currentPrice: 18.00,
            amount: 150,
            value: 2700.00,
            cost: 2550.00,
            mediumPrice: 17.00,
            earnings: 150.00
        }
    ])
    const dataBucket = {
        profitability: 5.99,
        patrimony: 5987.54,
        acquisitionCost: 3970.54,
        accumulatedEarnings: 800.50,
        profit: 2017.00
    }

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
        if(allStocks.length<1){
            const data:StockApi[] = await fetchStockData()
            setAllStocks(data)
        }
        setShowRegisterStock(true)
    }

    function returnToMyStocks() {
        setShowRegisterStock(false)
    }

    function updateStocks(newRegister: NewStock) {
        const existingStock = myStocks.find((s) => s.code === newRegister.code);

        if(existingStock) {
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

            const updatedStocks = myStocks.map(stock =>
                stock.code === newRegister.code ? updatedStock : stock
            );

            setMyStocks(updatedStocks);
            returnToMyStocks();
        }
        else
        {
            const newStock = new MyStock(
                myStocks.length + 1,
                newRegister.code,
                newRegister.unitPrice,
                newRegister.amount,
                newRegister.unitPrice,
                0
            );

            setMyStocks([...myStocks, newStock]);
        }
    }

    return (
        <div className="d-flex p-5 bg-light gap-5 w-100">
            <div className=" myStockets w-100 d-flex flex-column justify-content-around bg-white p-4 shadow p-3 mb-5 bg-body-tertiary rounded">
                <div className="d-flex flex-column align-items-center justify-content-center">
                    <h1 className='text-primary'>{dataBucket.profitability + "%"}</h1>
                    <h6 className='text-secondary'>Rentabilidade Atual</h6>
                </div>
                <div className="d-flex align-items- justify-content-between">
                    <h6 className='text-secondary'>Patrimônio</h6>
                    <h6>{dataBucket.patrimony}</h6>
                </div>
                <div className="d-flex align-items- justify-content-between">
                    <h6 className='text-secondary'>Custo de aquisição</h6>
                    <h6>{dataBucket.acquisitionCost}</h6>
                </div>
                <div className="d-flex align-items- justify-content-between">
                    <h6 className='text-secondary'>Lucro</h6>
                    <h6 className='text-primary'>{dataBucket.profit}</h6>
                </div>
                <div className="d-flex align-items- justify-content-center gap-3">
                    <button className='btn-newStock'>Novo Ativo</button>
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
                            {myStocks.map((stock, index) => (
                                <tr key={index}>
                                    <th scope="row text-dark">{index + 1}</th>
                                    <td className='text-secondary'>{stock.code}</td>
                                    <td className='text-secondary'>{stock.currentPrice.toFixed(2)}</td>
                                    <td className='text-secondary'>{stock.amount}</td>
                                    <td className='text-secondary'>{stock.value}</td>
                                    <td className='text-secondary'>{stock.cost}</td>
                                    <td className='text-secondary'>{stock.mediumPrice.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>

            </div>
            {showRegisterStock && <RegisterStock updateStocks={updateStocks} stocksClient={allStocks} returnToMyStocks={returnToMyStocks} />}
        </div>

    )
}
export default MyStocks