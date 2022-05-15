import React from 'react';

const Footer = () => {
    return (
    <section className="footer">
        <hr className="footer-seperator" />
        <section className="footer-social-media">
            <a href="/" target="_blank" rel="noopener noreferrer">
                Un1Assist
            </a>
        </section>
        <section className="footer-info">
            <section className="footer-info-left">
                <section className="footer-info__returns">
                    Returns Policy
                </section>        
            </section>
        <section className="footer-info-center">
            <section className="footer-info__email">
                shop.info@gmail.com
            </section>
        <section className="footer-info__terms">
            <a href="/" target="_blank" rel="noopener noreferrer">
                Terms and Conditions
            </a>
        </section>
            </section>
            <section className="footer-info-right">
                <section className="footer-info__contact">
                    Contact Us
                </section>
            </section>
        </section>
        <div className="card-name">
            <img
            alt="paypal"
            src="https://pbs.twimg.com/media/EfTZlEnWAAMn1lX.png"
            />
        </div>
        <hr className="footer-seperator" />
    </section>
    );
};

export default Footer;