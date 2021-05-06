
import * as React from 'react';
import styled from 'styled-components';

// const mapIframe = () => {
//     return {
//         __html: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3058.1113011065354!2d-76.72676278455695!3d39.96126419113726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c88eaefbbc0f3f%3A0x79254955a3db82e3!2sDidi%20%26%20Smiling%20John&#39;s%20Barber!5e0!3m2!1sen!2sus!4v1620270503179!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>';
//     }
// };

const StyleWrapper = styled.div`
    
`;

function createMarkup() {
    return {
        __html: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3058.1113011065354!2d-76.72676278455695!3d39.96126419113726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c88eaefbbc0f3f%3A0x79254955a3db82e3!2sDidi%20%26%20Smiling%20John&#39;s%20Barber!5e0!3m2!1sen!2sus!4v1620270503179!5m2!1sen!2sus" width="100%" height="500" style="border:0;" allowfullscreen="" loading="lazy"></iframe>'
    };
  }

const Map = () => {
    return (
        <StyleWrapper>
            <div dangerouslySetInnerHTML={createMarkup()}></div>
        </StyleWrapper>
    );
};

export default Map;