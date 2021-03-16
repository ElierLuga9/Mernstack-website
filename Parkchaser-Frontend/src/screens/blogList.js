import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { withRouter } from "react-router-dom";

import MetaTags from 'react-meta-tags';

import { getAllBlogs, setPathname } from '../actions';
import { extractImageFromHTML, extractText } from '../util';

import '../styles/Blog.css';

class CityList extends Component {

    constructor(props) {
        super(props);
        this.mobileAdRef = React.createRef();

        var history = this.props.history;
        history.listen((location) => {
            this.props.setPathname(location.pathname);
        });
    }

    componentDidMount() {

        this.props.setPathname('/blog');

        this.props.getAllBlogs();

        //Ads Initializer
        const isMobileDevice = getComputedStyle(this.mobileAdRef.current).display === 'block';

        let elements = [];
        if (isMobileDevice)
            elements = document.getElementsByClassName("dads");
        else
            elements = document.getElementsByClassName("mads");

        for (let i = 0; i < elements.length; i++)
            elements[i].innerHTML = '';

        (window.adsbygoogle = window.adsbygoogle || []).push({});


        if (!isMobileDevice) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
    }
    goToBlog(blog) {
        this.props.history.push('/blog/' + blog.title.replace(/\s/g, '-').replace('?', '') + '/' + blog._id);
    }
    render() {
        const blogs = this.props.blogs;
        const sortedBlogs = blogs.sort(function (a, b) {
            return moment(b.dateCreated).format('YYYYMMDD') - moment(a.dateCreated).format('YYYYMMDD')
        });
        console.log(sortedBlogs)
        var facebooklink = 'https://www.facebook.com/sharer/sharer.php?u=https://www.parkchaser.com/blog&t=Check out this skatepark I found.';
        var twitterlink = 'http://twitter.com/share?text=Check out this skatepark I found.&url=https://www.parkchaser.com/blog&hashtags=parkchaser,skatepark,skateparkchaser';
        var maillink = "mailto:?subject=Check out this skatepark I found.&body=https://www.parkchaser.com/blog";
        return (
            <div>
                <MetaTags>
                    <title>Skatepark Blog - Parkchaser Skatepark Map</title>
                    <meta name="description" content="Find skatepark news and skatepark resources at Parkchaser - US Skatepark Map & Indoor Skatepark Map." />
                </MetaTags>

                <div className='mads' ref={this.mobileAdRef} >
                    <ins className='adsbygoogle'
                        style={{ display: 'block' }}
                        data-ad-client='ca-pub-4654547222186915'
                        data-ad-slot='8708355457'
                        data-ad-format="horizontal"
                        data-adtest='on' />
                </div>


                <div className='mainContainer' style={{ minHeight: '1000px' }}>

                    <div className='mainPanel'>
                        <h1 style={{ marginTop: '0px' }}>SKATEPARK BLOG</h1>
                        {sortedBlogs.map((blog, index) =>
                            <div key={index} className='blogListItem' >
                                <div className='blogImageArea'>
                                    <img src={extractImageFromHTML(blog.content)} alt='skateparkimage' className='blogImage'
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => this.goToBlog(blog)} />
                                </div>


                                {/*

                                     */}
                                <div className='blogTextArea'>
                                    <div style={{ cursor: 'pointer' }}
                                        onClick={() => this.goToBlog(blog)}>
                                        <h2 className='blogTitle'>{blog.title}</h2>
                                    </div>
                                    <p className='blogTextContent'>{extractText(blog.content).substring(0, 200)} ...</p>
                                </div>
                            </div>)}
                    </div>
                    <div className='sidePanel'>
                        <h4 style={{ marginTop: '15px', marginBottom: '6px' }}>SHARE THIS SPOT</h4>
                        <a href={facebooklink}
                            target="_blank" rel="noopener noreferrer" title="Share on Facebook">
                            <button className='fa fa-facebook socialbutton'></button>
                        </a>
                        <a href={twitterlink}
                            target="_blank" rel="noopener noreferrer" title="Share on Twitter">
                            <button className='fa fa-twitter socialbutton'> </button>
                        </a>
                        <a href={maillink}>
                            <button className='fa fa-envelope socialbutton'> </button>
                        </a>
                        <div style={{ marginTop: '40px' }}>
                            <div className='dads' >
                                <ins className='adsbygoogle'
                                    style={{ display: 'block', height: '100%' }}
                                    data-ad-client='ca-pub-4654547222186915'
                                    data-ad-slot='8708355457'
                                    data-ad-format="auto"
                                    data-adtest='on' />
                            </div>
                            <div className='dads' >
                                <ins className='adsbygoogle'
                                    style={{ display: 'block' }}
                                    data-ad-client='ca-pub-4654547222186915'
                                    data-ad-slot='8708355457'
                                    data-ad-format='rectangle, horizontal'
                                    data-adtest='on' />
                            </div>
                            <div className='dads' >
                                <ins className='adsbygoogle'
                                    style={{ display: 'block' }}
                                    data-ad-client='ca-pub-4654547222186915'
                                    data-ad-slot='8708355457'
                                    data-ad-format="auto"
                                    data-adtest='on' />
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        );
    }
}

const mapStateToProps = state => ({
    blogs: state.blogReducer.blogs
});

const mapDispatchToProps = dispatch => ({
    getAllBlogs: () => dispatch(getAllBlogs()),
    setPathname: (path) => dispatch(setPathname(path))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CityList));
