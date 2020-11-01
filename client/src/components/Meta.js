import React from 'react';
import {Helmet} from "react-helmet";

const Meta = ({keyword,description,title}) => {
    return (
        <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keyword" content={keyword} />
    </Helmet>
    )
}

Meta.defaultProps = {
    title:'Welcome to MyAmazon',
    keyword:'shop shopping online-shopping ecommerce',
    description:'Buy best quality products for the cheapest price ever.'
}

export default Meta;
