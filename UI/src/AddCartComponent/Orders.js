import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {apiUrlUser} from '../apiUrl';
import moment from 'moment';

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const id = localStorage.getItem('_id');
    //console.log(id)

    useEffect(() => {
        axios.get(apiUrlUser +"orders?buyer="+id).then((response) => {
            setOrders(response.data);
        }).catch((error) => {
            console.log(error)
        })
    })

    return (
        <section class="banner_main">
            <div id="banner1" >
                <div class="container">
                    <h1 className='text-3xl text-center'>All Orders</h1>
                    <br />
                    {
                        orders.map((o, i) => {
                            return (
                                <div className='border shadow'>
                                    <table className='table'>
                                        <thead>
                                            <tr>
                                                <th scope='col'>#</th>
                                                <th scope='col'>Status</th>
                                                <th scope='col'>Buyer</th>
                                                <th scope='col'>Date</th>
                                                <th scope='col'>Payment</th>
                                                <th scope='col'>Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{i + 1}</td>
                                                <td>{o?.status}</td>
                                                <td>{o?.buyer}</td>
                                                <td>{moment(o?.createAt).fromNow()}</td>
                                                <td>{o?.payment.success ? "Success" : "Failed"}</td>
                                                <td>{o?.products?.length}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className='container'>
                                        {o?.products?.map((p,i) => (
                                            <div className='row mb-2 p-1 card flex-row border-1 border-gray-300 rounded-lg'>
                                                <div className='col-md-4'>
                                                    <img src={`./assets/uploads/picons/${p.piconnm}`} alt={p.title} className="w-full h-60 object-cover object-top drop-shadow-[0_80px_30px_#000]" />
                                                </div>
                                                <div className='col-md-6'>
                                                    <p>{p.title}</p>
                                                    <p>{p.description}</p>
                                                    <p>Price : {p.price} /per</p>
                                                    <p>Quantity : {p.quantity}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}
