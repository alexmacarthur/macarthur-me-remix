interface BlogPost {
  id: string,
  title: string,
  date: string,
  lastUpdated?: string,
  externalUrl?: string,
  externalHost?: string,
  slug: string,
  excerpt: string,
  views: string,
  openGraphImage?: string
}

type PropertyTypes = `title` | `rich_text` | `date`;

interface NotionProperties {
  [k: string]: {
    property: any,
    type: PropertyTypes
  }
}
interface PaginationProps {
  hasMore: boolean,
  hasPrevious: boolean,
  nextPage: number,
  previousPage: number,
  currentPage: number
}
