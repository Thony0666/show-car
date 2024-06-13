// CarsList.tsx

import * as React from "react";
import { List, Datagrid, TextField, EditButton, Pagination } from 'react-admin';
const PostPagination = () => <Pagination rowsPerPageOptions={[1,10, 25, 50, 100]} />;

const CarsList: React.FC<any> = (props) => (
  
  <List {...props} pagination={<PostPagination />}>
    <Datagrid rowClick="show">
      <TextField source="name" />
      <TextField source="brand" />
      <TextField source="description" />
      <TextField source="type" />
      <TextField source="model" />
      <TextField source="power" />
      <TextField source="price" />
      <EditButton label=""/>
    </Datagrid>
  </List>
);

export default CarsList;
