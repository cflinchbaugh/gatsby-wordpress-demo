import { 
    useRef,
} from 'react';
import { useState, useEffect } from 'preact/hooks';

//Credit Justin Travis Waith-Mair https://non-traditional.dev/how-to-use-an-intersectionobserver-in-a-react-hook-9fb061ac6cb5

export default ({
    root = null, 
    rootMargin, 
    threshold = 0 
}) => {
    const [entry, updateEntry] = useState({});
    const [node, setNode] = useState(null);

    const observer = typeof(window) !== 'undefined' ? useRef(
        new window.IntersectionObserver(([entry]) => updateEntry(entry), {
            root,
            rootMargin,
            threshold
        })
    ) : null;

    useEffect(
        () => {
            const { current: currentObserver } = observer;
            currentObserver.disconnect();

            if (node) currentObserver.observe(node);

            return () => currentObserver.disconnect();
        },[
            node,
            observer
        ]
    );

    return [setNode, entry];
};
