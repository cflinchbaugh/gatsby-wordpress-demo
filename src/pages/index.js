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
import EmployeeDetails from '../components/items/EmployeeDetails';
import AttributionDetails from '../components/sections/AttributionDetails';
import { 
    accentDark,
    accentDefault,
    accentLight,
    primaryDefault,
    kuro } from '../colors';
import Button from '../components/Button';

const StyleWrapper = styled.div`
    color: ${kuro};
    background-color: ${primaryDefault};
    fontFamily: "-apple-system, Roboto, sans-serif, serif";
    font-size: 18px;

    a {
        text-decoration: underline;
        &:hover {
            color: ${accentDark};
        }
    }

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
    const [dialogShowContents, setDialogShowContents] = useState(false);

    useEffect(() => {
        document.getElementsByTagName('html')[0].style['scroll-behavior'] = 'smooth';
    }, []);

    function handleClickClose() {
        setDialogShow(false);
    }

    function handleClickDetails(employeeId) {
        setDialogShowContents('employeeDetails');

        setEmployeeActive(employeeId);
        setDialogShow(true);
    }

    function handleClickAttributions() {
        setDialogShowContents('attributions');
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

    function buildDialogMarkup() {
        let dialogData = null;

        if (dialogShow) {
            if (dialogShowContents === 'attributions') {
                dialogData = {
                    children: <AttributionDetails />,
                    footer: null,
                    header: <div style={{ fontSize: '2rem' }}>Attributions</div>
                }
            } else if (dialogShowContents === 'employeeDetails') {
                const employeeActiveData = selectEmployee(employeeActive);
                const employeeMarkup = employeeActive.length ? <EmployeeDetails {...employeeActiveData}/> : null;
                const header = (<div style={{ fontSize: '2rem' }}>{employeeActiveData.title}</div>);
                const stylistsFooterMarkup = (
                    <div style={{
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        flexDirection: 'column'
                    }}>
                        Call for Appointment &nbsp; 
                        <Button handleClick={() => {
                                window.location.href='tel:+17178587428';
                            }}
                            showShimmer={true}>
                            (717) 858-7428
                        </Button>
                    </div>
                );
                const barberFooterMarkup = (
                    <div style={{
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}>
                        <Button handleClick={handleClickCallToAction}
                        showShimmer={true}>
                            Book Now
                        </Button>
                    </div>
                );
                const footer = employeeActiveData?.employeeData?.profession?.includes('Stylist') ? stylistsFooterMarkup : barberFooterMarkup;

                dialogData = {
                    children: <div>{employeeMarkup}</div>,
                    footer: footer,
                    header: header
                }
            }
        }

        return dialogData;
    }
    
    const aboutData = {
            allWpSectionAboutContent: allWpSectionAboutContent
        },
        dialogData = {
                ...buildDialogMarkup(),
            handleClickClose: handleClickClose,
            show: dialogShow
        },
        // postMarkup = buildPostMarkup(),
        staffData = {
            allFile: allFile,
            allWpEmployee: allWpEmployee,
            handleClickDetails: handleClickDetails
        },
        footerData = {
            handleClickAttributions: handleClickAttributions
        }

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

                <Footer {...footerData}/>
                
                {/* { postMarkup } */}
            </main>
        </StyleWrapper>
    );
};

export default IndexPage;
