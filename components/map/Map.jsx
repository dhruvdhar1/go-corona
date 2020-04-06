import React from 'react';
import PropTypes from 'prop-types'
import Icon from './Icon.jsx'
import styles from './styles.scss'


/**
 * @description This components creates map view with animated round spots on it
 */
class Map extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            revealed: false,
            activeIndex: null,
            intervalID: null,
            stopDelay: false
        }
    }


    myRef = React.createRef();

    onScroll = () => {
        if (this.state.revealed) {
            window.removeEventListener('scroll', this.onScroll)
        } else {
            const scrolled = window.scrollY + window.screen.availHeight
            if (this.myRef.current !== null) {
                const {height} = this.myRef.current.getBoundingClientRect()
                if ((window.screen.availHeight + this.myRef.current.offsetTop + height) < scrolled) {
                    this.setState({
                        revealed: true
                    })
                }
            }
        }
    }

    componentDidMount() {

        if (this.props.animatedReveal) {
            window.addEventListener('scroll', this.onScroll)
        } else {
            this.setState({
                revealed: true
            });
        }

        setTimeout(() => {
            this.setState({
                stopDelay: true,
                intervalID: setInterval(() => {
                    const currentActive = this.state.activeIndex;
                    this.setState({
                        activeIndex: currentActive > 2 ? 0 : currentActive + 1
                    })
                }, 4000)
            })
        }, 2000)

    }


    render() {
        return (
            <div className={this.props.animatedReveal ? styles.container : ''} style={{position: 'relative'}}
                 ref={this.myRef}>

                <img style={{width: '100%'}} src={this.props.mapURL} alt={'World map'}/>

                <Icon color={'#3452ff'} path={this.props.firstIcon} active={this.state.activeIndex === 0}
                      revealed={this.state.revealed} transitionDelay={'0s'} coords={{left: '10%', top: '10%' }} />

                <Icon color={'#f44b87'} path={this.props.secondIcon} active={this.state.activeIndex === 1}
                      revealed={this.state.revealed} transitionDelay={!this.state.stopDelay ? '.5s' : '0s'} coords={{right: '35%', top: '45%'}}/>

                <Icon color={'#f5bb4d'} path={this.props.thirdIcon} transitionDelay={!this.state.stopDelay ? '1s' : '0s'} active={this.state.activeIndex === 2}
                      revealed={this.state.revealed} coords={{right: '20%', top: '13%' }}/>

            </div>
        );
    }
}

Map.defaultProps = {
    mapURL: 'http://softlab.wgl-demo.net/wp-content/uploads/2019/02/rev-1-5.png',
    firstIcon: 'https://image.flaticon.com/icons/svg/126/126515.svg',
    secondIcon: 'https://image.flaticon.com/icons/svg/126/126515.svg',
    thirdIcon: 'https://image.flaticon.com/icons/svg/126/126515.svg',
    animatedReveal: false
}

Map.propTypes = {
    mapURL: PropTypes.string.isRequired,
    firstIcon: PropTypes.string.isRequired,
    secondIcon: PropTypes.string.isRequired,
    thirdIcon: PropTypes.string.isRequired,
    animatedReveal: PropTypes.bool
}


export default Map;