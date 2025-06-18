import Image from 'next/image';

const Banner = () => {
  return (
    <div className='max-w-[1440px] mx-auto px-4 pt-[10vw] sm:px-12 subtitle-animate'>
      <Image
        src='/background_01.png'
        alt='Background Image'
        width={1000}
        height={400}
        className='absolute w-9/12 md:min-w-0.5 top-24 right-4 md:-top-24 md:right-44 animate-fade-in'
      />
      <Image
        src='/Solana.png'
        alt='Background Image'
        width={300}
        height={300}
        className='hidden md:block absolute w-4.5/12 top-44 right-24 lg:right-48 animate-fade-in'
      />
      <div className='mx-auto'>
        <h1 className='w-10/12 md:w-6/12 lg:w-7/12 mb-6 md:mb-10 md:mt-20 text-4xl sm:text-6xl bg-white bg-clip-text text-transparent title-animate'>
          Solana 
          <span className='px-4 py-2 bg-gradient-to-r from-[#645CF5] to-[#8016D1] bg-clip-text text-transparent'>
            All In One
          </span>
        </h1>
        <p className='w-6/12 text-left subtitle-animate text-text-secondary text-lg sm:text-xl'>
            This all-in-one Solana platform offers a comprehensive suite of automated tools for token creation, high-speed trading including sniping and arbitrage, and strategic volume generation.
        </p>
      </div>
    </div>
  );
};

export default Banner;
