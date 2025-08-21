"use client";

import { signUpAction } from "@/src/app/actions";
import AuthSubmitButton from "@/src/components/auth-submit-button";
import { FormMessage, Message } from "@/src/components/form-message";
import { createSupabaseClient } from "@/src/utils/supabase/client";
import Link from "next/link";
import { useState } from "react";

export default function SignUp() {
  const supabase = createSupabaseClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
            (typeof window !== "undefined"
              ? `${window.location.origin}/auth/confirm`
              : ""),
        },
      });

      if (signUpError) {
        setError(signUpError.message);
      } else {
        setShowConfirmation(true);
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (showConfirmation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md">
          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              {/* <Mail className="w-6 h-6 text-green-600" /> */}
            </div>
            <h5 className="text-2xl">Check Your Email</h5>
            <p>
              We've sent a confirmation link to <strong>{email}</strong>
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <p>
                Click the link in your email to confirm your account and
                complete the signup process.
              </p>
            </div>
            <div className="text-center text-sm text-muted-foreground">
              Didn't receive the email? Check your spam folder or{" "}
              <button
                onClick={() => setShowConfirmation(false)}
                className="text-primary hover:underline"
              >
                try again
              </button>
            </div>
            <button className="w-full bg-transparent">
              <Link href="/auth/signin">
                {/* <ArrowLeft className="w-4 h-4 mr-2" /> */}
                Back to Sign In
              </Link>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <div>
          <h4 className="text-2xl text-center">Create Account</h4>
          <p className="text-center">
            Enter your details to create your account
          </p>
        </div>
        <div>
          <form onSubmit={handleSignUp} className="space-y-4">
            {error && (
              <div>
                <div>{error}</div>
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                minLength={6}
              />
            </div>

            <button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
