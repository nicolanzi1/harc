export type Category = | 'Podcasts' | 'Articles' | 'Newsletters' | 'Recipes' | 'Fitness' | 'Meditation'

export interface Resource {
    id: string,
    category: Category
    title: string
    thumbnail: string
    tags: string[] // <= 3 items
    duration: number // minutes
    description: string
    date_uploaded: string // ISO YYY-MM-DD
}