import { USER_ROLE } from "@illa-public/user-data"
import { isBiggerThanTargetRole } from "@illa-public/user-role-utils"
import { FC, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  DoubtIcon,
  DownIcon,
  DropList,
  DropListItem,
  Dropdown,
  SuccessIcon,
  Trigger,
  TriggerProvider,
  UpIcon,
} from "@illa-design/react"
import { RoleSelectorProps, UserRoleItem } from "./interface"
import {
  applyRoleOuterLabelStyle,
  doubtStyle,
  itemContainer,
  roleOuterIconStyle,
  roleSelectorRoleContainer,
  successStyle,
} from "./style"

export const RoleSelector: FC<RoleSelectorProps> = (props) => {
  const {
    onClickItem,
    withoutTips,
    value,
    showOwner,
    currentUserRole,
    isSelf,
    inline,
    excludeUserRole,
  } = props

  const [menuVisible, setMenuVisible] = useState(false)

  const canEdit =
    !isSelf && isBiggerThanTargetRole(value, currentUserRole, true)

  const { t } = useTranslation()

  const finalUserRole = useMemo(() => {
    let userRoleItems: UserRoleItem[] = showOwner
      ? [
          {
            role: USER_ROLE.OWNER,
            tips: t("user_management.role.tips.owner"),
            name: t("user_management.role.owner"),
          },
        ]
      : []

    userRoleItems = [
      ...userRoleItems,
      {
        role: USER_ROLE.ADMIN,
        tips: t("user_management.role.tips.admin"),
        name: t("user_management.role.admin"),
      },
      {
        role: USER_ROLE.EDITOR,
        tips: t("user_management.role.tips.editor"),
        name: t("user_management.role.editor"),
      },
      {
        role: USER_ROLE.VIEWER,
        tips: t("user_management.role.tips.viewer"),
        name: t("user_management.role.viewer"),
      },
    ]

    return userRoleItems.filter(
      (i) =>
        !excludeUserRole?.includes(i.role) &&
        isBiggerThanTargetRole(i.role, currentUserRole),
    )
  }, [currentUserRole, excludeUserRole, showOwner, t])

  return (
    <Dropdown
      disabled={!canEdit}
      onVisibleChange={(visible) => {
        setMenuVisible(visible)
      }}
      dropList={
        <DropList
          onClickItem={(value) => {
            onClickItem?.(value as USER_ROLE)
          }}
        >
          {finalUserRole.map((item) => (
            <DropListItem
              value={item.role}
              title={
                <div css={itemContainer}>
                  <div>{item.name}</div>
                  {!withoutTips && (
                    <TriggerProvider zIndex={1000}>
                      <Trigger
                        trigger="hover"
                        position="top"
                        content={item.tips}
                      >
                        <div css={doubtStyle}>
                          <DoubtIcon />
                        </div>
                      </Trigger>
                    </TriggerProvider>
                  )}
                  {value === item.role && (
                    <div css={successStyle}>
                      <SuccessIcon />
                    </div>
                  )}
                </div>
              }
              key={item.role}
            />
          ))}
        </DropList>
      }
      position="bottom-end"
      trigger="click"
    >
      <div css={roleSelectorRoleContainer}>
        <div css={applyRoleOuterLabelStyle(inline)}>
          {finalUserRole.find((item) => item.role === value)?.name}
        </div>
        {canEdit && (
          <div css={roleOuterIconStyle}>
            {menuVisible ? <UpIcon /> : <DownIcon />}
          </div>
        )}
      </div>
    </Dropdown>
  )
}