import Link from "next/link";

export function EmptyState({ url, message = "No items found. Click here to create one!" }) {
  return (
    <Link href={url}>
      <button
        type="button"
        className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-8 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <span className="mt-2 block text-sm font-semibold text-gray-900">{message}</span>
      </button>
    </Link>
  )
}