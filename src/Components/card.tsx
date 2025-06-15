import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Link from 'next/link';

export default function StoryCard({
  title,
  author,
  snippet,
  slug,
}: {
  title: string;
  author: string;
  snippet: string;
  slug: string;
}) {
  return (
    <Card
      className="m-4 p-4 w-full max-w-md bg-black shadow-xl rounded-xl transition-all duration-300 hover:scale-105"
      style={{ backgroundColor: '#212121' }}
    >
      <CardContent className="space-y-2">
        <h2 className="text-xl font-bold text-red-600">{title}</h2>
        <h3 className="text-sm text-red-900">
          Author: <i className="text-red-500">{author}</i>
        </h3>
        <p className="text-red-800 line-clamp-4 min-h-[5.5rem] max-h-[6.5rem] overflow-hidden">
          {snippet}
        </p>
        <Link href={`/post/${slug}`} passHref legacyBehavior>
          <Button
            variant="contained"
            color="primary"
            className="!mt-2 !bg-red-500 hover:!bg-red-700"
            component="a"
          >
            Read more
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

