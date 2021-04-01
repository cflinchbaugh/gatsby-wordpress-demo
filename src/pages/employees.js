import * as React from 'react';
import { 
    graphql,
    Link as GatsbyLink,
    useStaticQuery
} from 'gatsby';

// styles
const pageStyles = {
  color: "#232129",
  padding: "96px",
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
};

// markup
const EmployeesPage = () => {
    const data = useStaticQuery(graphql`
        {
            allWpEmployee {
                nodes {
                    id
                    uri
                    title
                }
            }
        }
      
    `);

    const { allWpEmployee } = data;
    
    function buildEmployeeMarkup() {
        const employeeMarkup = (allWpEmployee?.nodes && allWpEmployee.nodes.length) ? allWpEmployee.nodes.map( ({
            id,
            title,
            uri,
        }) => (
            <div className="employee-item" key={id}>
                <div>{title}</div>
                <GatsbyLink to={uri}>Read More</GatsbyLink>
            </div>
        )) : <div>No Employees Found</div>;

        return employeeMarkup;
    }

    const employeeMarkup = buildEmployeeMarkup();


    return (
        <main style={pageStyles}>
            <title>Employees</title>
            <h1>EMPLOYEES!</h1>

            { employeeMarkup }
        </main>
    );
};

export default EmployeesPage;
