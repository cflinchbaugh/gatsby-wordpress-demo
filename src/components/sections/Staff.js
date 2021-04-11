import * as React from 'react';
import styled from 'styled-components';
import { StaticImage } from 'gatsby-plugin-image';

const StyleWrapper = styled.div`
  padding: 4em;
  background-color: #009688;
`;

const Staff = (props) => {
    const {
        allWpEmployee,
        handleClickDetails
    } = props;

    function buildStaffMarkup() {
        const staffMarkup = (allWpEmployee?.nodes && allWpEmployee.nodes.length) ? allWpEmployee.nodes.map( ({
            id,
            employeeData,
            title,
            uri
        }) => (
            <div className="staff-item" key={id}>
                <strong>
                    <span dangerouslySetInnerHTML={{__html: title}} />
                </strong>

                <div>
                    {employeeData.profilePicture.mediaItemUrl}
                </div>

                <button 
                    onClick={(() => {
                        handleClickDetails(id);
                    })}>
                    See Details
                </button>
            </div>
        )) : <div>No Staff Found</div>;

        return staffMarkup;
    }

    const staffMarkup = buildStaffMarkup();

    return (
        <StyleWrapper>
            <div>Our Family heading</div>
            { staffMarkup }
        </StyleWrapper>
    );
};

export default Staff;