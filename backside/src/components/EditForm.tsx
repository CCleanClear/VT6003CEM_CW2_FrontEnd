import 'antd/dist/reset.css';
import React, { useState } from "react";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Form, Input, Button,  Modal, Typography} from 'antd';
import { EditOutlined,EditFilled } from '@ant-design/icons';
import axios from "axios";
import { api } from './common/http-common';
import { getCurrentUser } from "../services/auth.service";
const { Title } = Typography;
const { TextArea } = Input;
    
const EditForm: React.FC = (props:any) => {
    let navigate: NavigateFunction = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [isShow, setIsShow] = React.useState(false); 
    const aa:any = JSON.parse(localStorage.getItem('e') || "{}");
   // console.log("aa  ", aa)
    //console.log('aa.title ',aa.title)
    const contentRules = [
        {required: true, message: 'Please input somethings'}    
      ]
      
      const handleFormSubmit  = (values: any) => {
        const t = values.dogname;
        const a = values.breed;
        const s = values.summary;
        const d = values.description;
        const u = values.imageurl;
        const l = values.location;
        const currentUser = getCurrentUser();
       
       // console.log('new article '+ t,a,s,d,u,currentUser.id);
        const postArticle = {
          dogname: t,
          breed: a,
          summary:s,
          description:d,
          location: l,
          imageurl:u,
          writerid: currentUser.id
        }
       
        if(props.isNew==false){
       console.log(`path: ${api.uri}/articles${props.aid}`)
        axios.put(`${api.uri}/articles/${props.aid}`, postArticle, {
            headers: {
              'Authorization': `Basic ${localStorage.getItem('aToken')}`
            }
          })
            .then((res)=> {
            alert("Article updated")
            console.log(res.data);
            localStorage.removeItem("e");
             navigate("/");
            window.location.reload();
        });
      }
       else
       {console.log(`path: ${api.uri}/articles`)
        axios.post(`${api.uri}/articles`, postArticle, {
        headers: {
          'Authorization': `Basic ${localStorage.getItem('aToken')}`
        }
      })
        .then((res)=> {
        alert("New Article created")
        console.log(res.data);
         navigate("/");
        window.location.reload();
      });
      }
    }
  return (
    <>
      <Button icon={<EditOutlined />} onClick={()=>{setIsShow(true)}} />
      <Modal open={isShow} onCancel={()=>{setIsShow(false)}} title="Welcome Blogger" footer={[]}> 
    <p></p>
    {props.isNew?(<Title level={3} style={{color:"#0032b3"}}>Create New Article</Title>):(<Title level={3} style={{color:"#0032b3"}}>Update Article</Title>)}
    <Form name="article" onFinish={(values)=>handleFormSubmit(values)}>
      <Form.Item name="dogname" label="Name" rules={contentRules}>
      {props.isNew? ( <Input  />):( <Input defaultValue={!props.isNew&&aa.title} />)}
      </Form.Item>
      <Form.Item name="breed" label="Breed" rules={contentRules}>
      {props.isNew? ( <TextArea rows={2}  />):( <TextArea rows={2} defaultValue={!props.isNew&&aa.alltext} />)}       
      </Form.Item>
      <Form.Item name="summary" label="Dog Summary" >
      {props.isNew? ( <TextArea rows={2}  />):( <TextArea rows={2} defaultValue={!props.isNew&&aa.summary} />)}
      </Form.Item>
      <Form.Item name="description" label="Detail Dog Description" >
      {props.isNew? ( <TextArea rows={2}  />):( <TextArea rows={2} defaultValue={!props.isNew&&aa.description} />)}
      </Form.Item>
      <Form.Item name="location" label="Location" >
      {props.isNew? ( <Input  />):( <Input defaultValue={!props.isNew&&aa.imageurl} />)}  
      </Form.Item>
      <Form.Item name="imageurl" label="ImageURL" >
      {props.isNew? ( <Input  />):( <Input defaultValue={!props.isNew&&aa.imageurl} />)}  
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form.Item>     
    </Form>
    </Modal>
    </>
  );
};


export default EditForm;
