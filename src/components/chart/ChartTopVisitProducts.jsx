import { useEffect,useState } from 'react';
import { Box } from '@mui/material';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { getTopVisitsProducts } from '../../reducers/product/product';
import { useTranslation } from 'react-i18next';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
function ChartTopVisitProducts(){
    const dispatch = useDispatch();
    const {visitTopProducts} = useSelector((state)=>state.product);
    const [labels, setLabels] = useState([]);
    const [dataVisit, setDataVisit] = useState([]);
    const [t] = useTranslation("global");
    useEffect(()=>{
        dispatch(getTopVisitsProducts());
    },[])
    useEffect(()=>{
        const dataVisit= visitTopProducts.map((item)=> item.visit);
        const dataLabel= visitTopProducts.map((item)=> item.products);
        setDataVisit(dataVisit);
        setLabels(dataLabel)
    },[visitTopProducts])
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: t("most-viewed-products"),
          },
        },
        scales: {
            y: {
              min: 0,
              max: 100,
            }
        }
    };  
    const data = {
        labels,
        datasets: [
            {
                label: t("products"),
                data:dataVisit,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };
    return(
        <>
            <Box sx={{ width: '100%', height: '400px' }}>
                <Bar data={data} options={options} />
            </Box>
        </>
    )
}
export default ChartTopVisitProducts;