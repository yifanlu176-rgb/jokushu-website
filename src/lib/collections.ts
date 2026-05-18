export type CollectionLocale = 'zh' | 'ja';

export type CollectionLocaleEntry = {
  slug: string;
  volume: number;
  name: string;
  subtitle?: string;
  description: string;
  provenance: string;
  era?: string;
  priceRange: string;
  status: 'available' | 'reserved' | 'sold';
  images: string[];
  locale: CollectionLocale;
};

export type BilingualCollectionItem = {
  slug: string;
  volume: number;
  zh: CollectionLocaleEntry;
  ja: CollectionLocaleEntry;
};

const itemMap = new Map<string, Partial<Record<CollectionLocale, CollectionLocaleEntry>>>();
const itemModules = import.meta.glob('../content/collections/*.{zh,ja}.json', {
  eager: true,
});

for (const [file, module] of Object.entries(itemModules)) {
  const match = file.match(/\/([^/]+)\.(zh|ja)\.json$/);
  if (!match) continue;

  const [, basename, locale] = match as [string, string, CollectionLocale];
  const entry = (module as { default?: CollectionLocaleEntry }).default ?? (module as CollectionLocaleEntry);
  const group = itemMap.get(basename) ?? {};

  group[locale] = entry;
  itemMap.set(basename, group);
}

const items = Array.from(itemMap.values())
  .filter((entry): entry is Record<CollectionLocale, CollectionLocaleEntry> => Boolean(entry.zh && entry.ja))
  .map((entry): BilingualCollectionItem => ({
    slug: entry.zh.slug,
    volume: entry.zh.volume,
    zh: entry.zh,
    ja: entry.ja,
  }))
  .sort((a, b) => a.volume - b.volume || a.slug.localeCompare(b.slug));

export function getAllItems() {
  return items;
}

export function getItemBySlug(slug: string) {
  return items.find((item) => item.slug === slug);
}

export function getItemsByVolume(volume: number) {
  return items.filter((item) => item.volume === volume);
}
