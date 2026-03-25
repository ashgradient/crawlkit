"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin, Loader2, Check } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const schema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Valid email required"),
  password: z.string().min(6, "At least 6 characters"),
})

type FormData = z.infer<typeof schema>

export default function SignupPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    setError("")

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    const json = await res.json()

    if (!res.ok) {
      setError(json.error ?? "Something went wrong")
      setLoading(false)
      return
    }

    // Auto sign in
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    })

    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-DEFAULT text-white flex-col justify-between p-12">
        <Link href="/" className="flex items-center gap-2 font-display font-bold text-xl">
          <div className="w-8 h-8 bg-terracotta-DEFAULT rounded-lg flex items-center justify-center">
            <MapPin className="w-4 h-4 text-white" />
          </div>
          CrawlKit
        </Link>
        <div>
          <h2 className="font-display text-2xl font-bold mb-4">Built for BIDs and Tourism Boards</h2>
          <ul className="space-y-3">
            {[
              "Launch your first crawl in under a day",
              "No developer or app store required",
              "Board-ready analytics from day one",
              "Cancel anytime",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-white/80 text-sm">
                <Check className="w-4 h-4 text-mint-DEFAULT flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-white/40 text-xs">Trusted by 200+ BIDs across the US</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 font-display font-bold text-xl text-slate-DEFAULT mb-8">
            <div className="w-8 h-8 bg-terracotta-DEFAULT rounded-lg flex items-center justify-center">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            CrawlKit
          </div>

          <h1 className="font-display text-3xl font-bold text-slate-DEFAULT mb-2">Create your account</h1>
          <p className="text-slate-DEFAULT/60 mb-8">Free to start — no credit card needed</p>

          <Button
            type="button"
            variant="outline"
            className="w-full mb-4"
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs text-slate-DEFAULT/40 bg-[hsl(40,33%,97%)] px-3">
              or sign up with email
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="name">Full name</Label>
              <Input id="name" placeholder="Sarah Chen" {...register("name")} className="mt-1" />
              {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <Label htmlFor="email">Work email</Label>
              <Input id="email" type="email" placeholder="you@bid.org" {...register("email")} className="mt-1" />
              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" {...register("password")} className="mt-1" />
              {errors.password && <p className="text-xs text-destructive mt-1">{errors.password.message}</p>}
            </div>

            {error && (
              <div className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">{error}</div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-terracotta-DEFAULT hover:bg-terracotta-600 text-white"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Create account
            </Button>
          </form>

          <p className="text-center text-xs text-slate-DEFAULT/40 mt-4">
            By signing up you agree to our{" "}
            <Link href="/terms" className="underline hover:text-terracotta-DEFAULT">Terms</Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline hover:text-terracotta-DEFAULT">Privacy Policy</Link>.
          </p>

          <p className="text-center text-sm text-slate-DEFAULT/60 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-terracotta-DEFAULT hover:underline font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
