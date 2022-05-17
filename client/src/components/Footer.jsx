import React from 'react';

const Footer = () => {
    return (
    <section className="footer">
        <hr className="footer-seperator" />
        <section className="footer-social-media">
            <a href="/" /* target="_blank" rel="noopener noreferrer" */ >
                Un1Assist
            </a>
        </section>
        <section className="footer-info">
            <section className="footer-info-left">
                <section className="footer-info__termsConditions">
                    <a href="/">
                        Terms and Conditions
                    </a>
                </section>
                <div className="card-name">
                    <img className='paypal_footer'
                        alt="paypal"
                        src="https://pbs.twimg.com/media/EfTZlEnWAAMn1lX.png"
                    />
                </div>        
            </section>
            <section className="footer-info-center">
                <section className="footer-info__email">
                    <a href="mailto:Un1Assist@gmail.com">
                        Un1Assist@gmail.com
                    </a>
                    <br></br>
                    <section className="footer-info__terms">
                        <a href="/" >
                            About us
                        </a>
                    </section>
                </section>
            </section>
                <section className="footer-info-right">
                    <section className="footer-info__contact">
                        Contact Us
                    </section>
                </section>
        </section>
    </section>
    );
};

export default Footer;