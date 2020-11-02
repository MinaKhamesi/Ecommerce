import React, {useState} from 'react';
import {Form, Button, FormControl} from 'react-bootstrap';


const SearchBox = ({history}) => {
    const [keyword, setKeyword] = useState('');

    const handleSearch = e =>{
        history.push(`/search/${keyword}`);
    }

    return (
        <Form onSubmit={handleSearch} inline >
            <FormControl as='input' placeholder='Search Product...' value={keyword} onChange={e=>setKeyword(e.target.value)} className='mr-1 ml-3 ' />
            <Button as='button' variant='outline-dark' className='my-1'>Search</Button>
        </Form>
    )
}

export default SearchBox;
