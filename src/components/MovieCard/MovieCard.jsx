import React, { useState } from 'react';
import { Card, Tag } from 'antd';
import defaultImage from '../../assets/default.jpg';

const { Meta } = Card;

const MovieCard = ({ title, type, year, image }) => {

    const [hasError, setError] = useState(false);
    const handleImageError = (e) => {
        setError(true);
    };

    return (
        <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt={title} src={hasError ? defaultImage : image} onError={handleImageError} />}
        >
            <Meta title={title} />
            <div style={{ marginTop: '10px' }}>
                <Tag color="blue">{type}</Tag>
                <Tag color="green">{year}</Tag>
            </div>
        </Card>
    );
};

export default MovieCard;
