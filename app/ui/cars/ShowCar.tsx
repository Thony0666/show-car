import {
  Show,
  SimpleShowLayout,
  TextField,
  RichTextField,
  ReferenceField,
  ImageField,
} from "react-admin";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

const ShowCar = () => (
  <Show>
    <Card>
      <CardContent>
        <SimpleShowLayout>
          <Grid container alignContent={"flex-start"}>
            <Grid container item sm={6} alignContent={"flex-start"}>
              <ImageField
                source="images[0].url"
                title="Cars image"
                sx={{
                  "& img": {
                    minWidth: 600,
                    minHeight: 600,
                    maxHeight: 600,
                    maxWidth: 600,
                    objectFit: "contain",
                  },
                }}
              />
            </Grid>
            <Grid container item sm={6} px={2} justifyContent={"center"}>
              <Grid container>
                <Typography variant="h4" fontWeight={"bold"}>
                  Car Specs
                </Typography>
              </Grid>

              <Grid
                container
                direction={"column"}
                borderBottom={"white solid 0.5px"}
              >
                <Typography
                  variant="caption"
                  fontStyle={"italic"}
                  fontWeight={"lighter"}
                >
                  Car
                </Typography>
                <TextField
                  source="name"
                  sx={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    fontFamily: "revert",
                    textTransform: "capitalize",
                  }}
                />
              </Grid>
              <Grid
                container
                direction={"column"}
                borderBottom={"white solid 0.5px"}
              >
                <Typography
                  variant="caption"
                  fontStyle={"italic"}
                  fontWeight={"lighter"}
                >
                  Brand
                </Typography>
                <TextField
                  source="brand"
                  sx={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    fontFamily: "revert",
                    textTransform: "capitalize",
                  }}
                />
              </Grid>
              <Grid
                container
                direction={"column"}
                borderBottom={"white solid 0.5px"}
              >
                <Typography
                  variant="caption"
                  fontStyle={"italic"}
                  fontWeight={"lighter"}
                >
                  Model
                </Typography>
                <TextField
                  source="model"
                  sx={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    fontFamily: "revert",
                    textTransform: "capitalize",
                  }}
                />
              </Grid>
              <Grid
                container
                direction={"column"}
                borderBottom={"white solid 0.5px"}
              >
                <Typography
                  variant="caption"
                  fontStyle={"italic"}
                  fontWeight={"lighter"}
                >
                  Type
                </Typography>
                <TextField
                  source="type"
                  sx={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    fontFamily: "revert",
                    textTransform: "capitalize",
                  }}
                />
              </Grid>
              <Grid
                container
                direction={"column"}
                borderBottom={"white solid 0.5px"}
              >
                <Typography
                  variant="caption"
                  fontStyle={"italic"}
                  fontWeight={"lighter"}
                >
                  Color
                </Typography>
                <TextField
                  source="color"
                  sx={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    fontFamily: "revert",
                    textTransform: "capitalize",
                  }}
                />
              </Grid>
              <Grid
                container
                direction={"column"}
                borderBottom={"white solid 0.5px"}
              >
                <Typography
                  variant="caption"
                  fontStyle={"italic"}
                  fontWeight={"lighter"}
                >
                  Price
                </Typography>
                <TextField
                  source="price"
                  sx={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    fontFamily: "revert",
                    textTransform: "capitalize",
                  }}
                />
              </Grid>
              <Grid
                container
                direction={"column"}
                borderBottom={"white solid 0.5px"}
              >
                <Typography
                  variant="caption"
                  fontStyle={"italic"}
                  fontWeight={"lighter"}
                >
                  COlor
                </Typography>
                <TextField
                  source="color"
                  sx={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    fontFamily: "revert",
                    textTransform: "capitalize",
                  }}
                />
              </Grid>
              <Grid
                container
                
                direction={"column"}
                
                borderBottom={"white solid 0.5px"}
              >
                <Typography
                  variant="caption"
                  fontStyle={"italic"}
                  fontWeight={"lighter"}
                >
                  Power
                </Typography>
                <TextField
                  source="power"
                  sx={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    fontFamily: "revert",
                    textTransform: "capitalize",
                  }}
                />
              </Grid>

            </Grid>
          </Grid>
        </SimpleShowLayout>
      </CardContent>
    </Card>
  </Show>
);

export default ShowCar;
