import { FC } from "react"
import { createPortal } from "react-dom"
import { InviteMemberModal } from "./InviteMemberModalContent"
import { InviteMemberModalProps } from "./interface"

export interface InviteModalProps extends InviteMemberModalProps {
  visible: boolean
}

export const InviteModal: FC<InviteModalProps> = (props) => {
  const { visible, ...memberModalProps } = props

  return (
    <div>
      {visible &&
        createPortal(
          // current only one reference to this component for builder_app and builder_editor
          <InviteMemberModal from="builder_app" {...memberModalProps} />,
          document.body,
        )}
    </div>
  )
}
