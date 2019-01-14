export const toolbarConfig = {
    options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
    blockType: {
        inDropdown: true,
        options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
        className: undefined,
        component: undefined,
        dropdownClassName: undefined,
    },
    inline: {
        options: ['bold', 'italic', 'underline', 'strikethrough'],
        bold: { icon: require('../../assets/icons/bold.svg'), className: undefined },
        italic: { icon: require('../../assets/icons/italic.svg'), className: undefined },
        underline: { icon: require('../../assets/icons/underline.svg'), className: undefined },
        strikethrough: { icon: require('../../assets/icons/strikethrough.svg'), className: undefined },
    },
    image: {
        icon: require('../../assets/icons/image.svg')
    }
}