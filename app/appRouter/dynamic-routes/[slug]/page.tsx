export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  return <div>My Post: {params.slug}</div>
}
export const dynamic = 'error'
export const revalidate = 600
