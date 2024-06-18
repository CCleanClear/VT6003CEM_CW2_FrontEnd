import 'antd/dist/reset.css';
import  { useState } from 'react';
import {  Input, message, Typography } from 'antd';
import { api } from './common/http-common';
import {Table,  Select,Col} from 'antd';
import axios from 'axios';
import { NavigateFunction, useNavigate } from 'react-router-dom';

// import { Tag, Space } from 'antd';

const { Column} = Table;
const  { Search } = Input;
const { Title } = Typography;


function SearchDog() {
 let navigate: NavigateFunction = useNavigate();
 const [press, setPress] = useState("");
 const [DogData, setDogs] = useState([]);
 const[isSearchOK,setSearch]=useState(false);
 


const onSearch= async (value:any) => {
    console.log("value ", value);
    console.log("press ", `${press}`);
    let urlPath = `${api.uri}/dogs/search`;
  
    if (press === "breed" || press === "dogname") {
      urlPath += `/?fields=${press}&q=${value}`;
    } else if (press === "dogname&fields=breed" && value === "") {
      urlPath += `/?fields=${press}`;
    }
  
    console.log("urlPath ", urlPath);
  
    try {
      const response = await axios.get(urlPath);
  
      console.log("dog return ", JSON.stringify(response.data));
      console.log("dog data ", response.data);
  
      if (!response.data.length || response.data.length === 0) {
        alert("No data found");
       // navigate("/profile");
        window.location.reload();
      }
  
      setDogs(response.data);
      setSearch(true);
      value = "";
    } catch (err) {
      console.log("Error fetching dogs", err);
    }
}

const { Option } = Select;

function handleChange(value:any)  {
  message.info("Pls. enter at least three characters to search by dogname or breed otherwise leave the input empty")
  
  setPress(value);
  console.log(`selected ${value}`);
}
   	

  return (
   <>
     <Col span={10}> 
        <Title level={5}>Search Dog Info</Title>            
       <Search placeholder="Search Dog"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}/>
       <Select defaultValue="all" style={{ width: 280, marginRight:'200px' }} onChange={handleChange}>
        <Option value="dogname">dogname</Option>
        <Option value="breed">breed</Option>
        <Option value="dogname&fields=breed">Get all-filter by dogname & breed</Option>
        <Option value="all">Get all-without filter</Option>
        </Select>	      
  {isSearchOK&&<Table dataSource={DogData}>
   <Column title="ID" dataIndex="id" key="id" />
   <Column title="Dogname" dataIndex="dogname" key="dogname" />
   <Column title="breed" dataIndex="breed" key="breed" />
   <Column title="Summary" dataIndex="summary" key="summary" /> 
   </Table>}
   </Col>  

    </>  
  );
  }

export default SearchDog;

  