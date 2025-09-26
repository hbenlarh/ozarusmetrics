export interface TokenScanRequest {
  token_address: string;
}

export interface TokenScanResponse {
  success: boolean;
  data?: {
    basic_info: {
      name: string;
      symbol: string;
      image: string;
      contract: string;
      creator: {
        address: string;
      };
      description: string;
      age: string;
      socials: {
        website: string;
        telegram: string;
        twitter: string;
      };
    };
    market_data: {
      liquidity: number;
      liquidity_str: string;
      market_cap: number;
      market_cap_str: string;
      dex_url: string;
      mint_url: string;
    };
    holders: {
      total: number;
      top_ten_per: number;
      total_holders: number;
      top_ten: any[];
      top_individual_per: number;
      burn_percentage: number;
      top_hundred_per: number;
    };
    security: {
      mint_auth_disabled: boolean;
      freeze_authority: boolean;
      risk_score: number;
      message: string[];
    };
  };
  error?: string;
  message?: string;
}
