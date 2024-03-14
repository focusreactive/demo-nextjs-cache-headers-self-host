export default function Page({ params }: { params: { slug: string } }) {
  return <div>My Post: {params.slug}</div>
}

export const revalidate = 600
