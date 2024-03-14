export default function Page({ params }: { params: { slug: string } }) {
  return <div>My Post: {params.slug}</div>
}
export const dynamic = 'error'
export const revalidate = 600
