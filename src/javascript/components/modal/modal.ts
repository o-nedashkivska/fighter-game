import createElement from '../../helpers/domHelper';

type OnCloseHandler = () => void;

interface ModalArgs {
    title: string;
    bodyElement: HTMLElement;
    onClose: OnCloseHandler;
}

function getModalContainer() {
    return document.getElementById('root') as HTMLDivElement;
}
function hideModal() {
    const modal = document.getElementsByClassName('modal-layer')[0];
    modal?.remove();
}

function createHeader(title: string, onClose: OnCloseHandler) {
    const headerElement = createElement({ tagName: 'div', className: 'modal-header' });
    const titleElement = createElement({ tagName: 'span' });
    const closeButton = createElement({ tagName: 'div', className: 'close-btn' });

    titleElement.innerText = title;
    closeButton.innerText = '×';

    const close = () => {
        hideModal();
        onClose();
    };
    closeButton.addEventListener('click', close);
    headerElement.append(titleElement, closeButton);

    return headerElement;
}

function createModal({ title, bodyElement, onClose }: ModalArgs) {
    const layer = createElement({ tagName: 'div', className: 'modal-layer' });
    const modalContainer = createElement({ tagName: 'div', className: 'modal-root' });
    const header = createHeader(title, onClose);

    modalContainer.append(header, bodyElement);
    layer.append(modalContainer);

    return layer;
}

export default function showModal({ title, bodyElement, onClose = () => {} }: ModalArgs) {
    const root = getModalContainer();
    const modal = createModal({ title, bodyElement, onClose });

    root.append(modal);
}
