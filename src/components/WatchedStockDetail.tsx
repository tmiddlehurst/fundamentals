import { useContext, useEffect, useState } from 'react';
import { ChartInterval, WatchedStock } from '../types/types';
import { AxiosContext } from '../context/AxiosAPIContext';
import Chart from 'react-apexcharts';
import { TimeSeriesPoint } from '../types/generated';

type ApexChartCandlestickChartPoint = [
  number,
  [number, number, number, number]
];

function toApexCandlestickPoint(
  point: TimeSeriesPoint
): ApexChartCandlestickChartPoint {
  return [
    new Date(point.datetime).valueOf(),
    [+point.open, +point.high, +point.low, +point.close],
  ];
}

export default function WatchedStockDetail({ stock }: { stock: WatchedStock }) {
  const api = useContext(AxiosContext);
  const [chartInterval, setChartInterval] = useState<ChartInterval>('5min');
  const [chartSeries, setChartSeries] =
    useState<ApexChartCandlestickChartPoint[]>();

  useEffect(() => {
    api
      .getTimeSeriesData(stock.symbol, 'TOMS_API_KEY', chartInterval)
      .then((data) => {
        const series = data.values?.map((val) => toApexCandlestickPoint(val));
        setChartSeries(series);
      });
  }, [stock, chartInterval]);
  const chartConfig = {
    series: [
      {
        data: chartSeries,
      },
    ],
    options: {
      chart: {
        id: `${stock.symbol}-candle-chart`,
      },
    },
  };
  return (
    <div className='flex-1 rounded-md bg-white flex flex-col justify-between'>
      {stock.name}
      <div>
        {chartSeries?.length && (
          <Chart
            series={chartConfig.series}
            options={chartConfig.options}
            type='candlestick'
          />
        )}
      </div>
      <div>notes go here</div>
    </div>
  );
}
