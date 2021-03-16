import React, { Component } from 'react';
import { withRouter } from "react-router";
import { extractImageFromHTML } from '../util';

class PostList extends Component {
    render() {
        return (
            <div style={{ margin: '0px 0px 80px 0px' }}>
                {this.props.blogs.map((blog, index) =>
                    <div key={index} className='blogListThumbnailItem' style={{ cursor: 'pointer' }}
                        onClick={() => this.props.history.push('/blog/' + blog.title.replace(/\s/g, '-').replace('?', '') + '/' + blog._id)} >
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
        );
    }
}



export default withRouter(PostList);
