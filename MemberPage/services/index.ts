import { authCloudRequest } from "@zweb-public/zweb-net"
import { TeamInfo } from "@zweb-public/user-data"

export const fetchCurrentUserTeamsInfo = () => {
  return authCloudRequest<TeamInfo[]>({
    url: "/teams/my",
    method: "GET",
  })
}
