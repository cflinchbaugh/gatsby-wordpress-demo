import React, { useState } from 'react';
import styled from 'styled-components';
import { 
    graphql,
    Link as GatsbyLink,
    useStaticQuery
} from 'gatsby';
import Dialog from '../components/Dialog';
import PageSection from '../components/PageSection';
import Staff from '../components/sections/Staff';
import Charm from '../components/sections/Charm';
import Footer from '../components/sections/Footer';
import WpEmployee from '../components/items/WpEmployee';
import { StaticImage } from 'gatsby-plugin-image';

const StyleWrapper = styled.div`
    color: "#232129";
    fontFamily: "-apple-system, Roboto, sans-serif, serif";
`;


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
            allFile {
                nodes {
                    url
                    childImageSharp {
                        id
                        gatsbyImageData(
                            width: 200
                            placeholder: BLURRED
                            formats: [AUTO, WEBP, AVIF]
                        )
                    }
                }
            }
        }
    `);

    const { allWpPost } = results;
    const { allWpEmployee } = results;
    const { allWpSectionAboutContent } = results;
    const { allFile } = results;

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
        const staffData = (allWpEmployee?.nodes && allWpEmployee.nodes.length) ? allWpEmployee.nodes.map( (wpEmployeeData) => {
            let employeeData = wpEmployeeData;

            const currentEmployeeProfileURL = wpEmployeeData.employeeData.profilePicture.mediaItemUrl;
            
            allFile.nodes.some((fileData) => {
                if (fileData.url === currentEmployeeProfileURL) {
                    console.log(fileData.url);
                    employeeData.profileData = fileData;
                }
            })
            
            return employeeData;
        }) :  <div>No Staff Found</div>;

        const staffMarkup =  staffData.map( ({
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
                    PROFILEPIC
                </div>

                <button 
                    onClick={(() => {
                        handleClickDetails(id);
                    })}>
                    See Details
                </button>
            </div>
        ));

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

        const staffData = {
            allFile: allFile,
            allWpEmployee: allWpEmployee,
            handleClickDetails: handleClickDetails
        };

    return (
        <StyleWrapper>
            <main>
                <title>DiDi & Smiling John's</title>
                
                <StaticImage 
                    src="../images/logo_bbs_blacktxt.png" 
                    alt="DiDi Logo" 
                    placeholder="blurred"
                    
                    width={200}
                    height={200}
                />

                <div>Header/Nav/Booking Button</div>
                <StaticImage 
                    src="../images/hero.png" 
                    alt="Image of shop focused on a barber chair" 
                    placeholder="blurred"
                    layout="fullWidth"
                />
                <div>About Section</div>
                {aboutMarkup}

                <hr/>

                <Staff {...staffData} />

                <Dialog {...dialogData}/>
                
                <hr/>
                
                <div>Map</div>
                
                <hr/>

                <Charm />

                <Footer />
                
                {/* { postMarkup } */}
            </main>
        </StyleWrapper>
    );
};

export default IndexPage;
