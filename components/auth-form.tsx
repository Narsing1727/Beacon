"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { BeaconLogo } from "@/components/beacon-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel, FieldDescription } from "@/components/ui/field";

type AuthFormProps = { mode: "login" | "signup" };

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const isLogin = mode === "login";

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12">
      <Link href="/" className="mb-8">
        <BeaconLogo className="text-xl" />
      </Link>
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="font-serif text-2xl">{isLogin ? "Sign in to Beacon" : "Create your account"}</CardTitle>
          <CardDescription>
            {isLogin ? "Welcome back. Pick up where your basin left off." : "Start versioning your geospatial data for free."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <FieldGroup>
              {!isLogin && (
                <Field>
                  <FieldLabel htmlFor="username">Username</FieldLabel>
                  <Input id="username" placeholder="priyam" required />
                </Field>
              )}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" type="email" placeholder="you@agency.org" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input id="password" type="password" placeholder="••••••••" required />
                {!isLogin && <FieldDescription>At least 12 characters.</FieldDescription>}
              </Field>
              <Button type="submit" className="w-full">
                {isLogin ? "Sign in" : "Create account"}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <p className="mt-6 text-sm text-muted-foreground">
        {isLogin ? (
          <>
            New to Beacon?{" "}
            <Link href="/signup" className="text-accent hover:underline">
              Create an account
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/login" className="text-accent hover:underline">
              Sign in
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
