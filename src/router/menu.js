// import { RouteConfig } from "vue-router";
import config from "@/configs/index";
import Layout from "@/components/layout/index.vue";
import VueRouter from "@/components/layout/vue-router/index";
import { isExternal } from "@/utils/validate";
import AppModule from "@/store/modules/app";

const development = config.development;

let url_index = 0;
const urlList = [];

class Menu {
    constructor() { }
    /**
     * 返回vue-router格式
     * @param menuItem
     */
    getRouterItem (menuItem) {
        url_index++;
        urlList.push("" + url_index);
        const routerItem = {
            path: menuItem.Url || "" + url_index,
            name: menuItem.Text,
            component: Layout,
            children: [],
            meta: {
                key: menuItem.Key,
                title: menuItem.Text,
                icon: menuItem.Icon,
                ParentId: menuItem.ParentId,
                Id: menuItem.Id
            }
        };
        if (menuItem.Url) {
            // 判断是否需要 external
            if ((isExternal(menuItem.Url))) {
                routerItem.component = () => import("@/views/external/index.vue");
                routerItem.path = `/external_${url_index}`;
                const url = isExternal(menuItem.Url)
                    ? menuItem.Url
                    : menuItem.Url.replace(config.staticPage, `${window.location.origin}`);
                routerItem.props = { default: true, url: url };
            } else {
                routerItem.component = () => import(`@/views${menuItem.Url}/index.vue`);
            }
        } else {
            if (menuItem.ParentId) {
                routerItem.component = VueRouter;
            }
        }
        return routerItem;
    }
    /**
     * 返回同一级菜单（打平一级）
     * @param menu
     */
    getParallelMenu (menu) {
        return menu.map(menuItem => {
            return this.getRouterItem(menuItem);
        });
    }
    /**
     * 返回tree格式菜单 async
     */
    getTreeMenu (menu) {
        const trees = this.recursionTree(menu);
        return trees.filter(item => {
            if (
                urlList.includes(item.path) &&
                item.children &&
                item.children.length === 0
            ) {
                return false;
            }
            return true;
        });
    }

    /**
     * 递归 格式化 树
     * @param datalist
     * @param ParentId 父级id
     * @param children
     */
    recursionTree (
        datalist,
        ParentId = null,
        children = []
    ) {
        datalist.filter(item => {
            if (ParentId === null) {
                return !item.ParentId;
            } else {
                return item.ParentId === ParentId;
            }

        }).map(menuItem => {
            const routerItem = this.getRouterItem(menuItem);
            routerItem.children = this.recursionTree(
                datalist,
                menuItem.Id,
                menuItem.children || []
            );
            if (
                ParentId === null &&
                menuItem.Url &&
                routerItem.children.length === 0
            ) {
                routerItem.children.push({
                    ...routerItem,
                    path: "",
                    children: undefined
                });
                routerItem.component = Layout;
            }
            children.push(routerItem);
        });
        return children;
    }

    /**
     * (tree)递归 格式化 打平一级菜单
     */
    generateRoutesFromMenu (
        menu,
        routes = [],
        parentMenu
    ) {
        for (let i = 0, l = menu.length; i < l; i++) {
            const item = menu[i];
            if (item.path) {
                item.meta["parentMenu"] = parentMenu;
                const itemClone = { ...item };
                delete itemClone.children;
                routes.push(itemClone);
            }
            if (item.children) {
                this.generateRoutesFromMenu(item.children, routes, item);
            }
        }
        return routes;
    }
}
export default new Menu();
