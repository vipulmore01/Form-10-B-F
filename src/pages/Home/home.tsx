import Typography from "@mui/material/Typography"
import DataTable from "../../components/DataTable"
import { useLocation } from "react-router-dom"

export const Home = () => {
  const location = useLocation()
  const responseData = location?.state?.responseData?.userObj || []

  return (
    <div style={{ margin: "16px" }}>
      <Typography
        fontSize={24}
        fontWeight={600}
        textAlign={"center"}
        marginBottom={2}
      >
        Mobile Pan Table
      </Typography>
      <DataTable data={responseData} />
    </div>
  )
}
