import 'antd/dist/reset.css';
import { Card} from 'antd';

const { Meta } = Card;

const BriefArticle = () => {
  return (
    <>
      <Card style={{width: 300}} cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
        <h2>The Canine Shelter </h2>
        <p></p>
      </Card>
    </>
  )
}

export default BriefArticle;