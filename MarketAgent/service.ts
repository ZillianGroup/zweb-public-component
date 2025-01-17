import { marketplaceRequest } from "@zweb-public/zweb-net"
import { MarketAIAgent } from "./interface"


export enum MARKET_AGENT_SORTED_OPTIONS {
  POPULAR = "popular",
  LATEST = "latest",
  STARRED = "starred",
}

export interface MarketAgentListData {
  products: MarketAIAgent[]
  hasMore: boolean
}

export const fetchMarketAgentList = (
  page: number = 1,
  sortedBy: MARKET_AGENT_SORTED_OPTIONS,
  search: string = "",
  pageSize: number = 10,
  signal?: AbortSignal,
) => {
  return marketplaceRequest<MarketAgentListData>({
    url: `/aiAgents?page=${page}&limit=${pageSize}&sortedBy=${sortedBy}&search=${search}`,
    method: "GET",
    signal,
  })
}

export const getAIAgentMarketplaceInfo = (aiAgentID: string) => {
  return marketplaceRequest<MarketAIAgent>({
    url: `/aiAgents/${aiAgentID}`,
    method: "GET",
  })
}