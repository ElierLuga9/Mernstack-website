import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { PacmanLoader } from 'react-spinners';

import MetaTags from 'react-meta-tags';

import { getBlog } from '../lib/api';
import { getRecentBlogs, setPathname } from '../actions';

import NotFound from './404';

import { withRouter } from 'react-router'

import '../styles/Detail.scss';
import { extractImageFromHTML, extractText } from '../util';

class Blog extends Component {

    constructor(props) {
        super(props)
        this.state = {
            blogData: {}
        };
        this.mobileAdRef = React.createRef();

        var history = this.props.history;
        this.props.setPathname(history.location.pathname);

        history.listen((location) => {
            this.props.setPathname(location.pathname);
        });
    }

    async getBlogData(blogId) {
        let blogData = await getBlog(blogId);
        this.setState({
            blogData: blogData
        }, () => {
            //Ads Initializer
            if (!this.state.adsLoaded) {
                const isMobileDevice = getComputedStyle(this.mobileAdRef.current).display === 'block';

                let elements = [];
                if (isMobileDevice)
                    elements = document.getElementsByClassName("dads");
                else
                    elements = document.getElementsByClassName("mads");

                for (let i = 0; i < elements.length; i++)
                    elements[i].innerHTML = '';

                (window.adsbygoogle = window.adsbygoogle || []).push({});
                (window.adsbygoogle = window.adsbygoogle || []).push({});
                this.setState({ adsLoaded: true });
            }
        });
    }
    componentDidMount() {
        this.props.getRecentBlogs();
    }
    componentWillReceiveProps(nextProp) {
        this.getBlogData(nextProp.match.params.blogid);
    }
    setImageWidth(stringHTML) {
        let newStringHTML = stringHTML.replace(/<img/g, '<img style="max-width:100%;"').replace(/<a class="/g, '<a class="textClickable ');
        return newStringHTML;
    }
    goToBlog(blog) {
        this.props.history.push('/blog/' + blog.title.replace(/\s/g, '-').replace('?', '') + '/' + blog._id);
    }
    render() {
        const { blogData } = this.state;
        var recentBlogs = this.props.recentBlogs;
        if (blogData != null) {


            var url = this.props.location.pathname;
            var facebooklink = 'https://www.facebook.com/sharer/sharer.php?u=https://www.parkchaser.com/';
            facebooklink += url;
            facebooklink += '&t=#parkchaser #skatepark #skateparkchaser';

            var twitterlink = 'http://twitter.com/share?text=&url=https://www.parkchaser.com';
            twitterlink += url;
            twitterlink += '&hashtags=parkchaser,skatepark,skateparkchaser';

            var mailLink = "mailto:?subject=#parkchaser #skatepark #skateparkchaser&body=https://parkchaser.com";
            mailLink += url;
        }
        return (
            <div>
                <div className='mads' ref={this.mobileAdRef} key='mad1'>
                    <ins className='adsbygoogle'
                        style={{ display: 'block' }}
                        data-ad-client='ca-pub-4654547222186915'
                        data-ad-slot='8708355457'
                        data-ad-format="horizontal"
                        data-adtest='on' />
                </div>
                {blogData === undefined ?
                    <NotFound /> :
                    <div>
                        <MetaTags>
                            <title> {blogData.title}</title>
                            <meta name="description" content={blogData._id !== undefined && extractText(blogData.content).substring(0, 160)} />
                        </MetaTags>
                        {
                            blogData._id !== undefined ?
                                < div className='mainDetailContainer' >
                                    <div className='mainDetailPanel' >
                                        <div style={{ marginBottom: '20px' }}>
                                            <h1>{blogData.title}</h1>
                                            <p>Posted on {moment(blogData.dateCreated).format('MMMM DD, YYYY')}</p>
                                        </div>
                                        <div dangerouslySetInnerHTML={{ __html: this.setImageWidth(blogData.content) }} />
                                        <div style={{ textAlign: 'center', marginTop: '150px' }} >
                                            <button className='mainbutton' style={{ width: '200px' }}
                                                onClick={() => this.props.history.push('/blog')}> VIEW ALL POSTS</button>
                                        </div>
                                        <div className='mads' key={blogData.title + 'mad2'}
                                            style={{ marginTop: '20px ' }}>
                                            <ins className='adsbygoogle'
                                                style={{ display: 'block' }}
                                                data-ad-client='ca-pub-4654547222186915'
                                                data-ad-slot='8708355457'
                                                data-ad-format="horizontal"
                                                data-adtest='on' />
                                        </div>

                                    </div>
                                    <div className='sideDetailPanel'>
                                        <h4 style={{ marginTop: '15px', marginBottom: '6px' }}>SHARE THIS SPOT</h4>
                                        <a href={facebooklink}
                                            target="_blank" rel="noopener noreferrer" title="Share on Facebook">
                                            <button className='fa fa-facebook socialbutton'></button>
                                        </a>
                                        <a href={twitterlink}
                                            target="_blank" rel="noopener noreferrer" title="Share on Twitter">
                                            <button className='fa fa-twitter socialbutton'> </button>
                                        </a>
                                        <a href={mailLink}>
                                            <button className='fa fa-envelope socialbutton'> </button>
                                        </a>
                                        <div>
                                            <h3>RECENT POSTS</h3>
                                        </div>
                                        <div>
                                            {recentBlogs.map((blog, index) =>
                                                <div key={index} className='blogListThumbnailItem' style={{ cursor: 'pointer' }}
                                                    onClick={() => this.goToBlog(blog)} >
                                                    <div className='blogImageThumbnailArea'>
                                                        <img src={extractImageFromHTML(blog.content)} alt='skateparkimage' className='blogThumbnailImage' />
                                                    </div>
                                                    <div className='blogTextThumbnailArea'>
                                                        <div>
                                                            <h5 className='blogTitle' style={{ margin: '0px' }}>{blog.title}</h5>
                                                        </div>
                                                    </div>
                                                </div>)}
                                        </div>
                                        <div className='dads' key={blogData.title + 'dad1'}>
                                            <ins className='adsbygoogle'
                                                style={{ display: 'block' }}
                                                data-ad-client='ca-pub-4654547222186915'
                                                data-ad-slot='8708355457'
                                                data-ad-format="auto"
                                                data-adtest='on' />
                                        </div>
                                        <div className='dads' key={blogData.title + 'dad2'}>
                                            <ins className='adsbygoogle'
                                                style={{ display: 'block' }}
                                                data-ad-client='ca-pub-4654547222186915'
                                                data-ad-slot='8708355457'
                                                data-ad-format="auto"
                                                data-adtest='on' />
                                        </div>
                                    </div>
                                </div > :
                                < div style={{ width: '100%', height: '500px', alignItems: 'center', display: 'flex', justifyContent: 'center', boxSizing: 'border-box' }} >
                                    <PacmanLoader
                                        sizeUnit={"px"}
                                        size={40}
                                        color={'#A4DA2A'}
                                        loading={this.state.loading}
                                    />
                                </div>
                        }
                    </div>
                }</div>
        );
    }
}

const mapStateToProps = state => ({
    currentPos: state.placeReducer.currentPos,
    places: state.placeReducer.places,
    recentBlogs: state.blogReducer.recentBlogs
});

const mapDispatchToProps = dispatch => ({
    getRecentBlogs: () => dispatch(getRecentBlogs()),
    setPathname: (path) => dispatch(setPathname(path))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Blog));
