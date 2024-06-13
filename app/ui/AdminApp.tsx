"use client";
import { Admin, Resource, fetchUtils, radiantDarkTheme } from "react-admin";
import CarsList from "./cars/CarsList";
import CreateCars from "./cars/CreateCars";
import { IconCar, IconMenu, IconUsersGroup } from "@tabler/icons-react";
import CarEdit from "./cars/EditCar";
import ShowCar from "./cars/ShowCar";
import orangeTheme from "../Helper/Theme";
import UserList from "./user/UserList";
import PostUser from "./user/PostUser";
import ShowUser from "./user/ShowUser";
import AppointList from "./appoint/AppointList";
import { UrlSite } from "../utils";
import ShowApp from "./appoint/ShowApp";
import EditApp from "./appoint/EditApp";
import LoginPage from "./login/LoginPage";
import authProvider from "../utils/authProvider";
import CapitalizeFirstLetter from "../Helper/CapitalizeFirstLetter";
import { MyLayout } from "./components/MyLayout";
const apiUrl=UrlSite();
const dataProvider: any = {
  getList: async (resource: any, params: any) => {
    const { json, headers } = await fetchUtils.fetchJson(
      `${apiUrl}/${resource}?page=${params.pagination.page}&perPage=${params.pagination.perPage}`
    );
      return {
        data: json.items,
        total: json.totalItems,
      };
  },
  getOne: async (resource: string, params: any) => {
    const { json } = await fetchUtils.fetchJson(
      `${apiUrl}/${resource}/${params.id}`
    );

    const singleResource = json;

    return {
      data: singleResource,
    };
  },
 create: async (resource: string, params: any) => {
    console.log("Data sent to API :", JSON.stringify(params.data));
    let requestBody: FormData | string;
    const headers: HeadersInit = new Headers();

    if (resource === "cars") {
      const formData = new FormData();
        Object.keys(params.data).forEach(key => {
            if (key === 'images') {
                params.data[key].forEach((fileObj: any) => {
                    formData.append('images', fileObj.rawFile);
                });
            } else {
                formData.append(key, `${params.data[key]}`);
            }
        });
        requestBody = formData;
    } else {
      requestBody = JSON.stringify(params.data);
      headers.append('Content-Type', 'application/json');
    }

    const { json } = await fetchUtils.fetchJson(`${apiUrl}/${resource}`, {
      method: "POST",
      body: requestBody != undefined ? requestBody : undefined,
      headers: headers,
    });

    const createdResource = json;

    return {
      data: {
        ...createdResource,
        id: createdResource.id,
      },
    };
  },

  update: async (resource: string, params: any) => {
    const { json } = await fetchUtils.fetchJson(
      `${apiUrl}/${resource}/${params.id}`,
      {
        method: "PUT",
        body: JSON.stringify(params.data),
      }
    );

    const updatedResource = json;

    return {
      data: updatedResource,
    };
  },
  delete: async (resource: string, params: any) => {
    const { json } = await fetchUtils.fetchJson(
      `${apiUrl}/${resource}/${params.id}`,
      {
        method: "DELETE",
      }
    );

    const deletedResource = json;

    return {
      data: deletedResource,
    };
  },
  deleteMany: async (resource: string, params: any) => {
    const { ids } = params;

    const deletePromises = ids.map(async (id: any) => {
      const { json } = await fetchUtils.fetchJson(
        `${apiUrl}/${resource}/${id}`,
        {
          method: "DELETE",
        }
      );
      return json;
    });

    const deletedResources = await Promise.all(deletePromises);

    return {
      data: deletedResources,
    };
  },
};
export const App = () => (
  <Admin
    dataProvider={dataProvider}
    theme={orangeTheme}
    darkTheme={radiantDarkTheme}
    loginPage={LoginPage}
    authProvider={authProvider}
    layout={MyLayout}
  >
    <Resource
      name="cars"
      list={CarsList}
      create={CreateCars}
      edit={CarEdit}
      show={ShowCar}
      icon={IconCar}
      recordRepresentation={(record) => `${CapitalizeFirstLetter(record.name)}`}
    />
    <Resource
      name="users"
      list={UserList}
      create={PostUser}
      show={ShowUser}
      icon={IconUsersGroup}
    />
    <Resource
      name="appointments"
      list={AppointList}
      show={ShowApp}
      // edit={EditApp}
      icon={IconMenu}
    />
  </Admin>
);