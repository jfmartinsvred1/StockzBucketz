import { useState, useEffect } from 'react';
import './myStockets.css'
import RegisterStock from '../registerStock/index';
import { MyStock, NewStock, StockApi } from '../../models/Stock';
import { fetchStockData } from '../../services/ApiBrapiService';
import Loading from '../loading';
import { DataGrid, GridColDef } from '@mui/x-data-grid';


type MyStocksProps = {
    setMyStockss: (add: MyStock[]) => void;
    myStockss: MyStock[]; // Corrigido aqui
};


const MyStocks: React.FC<MyStocksProps> = ({ setMyStockss, myStockss }) => {

    const columns: GridColDef[] = [
        { field: "id", headerName: '#', width: 110 },
        { field: "code", headerName: 'Ativo', width: 110 },
        {
            field: "currentPrice",
            headerName: 'Cotação',
            width: 110,
            valueGetter: (value: number, row) => {
                return value.toFixed(2)
            }

        },
        { field: "amount", headerName: 'Quantidade', width: 110 },
        {
            field: "mediumPrice",
            headerName: 'PM',
            width: 110,
            valueGetter: (value: number, row) => {
                return value.toFixed(2)
            }

        },
        {
            field: "earnings",
            headerName: 'Dividendos',
            width: 110,
            valueGetter: (value: number, row) => {
                return value.toFixed(2)
            }

        },
        {
            field: "value",
            headerName: 'Valor',
            width: 110,
            valueGetter: (value: number, row) => {
                return value.toFixed(2)
            }

        },
        {
            field: "cost",
            headerName: 'Custo',
            width: 110,
            valueGetter: (value: number, row) => {
                return value.toFixed(2)
            }

        },
    ];

    const [investorData, setInvestorData] = useState({
        profitability: 0,
        patrimony: 0,
        acquisitionCost: 0,
        accumulatedEarnings: 0,
        profit: 0
    });
    const [allStocks, setAllStocks] = useState([
        {
            change: 0,
            close: 0,
            log: "",
            market_cap: 0,
            name: "",
            sector: "",
            stock: "",
            type: "",
            volume: 0
        }
    ]);
    const [showLoading, setShowLoading] = useState(false)
    const [showRegisterStock, setShowRegisterStock] = useState(false);

    async function handlerRegisterStock() {
        setShowLoading(true)
        if (allStocks.length === 1) {
            const data: StockApi[] = await fetchStockData()
            setAllStocks(data)
        }
        setShowLoading(false)
        setShowRegisterStock(true)

    }



    useEffect(() => {
        calculateInvestorData();
    }, [myStockss]);

    function calculateInvestorData() {
        const data = {
            profitability: 0,
            patrimony: 0,
            acquisitionCost: 0,
            accumulatedEarnings: 0,
            profit: 0
        }
        myStockss.map((s) => (
            data.patrimony += s.value,
            data.acquisitionCost += s.cost
        ))
        data.profit = data.patrimony - data.acquisitionCost;
        if (data.profit === 0) {
            data.profitability = 0
        }
        else {
            data.profitability = ((data.profit / data.acquisitionCost) * 100)
        }
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
        <div className="d-flex flex-column p-5 bg-light gap-5 w-100  align-items-center">
            <div className=" myStockets w-100 d-flex flex-row justify-content-around bg-white p-4 shadow p-3 mb-3 bg-body-tertiary rounded ">
                <div className="d-flex flex-column align-items-center justify-content-center">
                    <h1 className={investorData.profitability >=0 ? "text-primary":"text-danger"}>{investorData.profitability.toFixed(2)}{"%"}</h1>
                    <h6 className='text-secondary'>Rentabilidade Atual</h6>
                </div>
                <div className="d-flex flex-column align-items-center justify-content-between">
                <h6>{investorData.patrimony.toFixed(2)}</h6>
                    <h6 className='text-secondary'>Patrimônio</h6>
                </div>
                <div className="d-flex flex-column align-items-center justify-content-between">
                <h6>{investorData.acquisitionCost.toFixed(2)}</h6>
                    <h6 className='text-secondary'>Custo de aquisição</h6>
                </div>
                <div className="d-flex flex-column align-items-center justify-content-between">
                <h6 className={investorData.profitability >=0 ? "text-primary":"text-danger"}>{investorData.profit.toFixed(2)}</h6>
                    <h6 className='text-secondary'>Lucro</h6>
                </div>
                <div className="d-flex align-items-center justify-content-center gap-3">
                    <button onClick={(e) => { handlerRegisterStock() }} className='btn-registeStock'>Cadastrar Ativo</button>
                </div>
            </div>
            <div className='d-flex flex-column w-75'>
                <div className='d-flex flex-column mw-100 align-items-center gap-3  bg-white shadow  mb-5 bg-body-tertiary rounded'>
                    <div style={{ height: 350, width: '100%' }}>
                        <DataGrid
                            rows={myStockss}
                            columns={columns}
                        />
                    </div>
                </div>

            </div>
            {showLoading && <Loading />}
            {showRegisterStock && <RegisterStock calculateInvestorData={calculateInvestorData} updateStocks={updateStocks} stocksClient={allStocks} returnToMyStocks={returnToMyStocks} />}
        </div>

    )
}
export default MyStocks