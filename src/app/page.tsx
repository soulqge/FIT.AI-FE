import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="space-y-6 max-w-md">
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to <span className="text-primary">FIT.AI</span>
        </h1>
        <p className="text-xl text-muted-foreground">
          Your AI-powered fitness companion for nutrition tracking and
          personalized recommendations
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/signin">Sign In</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            <Link href="/signup">Create Account</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
