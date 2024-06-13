import {
  Grid,
  Pagination,
  Typography,
  TextField,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CardsList from "./cards/CardsList";
import axios from "axios";
import { UrlSite } from "../utils";
import Waiter from "./waiter/Waiter";
import CapitalizeFirstLetter from "../Helper/CapitalizeFirstLetter";
import { TextInput } from "react-admin";

interface CarData {
  id: number;
  name: string;
  type: string;
  model: string;
  motorType: string;
}

function ProductList() {
  const [data, setData] = useState<CarData[]>([]);
  const [page, setPage] = useState<number>(1);
  const [load, setLoad] = useState<boolean>(true);
  const [pageNumber, setPageNumber] = useState<number>(0);

  const [nameFilter, setNameFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [modelFilter, setModelFilter] = useState<string>("");

  const [type, setType] = useState<{ name: string }[]>([]);
  const [brand, setBrand] = useState<{ name: string }[]>([]);
  const [typeMotor, setTypeMotor] = useState<{ name: string }[]>([]);
  const [color, setColor] = useState<{ name: string }[]>([]);
  const [model, setModel] = useState<{ name: string }[]>([]);
  const [name, setName] = useState<{ name: string }[]>([]);

  useEffect(() => {
    Promise.all([
      axios.get(UrlSite("cars/type")),
      axios.get(UrlSite("cars/brand")),
      axios.get(UrlSite("cars/type-motor")),
      axios.get(UrlSite("cars/color")),
      axios.get(UrlSite("cars/model")),
      axios.get(UrlSite("cars/name")),
    ])
      .then(
        ([
          typesResponse,
          brandsResponse,
          typeMotorResponse,
          colorResponse,
          modelResponse,
          nameResponse,
        ]) => {
          const formattedTypes = typesResponse.data.map((item: string) => ({
            name: item,
          }));
          const formattedBrands = brandsResponse.data.map((item: string) => ({
            name: item,
          }));
          const formattedMotorType = typeMotorResponse.data.map(
            (item: string) => ({
              name: item,
            })
          );
          const formatteColor = colorResponse.data.map((item: string) => ({
            name: item,
          }));
          const formatteModel = modelResponse.data.map((item: string) => ({
            name: item,
          }));
          const formatteName = nameResponse.data.map((item: string) => ({
            name: item,
          }));
          setType(formattedTypes);
          setBrand(formattedBrands);
          setTypeMotor(formattedMotorType);
          setColor(formatteColor);
          setModel(formatteModel);
          setName(formatteName);
        }
      )
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: UrlSite(`cars`),
      params: {
        page: page,
        perPage: 8,
      },
    };
    axios
      .request(config)
      .then((response) => {
        setData(response.data.items);
        setPageNumber(response.data.totalPages);
        setLoad(false);
      })
      .catch((error) => {
        console.error("tsy mandeha url articles");
        console.error(error);
        setLoad(false);
      });
  }, [page]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    setLoad(true);
  };

  const handleNameFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNameFilter(event.target.value);
  };

  const handleTypeFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTypeFilter(event.target.value);
  };
  const handleModeFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setModelFilter(event.target.value);
  };

  if (load) {
    return <Waiter loadingState={load} />;
  } else {
    return (
      <>
        <Grid
          container
          justifyContent={"space-around"}
          alignContent={"center"}
          alignItems={"center"}
          my={2}
        >
          <Grid
            container
            justifyContent={"center"}
          >
            <Typography
              variant="h4"
              fontWeight={"bolder"}
              fontFamily={"revert"}
            >
              Cars list
            </Typography>
          </Grid>

          <Grid container item sm={10} justifyContent={"space-between"} px={1}>
            {/* <Grid container item sm={2}>
              <Autocomplete
                size="small"
                options={name.map((option) =>
                  CapitalizeFirstLetter(option.name)
                )}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    label="Name"
                    {...params}
                    fullWidth
                    type="search"
                    onChange={handleNameFilterChange}
                  />
                )}
              />
            </Grid> */}

            {/* <Grid container item sm={2}>
              <TextField
                variant="outlined"
                size="small"
                type="search"
                select
                label="Type"
                fullWidth
                onChange={handleTypeFilterChange}
                value={typeFilter}
              >
                {type.map((option: any) => (
                  <MenuItem
                    key={option.name}
                    value={option.name}
                    sx={{ width: "100%" }}
                  >
                    {CapitalizeFirstLetter(option.name)}
                  </MenuItem>
                ))}
              </TextField>
            </Grid> */}
            {/* <Grid container item sm={2}>
              <TextField
                variant="outlined"
                size="small"
                type="search"
                select
                label="Model"
                fullWidth
                onChange={handleModeFilterChange}
                value={modelFilter}
              >
                {model.map((option: any) => (
                  <MenuItem
                    key={option.name}
                    value={option.name}
                    sx={{ width: "100%" }}
                  >
                    {CapitalizeFirstLetter(option.name)}
                  </MenuItem>
                ))}
              </TextField>
            </Grid> */}
            {/* <Grid container item sm={2}>
              <TextField
                variant="outlined"
                size="small"
                type="search"
                select
                label="Motor type"
                fullWidth
                onChange={handleTypeFilterChange}
                value={typeFilter}
              >
                {typeMotor.map((option: any) => (
                  <MenuItem
                    key={option.name}
                    value={option.name}
                    sx={{ width: "100%" }}
                  >
                    {CapitalizeFirstLetter(option.name)}
                  </MenuItem>
                ))}
              </TextField>
            </Grid> */}
            {/* <Grid container item sm={2}>
              <TextField
                variant="outlined"
                size="small"
                type="search"
                select
                label="Price min"
                fullWidth
                onChange={handleTypeFilterChange}
                value={typeFilter}
              >
                {typeMotor.map((option: any) => (
                  <MenuItem
                    key={option.name}
                    value={option.name}
                    sx={{ width: "100%" }}
                  >
                    {CapitalizeFirstLetter(option.name)}
                  </MenuItem>
                ))}
              </TextField>
            </Grid> */}
            {/* <Grid container item sm={2}>
              <TextField
                variant="outlined"
                size="small"
                type="search"
                select
                label="Price Max"
                fullWidth
                onChange={handleTypeFilterChange}
                value={typeFilter}
              >
                {typeMotor.map((option: any) => (
                  <MenuItem
                    key={option.name}
                    value={option.name}
                    sx={{ width: "100%" }}
                  >
                    {CapitalizeFirstLetter(option.name)}
                  </MenuItem>
                ))}
              </TextField>
            </Grid> */}
          </Grid>
        </Grid>
        {data.map((item, index) => (
          <Grid mb={3} key={index} px={2}>
            <CardsList data={item} />
          </Grid>
        ))}

        <Grid container justifyContent={"center"}>
          <Pagination
            count={pageNumber}
            page={page}
            onChange={handlePageChange}
            showFirstButton
            showLastButton
          />
        </Grid>
      </>
    );
  }
}

export default ProductList;
