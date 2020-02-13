'use strict';
import {defaultParent} from "./app.js";
import {eventDefines} from "./defines.js";
import Element from "./element.js";
import RectTransform from "./components/rect-transform.js";

export const elements = [];

export function addElement(name, parent){
    let rectComponent = new RectTransform({anchormin: "0.4 0.4", anchormax: "0.6 0.6"});
    let data = {
        name: name || getRandomName("rnd"),
        parent: parent || defaultParent
    };

    let element = new Element(data, rectComponent);
    elements.push(element);
    
    element.renderView();
    $(window).trigger(eventDefines.elementsAdded, element);
    $(window).trigger(eventDefines.elementsUpdated, elements);
    return element;
}

export function removeElement(id){
    let element = elements.find(x=>x.id === id);
    if(!element){
        console.warn("Element wasn't removed, cause not found");
        return;
    }

    removeElementInner(element);
}

function removeElementInner(element){
    let children = element.filter(x=>x.data.parent == element.data.name);
    children.forEach(child => removeElement(child));

    elements = elements.filter(x=>x.id !== element.id);
}

function getRandomName(prefix){
    return prefix + "-" + Date.now();
}