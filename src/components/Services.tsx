import { Check } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    title: 'Token Creation',
    description: 'Create your own Solana token with ease',
    features: [
      'Custom token name and symbol',
      'Adjustable supply and decimals',
      'Instant deployment',
      'Built-in liquidity options',
      'Explorer integration'
    ],
    buttonText: 'Create Token',
    target: '_self',
    buttonLink: '/tokencreate'
  },
  {
    title: 'Sniper Bot',
    description: 'Automated token sniping on Raydium',
    features: [
      'Real-time token detection',
      'Instant buy execution',
      'Customizable buy parameters',
      'Multiple wallet support',
      'Profit tracking'
    ],
    buttonText: 'Launch Sniper',
    target: '_target',
    buttonLink: 'https://t.me/smartdev00'
  },
  {
    title: 'Copy Trading Bot',
    description: 'Mirror successful traders automatically',
    features: [
      'Follow top traders',
      'Real-time trade copying',
      'Risk management settings',
      'Performance analytics',
      'Multiple strategy support'
    ],
    buttonText: 'Start Copying',
    target: '_target',
    buttonLink: 'https://t.me/smartdev00'
  },
  {
    title: 'Trading Bot',
    description: 'Automated trading strategies',
    features: [
      'Custom trading strategies',
      'Technical analysis indicators',
      'Stop-loss and take-profit',
      'Backtesting capabilities',
      'Real-time monitoring'
    ],
    buttonText: 'Start Trading',
    target: '_target',
    buttonLink: 'https://t.me/smartdev00'
  },
  {
    title: 'Arbitrage Bot',
    description: 'Cross-exchange arbitrage opportunities',
    features: [
      'Multi-exchange monitoring',
      'Price difference detection',
      'Instant execution',
      'Risk management',
      'Profit optimization'
    ],
    buttonText: 'Start Arbitrage',
    target: '_target',
    buttonLink: 'https://t.me/smartdev00'
  },
  {
    title: 'Volume Bot',
    description: 'Increase token trading volume',
    features: [
      'Custom volume targets',
      'Natural trading patterns',
      'Multiple exchange support',
      'Volume distribution',
      'Performance analytics'
    ],
    buttonText: 'Boost Volume',
    target: '_target',
    buttonLink: 'https://t.me/smartdev00'
  }
];

export default function Services() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-12 py-12">
      <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
        Our Services
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-gray-900 rounded-xl border border-gray-800 p-6 hover:border-gray-700 transition-colors flex flex-col"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-3">
                {service.title}
              </h3>
              <p className="text-text-secondary text-center">{service.description}</p>
            </div>
            <ul className="space-y-2 flex-grow">
              {service.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-text-secondary">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Link
                href={service.buttonLink}
                target={service.target}
                className="w-full block text-center py-3 px-4 rounded-lg bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold transition-all duration-200 transform hover:scale-[1.02]"
              >
                {service.buttonText}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 