import { USER_ROLE } from "@zweb-public/user-data"

export interface InviteLinkProps {
  defaultInviteUserRole: USER_ROLE
  defaultAllowInviteLink: boolean
  teamID: string
  redirectURL: string
  currentUserRole: USER_ROLE
  defaultBalance: number
  onInviteLinkStateChange: (allowInviteLink: boolean) => void
  onCopyInviteLink: (inviteLink: string) => void
  excludeUserRole: USER_ROLE[]
}
