import Link from 'next/link'
import { Scissors, AlertCircle, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = await searchParams

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2 w-fit">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Error Message */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <Scissors className="h-8 w-8 text-primary" />
            <span className="font-serif text-2xl font-semibold">
              The Gentleman&apos;s Cut
            </span>
          </Link>

          <div className="bg-card border border-border rounded-lg p-8">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
            <h1 className="text-2xl font-serif font-bold mb-4">
              Something Went Wrong
            </h1>
            <p className="text-muted-foreground mb-6">
              {params?.error
                ? `Error: ${params.error}`
                : 'An unexpected error occurred during authentication. Please try again.'}
            </p>
            <div className="flex flex-col gap-3">
              <Button asChild className="w-full">
                <Link href="/auth/login">Try Again</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/">Go Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
