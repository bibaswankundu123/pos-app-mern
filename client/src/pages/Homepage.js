
import React,{useState,useEffect} from 'react';
import DefaultLayout from '../components/DefaultLayout';
import axios from 'axios';
import { Col, Row } from 'antd';
import ItemList from '../components/ItemList';
import { useDispatch } from 'react-redux';
const Homepage = () => {
    const [itemsData, setItemsData] = useState([]);
    const [selectedCategory,setSelectedCategory] = useState('drinks')
    const categories = [
        {
            name:'drinks',
            imageUrl : 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHJpbmtpbmclMjBqdWljZXxlbnwwfHwwfHx8MA%3D%3D'
        },
        {
            name:'rice',
            imageUrl : 'https://cdn.shopify.com/s/files/1/0851/0010/1946/files/500-x-380-Biryani.png'
        },
        {
            name:'noodles',
            imageUrl : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpDz4-GZI5EPxY_2Q-d_HnCANSJ42Cf6EFWg&s'
        }
    ]
    const dispatch = useDispatch()

    //useEffect
    useEffect(() => {
        const getAllItems = async ()=> {
            try{
                dispatch ({
                    type:'SHOW_LOADING'
                })
              const {data} = await axios.get('/api/items/get-item')
              setItemsData(data);
              dispatch({type:'HIDE_LOADING'});
              console.log(data);
            } catch (error) {
                console.log(error)
            }
        };
        getAllItems()
    },[dispatch]);
  return (
    <DefaultLayout>
        <div className='d-flex'>
            {categories.map(category => (
               <div key={category.name}
                className={`.d-flex category ${selectedCategory === category.name && 'category-active'}`}
                 onClick={() => setSelectedCategory(category.name)}
                >
                  <h5>{category.name}</h5>
                  <img src={category.imageUrl} alt={category.name} height="30" width="50"/>
               </div> 
            ))}
        </div>
        <Row>
                {itemsData
                .filter(i => i.category === selectedCategory)
                .map((item) => {
                    // You need to return the JSX inside map()
                    return (
                        <Col xs={24} lg={6} md={12} sm={6} key={item._id}> {/* Add key for uniqueness */}
                            <ItemList key={item.id} item={item} />
                        </Col>
                    );
                })}
            </Row>
    </DefaultLayout>
  )
}

export default Homepage