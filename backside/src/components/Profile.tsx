import 'antd/dist/reset.css';
import React from "react";
import { getCurrentUser } from "../services/auth.service";
import SearchUser from './userSearch'
import ImageUpload from './ImageUpload'
import { Row, Col, Space } from 'antd';
import { Avatar, Image } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import EditForm from "./EditForm";


const Profile: React.FC = () => {
 
  const currentUser = getCurrentUser();
console.log('current user' + JSON.stringify(currentUser))
  return (
    <>
     <p></p>
        <h2 style={{color:"#CD5C5C",marginLeft:"15px"}}>
          <strong>{currentUser.username} Profile</strong> 
        </h2>
         
      
<Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      <Row >  <Col span={12}>   
       <div className="Profile" style={{marginLeft:"15px"}} >
      <table   rules="all" style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>
        <tr>
          <th align="left" style={{background:"#F0F8FF"}} >userID:  </th>
          <td style={{background:"#F0F8FF"}}>{currentUser.id}</td> 
        </tr>
        <tr>
          <th align="left" style={{background:"#f4ffb8"}}>Username:   </th>
          <td style={{background:"#f4ffb8"}}>{currentUser.username}</td>
        </tr>  
        <tr> 
          <th align="left" style={{background:"#F0F8FF"}}>Email:  </th> 
          <td style={{background:"#F0F8FF"}}>{currentUser.email}</td>
        </tr> 
         <tr> 
         <th align="left" style={{background:"#f4ffb8"}}>About me:  </th>
         <td style={{background:"#f4ffb8"}}>{currentUser.about}</td>
         </tr>  
        <tr> 
          <th align="left" style={{background:"#F0F8FF"}} >Avatar:  </th>
          <td style={{background:"#F0F8FF"}}><Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
  {currentUser.avatarurl}</td>
        </tr>    
         <tr> 
          <th align="left" style={{background:"#f4ffb8"}} >Role: </th>
         <td style={{background:"#f4ffb8"}}>{currentUser.role}</td>
        </tr>
        <tr> 
         <th align="left" style={{background:"#F0F8FF"}}>Login token:  </th>
         <td style={{background:"#F0F8FF"}}>{localStorage.getItem('aToken')?.substring(0, 20)}</td>
         </tr>  </table>
    </div></Col>
    <Col span={12}>
      { currentUser.role=="admin"&& <SearchUser authbasic={ `${currentUser.atoken}`}/>}
      </Col>
      
      <Col span={18}>
        <div style={{marginLeft:"15px",marginBottom:"15px"}}>
      { currentUser.role=="admin"&&  <ImageUpload />}
      </div>
      </Col>
     
      <Col span={18}>
        
        <div style={{marginLeft:"15px",marginBottom:"15px"}}>
        {currentUser.role === "admin" && (
        <>
        <EditForm isNew={true} />
        <h2 style={{color: "#CD5C5C"}}><strong>Create Dog record</strong></h2>
        </>
)}
      </div>
      </Col>    
      </Row>
        
      
     </Space>      
      
            </>
  )

};

export default Profile;
