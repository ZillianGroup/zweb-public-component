import { SubmitHandler } from "react-hook-form"
import {
  RegisterErrorMsg,
  RegisterFields,
} from "@/illa-public-component/User/register/interface"

export interface MobileRegisterProps {
  lockedEmail?: string | null
  loading: boolean
  errorMsg: RegisterErrorMsg
  onSubmit: SubmitHandler<RegisterFields>
  showCountDown: boolean
  onCountDownChange: (showCountDown: boolean) => void
}
