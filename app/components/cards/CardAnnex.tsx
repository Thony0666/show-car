import { Box, Button, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import imgList from "@/assets/images/blue-jeep-photo-shooting-sunset.jpg";
import Link from "next/link";

function CardAnnex({ data }: any) {
  const datas = data;
  return (
    <>
      <Grid
        container
        minHeight={"36vh"}
        maxHeight={"36vh"}
        minWidth={"14vw"}
        maxWidth={"14vw"}
        alignContent={"flex-start"}
        boxShadow={"0  0  10px"}
        overflow={'hidden'}
        mb={2}
      >
        <Grid
          maxHeight={"25vh"}
          justifyContent={"center"}
          alignContent={"center"}
          overflow={"hidden"}
          position={"relative"}
        >
          <Image src={datas.images[0].url} alt={`img`} style={{ width: "100%" }} width={200} height={200}/>
          <Grid
                position={"absolute"}
                top={20}
                color={"orange"}
                zIndex={999}
                left={0}
              >
                <Grid px={1} bgcolor={"orange"}>
                  <Typography variant="body2" fontWeight={"bold"} color={"white"}>
                    {datas.price} MGA
                  </Typography>
                </Grid>
              </Grid>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              opacity: 0,
              transition: "opacity 0.3s ease",
              "&:hover": {
                opacity: 1,
              },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link href={`${datas.id}`}>
              <Button
                variant="text"
                sx={{ border: "orange 2px solid", color:'orange'}}
              >
                show
              </Button>
            </Link>
          </Box>
        </Grid>
        <Grid container pt={1} pl={1} direction={"column"}>
          <Typography
            color={"orange"}
            variant="h6"
            fontFamily={"revert-layer"}
            fontWeight={"bold"}
          >
            {datas.name}
          </Typography>
          <Grid container justifyContent={"left"} mb={1}>
            <Typography variant="body1" fontFamily={"revert"}>
              <span style={{ fontWeight: "bold" }}> Color :</span>Red
            </Typography>
          </Grid>
          <Grid container justifyContent={"left"} mb={1}>
            <Typography variant="body1" fontFamily={"revert"}>
              <span style={{ fontWeight: "bold" }}> Power :</span>150cv
            </Typography>
          </Grid>
          <Grid container justifyContent={"flex-end"} pr={1} mt={-3}>
            <Link href={`${datas.id}`}>
              <Button
                variant="contained"
                color="warning"
                sx={{
                  bgcolor: "orange",
                  fontFamily: "revert-layer",
                  fontSize: "small",
                }}
                size="small"
                onClick={() => {
                  // setOpen(true);
                }}
              >
                show
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default CardAnnex;
