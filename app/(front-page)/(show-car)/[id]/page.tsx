"use client";
import Header from "@/app/components/Header";
import { Box, Button, Grid, Pagination, Typography } from "@mui/material";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ModalApp from "@/app/components/modal/ModalAppoint";
import axios from "axios";
import CardAnnex from "@/app/components/cards/CardAnnex";
import { UrlSite } from "@/app/utils";
import { grey } from "@mui/material/colors";
import TableSpec from "@/app/components/TableSpec";
import Link from "next/link";
import Waiter from "@/app/components/waiter/Waiter";

interface Data {
  id: number;
  name: string;
  description: string;
  brand: string;
  model: string;
  price: number;
  color: string;
  motorType: string;
  type: string;
  power: number;
  placeNumber: number;
  status: string;
  images: { id: number; url: string }[];
}

function Page() {
  const params = useParams();
  const [open, setOpen] = useState<boolean>(false);
  const [datas, setData] = useState<Data | null>(null);
  const [datasAnnex, setDataAnnex] = useState<Data[]>([]);
  const [imageList, setImage] = useState<{ id: number; url: string }[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [page, setPage] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [load, setLoad] = useState<boolean>(true);

  const handleClick = (image: { id: number; url: string }) => {
    setSelectedImage(image.url);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(UrlSite(`cars/${params.id}`));
        setData(response.data);
        setImage(response.data.images);
        if (response.data.images.length > 0) {
          setSelectedImage(response.data.images[0].url);
        }
        setLoad(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [params.id]);

  useEffect(() => {
    if (datas) {
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: UrlSite(`cars/type/${datas.type}/exclude/${params.id}`),
        params: {
          page: page,
          perPage: 8,
        },
      };
      axios
        .request(config)
        .then((response) => {
          setDataAnnex(response.data.items);
          setPageNumber(response.data.totalPages);
        })
        .catch((error) => {
          console.error("tsy mandeha url articles");
          console.error(error);
        });
    }
  }, [page, params.id, datas]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (load) {
    return <Waiter loadingState={load} />;
  } else {
    return (
      <>
        <ModalApp open={open} setOpen={setOpen} data={datas} />
        <Grid container zIndex={999}>
          <Header color="black" />
        </Grid>
        <Grid container bgcolor={grey[200]} overflow={"hidden"}>
          <Grid container item sm={8} justifyContent={"center"} p={2}>
            <Grid container boxShadow={"0 0 5px"}>
              <Grid container item sm={6} alignContent={"flex-start"}>
                <Grid container maxHeight={"50vh"} minHeight={"50vh"} mx={2} p={1} justifyContent={'center'} width={"95%"} overflow={"hidden"} position={"relative"}>
                  <Grid container alignContent={"center"} justifyContent={'center'}>
                    <Grid position={"relative"} >
                      {selectedImage && (
                        <Image src={selectedImage} alt="image" style={{ width: "100%" }} width={600} height={600} />
                      )}
                      <Grid position={"absolute"} top={20} color={"orange"} zIndex={999} left={0}>
                        <Grid px={2} bgcolor={"orange"}>
                          <Typography variant="h4" fontWeight={"bold"} color={"white"}>
                            {datas?.price} MGA
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container padding={1} minHeight={250} className="photoGrid" justifyContent={"center"} >
                  {imageList.map((image) => (
                    <Grid
                      key={image.id}
                      item
                      xs={5.5}
                      m={1}
                      onClick={() => handleClick(image)}
                      sx={{
                        position: "relative",
                        width: "100%",
                        overflow: "hidden",
                        "&:hover img": {
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      <Link href={"#"}>
                        <Image src={image.url} alt="image" layout="fill" objectFit="cover" />
                      </Link>
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
                      ></Box>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid container justifyContent={"center"} alignContent={"space-evenly"} item sm={6} px={2}>
                <Grid container justifyContent={"center"}>
                  <Typography variant="h4" fontFamily={"revert"} fontWeight={"bold"}>
                    {datas?.name}
                  </Typography>
                </Grid>
                <Grid container justifyContent={"space-around"} alignContent={"flex-start"}>
                  <Grid container>
                    <TableSpec data={datas} />
                    <Grid container justifyContent={"flex-end"} my={1}>
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
                          setOpen(true);
                        }}
                      >
                        Appointment
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent={"space-around"}
            item
            sm={4}
            borderLeft={"rgb(0,0,0,0.2) solid 1px"}
            alignContent={"center"}
          >
            <Grid container justifyContent={"space-evenly"} maxHeight={"80vh"} sx={{ overflowY: "auto" }} pt={2}>
              {datasAnnex.map((item) => (
                <Grid key={item.id}>
                  <CardAnnex data={item} />
                </Grid>
              ))}
            </Grid>
            <Grid container justifyContent={"center"} pt={2}>
              <Pagination
                color="primary"
                count={pageNumber}
                page={page}
                onChange={handlePageChange}
                showFirstButton
                showLastButton
              />
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default Page;
