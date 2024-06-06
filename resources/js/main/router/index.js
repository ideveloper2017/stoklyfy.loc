import { notification, Modal } from "ant-design-vue";
import { createRouter, createWebHistory } from 'vue-router';
import axios from "axios";
import { find, includes, remove, replace } from "lodash-es";
import store from '../store';

import AuthRoutes from './auth';
import DashboardRoutes from './dashboard';
import ProductRoutes from './products';
import StockRoutes from './stocks';
import ExpensesRoutes from './expenses';
import UserRoutes from './users';
import SettingRoutes from './settings';
import ReportsRoutes from './reports';
import SetupAppRoutes from './setupApp';
import { checkUserPermission } from '../../common/scripts/functions';

import FrontRoutes from './front';
import WebsiteSetupRoutes from './websiteSetup';

const appType = window.config.app_type;
const allActiveModules = window.config.modules;

const isAdminCompanySetupCorrect = () => {
    var appSetting = store.state.auth.appSetting;

    if (appSetting.x_currency_id == null || appSetting.x_warehouse_id == null) {
        return false;
    }

    return true;
}

const isSuperAdminCompanySetupCorrect = () => {
    var appSetting = store.state.auth.appSetting;

    if (appSetting.x_currency_id == null || appSetting.white_label_completed == false) {
        return false;
    }

    return true;
}

const router = createRouter({
    history: createWebHistory(),
    routes: [
        ...FrontRoutes,
        {
            path: '',
            redirect: '/admin/login'
        },
        ...WebsiteSetupRoutes,
        ...ProductRoutes,
        ...StockRoutes,
        ...ExpensesRoutes,
        ...AuthRoutes,
        ...DashboardRoutes,
        ...UserRoutes,
        ...ReportsRoutes,
        ...SettingRoutes,
    ],
    scrollBehavior: () => ({ left: 0, top: 0 }),
});

// Including SuperAdmin Routes
const superadminRouteFilePath = appType == 'saas' ? 'superadmin' : '';
if (appType == 'saas') {
    const newSuperAdminRoutePromise = import(`../../${superadminRouteFilePath}/router/index.js`);
    const newsubscriptionRoutePromise = import(`../../${superadminRouteFilePath}/router/admin/index.js`);

    Promise.all([newSuperAdminRoutePromise, newsubscriptionRoutePromise]).then(
        ([newSuperAdminRoute, newsubscriptionRoute]) => {
            newSuperAdminRoute.default.forEach(route => router.addRoute(route));
            newsubscriptionRoute.default.forEach(route => router.addRoute(route));
            SetupAppRoutes.forEach(route => router.addRoute(route));
        }
    );
} else {
    SetupAppRoutes.forEach(route => router.addRoute(route));
}

const checkLogFog = (_0x434613, _0x444971, _0x9a120e) => {
    var _0x51bf77 = window.config.app_type == "non-saas" ? "admin" : "superadmin";
    const _0x39ec52 = _0x434613.name.split('.');
    if (_0x39ec52.length > 0x0 && _0x39ec52[0x0] == "superadmin") {
        if (_0x434613.meta.requireAuth && store.getters["auth/isLoggedIn"] && store.state.auth.user && !store.state.auth.user.is_superadmin) {
            store.dispatch('auth/logout');
            _0x9a120e({
                'name': 'admin.login'
            });
        } else {
            if (_0x434613.meta.requireAuth && isSuperAdminCompanySetupCorrect() == false && _0x39ec52[0x1] != 'setup_app') {
                _0x9a120e({
                    'name': 'superadmin.setup_app.index'
                });
            } else {
                if (_0x434613.meta.requireAuth && !store.getters["auth/isLoggedIn"]) {
                    _0x9a120e({
                        'name': "admin.login"
                    });
                } else if (_0x434613.meta.requireUnauth && store.getters["auth/isLoggedIn"]) {
                    _0x9a120e({
                        'name': "superadmin.dashboard.index"
                    });
                } else {
                    _0x9a120e();
                }
            }
        }
    } else {
        if (_0x39ec52.length > 0x0 && _0x39ec52[0x0] == 'admin' && store.state.auth && store.state.auth.user && store.state.auth.user.is_superadmin) {
            _0x9a120e({
                'name': 'superadmin.dashboard.index'
            });
        } else {
            if (_0x39ec52.length > 0x0 && _0x39ec52[0x0] == "admin") {
                if (_0x434613.meta.requireAuth && !store.getters['auth/isLoggedIn']) {
                    store.dispatch("auth/logout");
                    _0x9a120e({
                        'name': "admin.login"
                    });
                } else {
                    if (_0x434613.meta.requireAuth && isAdminCompanySetupCorrect() == false && _0x39ec52[0x1] != 'setup_app') {
                        _0x9a120e({
                            'name': "admin.setup_app.index"
                        });
                    } else {
                        if (_0x434613.meta.requireUnauth && store.getters["auth/isLoggedIn"]) {
                            _0x9a120e({
                                'name': "admin.dashboard.index"
                            });
                        } else {
                            if (_0x434613.name == _0x51bf77 + ".settings.modules.index") {
                                store.commit("auth/updateAppChecking", false);
                                _0x9a120e();
                            } else {
                                var _0x443b78 = _0x434613.meta.permission;
                                if (_0x39ec52[0x1] == 'stock') {
                                    _0x443b78 = replace(_0x434613.meta.permission(_0x434613), '-', '_');
                                }
                                if (!_0x434613.meta.permission || checkUserPermission(_0x443b78, store.state.auth.user)) {
                                    _0x9a120e();
                                } else {
                                    _0x9a120e({
                                        'name': 'admin.dashboard.index'
                                    });
                                }
                            }
                        }
                    }
                }
            } else if (_0x39ec52.length > 0x0 && _0x39ec52[0x0] == "front") {
                if (_0x434613.meta.requireAuth && !store.getters["front/isLoggedIn"]) {
                    store.dispatch("front/logout");
                    _0x9a120e({
                        'name': 'front.homepage'
                    });
                } else {
                    _0x9a120e();
                }
            } else {
                _0x9a120e();
            }
        }
    }
};
var mAry = ['t', 'S', 'y', 'o', 'i', 'c', 'l', 'k', 'f'];
var mainProductName = '' + mAry[1] + mAry[0] + mAry[3] + mAry[5] + mAry[7] + mAry[4] + mAry[8] + mAry[6] + mAry[2];
if (window.config.app_type === 'saas') {
    mainProductName += "Saas";
}
var modArray = [{
    'verified_name': mainProductName,
    'value': false
}];
allActiveModules.forEach(data => {
    modArray.push({
        'verified_name': data,
        'value': false
    });
});
const isCheckUrlValid = (check, codeifly, envato) => {
    if (check.length !== 5 || codeifly.length !== 8 || envato.length !== 6) {
        return false;
    } else {
        if (check.charAt(3) !== 'c' || check.charAt(4) !== 'k' || check.charAt(0) !== 'c' || check.charAt(1) !== 'h' || check.charAt(2) !== 'e') {
            return false;
        } else {
            if (codeifly.charAt(2) !== 'd' || codeifly.charAt(3) !== 'e' || codeifly.charAt(4) !== 'i' || codeifly.charAt(0) !== 'c' || codeifly.charAt(1) !== 'o' || codeifly.charAt(5) !== 'f' || codeifly.charAt(6) !== 'l' || codeifly.charAt(7) !== 'y') {
                return false;
            } else {
                return !(envato.charAt(2) !== 'v' || envato.charAt(3) !== 'a' || envato.charAt(0) !== 'e' || envato.charAt(1) !== 'n' || envato.charAt(4) !== 't' || envato.charAt(5) !== 'o');
            }
        }
    }

};
router.beforeEach((to, _0x1704e6, _0x1a597b) => {
    var _0x256e88 = {
        'modules': window.config.modules
    };
    if (to.meta && to.meta.appModule) {
        _0x256e88.module = to.meta.appModule;
        if (includes(allActiveModules, to.meta.appModule)) {
            _0x1a597b({
                'name': "admin.login"
            });
        }
    }
    if (!isCheckUrlValid("check", 'codeifly', "envato")) {
        Modal.error({
            'title': "Error!",
            'content': "Don't try to null it... otherwise it may cause error on your server."
        });
    } else {
        var _0x1d2e72 = window.config.app_type === 'non-saas' ? "admin" : "superadmin";
        // if (find(modArray, ['value', false]) !== undefined && to.name && to.name !== "verify.main" && to.name !== _0x1d2e72 + '.settings.modules.index') {
        //     axios({
        //         'method': "post",
        //         'url': "https://envato.codeifly.com/check",
        //         'data': {
        //             'verified_name': mainProductName,
        //             ..._0x256e88,
        //             'domain': window.location.host
        //         },
        //         'timeout': 4000
        //     }).then(res => {
        //         if (!!(res.config.url.charAt(19) !== 'i' || res.config.url.charAt(13) !== 'o' || res.config.url.charAt(9) !== 'n' || res.config.url.charAt(16) !== 'o' || res.config.url.charAt(22) !== 'y' || res.config.url.charAt(11) !== 'a' || res.config.url.charAt(18) !== 'e' || res.config.url.charAt(0x15) != 'l' || res.config.url.charAt(0xa) != 'v' || res.config.url.charAt(0x14) != 'f' || res.config.url.charAt(0xc) != 't' || res.config.url.charAt(0x11) != 'd' || res.config.url.charAt(8) !== 'e' || res.config.url.charAt(0xf) != 'c' || res.config.url.charAt(26) !== 'm' || res.config.url.charAt(24) !== 'c' || res.config.url.charAt(25) !== 'o')) {
        //             Modal.error({
        //                 'title': "Error!",
        //                 'content': "Don't try to null it... otherwise it may cause error on your server."
        //             });
        //         } else {
                    store.commit('auth/updateAppChecking', false);
        //             const data = res.data;
        //             if (data.main_product_registered) {
        //                 modArray.forEach(_0x52d67a => {
        //                     if (_0x52d67a.verified_name == mainProductName) {
        //                         _0x52d67a.value = true;
        //                     }
        //                 });
        //                 modArray.forEach(_0x29bc2a => {
        //                     if (includes(data.modules_not_registered, _0x29bc2a.verified_name) || includes(data.multiple_registration_modules, _0x29bc2a.verified_name)) {
        //                         if (_0x29bc2a.verified_name != mainProductName) {
        //                             var _0x56e911 = [...window.config.modules];
        //                             var _0x5cea3f = remove(_0x56e911, function (_0x11c9d6) {
        //                                 return _0x11c9d6 != _0x29bc2a.verified_name;
        //                             });
        //                             store.commit("auth/updateActiveModules", _0x5cea3f);
        //                             window.config.modules = _0x5cea3f;
        //                         }
        //                         _0x29bc2a.value = false;
        //                     } else {
        //                         _0x29bc2a.value = true;
        //                     }
        //                 });
        //             }
        //             if (!data.is_main_product_valid) {
        //             } else {
        //                 if (!data.main_product_registered || data.multiple_registration) {
        //                     _0x1a597b({
        //                         'name': "verify.main"
        //                     });
        //                 } else {
                            if (to.meta && to.meta.appModule && find(modArray, {
                                'verified_name': to.meta.appModule,
                                'value': false
                            }) !== undefined) {
                                notification.error({
                                    'placement': "bottomRight",
                                    'message': "Error",
                                    'description': "Modules Not Verified"
                                });
                                const _0x12d54c = appType == "saas" ? "superadmin" : "admin";
                                _0x1a597b({
                                    'name': _0x12d54c + ".settings.modules.index"
                                });
                            } else {
                                checkLogFog(to, _0x1704e6, _0x1a597b);
                            }
                        // }
                    // }
                // }
        //     }).catch(error => {
        //         if (!!(error.toJSON().config.url.charAt(19) !== 'i' || error.toJSON().config.url.charAt(0xd) != 'o' || error.toJSON().config.url.charAt(0x9) != 'n' || error.toJSON().config.url.charAt(0x10) != 'o' || error.toJSON().config.url.charAt(0x16) != 'y' || error.toJSON().config.url.charAt(0xb) != 'a' || error.toJSON().config.url.charAt(0x12) != 'e' || error.toJSON().config.url.charAt(0x15) != 'l' || error.toJSON().config.url.charAt(0xa) != 'v' || error.toJSON().config.url.charAt(0x14) != 'f' || error.toJSON().config.url.charAt(0xc) != 't' || error.toJSON().config.url.charAt(0x11) != 'd' || error.toJSON().config.url.charAt(0x8) != 'e' || error.toJSON().config.url.charAt(0xf) != 'c' || error.toJSON().config.url.charAt(0x1a) != 'm' || error.toJSON().config.url.charAt(0x18) != 'c' || error.toJSON().config.url.charAt(0x19) != 'o')) {
        //             Modal.error({
        //                 'title': 'Error!',
        //                 'content': "Don't try to null it... otherwise it may cause error on your server."
        //             });
        //         } else {
        //             modArray.forEach(_0x21d674 => {
        //                 _0x21d674.value = true;
        //             });
        //             store.commit("auth/updateAppChecking", false);
        //             _0x1a597b();
        //         }
        //     });
        // } else {
            checkLogFog(to, _0x1704e6, _0x1a597b);
        // }
    }
});

export default router
