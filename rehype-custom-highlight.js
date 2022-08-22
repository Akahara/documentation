export default function rehypeCustomHighlight() {
    return (tree) => visit(tree);

    function visit(tree) {
        tryAffect(tree);
        if(tree.children) {
            for(let child of tree.children)
                visit(child);
        }
    }
    
    function tryAffect(node) {
        if(node.tagName != 'code' || node.children.length != 1)
            return;
        let firstChild = node.children[0];
        if(firstChild.type != 'text')
            return;
            let text = firstChild.value.trim();
        console.log(text);
        if(!text.startsWith('```') || !text.endsWith('```'))
            return;
        text = text.substr(3, text.length-3);
        let languageName = text.substr(0, text.indexOf('\n'));
        text = text.substr(text.indexOf('\n'));
        console.log("COLOR type", languageName, "-", text)
    }
}

