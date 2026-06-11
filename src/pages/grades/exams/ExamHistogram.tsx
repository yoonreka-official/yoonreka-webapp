import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Tooltip,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

import { COLORS } from '~/configs/theme.ts'

import type { ChartOptions } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip)

/** 점수대별 인원 5구간 (만점 대비 비율 환산) */
export const HISTOGRAM_BUCKET_LABELS = [
  '1-20',
  '21-40',
  '41-60',
  '61-80',
  '81-100',
]

interface ExamHistogramProps {
  histogram: number[]
  /** 내 점수가 속한 구간 인덱스 (강조 표시) */
  myBucketIndex?: number
}

function ExamHistogram({ histogram, myBucketIndex }: ExamHistogramProps) {
  const data = {
    labels: HISTOGRAM_BUCKET_LABELS,
    datasets: [
      {
        label: '인원',
        data: histogram,
        backgroundColor: HISTOGRAM_BUCKET_LABELS.map((_, index) =>
          index === myBucketIndex
            ? COLORS.POINT.PRIMARY
            : COLORS.POINT.SECONDARY,
        ),
        borderRadius: 6,
        maxBarThickness: 48,
      },
    ],
  }

  const options: ChartOptions<'bar'> = {
    responsive: true,

    scales: {
      y: {
        beginAtZero: true,
        position: 'right',
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
          precision: 0,
        },
      },

      x: {
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
        },
      },
    },

    plugins: {
      legend: { display: false },
    },
  }

  return <Bar data={data} options={options} />
}

export default ExamHistogram
