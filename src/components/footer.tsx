import Link from "next/link"

export function Footer() {
    return (
      <footer className="fixed bottom-6 left-8">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by{" "}
          <Link
            href="twitter.com/eutiniel"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            euotiniel {" "}
          </Link>
          . I invite you to improve this {" "}
          <Link
            href=""
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            toy
          </Link>
          .
        </p>
      </footer>
    )
  }