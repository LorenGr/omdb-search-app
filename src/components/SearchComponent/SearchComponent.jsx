// src/components/SearchComponent.js
import React, { useState, useEffect } from 'react';
import { Input, Button, Select, Row, Col } from 'antd';
import "./SearchComponent.css";

const { Search } = Input;
const { Option } = Select;

const SearchComponent = ({ onSearch }) => {
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [type, setType] = useState('');

    const handleSubmit = () => {
        onSearch(title, type, year);
    };

    useEffect(() => {
        handleSubmit();
    }, [type]);

    return (
        <Row gutter={16} style={{ display: 'flex', alignItems: 'center' }}>
            <Col flex={1}>
                <Search
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Col>
            <Col flex={1}>
                <Input
                    placeholder="Year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                />
            </Col>
            <Col flex={1}>
                <Select
                    className="typeSelector"
                    placeholder="Type"
                    onChange={value => setType(value)}
                    value={type}
                >
                    <Option value="movie">Movie</Option>
                    <Option value="series">Series</Option>
                </Select>
            </Col>
            <Col>
                <Button data-testid="search-button" onClick={handleSubmit} type="primary">Search</Button>
            </Col>
        </Row>
    );
};

export default SearchComponent;
