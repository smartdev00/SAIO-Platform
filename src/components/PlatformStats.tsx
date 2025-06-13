import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface PlatformStatsProps {
  totalTokens: number;
  totalProfit: number;
  monthlyStats: {
    month: string;
    tokens: number;
    profit: number;
  }[];
}

const PlatformStats = ({ totalTokens, totalProfit, monthlyStats }: PlatformStatsProps) => {
  const chartData = {
    labels: monthlyStats.map((stat) => stat.month),
    datasets: [
      {
        label: 'Tokens Created',
        data: monthlyStats.map((stat) => stat.tokens),
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Platform Profit (SOL)',
        data: monthlyStats.map((stat) => stat.profit),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#9CA3AF',
        },
      },
      title: {
        display: true,
        text: 'Platform Statistics',
        color: '#F3F4F6',
        font: {
          size: 16,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(75, 85, 99, 0.1)',
        },
        ticks: {
          color: '#9CA3AF',
        },
      },
      x: {
        grid: {
          color: 'rgba(75, 85, 99, 0.1)',
        },
        ticks: {
          color: '#9CA3AF',
        },
      },
    },
  };

  return (
    <div className='bg-gray-900 rounded-2xl p-6 border border-gray-800'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
        <div className='bg-gray-800 rounded-xl p-6'>
          <h3 className='text-gray-400 text-sm mb-2'>Total Tokens Created</h3>
          <p className='text-3xl font-bold text-white'>{totalTokens.toLocaleString()}</p>
        </div>
        <div className='bg-gray-800 rounded-xl p-6'>
          <h3 className='text-gray-400 text-sm mb-2'>Total Platform Profit</h3>
          <p className='text-3xl font-bold text-white'>{totalProfit.toFixed(2)} SOL</p>
        </div>
      </div>
      <div className='h-[400px]'>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default PlatformStats;
