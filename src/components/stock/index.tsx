import { MyStock } from "../../models/Stock"

type StockProps ={
    id:number,
    stock:MyStock
}

const Stock:React.FC<StockProps> = ({id,stock}) => {
    return (
        <tr>
            <th scope="row text-dark">{id + 1}</th>
            <td className='text-secondary'>{stock.code}</td>
            <td className='text-secondary'>{stock.unitPrice.toFixed(2)}</td>
            <td className='text-secondary'>{stock.amount}</td>
            <td className='text-secondary'>{stock.value.toFixed(2)}</td>
            <td className='text-secondary'>{stock.cost.toFixed(2)}</td>
            <td className='text-secondary'>{stock.mediumPrice.toFixed(2)}</td>
        </tr>
    )
}
export default Stock