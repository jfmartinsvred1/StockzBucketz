import { useState, useEffect, useId } from 'react';
import './myStockets.css'
import RegisterStock from '../registerStock/index';
import { CreateTransaction, Portfolio, StockBrapi } from '../../models/types';
import Loading from '../loading';
import { DataGrid, GridColDef, GridActionsCellItem, GridAddIcon, GridDeleteIcon, } from '@mui/x-data-grid';
import lixeira from '../../images/lixeira.png'
import { Chart } from "react-google-charts";
import { GetAllStocs, GetPortfolio } from '../../services/ApiService';

type MyStocksProps = {
    userId: any,
    portfolio: Portfolio,
    setPortfolio: (portfolio: Portfolio) => void,
    allStocks: StockBrapi[],
    setAllStocks: (stocks: StockBrapi[]) => void
}

const MyStocks = ({ userId, portfolio, setPortfolio, allStocks, setAllStocks }: MyStocksProps) => {
    const columns: GridColDef[] = [
        { field: "code", headerName: 'Ativo', width: 110 },
        {
            field: "unitPrice",
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
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Delete',
            width: 100,
            cellClassName: 'actions',

            getActions: ({ id }) => {

                return [
                    <GridActionsCellItem
                        icon={<img src={lixeira} width="16px" />}
                        label="Cancel"
                        className="textPrimary"
                        onClick={(e) => console.log(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];
    console.log('Renderizei')
    const [showLoading, setShowLoading] = useState(false)

    const [showRegisterStock, setShowRegisterStock] = useState(false);

    useEffect(() => {
        GetPortfolio(userId).then((data) => setPortfolio(data)).catch((err) => console.log(err))
        GetAllStocs().then((data) => setAllStocks(data)).catch((err) => console.log(err))
    }, [])

    const dataPieChart = [
        ["Code", "Value"],
        ...(portfolio?.stocks.map((s) => [s.code, parseFloat(s.value.toFixed(2))]) || [])
    ];

    const dataColumnChart = [
        ["Ano", "Valor", { role: "style" }],
        ...(portfolio?.monthlyRecords.map((m) => [`${m.monthly}/${m.year}`, m.value, "color: #e5e4e2"]) || [])
    ];

    const optionsChart = {
        title: "Distribuição de Ativos",
        pieHole: 0.4, // Se desejar um gráfico de rosca
        backgroundColor: "#f4f4f4",
        legend: { position: "bottom" }
    };

    async function returnToMyStocks() {
        setShowRegisterStock(false);
    }

    function updateStocks() {
        GetPortfolio(userId).then((data) => setPortfolio(data)).catch((err) => console.log(err));
    }

    function goRegisterStock() {
        setShowLoading(true);
        setShowRegisterStock(true);
        setShowLoading(false);
    }

    return (
        <div className="d-flex flex-column p-5 bg-light gap-5 w-100 align-items-center">
            <div className="myStockets w-100 d-flex flex-row justify-content-around bg-white p-4 shadow p-3 mb-3 bg-body-tertiary rounded">
                <div className="d-flex flex-column align-items-center justify-content-center">
                    {portfolio?.profitability !== undefined ? (
                        <h1 className={portfolio.profitability >= 0 ? "text-primary" : "text-danger"}>
                            {portfolio.profitability.toFixed(2)}{"%"}
                        </h1>
                    ) : (
                        <h1 className="text-secondary">N/A</h1>
                    )}
                    <h6 className="text-secondary">Rentabilidade Atual</h6>
                </div>
                <div className="d-flex flex-column align-items-center justify-content-between">
                    {portfolio?.patrimony !== undefined ? (
                        <h6>{portfolio.patrimony.toFixed(2)}</h6>
                    ) : (
                        <h6>N/A</h6>
                    )}
                    <h6 className="text-secondary">Patrimônio</h6>
                </div>
                <div className="d-flex flex-column align-items-center justify-content-between">
                    {portfolio?.acquisitionCost !== undefined ? (
                        <h6>{portfolio.acquisitionCost.toFixed(2)}</h6>
                    ) : (
                        <h6>N/A</h6>
                    )}
                    <h6 className="text-secondary">Custo de aquisição</h6>
                </div>
                <div className="d-flex flex-column align-items-center justify-content-between">
                    {portfolio?.profit !== undefined ? (
                        <h6 className={portfolio.profit >= 0 ? "text-primary" : "text-danger"}>
                            {portfolio.profit.toFixed(2)}
                        </h6>
                    ) : (
                        <h6>N/A</h6>
                    )}
                    <h6 className="text-secondary">Lucro</h6>
                </div>
                <div className="d-flex align-items-center justify-content-center gap-3">
                    <button onClick={goRegisterStock} className="btn-registeStock">Cadastrar Ativo</button>
                </div>
            </div>

            <div className="d-flex flex-column w-75">
                <div className="d-flex flex-column mw-100 align-items-center gap-3 bg-white shadow mb-5 bg-body-tertiary rounded">
                    <div style={{ height: 372, width: "100%" }}>
                        <DataGrid rows={portfolio?.stocks || []} columns={columns} pageSizeOptions={[5]} />
                    </div>
                </div>
            </div>

            <div className='d-flex'>
                <Chart
                    chartType="ColumnChart"
                    width="100%"
                    height="400px"
                    data={dataColumnChart}
                    options={optionsChart}
                />
                {portfolio?.stocks && portfolio.stocks.length > 0 && (
                    <Chart
                        chartType="PieChart"
                        data={dataPieChart}
                        options={optionsChart}
                        width={"100%"}
                        height={"400px"}
                    />
                )}
            </div>

            {showLoading && <Loading />}
            {showRegisterStock && <RegisterStock updateStocks={updateStocks} userId={userId} stocksClient={allStocks} returnToMyStocks={returnToMyStocks} />}
        </div>
    );
}

export default MyStocks;