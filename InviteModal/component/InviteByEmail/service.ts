import { authCloudRequest } from "@zweb-public/zweb-net"
import { USER_ROLE } from "@zweb-public/user-data"
import { isCloudVersion } from "@zweb-public/utils"

interface IInviteByEmailResponseData {
  aiAgentID: string
  appID: string
  email: string
  emailStatus: boolean
  feedback: string
  teamMemberID: string
  userRole: USER_ROLE
}

export const inviteByEmail = (
  teamID: string,
  email: string,
  userRole: USER_ROLE,
  redirectURL: string,
) => {
  const requestBody = isCloudVersion
    ? {
        email: email,
        userRole: userRole,
        redirectURL: encodeURIComponent(redirectURL),
      }
    : {
        email: email,
        userRole: userRole,
        redirectURL: encodeURIComponent(redirectURL),
        hosts: window.location.origin,
      }
  return authCloudRequest<IInviteByEmailResponseData>(
    {
      method: "POST",
      url: `/inviteByEmail`,
      data: requestBody,
    },
    {
      teamID: teamID,
    },
  )
}

export const changeUserRoleByTeamMemberID = (
  teamID: string,
  teamMemberID: string,
  userRole: USER_ROLE,
) => {
  return authCloudRequest<null>(
    {
      method: "PATCH",
      url: `/teamMembers/${teamMemberID}/role`,
      data: {
        userRole: userRole,
      },
    },
    {
      teamID: teamID,
    },
  )
}
