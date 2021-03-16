import React from 'react';

function SocialButton({ type }) {
    let link;
    switch (type) {
        case 'facebook':
            link = 'https://www.facebook.com/skateparkchaser/';
            break;
        case 'instagram':
            link = 'https://www.instagram.com/skateparkchaser/';
            break;
        case 'twitter':
            link = 'https://twitter.com/parkchaser';
            break;
        default:
            break;
    }
    return (
        <a href={link}
            target="_blank" rel="noopener noreferrer" title={type}>
            <button className={'socialbutton fa fa-' + type}></button>
        </a>
    );
}

export default SocialButton;
