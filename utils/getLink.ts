export const getMarketLinkTemplate = (appID: string): string => {
  return `${process.env.ZWEB_MARKET_URL}/app/${appID}/detail`
}

export const getPublicLinkTemplate = (teamIdentify: string, appID: string): string => {
  return `${process.env.ZWEB_BUILDER_URL}/${teamIdentify}/deploy/app/${appID}`
}

export const getAgentPublicLink = (agentID: string): string  => {
  return `${process.env.ZWEB_MARKET_URL}/ai-agent/${agentID}/detail`
}