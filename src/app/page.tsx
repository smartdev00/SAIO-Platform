'use client';

import FAQ from '@/components/FAQ';
import { useStateContext } from '@/provider/StateProvider';
import { Check, Copy, ExternalLink, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import copy from 'clipboard-copy';
import PlatformStats from '@/components/PlatformStats';
import Banner from '@/components/Baner';
import Services from '@/components/Services';
import Image from 'next/image';
import { GradientButton } from '@/components/component/Button';
import SocialContact from '@/components/SocialContact';

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
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I help you?' },
  ]);
  const [contactStatus, setContactStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

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

  useEffect(() => {
    const fetchPublicKey = async () => {
      setLoading(true); // Start loading
      try {
        const response = await fetch('/api/admin', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          // Handle HTTP errors (e.g., 404, 500)
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data && data.pubKey) {
          console.log('Received pubKey:', data.pubKey, data.fee); // Log what you received
          setConfigData(data);
        } else {
          // Handle cases where the response isn't what you expect
          throw new Error('Invalid response format from /api/admin');
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error('Error fetching public key:', err);
      } finally {
        setLoading(false); // Stop loading, regardless of success/failure
      }
    };

    fetchPublicKey();
  }, [setConfigData, setLoading]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats');
        if (!response.ok) {
          throw new Error('Failed to fetch platform statistics');
        }
        const data = await response.json();
        setPlatformStats(data);
      } catch (error) {
        console.error('Error fetching platform statistics:', error);
      }
    };

    fetchStats();
  }, []);

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

  function handleChatSend(e: React.FormEvent) {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages((msgs) => [
      ...msgs,
      { sender: 'user', text: chatInput },
      // Optionally, add a bot reply here for demo
      // { sender: 'bot', text: 'This is a demo reply.' },
    ]);
    setChatInput('');
  }

  return (
    <div className='pt-[78px] md:pt-[93px] relative'>
      <Banner />
      <div className='max-w-[1440px] mx-auto px-4 sm:px-12 mb-28 mt-56'>
        {platformStats && <PlatformStats {...platformStats} />}
      </div>
      <Services />

      <div className='max-w-[1440px] px-4 sm:px-12 mx-auto'>
        <div className='relative rounded-xl subtitle-animate bg-secondary border-gray-700 border py-6 overflow-hidden'>
          <Image
            alt='waves'
            src='/waves.png'
            className='absolute md:w-full sm:w-[150vw] w-[200vw] max-w-[10000px] -left-1/2 sm:-left-1/3 md:left-0 bottom-0'
            width={1000}
            height={300}
          />

          <div className='space-y-6 rounded-xl'>
            <div className='relative flex flex-col items-center space-y-8 create-token-first w-full p-4 sm:p-8'>
              <div className='space-y-4'>
                <h2 className='text-2xl sm:text-5xl text-text-main text-center'>All Services</h2>
                <p className='text-xs sm:text-xl text-text-secondary text-center'>
                  The cost is <span className='text-[#c0a3ff]'>30 SOL</span> for all our services.
                </p>
              </div>
              <GradientButton className='w-full sm:w-[200px] h-[54px] justify-self-center'>Start All</GradientButton>
            </div>
          </div>
        </div>
      </div>

      <div className='max-w-[1440px] mx-auto !mb-6 px-4 sm:px-12 subtitle-animate'>
        <FAQ />
      </div>

      <div className='max-w-[1440px] px-4 sm:px-12 mx-auto mb-16'>
        <div className='bg-gray-900/80 rounded-2xl shadow-lg border border-gray-800 p-8 flex flex-col items-center gap-8'>
          <h2 className='text-3xl sm:text-4xl font-bold text-center text-text-main mb-2'>Get in Touch</h2>
          <p className='text-gray-600 dark:text-gray-300 text-center mb-4'>Have a question, feedback, or want to work together? Fill out the form below or reach out via your preferred method.</p>
          <form
            className='w-full max-w-lg flex flex-col gap-4'
            onSubmit={async (e) => {
              e.preventDefault();
              // @ts-expect-error Form event target type casting for uncontrolled form
              const name = e.target.name.value;
              // @ts-expect-error Form event target type casting for uncontrolled form
              const email = e.target.email.value;
              // @ts-expect-error Form event target type casting for uncontrolled form
              const message = e.target.message.value;
              // TODO: Implement API call to /api/contact
              // Simulate success for now, using the variables so linter doesn't complain
              setContactStatus('loading');
              setTimeout(() => {
                // eslint-disable-next-line no-console
                console.log('Contact form submitted:', { name, email, message });
                setContactStatus('success');
              }, 1200);
            }}
          >
            <input
              name='name'
              type='text'
              required
              placeholder='Your Name'
              className='p-3 rounded-lg border border-gray-700 bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/30'
            />
            <input
              name='email'
              type='email'
              required
              placeholder='Your Email'
              className='p-3 rounded-lg border border-gray-700 bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/30'
            />
            <textarea
              name='message'
              required
              placeholder='Your Message'
              rows={4}
              className='p-3 rounded-lg border border-gray-700 bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/30'
            />
            <button
              type='submit'
              className='bg-gradient-to-r from-primary to-purple-600 text-white font-semibold py-3 rounded-lg shadow hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-purple-300 flex items-center justify-center gap-2'
              disabled={contactStatus === 'loading'}
            >
              {contactStatus === 'loading' ? (
                <svg className='animate-spin h-5 w-5 mr-2 text-white' viewBox='0 0 24 24'>
                  <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' fill='none' />
                  <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v8z' />
                </svg>
              ) : (
                <svg width='20' height='20' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                  <path d='M22 2L11 13' />
                  <path d='M22 2L15 22L11 13L2 9L22 2Z' />
                </svg>
              )}
              {contactStatus === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
            {contactStatus === 'success' && (
              <div className='text-green-600 text-center font-medium mt-2'>Thank you! Your message has been sent.</div>
            )}
            {contactStatus === 'error' && (
              <div className='text-red-600 text-center font-medium mt-2'>Something went wrong. Please try again.</div>
            )}
          </form>
          <SocialContact />
        </div>
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

      {/* Chatbot Floating Button */}
      <button
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-primary to-purple-600 text-white rounded-full shadow-xl p-4 hover:scale-110 transition-transform duration-200 focus:outline-none focus:ring-4 focus:ring-purple-300"
        onClick={() => setIsChatOpen(true)}
        aria-label="Open Chatbot"
        style={{ boxShadow: '0 8px 32px rgba(80,0,200,0.18)' }}
      >
        {/* Animated chat bubble icon */}
        <span className="relative flex h-6 w-6">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-60"></span>
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" className="relative z-10">
            <rect x="3" y="5" width="18" height="14" rx="5" fill="#fff" className="text-primary" />
            <path d="M7 10h10M7 14h6" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-[90vw] max-w-xs sm:max-w-sm md:max-w-md bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col transition-all duration-300 ${isChatOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-8 pointer-events-none'}`}
        style={{ minHeight: 400, maxHeight: '70vh' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary to-purple-600 text-white rounded-t-2xl shadow-sm">
          <span className="font-semibold tracking-wide">Chatbot</span>
          <button
            onClick={() => setIsChatOpen(false)}
            aria-label="Close Chat"
            className="hover:bg-white/10 rounded-full p-1 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50" style={{ minHeight: 200 }}>
          {chatMessages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-[80%] text-sm shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-br from-primary to-purple-500 text-white rounded-br-md'
                    : 'bg-white border text-gray-700 rounded-bl-md'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        {/* Input */}
        <form
          className="flex items-center gap-2 border-t border-gray-100 bg-white p-2 rounded-b-2xl"
          onSubmit={handleChatSend}
        >
          <input
            type="text"
            className="flex-1 p-2 rounded-full border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none text-sm"
            placeholder="Type your message..."
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
            autoComplete="off"
            aria-label="Type your message"
          />
          <button
            type="submit"
            className="p-2 rounded-full bg-gradient-to-br from-primary to-purple-600 text-white hover:scale-110 transition-transform duration-150 focus:outline-none focus:ring-2 focus:ring-purple-300"
            aria-label="Send message"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M22 2L11 13" />
              <path d="M22 2L15 22L11 13L2 9L22 2Z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
