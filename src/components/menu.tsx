import React, {SetStateAction, useState, memo, useEffect} from "react";
import type { MenuProps } from "antd";
import { Menu } from 'antd';
import { menuList } from './config'
import { ItemType } from "antd/es/menu/hooks/useItems";
import IconFont from './icon';
import { NavLink as Link, useLocation } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number];
function getItem( label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[], type?: 'group'): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
}
interface item {
    key: string,
    icon: string,
    children: item[],
    label: string,
    type: string,
}
let routeMap:{[key:string]:any} = {}
function getMenuList() {
    let tempMenuList: ItemType[] = [];
    let openKeys:string[] = [];
    const getList = (list:any, newList: MenuItem[]) => {
        for(let i=0; i<list.length; i++) {
            const { value, label, icon } = list[i] || {};
            const tempBo = list[i].children && list[i].children.length
            const it = getItem(tempBo ? label : <Link to={value}>{label}</Link>, value || label, icon && <IconFont icon={icon}></IconFont>);
            newList.push(it)
            openKeys.push(value)
            routeMap[value] = label
            if(tempBo) {
                const tempItem = newList[i] as item
                tempItem.children = [];
                getList(list[i].children || [], tempItem.children);
            }
        }
    }
    getList(menuList, tempMenuList)
    return {openKeys, tempMenuList}
}
interface breadType {
    (res: SetStateAction<{
        title: string;
    }[]>): void
}
const MyMenu:React.FC<{bread:breadType}> = (props) => {
    const path = useLocation().pathname
    const [tempPath, setTempPath] = useState(path)
    const { openKeys, tempMenuList } = getMenuList()
    const setBread = (keyPath: string[], props: { bread: any; }, type:boolean) => {
        const items = keyPath.map(v => ({title:routeMap[v]}))
        const newItems = type ? items.reverse() : items
        props.bread(newItems)
    }
    useEffect(() => {
        const initPath = Object.keys(routeMap).reduce((p:string[],c:string):string[] => {
            if(path.match(c)) {
                p.push(c)
            }
            return p
        },[])
        setBread(initPath, props, false)
    },[path, props])
    const onClick:MenuProps['onClick'] = (e) => {
        setTempPath(e.key)
        setBread(e.keyPath, props, true)
    }
    return (
        <Menu
            onClick={onClick}
            style={{width:256, height:'100%'}}
            mode="inline"
            selectedKeys={[tempPath]}
            defaultOpenKeys={openKeys}
            items={tempMenuList}
        ></Menu>
    )
}

export default memo(MyMenu)