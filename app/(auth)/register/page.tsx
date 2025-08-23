import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/Theme-toggle";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";

export default function SignUpPage() {
    return (
        <>
            {/* Theme toggle in corner */}
            <div className="absolute top-4 right-4 z-10">
                <ModeToggle />
            </div>

            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
                        CodeVeda
                    </h1>
                    <p className="text-sm text-emerald-700/80">Crop Residue Marketplace</p>
                </div>

                <Card className="w-full border-none shadow-2xl bg-white/90 backdrop-blur-sm rounded-2xl">
                    <CardHeader className="space-y-1 pb-2">
                        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent">
                            Create an account
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                            Join our crop residue marketplace
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                        <form>
                            {/* Role selection with improved styling */}
                            <div className="mb-5">
                                <Label htmlFor="role" className="text-sm font-medium mb-2 block">
                                    I am a:
                                </Label>
                                <RadioGroup defaultValue="farmer" className="flex flex-wrap gap-3">
                                    <div className="flex-1 min-w-[100px]">
                                        <Label
                                            htmlFor="farmer"
                                            className="flex flex-col items-center justify-center h-20 border border-emerald-100 rounded-lg cursor-pointer hover:bg-emerald-50 peer-checked:border-emerald-500 peer-checked:bg-emerald-50 transition-all"
                                        >
                                            <RadioGroupItem value="farmer" id="farmer" className="sr-only peer" />
                                            <span className="text-2xl mb-1">🌾</span>
                                            <span className="text-sm font-medium">Farmer</span>
                                        </Label>
                                    </div>
                                    <div className="flex-1 min-w-[100px]">
                                        <Label
                                            htmlFor="buyer"
                                            className="flex flex-col items-center justify-center h-20 border border-emerald-100 rounded-lg cursor-pointer hover:bg-emerald-50 peer-checked:border-emerald-500 peer-checked:bg-emerald-50 transition-all"
                                        >
                                            <RadioGroupItem value="buyer" id="buyer" className="sr-only peer" />
                                            <span className="text-2xl mb-1">🏭</span>
                                            <span className="text-sm font-medium">Buyer</span>
                                        </Label>
                                    </div>
                                    <div className="flex-1 min-w-[100px]">
                                        <Label
                                            htmlFor="logistics"
                                            className="flex flex-col items-center justify-center h-20 border border-emerald-100 rounded-lg cursor-pointer hover:bg-emerald-50 peer-checked:border-emerald-500 peer-checked:bg-emerald-50 transition-all"
                                        >
                                            <RadioGroupItem value="logistics" id="logistics" className="sr-only peer" />
                                            <span className="text-2xl mb-1">🚚</span>
                                            <span className="text-sm font-medium">Logistics</span>
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            {/* Form inputs */}
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
                                        <Input
                                            id="firstName"
                                            type="text"
                                            placeholder="John"
                                            className="h-11 border-emerald-100 focus-visible:ring-emerald-500"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
                                        <Input
                                            id="lastName"
                                            type="text"
                                            placeholder="Doe"
                                            className="h-11 border-emerald-100 focus-visible:ring-emerald-500"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        className="h-11 border-emerald-100 focus-visible:ring-emerald-500"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        className="h-11 border-emerald-100 focus-visible:ring-emerald-500"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        className="h-11 border-emerald-100 focus-visible:ring-emerald-500"
                                        required
                                    />
                                </div>
                            </div>
                        </form>
                    </CardContent>

                    <CardFooter className="flex flex-col space-y-4 pt-0">
                        <Button
                            type="submit"
                            className="w-full h-11 bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 text-white font-medium"
                        >
                            Create account
                        </Button>

                        <div className="relative w-full">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-gray-200"></span>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-2 text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        <Button
                            variant="outline"
                            className="w-full h-11 border-gray-200 hover:bg-gray-50/50 text-gray-700 font-medium"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" className="mr-2 h-4 w-4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>
                            Google
                        </Button>

                        <div className="text-center text-sm mt-2">
                            <span className="text-gray-500">Already have an account?</span>{" "}
                            <Link href="/login" className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline">
                                Sign in
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}
