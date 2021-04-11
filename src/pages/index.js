import React, { useState } from 'react';
import { 
    graphql,
    Link as GatsbyLink,
    useStaticQuery
} from 'gatsby';
import Dialog from '../components/Dialog';
import PageSection from '../components/PageSection';
import WpEmployee from '../components/items/WpEmployee';
import { StaticImage } from 'gatsby-plugin-image';


// styles
const pageStyles = {
  color: "#232129",
 
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
};

// markup
const IndexPage = () => {
    const results = useStaticQuery(graphql`
        {
            allWpPost {
                nodes {
                    id
                    title
                    excerpt
                    uri
                }
            }
            allWpEmployee {
                nodes {
                    id
                    uri
                    title
                    employeeData {
                        biography
                        services
                        twitter
                        profilePicture {
                            mediaItemUrl
                        }
                    }
                    databaseId
                }
            }
            allWpSectionAboutContent {
                nodes {
                    SectionAbout {
                        body
                        heading
                        tab
                    }
                }
            }
        }
    `);

    const { allWpPost } = results;
    const { allWpEmployee } = results;
    const { allWpSectionAboutContent } = results;

    const [dialogShow, setDialogShow] = useState(false);
    const [employeeActive, setEmployeeActive] = useState('');

    function handleClickClose() {
        setDialogShow(false);
    }

    function handleClickDetails(employeeId) {
        setEmployeeActive(employeeId);
        setDialogShow(true);
    }
    
    function buildPostMarkup() {
        const postMarkup = (allWpPost?.nodes && allWpPost.nodes.length) ? 
        allWpPost.nodes.map( ({
            excerpt,
            id,
            title,
            uri
        }) => (
            <div className="post-item" key={id}>
                <strong>
                    <span dangerouslySetInnerHTML={{__html: title}} />
                </strong>
                <div>
                    <span dangerouslySetInnerHTML={{__html: excerpt}} />
                </div>
                
                <GatsbyLink to={uri}>Read More</GatsbyLink>
            </div>
        )) : <div>No Posts Found</div>;

        return postMarkup;
    }

    function selectEmployee(employeeId) {
        let employeeData = {};

        if (employeeId.length) {
            let employeeDataArray = allWpEmployee.nodes.filter((employee) => {
                return employee.id === employeeId;
            });
            
            if (employeeDataArray.length) {
                employeeData = employeeDataArray[0];
            } else {
                throw new Error(`Employee ${employeeId} not found`);
            }
        }

        return employeeData;
    }

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
    
    function buildAboutMarkup() {
        console.log(allWpSectionAboutContent);
        const aboutMarkup = (allWpSectionAboutContent?.nodes && allWpSectionAboutContent.nodes.length) ? allWpSectionAboutContent.nodes.map( ({
           data
        }) => (
            <div className="about-item" key={Date.now()}>
                <strong>
                    <span>tab</span>
                    <span>heading</span>
                </strong>

                <div>body</div>
            </div>
        )) : <div>No About Data Found</div>;

        return aboutMarkup;
    }

    const postMarkup = buildPostMarkup(),
        staffMarkup = buildStaffMarkup(),
        aboutMarkup = buildAboutMarkup(),
        employeeActiveData = selectEmployee(employeeActive),
        employeeMarkup = employeeActive.length ? <WpEmployee {...employeeActiveData}/> : null,
        dialogData = {
            children: <div>{employeeMarkup}</div>,
            handleClickClose: handleClickClose,
            show: dialogShow
        };

    return (
        <main style={pageStyles}>
            <title>DiDi & Smiling John's</title>
            
            <StaticImage 
                src="../images/logo_bbs_blacktxt.png" 
                alt="DiDi Logo" 
                placeholder="blurred"
                
                width={200}
                height={200}
            />

            <div>Header/Nav/Booking Button</div>
            <div>Hero Image</div>
            <div>About Section</div>
            {aboutMarkup}

            <hr/>

            <PageSection>
                <div>Our Family heading</div>
                { staffMarkup }
            </PageSection>

            <Dialog {...dialogData}/>
            
            <hr/>
            
            <div>Map</div>
            
            <hr/>

            <StaticImage 
                src="../images/charm-1.jpg" 
                alt="Scissors and plants" 
                placeholder="blurred"
                
                width={200}
                height={200}
            />
            <StaticImage 
                src="../images/charm-2.jpg" 
                alt="Silver shelves with organized hair treatment" 
                placeholder="blurred"
                
                width={200}
                height={200}
            />
            <StaticImage 
                src="../images/charm-3.jpg" 
                alt="Hair styling product" 
                placeholder="blurred"
                
                width={200}
                height={200}
            />

            <div>
                (717) 858-7428
                Hours of Operation
                Monday: Closed
                Tuesday – Friday: 9AM–7PM
                Saturday: 9AM–3PM
                *Prices subject to change
            </div>
            
            {/* { postMarkup } */}
        </main>
    );
};

export default IndexPage;
