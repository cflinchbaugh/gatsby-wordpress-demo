import React from 'react';

const WpEmployee = (props) => {  
    const {
        id,
        title,
        uri,
        employeeData: {
            biography,
            services,
            twitter
        }
    } = props;
    console.log(props);   
    
    return (
        <>
            {title}
            <hr/>
            {biography}
        </>
    );
}

export default WpEmployee;