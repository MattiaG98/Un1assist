import axios from 'axios';
import { useEffect, useState } from 'react';

const MovieList = (props) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    useEffect(() => {
        const getProducts = async () => {
          try {
            const res = await axios.get(
                API_ENDPOINT + "api/documents/getAllDocuments"
            );
            setProducts(res.data);
          } catch (err) {}
        };
        getProducts();
      });
    return (
        <div alignItems="center" justifyContent="center" display="flex" paddingTop={50}>
            <div width="50%" padding={16} background="purpleTint" borderRadius={3} elevation={4}>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Cover</th>
                            <th>Author</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody height={240}>
                        {props.products.map((product) => (
                            <tr key={product._id}>
                                <td>{product.title}</td>
                                <td>{product.description}</td>
                                <td>{product.cover}</td>
                                <td>{product.author}</td>
                                <td isNumber>{product.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Button
                    height={50}
                    marginRight={16}
                    appearance="primary"
                    intent="danger"
                    onClick={props.logOut}
                >
                    Log Out
                </Button>
            </div>
        </div>
    )
  }

export default MovieList;
