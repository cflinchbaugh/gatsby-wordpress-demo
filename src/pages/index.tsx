import React, { 
    useEffect,
    useState } from 'react';
import styled from 'styled-components';
import { 
    graphql,
    // Link as GatsbyLink,
    useStaticQuery
} from 'gatsby';
import { Helmet } from 'react-helmet';
import Dialog, {DialogInterface} from '../components/Dialog';
import Staff, {StaffInterface} from '../components/sections/Staff';
import About, {AboutInterface} from '../components/sections/About';
import HeroContents, {} from '../components/sections/HeroContents';
import Map, {} from '../components/sections/Map';
import Charm, {} from '../components/sections/Charm';
import Footer, {FooterInterface} from '../components/sections/Footer';
import EmployeeDetails, {EmployeeDetailsInterface} from '../components/items/EmployeeDetails';
import AttributionDetails, {} from '../components/sections/AttributionDetails';
import { 
    accentDefault,
    accentLight,
    primaryDefault,
    kuro } from '../colors';
import Button, {ButtonInterface} from '../components/Button';

const StyleWrapper = styled.div`
    color: ${kuro};
    background-color: ${primaryDefault};
    fontFamily: "-apple-system, Roboto, sans-serif, serif";
    font-size: 18px;

    a {
        text-decoration: underline;
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
            allWpEmployee(sort: { order: ASC, fields: date }) {
                nodes {
                    databaseId
                    employeeData {
                        biography
                        profession
                        profilePicture {
                            mediaItemUrl
                        }
                        profilePicture2 {
                            mediaItemUrl
                        }
                        services
                        socialMediaInstagram
                    }
                    id
                    title
                    uri
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

    const { allWpEmployee } = results;
    const { allWpSectionAboutContent } = results;
    const { allFile } = results;

    const [dialogShow, setDialogShow] = useState(false);
    const [employeeActive, setEmployeeActive] = useState('');
    const [dialogShowContents, setDialogShowContents] = useState('');

    useEffect(() => {
        const htmlElement = document.getElementsByTagName('html')[0];

        htmlElement.setAttribute('style', 'scroll-behavior: smooth;');
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
                const employeeActiveData:EmployeeDetailsInterface = {
                    allFile: allFile,
                    ...selectEmployee(employeeActive)
                };
                const employeeMarkup = employeeActive.length ? <EmployeeDetails {...employeeActiveData}/> : null;
                const header = (<div style={{ fontSize: '2rem' }}>{employeeActiveData.title}</div>);
                const appointmentButtonData:ButtonInterface = {
                    children: (
                        'Call for Appointment'
                    ),
                    handleClick: () => {
                        window.location.href='tel:+17178587428';
                    },
                    showShimmer: true
                }
                const stylistsFooterMarkup = (
                    <div style={{
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        flexDirection: 'column'
                    }}>
                        
                        <Button {...appointmentButtonData}/>
                    </div>
                );
                const bookNowButtonData:ButtonInterface = {
                    children: (
                        'Book Now'
                    ),
                    handleClick: handleClickCallToAction,
                    showShimmer: true
                }
                const barberFooterMarkup = (
                    <div style={{
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}>
                        <Button {...bookNowButtonData}/>
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
    
    const aboutData:AboutInterface = {
            allWpSectionAboutContent: allWpSectionAboutContent
        },
        dialogData:DialogInterface = {
                ...buildDialogMarkup(),
            handleClickClose: handleClickClose,
            show: dialogShow
        },
        staffData:StaffInterface = {
            allFile: allFile,
            allWpEmployee: allWpEmployee,
            handleClickDetails: handleClickDetails
        },
        footerData:FooterInterface = {
            handleClickAttributions: handleClickAttributions
        }

    return (
        <StyleWrapper>
            <Helmet>
                <meta charSet="utf-8" />
                <title>DiDi & Smiling John's</title>

                <html lang="en-us"/>

                <meta name="author" content="Christopher Flinchbaugh"/>
                <meta name="date" content="2021-06-01"/>
                <meta name="description" content="Whether you want a modern or traditional haircut, coloring, or more- our award-winning Barber Shop and Salon has you covered."/>

                <meta property="og:description" content="Whether you want a modern or traditional haircut, coloring, or more- our award-winning Barber Shop and Salon has you covered."/>

                <meta property="og:title" content="DiDi &amp; Smiling John's Barber Shop and Salon"/>
                <meta property="og:type" content="website"/>
                <meta property="og:url" content="https://www.didiandsmilingjohns.com/"/>
                <meta name="twitter:description" content="Whether you want a modern or traditional haircut, coloring, or more- our award-winning Barber Shop and Salon has you covered."/>
            </Helmet>

            <main>
                <title>DiDi & Smiling John's</title>

                <HeroContents />

                <About {...aboutData}/>

                <Staff {...staffData} />

                <Dialog {...dialogData}/>
                
                <Map />

                <Charm />

                <Footer {...footerData}/>
            </main>
        </StyleWrapper>
    );
};

export default IndexPage;
