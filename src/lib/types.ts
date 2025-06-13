import { LucideProps } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

export type HelpType = {
  id: number;
  title: string;
  text: string;
  img: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>> | string;
};

export type FAQType = {
  id: number;
  question: string;
  answer: string;
};

export type TokenMetaDataType = {
  name: string;
  symbol: string;
  logo: File | undefined;
  decimals: number;
  supply: number;
  description?: string;
  website?: string;
  twitter?: string;
  telegram?: string;
  discord?: string;
  enableCreator: boolean;
  creatorName?: string;
  creatorWebsite?: string;
  freezeable: boolean;
  mintable: boolean;
  updateable: boolean;
};

export type ProgressType = {
  id: string;
  title: string;
};

export type RevokeAuthorityType = {
  id: number;
  title: string;
  content: string;
  price: number;
  logo: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
  type: keyof TokenMetaDataType;
  feeType: keyof Configuration;
};

export type PromoteItemType = {
  id: number;
  title: string;
  price: number;
  benefits: string[];
  fromColor: string;
  viaColor: string;
  toColor: string;
  textColor: string;
};

export interface Configuration {
  fee: number;
  mintableFee: number;
  freezeableFee: number;
  updateableFee: number;
  creatorFee: number;
  pubKey: string | null;
}
