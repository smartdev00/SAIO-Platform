import { NextResponse } from 'next/server';

// This is mock data - replace with actual database queries
const getPlatformStats = () => {
  return {
    totalTokens: 1234,
    totalProfit: 567.89,
    monthlyStats: [
      { month: 'Jan', tokens: 120, profit: 45.6 },
      { month: 'Feb', tokens: 150, profit: 57.8 },
      { month: 'Mar', tokens: 180, profit: 68.9 },
      { month: 'Apr', tokens: 210, profit: 79.5 },
      { month: 'May', tokens: 240, profit: 91.2 },
      { month: 'Jun', tokens: 270, profit: 102.8 },
      { month: 'Jul', tokens: 300, profit: 114.5 },
    ],
  };
};

export async function GET() {
  try {
    const stats = getPlatformStats();
    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch platform statistics' },
      { status: 500 }
    );
  }
} 