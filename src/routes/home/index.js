import { h, Component } from 'preact';
import style from './style';
import axios from 'axios';

export default class Home extends Component {
	constructor () {
		super();
		this.state = {
			shots: []
		};
	}

	componentWillMount () {
		axios.get('https://api.dribbble.com/v1/shots?list=debuts&sort=recent&page=2&per_page=12&access_token=14d01cc0327dfd5900044a4b70978e4f90f24d5db82b38421e522cbd35f16d6d')
			.then( res => {
				this.setState({ shots: res.data });
			})
			.catch(err => {
				console.log(err);
			});
	}
	render() {
		return (
			<div class={style.home}>
                <div class="container">
                    <div class="row">
                        {this.state.shots.map((item, i) => (
                            <div class="col-xs-12 col-sm-6 col-md-4" key={i}>
                                <div class={style.box}>
                                    <a href={item.html_url} target="_blank" class={style.title}>
                                        <img src={item.images.hidpi || item.images.normal || item.images.teaser} />
                                    </a>
                                    <a href={item.html_url} target="_blank" class={style.title}>{item.title}</a>
                                    <div class={style.userprofile}>
                                        <img src={item.user.avatar_url} />
                                        <a target="_blank" href={item.user.html_url}>
                                            {item.user.name}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
			</div>
		);
	}
}
