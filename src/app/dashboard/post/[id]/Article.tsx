import { sanitize } from 'isomorphic-dompurify';

type Props = {
    content: string;
}

const Article = ({content}: Props) => {
    const sanitizedContent = sanitize(content);
    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
        </div>
    )
}

export default Article;