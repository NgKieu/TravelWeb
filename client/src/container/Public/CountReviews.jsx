import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountReviews = ({ id }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        axios
            .post(`http://localhost:8081/countReviews`, {
                idHotel: id,
            })
            .then(res => {
                setCount(res.data[0].count)
                // console.log(res.data[0].count)
            })
            .catch(err => console.log(err));
    }, [id]);
    return (
        <span>({count} đánh giá)</span>
    )
};

export default CountReviews;