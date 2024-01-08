import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

export default function Home() {
    const [search, setSearch] = useState('')
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);
    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/foodData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        response = await response.json();

        setFoodItem(response[0]);
        setFoodCat(response[1]);
        // console.log(response[0],response[1])
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <>
            <div><Navbar /></div>
            <div>
                <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner" id='carsel'>
                        <div className="carousel-caption" style={{zIndex:"2"}}>
                        <div className="d-flex justify-content-center">
                            <input className="form-control me-2 w-50 " type="search" value={search} onChange={(e)=>{setSearch(e.target.value)}} placeholder="Search for restaurant, cuisine or a dish" aria-label="Search" />
                        </div>
                        </div>
                        <div className="carousel-item active">
                            <img className="d-block w-100" src="../backgroundImg.jpg" alt="First slide" />
                        </div>
                    </div>
                </div>


            </div>
            <br /><br />
            <div className='container'>
                {
                    foodCat !== []
                        ? foodCat.map((data) => {
                            return (
                                <div className='row mb-3'>
                                    <div key={data._id} className='fs-3 m-3'>
                                        {data.CategoryName}
                                    </div>
                                    <hr />
                                    {foodItem !== [] ?
                                        foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                                            .map(filterItems => {
                                                return (
                                                    <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                                                        <Card foodItem ={filterItems}
                                                            options={filterItems.options[0]}
                                                            imgSrc={filterItems.img}
                                                        ></Card> 
                                                    </div>
                                                )
                                            }) : <div>No data found</div>}

                                </div>

                            )
                        }) : ""
                }
            </div>
            <div><Footer /></div>
        </>
    )
}