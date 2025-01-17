import { getCurrentTeamInfo, getPlanUtils } from "@zweb-public/user-data"
import { canManageCollar } from "@zweb-public/user-role-utils"
import { FC, useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useMessage } from "@zweb-design/react"
import { CollarModal } from "../../component/CollarModal"
import { OPERATION_NO_PERMISSION } from "../constants"
import { ModalShowProps } from "./interface"
import { modalStore } from "./store"

export const UpgradeCollarModal: FC = () => {
  const [modal, setModal] = useState<ModalShowProps | null>(null)
  const currentTeamInfo = useSelector(getCurrentTeamInfo)
  const message = useMessage()
  const { t } = useTranslation()
  const canManageThisCollar = canManageCollar(
    currentTeamInfo?.myRole,
    getPlanUtils(currentTeamInfo),
  )

  useEffect(() => {
    const listener = modalStore.subscribe(() => {
      setModal(modalStore.getModal())
    })
    return () => {
      modalStore.unSubscribe(listener.listenerId)
    }
  }, [])

  const collarModal = useMemo(() => {
    if (!modal) return null
    if (currentTeamInfo && !canManageThisCollar && modal.visible) {
      message.info({
        content: t(OPERATION_NO_PERMISSION[modal.modalType]),
      })
      modalStore.remove()
      return null
    }
    return (
      <CollarModal
        modalType={modal.modalType}
        visible={modal.visible}
        onCancel={() => {
          if (modal.id) {
            modalStore.update({ ...modal, visible: false })
          }
        }}
        afterClose={() => modalStore.remove()}
      />
    )
  }, [canManageThisCollar, currentTeamInfo, message, modal, t])

  return <>{collarModal}</>
}

UpgradeCollarModal.displayName = "UpgradeCollarModal"
