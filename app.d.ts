interface BlogPost {
  id: string,
  title: string,
  date: string,
  lastUpdate?: string,
  externalUrl?: string,
  slug: string
  openGraphImage?: string
}

type PropertyTypes = `title` | `rich_text` | `date`;

interface NotionProperties {
  [k: string]: {
    property: any,
    type: PropertyTypes
  }
}
