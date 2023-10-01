import { USER_STATUS } from "@zweb-public/user-data"

export interface NameSpaceProps {
  name: string
  avatar: string
  email: string
  status: USER_STATUS
  userID: string
  teamMemberID: string
  currentUserID: string
}
