export interface StockT {
    symbol: string,
    name: string,
    price: number,
    dayRange: string,
    change: number,
    changePercent: number,
    favorited: boolean
  }
  
export interface StockChartT {
    name: string;
    symbol: string;
    series: number[];
}

export interface PredictionT{
    symbol: string,
    name: string,
    matchScore: number,
  }

    