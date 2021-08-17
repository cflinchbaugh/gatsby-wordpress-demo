import React from 'react';
import styled from 'styled-components';
import AboutCard, {AboutCardInterface} from '../items/AboutCard';
import Tabs from '../Tabs';

const StyleWrapper = styled.div`
    display: flex;
    justify-content: center;

    @media only screen and (min-width: 768px) {
        padding: 0 25px;
    }
`;

const awardWinning:AboutCardInterface = {
        contents: 'Repeat winner of “Susquehanna Style’s” Best Barber Shop in York,  "Outstanding Small Business" awarded by Downtown First, & Best Small Business 2016 awarded by Downtown Inc.',
        key: 'Award Winning',
        title: 'Award Winning'
    },
    local:AboutCardInterface = {
        contents: 'We proudly serve our diverse community and maintain a safe environment of equality, inclusion, and respect for all people.',
        key: 'Local',
        title: 'Local'
    },
    principled:AboutCardInterface = {
        contents: 'Partner of Davines, striving to do the best for the world through beauty, ethics, and sustainability.',
        key: 'Principled',
        title: 'Principled'
    },
    professional:AboutCardInterface = {
        contents: 'Our services include traditional and modern haircuts, coloring, balayage, precision scissor cuts, and much, much more.',
        key: 'Professional Styling',
        title: 'Professional Styling'
    },
    wedding:AboutCardInterface = {
        contents: 'We want to help make your special day the best that it can be! We accomodate wedding parties and are available for on-site Wedding Hair',
        key: 'Wedding Services',
        title: 'Wedding Services'
    },
    shaves:AboutCardInterface = {
        contents: 'From trims to straight razor, we’ve got you covered.',
        key: 'Professional Shaves',
        title: 'Professional Shaves'
    }

interface AboutInterface {

}

const About = () => {
    const tabContent = [{
        id: 'who',
        tabLabel: 'Who We Are',
        content: [
            <AboutCard {...awardWinning} />,
            <AboutCard {...local} />,
            <AboutCard {...principled} />
        ]
    }, {
        id: 'what',
        tabLabel: 'What We Do',
        content: [
            <AboutCard {...professional} />,
            <AboutCard {...wedding} />,
            <AboutCard {...shaves} />
        ]
    }];

    const tabsData = {
        activeTabDefault: 'who',
        tabContent: tabContent
    }

    return (
        <StyleWrapper>
            <Tabs {...tabsData} />
        </StyleWrapper>
    );
};

export default About;
export type {AboutInterface};