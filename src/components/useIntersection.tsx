import { 
    useEffect, 
    useRef, 
    useState 
} from 'react';

interface useIntersectionInterface {
    root?: Document | Element,
    rootMargin?: string,
    threshold?: [number, number]
}

//Credit Justin Travis Waith-Mair https://non-traditional.dev/how-to-use-an-intersectionobserver-in-a-react-hook-9fb061ac6cb5
function useIntersection(props:useIntersectionInterface) {
    const {
        root = null, 
        rootMargin, 
        threshold = 0
    } = props;
    const [entry, updateEntry] = useState({
        intersectionRatio: 0
    });
    const [node, setNode] = useState(null);
    const intersectionRefTarget = typeof(window) !== 'undefined' ? (
            new window.IntersectionObserver(([entry]) => updateEntry(entry), {
                root,
                rootMargin,
                threshold
            }
        )
    ) : null;
    const observer = useRef(intersectionRefTarget);

    useEffect(
        () => {
            const { current: currentObserver } = observer;
            currentObserver?.disconnect();

            if (node) currentObserver?.observe(node);

            return () => currentObserver?.disconnect();
        },[
            node,
            observer
        ]
    );

    return [setNode, entry];
};

export default useIntersection;
export type {useIntersectionInterface};