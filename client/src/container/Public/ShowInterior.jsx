import React, { useEffect, useState } from 'react'
import axios from 'axios';

const ShowInterior = ({ id }) => {

    const [interior, setInterior] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8081/showInterior/${id}`)
            .then((res) => {
                if (res.data.length > 0) {
                    setInterior(res.data)
                }
            })
            .catch((err) => console.log(err));
    }, [id]);



    return (
        <div>
            {interior != [] ? interior.map((data, i) => (
                <div key={i}>
                    <div className='my-2 bg-[#EDF2F7] rounded-3xl'>{data.Interior_name}</div>
                </div>
            )) : null
            }
        </div>
    )
}

export default ShowInterior