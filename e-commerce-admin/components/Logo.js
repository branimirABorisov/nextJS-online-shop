import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/" className="flex gap-1">
            <img className='rounded-xl' src="https://firebasestorage.googleapis.com/v0/b/nextjs-e-commerce-storage.appspot.com/o/next%2FSTORE.png?alt=media&token=cb4ed7fa-3863-4008-ac91-a7c8ac6ab9f2&_gl=1*12tsj1n*_ga*MTU5NjIxNDkyNy4xNjkxODY4NDE4*_ga_CW55HF8NVT*MTY5OTAyNTEwNy4xOC4xLjE2OTkwMjUyODUuNDguMC4w" alt="store" />
        </Link>
    )

}
