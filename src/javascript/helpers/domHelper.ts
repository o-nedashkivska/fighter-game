export interface Attributes {
    [key: string]: string;
}

interface CreateElementArgs {
    tagName: string;
    className?: string;
    attributes?: Attributes;
}

interface CreateElementWithTextContentArgs extends CreateElementArgs {
    textContent: string;
}

export default function createElement({ tagName, className, attributes = {} }: CreateElementArgs) {
    const element = document.createElement(tagName);

    if (className) {
        const classNames = className.split(' ').filter(Boolean); // Include only not empty className values after the splitting
        element.classList.add(...classNames);
    }

    Object.keys(attributes).forEach(key => element.setAttribute(key, attributes[key]));

    return element;
}

export function createElementWithTextContent({ textContent, ...args }: CreateElementWithTextContentArgs) {
    const element = createElement(args);
    element.textContent = textContent;

    return element;
}
