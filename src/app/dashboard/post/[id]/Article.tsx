import { sanitize } from 'isomorphic-dompurify';

type Props = {
    content: string;
}

const Article = ({content}: Props) => {
    const sanitizedContent = sanitize(content);
    return (
        <div className='custon-scroll-container'>
            <div className='dark:text-white' dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
        </div>
    )
}

export default Article;