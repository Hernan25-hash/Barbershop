import Link from 'next/link'
import { Scissors, Mail, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function SignUpSuccessPage() {
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

      {/* Success Message */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <Scissors className="h-8 w-8 text-primary" />
            <span className="font-serif text-2xl font-semibold">
              The Gentleman&apos;s Cut
            </span>
          </Link>

          <div className="bg-card border border-border rounded-lg p-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-serif font-bold mb-4">
              Check Your Email
            </h1>
            <p className="text-muted-foreground mb-6">
              We&apos;ve sent a confirmation link to your email address. Please click the link to verify your account before signing in.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link href="/auth/login">Back to Sign In</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
