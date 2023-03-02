export default function patch(oldVnode, vnode) {
  console.log(oldVnode.nodeType, "oldVnode.nodeType;");
  const isRealElement = oldVnode.nodeType;

  // 初次渲染
  if (isRealElement) {
    const oldDom = oldVnode;
    const parentDom = oldDom.parentNode;

    // 创建真实dom
    let el = createElm(vnode);
    console.log("Dom", el);
    parentDom.insertBefore(el, oldDom);
    parentDom.removeChild(oldDom);
    return el;
  }
}

//
function createElm(vnode) {
  let { tag, data, key, children, text } = vnode;

  if (typeof tag === "string") {
    vnode.el = document.createElement(tag);
    updateProperties(vnode);

    children.forEach((child) => {
      return vnode.el.appendChild(createElm(child));
    });
  } else {
    vnode.el = document.createTextNode(text);
  }

  return vnode.el;
}

// 解析vnode的data属性 映射到真实dom上
function updateProperties(vnode) {
  let newProps = vnode.data || {};
  let el = vnode.el; //真实节点
  for (let key in newProps) {
    // style需要特殊处理下
    if (key === "style") {
      for (let styleName in newProps.style) {
        el.style[styleName] = newProps.style[styleName];
      }
    } else if (key === "class") {
      el.className = newProps.class;
    } else {
      // 给这个元素添加属性 值就是对应的值
      el.setAttribute(key, newProps[key]);
    }
  }
}
