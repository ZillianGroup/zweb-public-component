import { SerializedStyles } from "@emotion/react"
import { ZWEBCodeMirrorProps } from "./CodeMirror/interface"

export interface CodeEditorProps
  extends Omit<
    ZWEBCodeMirrorProps,
    | "hasError"
    | "resultType"
    | "result"
    | "executionResult"
    | "expressions"
    | "canShowResultRealtime"
  > {
  wrapperCss?: SerializedStyles
}
