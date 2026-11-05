import DOMPurify from "dompurify";
interface Props {
  content: string;
}

export default function RichTextDisplay({ content }: Props) {
  if (!content) return null;
  
    const cleanHTML = DOMPurify.sanitize(content);
  return (
 <div
    className="rich-text-content"
    dangerouslySetInnerHTML={{ __html: cleanHTML }}
  />
  );
}