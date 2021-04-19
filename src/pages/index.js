import React, { useState } from 'react';
import styled from 'styled-components';
import { 
    graphql,
    // Link as GatsbyLink,
    useStaticQuery
} from 'gatsby';
import Dialog from '../components/Dialog';
import Staff from '../components/sections/Staff';
import About from '../components/sections/About';
import HeroContents from '../components/sections/HeroContents';
import Charm from '../components/sections/Charm';
import Footer from '../components/sections/Footer';
import WpEmployee from '../components/items/WpEmployee';

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

    // const { allWpPost } = results;
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
    
    // function buildPostMarkup() {
    //     const postMarkup = (allWpPost?.nodes && allWpPost.nodes.length) ? 
    //     allWpPost.nodes.map( ({
    //         excerpt,
    //         id,
    //         title,
    //         uri
    //     }) => (
    //         <div className="post-item" key={id}>
    //             <strong>
    //                 <span dangerouslySetInnerHTML={{__html: title}} />
    //             </strong>
    //             <div>
    //                 <span dangerouslySetInnerHTML={{__html: excerpt}} />
    //             </div>
                
    //             <GatsbyLink to={uri}>Read More</GatsbyLink>
    //         </div>
    //     )) : <div>No Posts Found</div>;

    //     return postMarkup;
    // }

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
    
    function buildAboutMarkup() {
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

    const aboutMarkup = buildAboutMarkup(),
        employeeActiveData = selectEmployee(employeeActive),
        employeeMarkup = employeeActive.length ? <WpEmployee {...employeeActiveData}/> : null,
        dialogData = {
            children: <div>{employeeMarkup}</div>,
            handleClickClose: handleClickClose,
            show: dialogShow
        },
        // postMarkup = buildPostMarkup(),
        staffData = {
            allFile: allFile,
            allWpEmployee: allWpEmployee,
            handleClickDetails: handleClickDetails
        },
        aboutData = {
            allWpSectionAboutContent: allWpSectionAboutContent
        };

    return (
        <StyleWrapper>
            <main>
                <title>DiDi & Smiling John's</title>

                {/* <div>Header/Nav/Booking Button</div> */}

                <HeroContents />

                {/* 
                <div>About Section</div>
                {aboutMarkup} 
                */}
                <About {...aboutData}/>

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
