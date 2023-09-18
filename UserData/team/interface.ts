export enum USER_ROLE {
  "GUEST" = -1,
  "OWNER" = 1,
  "ADMIN",
  "EDITOR",
  "VIEWER",
}

export enum USER_STATUS {
  "OK" = 1,
  "PENDING" = 2,
}
export interface MemberInfo {
  teamMemberID: string
  userID: string
  nickname: string
  email: string
  avatar: string
  userRole: USER_ROLE
  userStatus: USER_STATUS
  permission: Record<string, any>
  createdAt: string
  updatedAt: string
}

export interface TeamMemberPermission {
  blockRegister: boolean
  inviteLinkEnabled: boolean
  allowViewerInvite: boolean
  allowEditorInvite: boolean
  allowEditorManageTeamMember: boolean
  allowViewerManageTeamMember: boolean
}

export interface TeamMemberPermissionConfig {
  config: number
}

export interface TeamPersonalConfig {
  teamLicenseSubscribeExpiredPopupShowed: boolean
  teamLicenseSubscribeExpiredBannerShowed: boolean
}

export enum SUBSCRIBE_PLAN {
  UNDEFINED = "undefined",
  TEAM_LICENSE_FREE = "team_license_free",
  TEAM_LICENSE_PLUS = "team_license_plus",
  TEAM_LICENSE_PREMIUM = "team_license_premium",
  TEAM_LICENSE_ENTERPRISE = "team_license_enterprise",
  TEAM_LICENSE_INSUFFICIENT = "team_license_insufficient",
  TEAM_LICENSE_EXPIRED = "team_license_expired",
  TEAM_LICENSE_APPSUMO_TIER_1 = "team_license_appsumo_tier_1",
  TEAM_LICENSE_APPSUMO_TIER_2 = "team_license_appsumo_tier_2",
  TEAM_LICENSE_APPSUMO_TIER_3 = "team_license_appsumo_tier_3",
  TEAM_LICENSE_APPSUMO_TIER_4 = "team_license_appsumo_tier_4",
  DRIVE_FREE = "drive_free",
  DRIVE_PAID = "drive_paid",
  VOLUME_EXPIRED = "drive_volume_expired",
  DRIVE_VOLUME_INSUFFICIENT = "drive_volume_insufficient",
  COLLA_FREE = "colla_free",
  COLLA_SUBSCRIBE_PAID = "colla_subscribe_paid",
  COLLA_SUBSCRIBE_INSUFFICIENT = "colla_subscribe_insufficient",
  COLLA_SUBSCRIBE_CANCELED = "colla_subscribe_canceled",
  COLLA_SUBSCRIBE_EXPIRED = "colla_subscribe_expired",
}

export enum SUBSCRIPTION_CYCLE {
  FREE = 0,
  MONTHLY = 1,
  YEARLY,
}

export interface SubscribeInfo {
  volume: number
  balance: number
  quantity: number
  plan: SUBSCRIBE_PLAN
  invoiceIssueDate: string
  cycle: SUBSCRIPTION_CYCLE
  totalAmount: number
  cancelAtPeriodEnd: boolean
  invoiceURL: string
}

export interface TotalTeamLicense {
  volume: number
  balance: number
  teamLicensePurchased: boolean // 用于区分免费团队和付费团队
  teamLicenseAllPaid: boolean // 用于区分团队是否已付费并且license充足
}

export interface TeamInfo {
  id: string
  uid: string
  name: string
  icon: string
  identifier: string
  teamMemberID: string
  currentTeamLicense: SubscribeInfo
  appSumoTeamLicense: SubscribeInfo
  totalTeamLicense: TotalTeamLicense
  personalConfig: TeamPersonalConfig
  myRole: USER_ROLE
  permission: TeamMemberPermission
  teamMemberPermission: TeamMemberPermissionConfig
}

export interface Team {
  items?: TeamInfo[]
  currentId?: string
  currentMemberList?: MemberInfo[]
}

export interface UpdateTransUserRolePayload {
  teamMemberID: string
}

export interface UpdateTeamMemberUserRolePayload {
  teamMemberID: string
  userRole: USER_ROLE
}

export interface UpdateTeamMemberPermissionPayload {
  teamID: string
  newPermission: Partial<TeamMemberPermission>
}

export interface UpdateTeamSubscribePayload {
  teamID: string
  subscribeInfo: SubscribeInfo
}
