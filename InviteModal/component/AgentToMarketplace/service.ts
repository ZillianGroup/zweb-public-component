import { marketplaceTeamRequest } from "@zweb-public/zweb-net"

export const makeAgentContribute = (teamID: string, agentID: string) => {
  return marketplaceTeamRequest<{}>(
    {
      method: "POST",
      url: `/products/aiAgents/${agentID}`,
    },
    {
      teamID: teamID,
    },
  )
}

export const fetchRemoveToMarketplace = (teamID: string, agentID: string) => {
  return marketplaceTeamRequest<{}>(
    {
      method: "DELETE",
      url: `/products/aiAgents/${agentID}`,
    },
    {
      teamID: teamID,
    },
  )
}
