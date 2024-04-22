import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  import { useTranslation } from 'react-i18next';
  import { useDispatch, useSelector } from 'react-redux';
  import { getVisitProducts } from '../../reducers/product/product';
  import { useEffect, useState } from 'react';
  import { Box } from '@mui/material';
  function ChartVisitProducts(){
      const dispatch = useDispatch();
      const {visitproducts} = useSelector((state)=>state.product);
      const [t] = useTranslation("global");
      const [labels, setLabels] = useState([]);
      const [dataVisit, setDataVisit] = useState([]);
      useEffect(()=>{
          dispatch(getVisitProducts());
      },[])
      useEffect(()=>{
          const dataVisit= visitproducts.map((item)=> item.visit);
          const dataLabel= visitproducts.map((item)=> item.date);
          setDataVisit(dataVisit);
          setLabels(dataLabel)
      },[visitproducts])
      ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
      );
      const options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: t("visits-description-products"),
            },
            },
            scales: {
                x: {
                    time: {
                        unit: 'day',
                    },
                },
                y: {
                    beginAtZero: true, // Comienza el eje y en cero
                },
            },
      };
      const data = {
        labels,
        datasets: [
          {
            label: t("visits"),
            data: dataVisit,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      };
      
      return(<>
          <Box sx={{ width: '100%', height: '400px' }}>
                <Line data={data} options={options} />
          </Box>
      </>)
  }
  export default ChartVisitProducts;