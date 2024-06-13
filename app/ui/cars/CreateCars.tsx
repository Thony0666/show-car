import { UrlSite } from "@/app/utils";
import { Add, Clear, Save } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import {
  Create,
  TextInput,
  NumberInput,
  required,
  SimpleForm,
  FileInput,
  SaveButton,
  FormDataConsumer,
} from "react-admin";
import CapitalizeFirstLetter from "@/app/Helper/CapitalizeFirstLetter";

const CustomSaveButton = (props: any) => (
  <Button variant="contained" color="primary" {...props}>
    Custom Save
  </Button>
);

const CustomToolbar = (props: any) => (
  <Grid container justifyContent={"flex-end"} pr={4}>
    <Toolbar {...props}>
      <SaveButton color="warning" label="Save" icon={<Save />} />
    </Toolbar>
  </Grid>
);

const UploadImages = ({ formData }: any) => (
  <Grid
    container
    sx={{
      display: "flex",
      overflowY: "auto",
      overflowX: "hidden",
      maxWidth: "100%",
      borderRadius: 1,
      "&::-webkit-scrollbar": {
        display: "none",
      },
    }}
  >
    {formData.images &&
      [...formData.images].slice(0, 6).map((file: any, index: number) => (
        // <Grid container key={index} >
        <Image
          key={file}
          src={URL.createObjectURL(file.rawFile)}
          alt={file.title}
          width={300}
          height={300}
          style={{ borderRadius: "8px" }}
        />
        // </Grid>
      ))}
  </Grid>
);

const CreateCar = () => {
  const [showField, setShowField] = useState<boolean>(false);
  const [showFieldBrand, setShowFieldBrand] = useState<boolean>(false);
  const [showFieldMotorType, setShowFieldMotorType] = useState<boolean>(false);
  const [showFieldColor, setShowFieldColor] = useState<boolean>(false);
  const [showFieldModel, setShowFieldModel] = useState<boolean>(false);
  const [type, setType] = useState<{ name: string }[]>([]);
  const [brand, setBrand] = useState<{ name: string }[]>([]);
  const [typeMotor, setTypeMotor] = useState<{ name: string }[]>([]);
  const [color, setColor] = useState<{ name: string }[]>([]);
  const [model, setModel] = useState<{ name: string }[]>([]);

  useEffect(() => {
    Promise.all([
      axios.get(UrlSite("cars/type")),
      axios.get(UrlSite("cars/brand")),
      axios.get(UrlSite("cars/type-motor")),
      axios.get(UrlSite("cars/color")),
      axios.get(UrlSite("cars/model")),
    ])
      .then(
        ([
          typesResponse,
          brandsResponse,
          typeMotorResponse,
          colorResponse,
          modelResponse,
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
          setType(formattedTypes);
          setBrand(formattedBrands);
          setTypeMotor(formattedMotorType);
          setColor(formatteColor);
          setModel(formatteModel);
        }
      )
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Create redirect="show">
      <SimpleForm
        toolbar={<CustomToolbar />}
        defaultValues={{ status: "AVAILABLE" }}
      >
        <Grid container>
          <Grid container item sm={6}>
            <Grid container justifyContent={"center"}>
              <Typography
                variant="h4"
                fontWeight={"bold"}
                fontFamily={"revert"}
              >
                Car Details
              </Typography>
            </Grid>
            <Grid
              container
              item
              sm={6}
              mt={3}
              sx={{ overflowY: "auto" }}
              maxHeight={"35vh"}
              minHeight={"35vh"}
              boxShadow={"0 0 10px"}
              borderRadius={3}
            >
              <FormDataConsumer>
                {({ formData, ...rest }) => (
                  <FileInput
                    source="images"
                    label={
                      <Typography
                        variant="h4"
                        textAlign={"center"}
                        color={"orange"}
                      >
                        Car Images
                      </Typography>
                    }
                    accept="image/*"
                    multiple
                    {...rest}
                  >
                    <UploadImages formData={formData} />
                  </FileInput>
                )}
              </FormDataConsumer>
            </Grid>
            <Grid container sm={6} p={2}>
              <TextInput
                source="name"
                validate={[required()]}
                variant="outlined"
                fullWidth
              />
              <NumberInput
                source="price"
                validate={[required()]}
                variant="outlined"
                fullWidth
              />
              <TextInput
                source="description"
                multiline={true}
                label="Description"
                validate={[required()]}
                rows={4}
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid
            container
            item
            sm={6}
            justifyContent={"space-evenly"}
            alignContent={"center"}
            borderLeft={"rgb(0,0,0,0.5) solid 1px"}
            
          >
            <Grid container justifyContent={"center"}>
              <Typography
                variant="h4"
                fontWeight={"bold"}
                fontFamily={"revert"}
              >
                Car Spec
              </Typography>
            </Grid>
            <Grid
              container
              justifyContent={"center"}
              alignItems={"center"}
              item
              sm={5}
            >
              {showFieldBrand ? (
                <Grid container justifyContent={"space-between"}>
                  <TextInput
                    source="brand"
                    validate={[required()]}
                    fullWidth
                    type="search"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {" "}
                          <IconButton
                            onClick={() => {
                              setShowFieldBrand(false);
                            }}
                          >
                            <Clear />
                          </IconButton>{" "}
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              ) : (
                <Grid container justifyContent={"space-between"}>
                  <TextInput
                    select
                    source="brand"
                    validate={[required()]}
                    fullWidth
                  >
                    {brand.map((option) => (
                      <MenuItem
                        key={option.name}
                        value={option.name}
                        sx={{ width: "100%" }}
                      >
                        {CapitalizeFirstLetter(option.name)}
                      </MenuItem>
                    ))}
                    <Grid container justifyContent={"center"}>
                      <Grid
                        mt={1}
                        border={"violet solid 2px"}
                        borderRadius={1}
                        overflow={"hidden"}
                      >
                        <Button
                          variant="outlined"
                          onClick={() => {
                            setShowFieldBrand(true);
                          }}
                          style={{
                            padding: "4px",
                            fontStyle: "italic",
                            fontWeight: "lighter",
                            color: "violet",
                          }}
                        >
                          <Add />
                          Other Brand
                        </Button>
                      </Grid>
                    </Grid>{" "}
                  </TextInput>
                </Grid>
              )}
            </Grid>
            <Grid
              container
              justifyContent={"center"}
              alignItems={"center"}
              item
              sm={5}
              
            >
              {showFieldModel ? (
                <Grid container justifyContent={"space-between"} >
                  <TextInput
                    source="model"
                    validate={[required()]}
                    fullWidth
                    type="search"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {" "}
                          <IconButton
                            onClick={() => {
                              setShowFieldModel(false);
                            }}
                          >
                            <Clear />
                          </IconButton>{" "}
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              ) : (
                <Grid container justifyContent={"space-between"} >
                  <TextInput
                    select
                    source="model"
                    type="search"
                    defaultValue={""}
                    validate={[required()]}
                    fullWidth
                  >
                    {model.map((option) => (
                      <MenuItem
                        key={option.name}
                        value={option.name}
                        sx={{ width: "100%" }}
                      >
                        {CapitalizeFirstLetter(option.name)}
                      </MenuItem>
                    ))}
                    <Grid container justifyContent={"center"}>
                      <Grid
                        border={"violet solid 2px"}
                        borderRadius={1}
                        overflow={"hidden"}
                        mt={2}
                      >
                        <Button
                          variant="outlined"
                          onClick={() => {
                            setShowFieldModel(true);
                          }}
                          style={{
                            padding: "4px",
                            fontStyle: "italic",
                            fontWeight: "lighter",
                            color: "violet",
                          }}
                        >
                          <Add />
                          Other Model
                        </Button>
                      </Grid>
                    </Grid>{" "}
                  </TextInput>
                </Grid>
              )}
            </Grid>
            <Grid
              container
              justifyContent={"center"}
              alignItems={"center"}
              item
              sm={5}
            >
              {showFieldColor ? (
                <Grid container justifyContent={"space-between"}>
                  <TextInput
                    source="Color"
                    validate={[required()]}
                    fullWidth
                    type="search"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {" "}
                          <IconButton
                            onClick={() => {
                              setShowFieldColor(false);
                            }}
                          >
                            <Clear />
                          </IconButton>{" "}
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              ) : (
                <Grid container justifyContent={"space-between"}>
                  <TextInput
                    select
                    source="color"
                    validate={[required()]}
                    fullWidth
                  >
                    {color.map((option) => (
                      <MenuItem
                        key={option.name}
                        value={option.name}
                        sx={{ width: "100%" }}
                      >
                        {CapitalizeFirstLetter(option.name)}
                      </MenuItem>
                    ))}
                    {/* </Grid> */}
                    <Grid container justifyContent={"center"}>
                      <Grid
                        mt={1}
                        border={"violet solid 2px"}
                        borderRadius={1}
                        overflow={"hidden"}
                      >
                        <Button
                          variant="outlined"
                          onClick={() => {
                            setShowFieldColor(true);
                          }}
                          style={{
                            padding: "4px",
                            fontStyle: "italic",
                            fontWeight: "lighter",
                            color: "violet",
                          }}
                        >
                          <Add />
                          Other Color
                        </Button>
                      </Grid>
                    </Grid>{" "}
                  </TextInput>
                </Grid>
              )}
            </Grid>
            <Grid
              container
              justifyContent={"center"}
              alignItems={"center"}
              item
              sm={5}
            >
              {showFieldMotorType ? (
                <Grid container justifyContent={"space-between"}>
                  <TextInput
                    source="motorType"
                    validate={[required()]}
                    fullWidth
                    type="search"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {" "}
                          <IconButton
                            onClick={() => {
                              setShowFieldMotorType(false);
                            }}
                          >
                            <Clear />
                          </IconButton>{" "}
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              ) : (
                <Grid container justifyContent={"space-between"}>
                  <TextInput
                    select
                    source="motorType"
                    validate={[required()]}
                    fullWidth
                  >
                    {typeMotor.map((option) => (
                      <MenuItem
                        key={option.name}
                        value={option.name}
                        sx={{ width: "100%" }}
                      >
                        {CapitalizeFirstLetter(option.name)}
                      </MenuItem>
                    ))}
                    {/* </Grid> */}
                    <Grid container justifyContent={"center"}>
                      <Grid
                        mt={1}
                        border={"violet solid 2px"}
                        borderRadius={1}
                        overflow={"hidden"}
                      >
                        <Button
                          variant="outlined"
                          onClick={() => {
                            setShowFieldMotorType(true);
                          }}
                          style={{
                            padding: "4px",
                            fontStyle: "italic",
                            fontWeight: "lighter",
                            color: "violet",
                          }}
                        >
                          <Add />
                          Other Motor type
                        </Button>
                      </Grid>
                    </Grid>{" "}
                  </TextInput>
                </Grid>
              )}
            </Grid>
            <NumberInput
              source="power"
              validate={[required()]}
              variant="outlined"
            />
            <NumberInput
              source="placeNumber"
              validate={[required()]}
              variant="outlined"
            />
            <Grid container justifyContent={"center"} alignItems={"center"}>
              {showField ? (
                <Grid container justifyContent={"space-between"} item sm={5}>
                  <TextInput
                    source="type"
                    validate={[required()]}
                    fullWidth
                    type="search"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {" "}
                          <IconButton
                            onClick={() => {
                              setShowField(false);
                            }}
                          >
                            <Clear />
                          </IconButton>{" "}
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              ) : (
                <Grid container justifyContent={"space-between"} item sm={5}>
                  <TextInput
                    select
                    source="type"
                    type="search"
                    defaultValue={""}
                    validate={[required()]}
                    fullWidth
                  >
                    {/* <Grid
                    
                      direction={"row"}
                      maxHeight={200}
                      width={"100%"}
                      sx={{
                        overflowY: "auto",
                        "&::-webkit-scrollbar": (props: any) => ({
                          width: "8px",
                          backgroundColor: "white",
                          borderRadius: 3,
                        }),
                      }}
                    > */}
                    {type.map((option) => (
                      <MenuItem
                        key={option.name}
                        value={option.name}
                        sx={{ width: "100%" }}
                      >
                        {option.name}
                      </MenuItem>
                    ))}
                    {/* </Grid> */}
                    <Grid container justifyContent={"center"}>
                      <Grid
                        border={"violet solid 2px"}
                        borderRadius={1}
                        overflow={"hidden"}
                        mt={2}
                      >
                        <Button
                          variant="outlined"
                          onClick={() => {
                            setShowField(true);
                          }}
                          style={{
                            padding: "4px",
                            fontStyle: "italic",
                            fontWeight: "lighter",
                            color: "violet",
                          }}
                        >
                          <Add />
                          Other Type
                        </Button>
                      </Grid>
                    </Grid>{" "}
                  </TextInput>
                </Grid>
              )}
            </Grid>
            <TextInput
              style={{ display: "none" }}
              source="status"
              defaultValue="AVAILABLE"
            />
          </Grid>
        </Grid>
      </SimpleForm>
    </Create>
  );
};

export default CreateCar;
