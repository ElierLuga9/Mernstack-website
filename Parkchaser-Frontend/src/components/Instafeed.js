import * as React from 'react';
import { Page } from 'tabler-react';
import { buildUrl } from 'react-instafeed';

import { PacmanLoader } from 'react-spinners';

const options = {
	accessToken: '20520096944.194596a.c3a4dfd4548f45ad846b4ee55f17d710',
	clientId: '194596aa75864a5a96ee81f7bfbd3a14',
	get: 'user', // popular, user
	locationId: null,
	resolution: 'standard_resolution', // thumbnail, low_resolution, standard_resolution
	sortBy: 'most-recent', // none, least-commented, least-liked, least-recent, most-commented, most-liked, most-recent, random
	tagName: 'parkchaser',
	userId: 20520096944,
};

const InstagramURL = buildUrl(options);

class InstaFeedPage extends React.Component {
	constructor() {
		super();
		this.state = {
			postList: [],
			loading: true,
		};
	}

	componentWillMount() {
		fetch(InstagramURL)
			.then(res => res.json())
			.then((responseJson) => {
				// testing promise to see if I can get data in console
				let instaList = responseJson.data.map((el, i, arr) => {
					return {
						images: el.images,
						caption: el.caption,
						link: el.link
					};
				});
				this.setState({ postList: instaList, loading: false });

				console.log(instaList)
				// return responseJson.data;
			})
			.catch((error) => {
				console.error(error);
			});
	}

	openInstagramPost(url) {
		window.open(url, '_blank');
	}

	render() {
		return (
			<div>
				<Page.Content>
					<div>
						{// eslint-disable-next-line no-unused-vars
							this.state.loading ?
								<div style={{ textAlign: 'center', margin: 'auto', marginTop: '30px', width: '80px', height: '100px' }}>
									<PacmanLoader
										sizeUnit={"px"}
										size={50}
										color={'#A4DA2A'}
										loading={this.state.loading}
									/>
								</div>
								: this.state.postList.map((post, index) => {

									return (
										<a href={post.link} key={index} target='_blank' rel="noopener noreferrer" >
											<img
												src={post.images.thumbnail.url}
												style={{ margin: '10px' }}
												alt=""
											/>
										</a>
									)
								})
						}
					</div>
				</Page.Content>
			</div>
		);
	}
};

export default InstaFeedPage;