import React, { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
} from "@mui/material"
import { Download } from "@mui/icons-material"
import { DownloadBtn } from "../../pages/Login/loginStyles"
import { saveAs } from "file-saver"
import axios, { AxiosResponse } from "axios"
import { DownloadDiv, PaginationDiv } from "./dataTableStyles"

const PAGE_SIZE = 10

const DataTable: React.FC<{ data: Array<any> }> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1)

  const date = Date().split(" ")

  const txndateStr = `${date[2]}_${date[1]}_${date[3]}_${date[4]}`

  const handleDownload = ({ fileUrl, id }: any) => {
    const fileName = `File_${txndateStr}_${id}`
    axios
      .get(fileUrl, { responseType: "blob" })
      .then((response: AxiosResponse<Blob>) => {
        if (!response.data) {
          throw new Error("Network response was not ok")
        }
        saveAs(response.data, fileName)
        axios
          .put(`http://192.168.1.2:3000/userfiles/download_success?id=${id}`)
          .catch((error) => {
            console.error("Error calling download success API:", error)
          })
      })
      .catch((error) => console.error("Error downloading the file:", error))
  }

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1)
  }

  let currentRows = []

  if (Array.isArray(data)) {
    const startIdx = (currentPage - 1) * PAGE_SIZE
    const endIdx = startIdx + PAGE_SIZE
    currentRows = data.slice(startIdx, endIdx)
  }

  return (
    <>
      <TableContainer component={Paper} style={{ height: "83.4vh" }}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "gray" }}>
              <TableCell>
                <Typography variant="subtitle1" color={"white"}>
                  Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" color={"white"}>
                  PAN No.
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" color={"white"}>
                  Mobile No.
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" color={"white"}>
                  File
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" color={"white"}>
                  Download
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRows.map((row, index) => (
              <TableRow key={index} style={{ backgroundColor: "white" }}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.pan_no}</TableCell>
                <TableCell>{row.mobile_no}</TableCell>
                <TableCell>{row.file}</TableCell>
                <TableCell>
                  <DownloadBtn
                    style={{ padding: "0px !important" }}
                    onClick={() =>
                      handleDownload({ fileUrl: row.file, id: row.id })
                    }
                  >
                    <DownloadDiv>
                      <Typography color="blue">Download</Typography>
                      <Download style={{ color: "blue" }} />
                    </DownloadDiv>
                  </DownloadBtn>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PaginationDiv>
        <Button
          variant="contained"
          color="primary"
          disabled={currentPage === 1}
          onClick={handlePreviousPage}
          sx={{ marginRight: "10px" }}
        >
          Previous Page
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={currentRows.length < PAGE_SIZE}
          onClick={handleNextPage}
        >
          Next Page
        </Button>
      </PaginationDiv>
    </>
  )
}

export default DataTable
