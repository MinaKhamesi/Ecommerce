import React, {useState} from 'react';
import {Form, Button, FormControl} from 'react-bootstrap';


const SearchBox = ({history}) => {
    const [keyword, setKeyword] = useState('');

    const handleSearch = e =>{
        history.push(`/${keyword}`);
    }

    return (
        <Form onSubmit={handleSearch} inline variant='outline-dark'>
            <FormControl as='input' placeholder='Search Product...' value={keyword} onChange={e=>setKeyword(e.target.value)}/>
            <Button as='button'>Search</Button>
        </Form>
    )
}

export default SearchBox;
