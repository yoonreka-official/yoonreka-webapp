import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { COLORS } from '~/configs/theme.ts';
import useGrades from '~/hooks/useGrades.ts';
import { formatDate } from '~/utils/format.util.ts';

import type { ChartOptions } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

function DefaultChart() {
  const {
    state: { labelColor, statistics },
  } = useGrades();

  const labels = statistics?.map(item => formatDate(item.date, 'D일')) || ['1'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: statistics?.map(item => item.score),
        borderColor: labelColor,
        backgroundColor: labelColor,
        pointBackgroundColor: labelColor,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,

    scales: {
      y: {
        position: 'right',
        max: 100,
        min: 0,
        offset: true,

        border: {
          color: COLORS.BG['01'],
        },

        grid: {
          display: false,
        },

        ticks: {
          font: {
            size: 12,
          },
          color: COLORS.FONT['20'],
          crossAlign: 'center',
        },
      },

      x: {
        border: {
          color: COLORS.BG['01'],
        },

        grid: {
          tickBorderDash: [4, 4, 4, 4],
          color: COLORS.BG['01'],
          offset: false,
          tickLength: 0,
        },

        ticks: {
          font: {
            size: 12,
          },
          color: COLORS.FONT['20'],
          callback(_, index) {
            if (statistics && statistics.length < 9) {
              return formatDate(statistics?.[index]?.date, 'D일');
            }

            if (index % 2 === 0) {
              return formatDate(statistics?.[index]?.date, 'D일');
            }
          },
        },
      },
    },

    plugins: {
      legend: { display: false },
    },
  };

  return <Line data={data} options={options} />;
}

export default DefaultChart;
