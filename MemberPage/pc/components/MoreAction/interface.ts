import { USER_ROLE, USER_STATUS } from "@zweb-public/user-data"

export interface MoreActionProps {
  currentUserRole: USER_ROLE
  userRole: USER_ROLE
  userStatus: USER_STATUS
  teamMemberID: string
  currentUserID: string
  name: string
  email: string
  teamID: string
}
