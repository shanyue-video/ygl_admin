import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from './components/main_layout';
import Navigations from './containers/navigations';

import Content from './containers/content';
import PointApplay from './containers/point_applay';
import Badge from './containers/badge.js';
import Banners from './containers/banners.js';
import Discuz from './containers/discuz.js';
import Doctors from './containers/doctors.js';

export default function (injectDeps, {FlowRouter}) {
    const MainLayoutCtx = injectDeps(MainLayout);

    FlowRouter.route('/', {
        name: 'home',
        action() {
            mount(MainLayoutCtx, {
                navigations: () => (<Navigations />),
                content: () => (<Content />)
            });
        }
    });

    FlowRouter.route('/pointApplay', {
        name: 'pointApplay',
        action() {
            mount(MainLayoutCtx, {
                navigations: () => (<Navigations />),
                content: () => (<PointApplay />)
            });
        }
    });

    FlowRouter.route('/badge', {
        name: 'badge',
        action() {
            mount(MainLayoutCtx, {
                navigations: () => (<Navigations />),
                content: () => (<Badge />)
            });
        }
    });

    FlowRouter.route('/banners', {
        name: 'banners',
        action() {
            mount(MainLayoutCtx, {
                navigations: () => (<Navigations />),
                content: () => (<Banners />)
            });
        }
    });

    FlowRouter.route('/discuz', {
        name: 'discuz',
        action() {
            mount(MainLayoutCtx, {
                navigations: () => (<Navigations />),
                content: () => (<Discuz />)
            });
        }
    });

    FlowRouter.route('/doctor', {
        name: 'doctor',
        action() {
            mount(MainLayoutCtx, {
                navigations: () => (<Navigations />),
                content: () => (<Doctors />)
            });
        }
    });
}
