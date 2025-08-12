import { signUpAction } from "@/src/app/actions";
import AuthSubmitButton from "@/src/components/auth-submit-button";
import { FormMessage, Message } from "@/src/components/form-message";
import Link from "next/link";

export default async function SignUp(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;

  return (
    <form
      className="flex-1 flex flex-col w-full max-w-sm mx-auto mt-24"
      action={signUpAction}
    >
      <h1 className="text-2xl font-medium">Sign up</h1>
      <p className="text-sm text-foreground">
        Already have an account?{" "}
        <Link className="text-foreground font-medium underline" href="/sign-in">
          Sign in
        </Link>
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <label htmlFor="email">Email</label>
        <input name="email" placeholder="you@example.com" required />
        <div className="flex justify-between items-center">
          <label htmlFor="password">Password</label>
        </div>
        <input
          type="password"
          name="password"
          placeholder="Your password"
          required
        />
        <AuthSubmitButton />
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
