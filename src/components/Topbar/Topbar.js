import React, { Component } from 'react';
import logo from '../../assets/logo.png'
import './Topbar.scss';

class Topbar extends Component {
    constructor() {
        super();
        this.state = {
            show: '',
            tabs: [
                {
                    name: 'Home',
                    path: '/',
                    active: 'active'
                },
                {
                    name: 'Prevention',
                    path: '/prevention',
                    active: ''
                }
                // {
                //     name: 'WHO',
                //     path: '/who',
                //     active: ''
                // }
            ]
        };
    }

    onTabClick(tab) {
        const { tabs } = this.state;
        let tempTabs = [];
        tabs.forEach(currentTab => {
            let tempTabObject = {}
            if (tab.name === currentTab.name) {
                tempTabObject = {
                    name: currentTab.name,
                    path: currentTab.path,
                    active: true,
                }
            } else {
                tempTabObject = {
                    name: currentTab.name,
                    path: currentTab.path,
                    active: false,
                }
            }
            tempTabs.push(tempTabObject);
        });
        this.setState({
            tabs: tempTabs,
        })
    }

    toggleMenu() {
        const { show } = this.state;
        if (show) {
            this.setState({
                show: '',
            });
        } else {
            this.setState({
                show: 'show',
            });
        }
    }
    render() {
        const { show, tabs } = this.state;
        return (
            <div className="top-bar-root make-sticky">
                <nav class="navbar navbar-expand-md navbar-light bg-light">
                    <a href="/" class="navbar-brand">
                        <img src={logo} height="28" alt="goCorona" /> goCorona
                    </a>
                    <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse" onClick={() => this.toggleMenu()}>
                        <span class="navbar-toggler-icon"></span>

                    </button>
                    <div class={`collapse navbar-collapse ${show}`} id="navbarCollapse">
                        <div class="navbar-nav nav-bar-background">
                            {
                                tabs.map(tab => {
                                    return (
                                        <a href={tab.path} class={`nav-item nav-link ${tab.active}`} onClick={() => this.onTabClick(tab)}>{tab.name}</a>
                                    )
                                })
                            }
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}
export default Topbar;