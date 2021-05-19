import React, { 
    useEffect,
    useState } from 'react';
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
import Map from '../components/sections/Map';
import Charm from '../components/sections/Charm';
import Footer from '../components/sections/Footer';
import WpEmployee from '../components/items/WpEmployee';
import { 
    accentDefault,
    accentLight,
    primaryDefault,
    kuro } from '../colors';
import Button from '../components/Button';

const StyleWrapper = styled.div`
    color: ${kuro};
    background-color: ${primaryDefault};
    fontFamily: "-apple-system, Roboto, sans-serif, serif";

    .phone {
        color: ${accentDefault};

        &:hover {
            color: ${accentLight};
        }
    }
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
            allWpEmployee(sort: { order: ASC, fields: date }) {
                nodes {
                    id
                    uri
                    title
                    employeeData {
                        biography
                        services
                        profilePicture {
                            mediaItemUrl
                        }
                        profession
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
                            width: 350
                            placeholder: TRACED_SVG
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

    useEffect(() => {
        document.getElementsByTagName('html')[0].style['scroll-behavior'] = 'smooth';
    }, []);

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

    function handleClickCallToAction() {
        if (typeof(window) !== 'undefined') {
            window.open('https://www.vagaro.com/didiandsmilingjohnsbarbershop/book-now','_blank');
        }
    }
    
    const aboutData = {
            allWpSectionAboutContent: allWpSectionAboutContent
        },
        employeeActiveData = selectEmployee(employeeActive),
        employeeMarkup = employeeActive.length ? <WpEmployee {...employeeActiveData}/> : null,
        dialogData = {
            children: dialogShow ? <div>{employeeMarkup}</div> : null,
            handleClickClose: handleClickClose,
            header: dialogShow ? <div style={{
                fontSize: '2rem'
            }}>{employeeActiveData.title}</div> : null,
            footer: employeeActiveData?.employeeData?.profession?.includes('Stylist') ? (
                <div style={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}>
                    Call for Appointment &nbsp; 
                    <Button handleClick={() => {
                            window.location.href='tel:+17178587428';
                        }}
                        showShimmer="true">
                        (717) 858-7428
                    </Button>
                </div>
            ) : (
                <div style={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}>
                    <Button handleClick={handleClickCallToAction}
                    showShimmer="true">
                        Book Now
                    </Button>
                </div>
            ),
            show: dialogShow
        },
        // postMarkup = buildPostMarkup(),
        staffData = {
            allFile: allFile,
            allWpEmployee: allWpEmployee,
            handleClickDetails: handleClickDetails
        };

    return (
        <StyleWrapper>
            <main>
                <title>DiDi & Smiling John's</title>

                {/* <div>Header/Nav/Booking Button</div> */}

                <HeroContents />

                <About {...aboutData}/>

                <Staff {...staffData} />

                <Dialog {...dialogData}/>
                
                <Map />

                <Charm />

                <Footer/>
                
                {/* { postMarkup } */}
            </main>
        </StyleWrapper>
    );
};

export default IndexPage;
