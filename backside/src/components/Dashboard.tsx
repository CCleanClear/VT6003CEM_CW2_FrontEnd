// //import React from 'react';
// import Landing from './Landing'


// const Dashboard = () => {
//   return (<>
//   <p></p>
//   <h2 style={{color:"	#CD5C5C",marginLeft:"25px"}}><strong>Dashboard</strong></h2>
//         <Landing />
//   </>)
// }

// export default Dashboard;

import 'antd/dist/reset.css';
import React from 'react';
import { Card, Col, Row, Spin } from 'antd';
//import articles from './articles.json';
import { api } from './common/http-common';
import axios from 'axios';
import {LoadingOutlined} from '@ant-design/icons';




const Dashboard = () => {
  const [locations, setLocations] = React.useState(null);  
  const [loading, setLoading] = React.useState(true);    
  React.useEffect(()=>{
    axios.get(`${api.uri}/locations`)
      .then((res)=>{
        setLocations(res.data);   
        localStorage.setItem('a',JSON.stringify(res.data))                        
      })
      .then(()=>{
        setLoading(false);
      })  
            
  }, []);
   
  
 
  if(loading){
    const antIcon = <LoadingOutlined style={{ fontSize: 48}} spin />
    return(<Spin indicator={antIcon} />);
  } else {
    if(!locations){
      return(<div>There is no dog record available now.</div>)
    } else {
       
    
      return(<>
        <h2 style={{color:"#CD5C5C",marginLeft:"15px"}}>
          <strong> Dog Canine Shelter Branch Information Locations</strong>
        </h2>
       
        <Row gutter={[16,16]} style={{marginLeft:"15px"}}>
          {
            locations && locations.map(({id, location_name, address, description})=> (
            <Col key={id}>                                          
             <Card title={location_name} style={{width: 300, margin:10}}
                   
                   > 
                   <p>Address: {address}</p>   
                   <p>Description: {description}</p>   
                 
                </Card>
                
              </Col>
            ))
          }
        </Row></>
      )
    }
  }
}


export default Dashboard;