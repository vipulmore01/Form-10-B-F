import styled from "@emotion/styled"
import { Button, Container, IconButton } from "@mui/material"
import theme from "../../theme"

export const Submit = styled(Button)`
  padding: 12.5px 14px !important;
  margin-bottom: 40px;
`
export const DownloadBtn = styled(IconButton)`
  padding: 0px !important;
`
export const Main = styled(Container)`
  background-color: white;
  border-radius: 16;
  padding: 32;
  box-shadow: 0px 8px 16px rgba(95, 94, 97, 0.05);
  ${theme.breakpoints.between(320, 768)} {
    border-radius: 0px;
    height: 100vh;
  }
`
