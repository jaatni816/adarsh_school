import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  path?: string;
}

const SITE_NAME = 'Adarsh Sr. Sec. School, Jakhouli';
const DEFAULT_IMAGE = '/android-chrome-512x512.png';

const PAGE_LABELS: Record<string, string> = {
  '/': 'Home',
  '/about': 'About Us',
  '/academics': 'Academics',
  '/gallery': 'Photo Gallery',
  '/faculty': 'Faculty & Staff',
  '/admissions': 'Admissions',
  '/contact': 'Contact Us',
};

function buildBreadcrumb(path: string) {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const items = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${origin}/` },
  ];
  if (path !== '/') {
    const label = PAGE_LABELS[path] ?? path.replace(/^\/|\/$/g, '');
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: label,
      item: `${origin}${path}`,
    });
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}

export default function SEO({ title, description, path = '/' }: SEOProps) {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const canonicalUrl = `${origin}${path}`;
  const canonicalAbsolute = `${origin}${DEFAULT_IMAGE}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={canonicalAbsolute} />
      <meta property="og:url" content={canonicalUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={canonicalAbsolute} />

      <script type="application/ld+json">{JSON.stringify(buildBreadcrumb(path))}</script>
    </Helmet>
  );
}
