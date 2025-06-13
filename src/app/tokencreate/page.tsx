'use client';

import FAQ from '@/components/FAQ';
import Help from '@/components/Help';
import TokenCreation from '@/components/token-creation/TokenCreation';
import TokenLaunchBanner from '@/components/TokenLaunchBanner';
import { useStateContext } from '@/provider/StateProvider';
import { Check, Copy, ExternalLink, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import copy from 'clipboard-copy';
import PlatformStats from '@/components/PlatformStats';

export default function Home() {
  const [error, setError] = useState<string | null>(null);
  const { setConfigData, setLoading, loading } = useStateContext();
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [mintAddress, setMintAddress] = useState<string | null>('');
  const [platformStats, setPlatformStats] = useState<{
    totalTokens: number;
    totalProfit: number;
    monthlyStats: { month: string; tokens: number; profit: number }[];
  } | null>(null);

  // If user clicks outside of success model
  useEffect(() => {
    const handleClickSuccessOutside = (event: MouseEvent) => {
      if ((event.target as HTMLElement).id === 'success-modal') {
        setMintAddress(null);
      }
    };

    if (mintAddress) {
      document.addEventListener('mousedown', handleClickSuccessOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickSuccessOutside);
    };
  }, [mintAddress]);

  async function handleCopyClick() {
    try {
      if (!mintAddress) {
        return;
      }
      await copy(mintAddress);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1000); // Reset "Copied!" state after 2 seconds
    } catch (error) {
      console.error('Failed to copy text to clipboard', error);
    }
  }

  // When user click outsite of error modal
  useEffect(() => {
    const handleClickErrorOutside = (event: MouseEvent) => {
      if ((event.target as HTMLElement).id === 'error-modal') {
        setError(null);
      }
    };

    if (error) {
      document.addEventListener('mousedown', handleClickErrorOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickErrorOutside);
    };
  }, [error]);

  return (
    <div className='pt-[78px] md:pt-[93px] relative'>
      <TokenLaunchBanner />
      <TokenCreation setError={setError} setMintAddress={setMintAddress} />
      <div className='max-w-[1440px] mx-auto !mb-6 px-4 sm:px-12 subtitle-animate'>
        <FAQ />
        <Help />
      </div>

      {/* Error Modal - When user fails to create token */}
      {error && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50' id='error-modal'>
          <div className='bg-gray-900 rounded-2xl max-w-md w-full border border-gray-800 shadow-xl z-50'>
            <div className='p-6'>
              <div className='flex items-center gap-2 mb-6'>
                <button
                  className='h-8 w-8 rounded-full bg-red-500/20 flex items-center justify-center'
                  onClick={() => setError(null)}
                >
                  <X className='text-red-500' />
                </button>
                <h2 className='text-xl font-semibold text-text-main'>Error Creating Token</h2>
              </div>
              <div className='space-y-6'>
                <div className='p-4 rounded bg-red-500/10 border border-red-500/20'>
                  <p className='text-sm text-red-400'>{error}</p>
                </div>
                <div className='border-t border-gray-800 pt-4'>
                  <p className='text-sm text-text-secondary'>Please try again or contact support if the issue persists.</p>
                </div>
              </div>
            </div>
          </div>
          {/* <div className='absolute inset-0 -z-10' /> */}
        </div>
      )}

      {/* Loading Spinner - When user is creating token */}
      {loading && (
        <div className='fixed inset-0 flex justify-center items-center bg-main bg-opacity-50 z-50'>
          <div className='animate-spin w-20 h-20 border-4 border-transparent border-t-white rounded-full' />
        </div>
      )}

      {/* Token Creation Success Modal */}
      {mintAddress && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50' id='success-modal'>
          <div className='bg-gray-900 rounded-2xl max-w-md w-full border border-gray-800 shadow-xl z-50'>
            <div className='p-6'>
              <div className='flex items-center gap-2 mb-6'>
                <button
                  className='h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center'
                  onClick={() => setMintAddress(null)}
                >
                  <X className='text-green-500' />
                </button>
                <h2 className='text-xl font-semibold text-text-main'>Token Created Successfully!</h2>
              </div>
              <div className='space-y-6'>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-text-secondary'>Token Address</label>
                  <div className='flex items-center gap-2'>
                    <code className='flex-1 p-2 rounded bg-gray-800 text-sm text-text-secondary overflow-x-auto'>
                      {mintAddress}
                    </code>
                    <button
                      className='shrink-0 p-2 rounded border border-gray-700 hover:bg-gray-800 transition-colors'
                      onClick={handleCopyClick}
                    >
                      {isCopied ? (
                        <Check className='h-4 w-4 text-text-secondary' />
                      ) : (
                        <Copy className='h-4 w-4 text-text-secondary' />
                      )}
                    </button>
                  </div>
                </div>
                <div className='space-y-4'>
                  <Link
                    href={`https://explorer.solana.com/address/${mintAddress}`}
                    target='_blank'
                    className='w-full flex items-center justify-center gap-2 py-2 px-4 rounded border border-gray-700 text-text-secondary hover:bg-gray-800 transition-colors'
                  >
                    <ExternalLink className='h-4 w-4 text-text-secondary' /> View on Explorer
                  </Link>
                  <Link
                    href={`https://solscan.io/token/${mintAddress}`}
                    target='_blank'
                    className='w-full flex items-center justify-center gap-2 py-2 px-4 rounded border border-gray-700 text-text-secondary hover:bg-gray-800 transition-colors'
                  >
                    <ExternalLink className='h-4 w-4 text-text-secondary' /> View on Solscan
                  </Link>
                  <Link
                    href='https://raydium.io/liquidity/create-pool/'
                    target='_blank'
                    className='w-full flex items-center justify-center gap-2 py-2 px-4 rounded border border-gray-700 text-text-secondary hover:bg-gray-800 transition-colors'
                  >
                    <ExternalLink className='h-4 w-4 text-text-secondary' /> Create Liquidity Pool
                  </Link>
                </div>
                <div className='border-t border-gray-800 pt-4'>
                  <p className='text-sm text-text-secondary'>Add this token to your wallet using the token address above.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
