import 'antd/dist/reset.css';
import React from 'react';
import EditForm from './EditForm';
import { useParams, useNavigate } from 'react-router-dom';
import { Button,Spin, Col, Card } from 'antd';
import { api } from './common/http-common';
import axios from 'axios';
import { RollbackOutlined,LoadingOutlined,CloseSquareOutlined,CloseSquareFilled,EditOutlined,EditFilled } from '@ant-design/icons';
import { getCurrentUser } from "../services/auth.service";



const DetailArticle = () => {
const currentUser = getCurrentUser();
const { aid } = useParams();
const [dog, setArticle] = React.useState({id:0, dogname:'', breed:'', summary:'',imageurl:'',  locationid:1, writerid:0, description: ''}); 
const navigate= useNavigate();
const [loading, setLoading] = React.useState(true);
const [theme, setTheme] = React.useState('outlined');

React.useEffect(() => {
  console.log(`path: ${api.uri}/dogs/${aid}`)
    axios.get(`${api.uri}/dogs/${aid}`)
      .then((res) => {
      //  console.log('article' ,article)
        setArticle(res.data);
        localStorage.setItem('e',JSON.stringify(res.data))  
        setLoading(false);
      }).then(()=>{
        setLoading(false);
      })  
      .catch((error) => {
        console.log('Error fetching dog details ')
       // console.error('Error fetching article details:', error);
      });
  }, [aid]);
  
  function getIcon (theme:string) {
    let Icon;
  
    if (theme === 'filled') 
        Icon=CloseSquareFilled      
    else 
        Icon=CloseSquareOutlined 
    return Icon;
  }
  
  
  const handleDelete = () => {
  
    setTheme('filled')
// console.log('fav link arr ', fav.links.fav)
// console.log('fav link ', fav)
  axios.delete(`${api.uri}/dogs/${aid}`, {
       
        headers: {
            "Authorization": `Basic ${localStorage.getItem('aToken')}`
          }
        }        
    )
      .then((results) =>{ console.log('respone ',JSON.stringify(results.data.message))
        if(results.data.message==="removed")
      {  
          alert("This dog is removed from the blog list")
          navigate("/");
          window.location.reload();}
        
      })
      .catch((err) => {
      console.log(`Check network problems pls. `);
         alert("Check network problems");
  })      
}

       
if(loading){
const antIcon = <LoadingOutlined style={{ fontSize: 48}} spin />
return(<Spin indicator={antIcon} />);
}
else {

  const Icon = getIcon(theme)
  return (
    <>
      <h2 style={{ color: '#CD5C5C' }}><strong>Dog Detail information</strong></h2>   
      
            <Col  span={24} >                                   
             <Card title={dog.dogname} style={{width: 300,marginLeft:"100px"}}
                   cover={<img alt="put image here" src={dog.imageurl} />} hoverable
                  
                   actions={[
                    (currentUser&&currentUser.role==="admin"&&currentUser.id===dog.writerid)&&<EditForm  isNew={false} aid={aid}/>,  
                    (currentUser&&currentUser.role==="admin"&&currentUser.id===dog.writerid)&& <Icon  style={{ fontSize: '32px', }} onClick={()=>handleDelete()}/>
                  ]} 
                   >               
                  <div> <h3>Breed</h3>
                   <p>{dog.breed}</p>
                   <h3>Summary</h3>
                   <p>{dog.summary}</p>
                   <h3>Detail Description</h3>
                   <p> {dog.description}</p>
                   <p><strong>Location:</strong> {dog.locationid} of The Canine Shelter</p>
                   <Button  
        type="primary"
        icon={<RollbackOutlined />}
        onClick={() => navigate(-1)} 
      /></div> 
                 
                </Card>
               </Col>
      
    </>
  );

 }
}

export default DetailArticle;