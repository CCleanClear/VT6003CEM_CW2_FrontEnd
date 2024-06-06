import 'antd/dist/reset.css';
import '../App.css';
import FavCard from './FavCard'

function FavPage() {
  return (
    <> 
    <h2 style={{ color: '#CD5C5C' }}> <strong>Favourites Dog</strong></h2>     
     
      <FavCard />
    </>
  )
}
export default FavPage;