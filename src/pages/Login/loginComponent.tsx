import { Box, TextField, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { Main, Submit } from "./loginStyles"
import { useState } from "react"
import axios from "axios"

const MobilePanComponent = () => {
  const navigate = useNavigate()
  const [mobileNumber, setMobileNumber] = useState<string>("")
  const [panNumber, setPanNumber] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState<string>("")

  const handleMobileNumberChange = async (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMobileNumber(event.target.value)
  }
  const handlePanNumberChange = async (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPanNumber(event.target.value)
  }
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      const response = await axios.get(
        "http://192.168.1.2:3000/userfiles/get_user_files",
        {
          params: {
            mobile_no: mobileNumber,
            pan_no: panNumber,
          },
        }
      )

      if (response.data.error) {
        setErrorMessage(response?.data?.msg)
      } else {
        navigate("/home", { state: { responseData: response.data } })
      }
    } catch (error: any) {
      console.error("API Error:", error)
      if (error.response && error.response.data && error.response.data?.msg) {
        setErrorMessage(error?.response?.data.msg)
      }
    }
  }
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      borderRadius={8}
    >
      <Main maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={4}>
            <Typography
              textAlign={"center"}
              fontSize={24}
              fontWeight={600}
              paddingTop={4}
            >
              Mobile Pan Table Manager
            </Typography>
            <TextField
              label="Mobile Number"
              value={mobileNumber}
              variant="outlined"
              type="tel"
              required
              fullWidth
              onChange={(e) => {
                handleMobileNumberChange(e)
              }}
            />
            <TextField
              label="Pan Number"
              variant="outlined"
              value={panNumber}
              required
              fullWidth
              onChange={(e) => {
                handlePanNumberChange(e)
              }}
            />
            <span style={{ color: "red" }}>{errorMessage}</span>
            <Submit type="submit" variant="contained" color="primary">
              Submit
            </Submit>
          </Box>
        </form>
      </Main>
    </Box>
  )
}

export default MobilePanComponent
