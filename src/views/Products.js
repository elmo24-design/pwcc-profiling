import { Card } from '@material-ui/core';
import rice from '../images/rice.png';
import { Link } from 'react-router-dom';

const Products = () => {
   return ( 
      <div className="products">
         <h1 className="products-heading">Products</h1>
         <div className="products-card-grid">
            <Link to="/products/rice">
               <div className="rice-card-outer">
                  <Card>
                     <div className="rice-card">
                        <img src={rice} alt="rice" className="rice-pic" />
                        <h3>Rice</h3> 
                     </div>
                  </Card>
               </div>
            </Link>
         </div>
      </div>
   );
}
 
export default Products;